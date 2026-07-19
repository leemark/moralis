import assert from "node:assert/strict";
import { access, readFile, readdir, stat } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("exports a complete static GitHub Pages site", async () => {
  const html = await readFile(new URL("out/index.html", root), "utf8");
  assert.match(html, /Moralis/);
  assert.match(html, /What shape/);
  assert.match(html, /Begin the divination/);
  assert.doesNotMatch(html, /codex-preview|loading skeleton/i);
  await access(new URL("out/_next/", root));
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
  const [page, config] = await Promise.all([
    readFile(new URL("app/page.tsx", root), "utf8"),
    readFile(new URL("next.config.ts", root), "utf8"),
  ]);
  assert.match(config, /output:\s*"export"/);
  assert.match(page, /Nothing leaves your browser/);
  assert.doesNotMatch(page, /\bfetch\s*\(|\/api\/|localStorage|sessionStorage/);
  assert.match(page, /getContext\("webgl"/);
  assert.match(page, /startViewTransition/);
});
