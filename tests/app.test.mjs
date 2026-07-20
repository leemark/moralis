import assert from "node:assert/strict";
import { access, readFile, readdir, stat } from "node:fs/promises";
import test from "node:test";
import ts from "typescript";

const root = new URL("../", import.meta.url);
const engineSource = await readFile(new URL("app/quiz-engine.ts", root), "utf8");
const engineModule = ts.transpileModule(engineSource, {
  compilerOptions: {
    module: ts.ModuleKind.ESNext,
    target: ts.ScriptTarget.ES2022,
  },
}).outputText;
const {
  QUIZ_LENGTH,
  createQuizSession,
  getQuestionBankSummary,
  scoreQuiz,
} = await import(
  `data:text/javascript;base64,${Buffer.from(engineModule).toString("base64")}`
);

test("draws a balanced ten-question reading from a thirty-question bank", () => {
  const summary = getQuestionBankSummary();
  assert.equal(summary.total, 30);
  assert.deepEqual(summary.axes, { law: 10, good: 10, mixed: 10 });
  assert.deepEqual(summary.draw, { law: 4, good: 4, mixed: 2 });
  assert.equal(QUIZ_LENGTH, 10);

  for (const seed of [1, 42, 2026, 0xffffffff]) {
    const session = createQuizSession(seed);
    assert.equal(session.length, QUIZ_LENGTH);
    assert.equal(new Set(session.map((question) => question.id)).size, QUIZ_LENGTH);
    assert.deepEqual(
      session.reduce(
        (counts, question) => {
          counts[question.axis] += 1;
          return counts;
        },
        { law: 0, good: 0, mixed: 0 },
      ),
      summary.draw,
    );
  }
});

test("keeps a reading stable while varying questions and choices between seeds", () => {
  const first = createQuizSession(8675309);
  const replay = createQuizSession(8675309);
  const different = createQuizSession(8675310);

  assert.deepEqual(replay, first);
  assert.notDeepEqual(
    different.map((question) => question.id),
    first.map((question) => question.id),
  );

  const choiceOrders = new Map();
  for (let seed = 1; seed <= 50; seed += 1) {
    for (const question of createQuizSession(seed)) {
      const orders = choiceOrders.get(question.id) ?? new Set();
      orders.add(question.choices.map((choice) => choice.label).join("|"));
      choiceOrders.set(question.id, orders);
    }
  }
  assert.ok(
    [...choiceOrders.values()].every((orders) => orders.size > 1),
    "every question should appear with more than one choice order",
  );
});

test("scores the shuffled choices shown in the active reading", () => {
  const session = createQuizSession(314159);
  const answers = session.map((question) =>
    question.choices.findIndex(
      (choice) =>
        choice.good === Math.max(...question.choices.map((item) => item.good)),
    ),
  );
  const expected = session.reduce(
    (total, question, index) => {
      total.law += question.choices[answers[index]].law;
      total.good += question.choices[answers[index]].good;
      return total;
    },
    { law: 0, good: 0 },
  );
  assert.deepEqual(scoreQuiz(session, answers), expected);
});

test("exports a complete static GitHub Pages site", async () => {
  const html = await readFile(new URL("out/index.html", root), "utf8");
  assert.match(html, /Moralis/);
  assert.match(html, /What shape/);
  assert.match(html, /Begin the divination/);
  assert.match(html, /rel="icon"/);
  assert.doesNotMatch(html, /codex-preview|loading skeleton/i);
  await access(new URL("out/_next/", root));
  await access(new URL("out/icon.svg", root));
});

test("ships one generated familiar for every zodiac sign", async () => {
  const avatarRoot = new URL("public/avatars/", root);
  const files = (await readdir(avatarRoot)).filter((name) => name.endsWith(".png"));
  assert.deepEqual(files.sort(), [
    "aquarius.png",
    "aries.png",
    "cancer.png",
    "capricorn.png",
    "gemini.png",
    "leo.png",
    "libra.png",
    "pisces.png",
    "sagittarius.png",
    "scorpio.png",
    "taurus.png",
    "virgo.png",
  ]);
  for (const file of files) {
    const info = await stat(new URL(file, avatarRoot));
    assert.ok(info.size > 500_000, `${file} should contain final avatar art`);
  }
});

test("keeps the experience private and backend-free", async () => {
  const [page, layout, config] = await Promise.all([
    readFile(new URL("app/page.tsx", root), "utf8"),
    readFile(new URL("app/layout.tsx", root), "utf8"),
    readFile(new URL("next.config.ts", root), "utf8"),
  ]);
  assert.match(config, /output:\s*"export"/);
  assert.match(page, /Nothing leaves your browser/);
  assert.doesNotMatch(page, /\bfetch\s*\(|\/api\/|localStorage|sessionStorage/);
  assert.match(page, /getContext\("webgl"/);
  assert.match(page, /startViewTransition/);
  assert.match(layout, /socialImageUrl/);
  assert.doesNotMatch(layout, /`\$\{basePath\}\/og\.png`/);
});
