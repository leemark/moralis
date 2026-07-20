"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import {
  createQuizSession,
  createSessionSeed,
  scoreQuiz,
  type QuizQuestion,
} from "./quiz-engine";

type Stage = "intro" | "quiz" | "birth" | "result";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const ZODIAC = {
  aries: {
    label: "Aries",
    glyph: "♈",
    animal: "Ember Ram",
    names: ["Astrahorn", "Pyrel", "Rook of Dawn"],
    essence: "courage that moves before certainty arrives",
  },
  taurus: {
    label: "Taurus",
    glyph: "♉",
    animal: "Verdant Bull",
    names: ["Moss-Crown", "Aurex", "Thornstead"],
    essence: "patience with the force of a continent",
  },
  gemini: {
    label: "Gemini",
    glyph: "♊",
    animal: "Echo Fox",
    names: ["Vesper-Twin", "Quill", "Lumen Echo"],
    essence: "a mind quick enough to hold two truths at once",
  },
  cancer: {
    label: "Cancer",
    glyph: "♋",
    animal: "Moon Leopard",
    names: ["Pearlguard", "Selune", "Tidekeeper"],
    essence: "tenderness protected by formidable instinct",
  },
  leo: {
    label: "Leo",
    glyph: "♌",
    animal: "Solar Lion",
    names: ["Solmane", "Aurelion", "Cinder-Crown"],
    essence: "warmth that teaches others to take up space",
  },
  virgo: {
    label: "Virgo",
    glyph: "♍",
    animal: "Herbwise Doe",
    names: ["Sagebranch", "Elowen", "Gilded Reed"],
    essence: "care expressed through attention and craft",
  },
  libra: {
    label: "Libra",
    glyph: "♎",
    animal: "Equinox Owl",
    names: ["Evenwing", "Velora", "The Pale Measure"],
    essence: "the ability to find a third path between absolutes",
  },
  scorpio: {
    label: "Scorpio",
    glyph: "♏",
    animal: "Night Panther",
    names: ["Noxveil", "Vanta", "The Hidden Thorn"],
    essence: "devotion intensified into transformative power",
  },
  sagittarius: {
    label: "Sagittarius",
    glyph: "♐",
    animal: "Comet Horse",
    names: ["Farstrider", "Caliber", "Nova-Rein"],
    essence: "truth pursued beyond the edge of the known map",
  },
  capricorn: {
    label: "Capricorn",
    glyph: "♑",
    animal: "Obsidian Ibex",
    names: ["Highwatch", "Onyx Vale", "Summit-Keeper"],
    essence: "ambition disciplined into something that endures",
  },
  aquarius: {
    label: "Aquarius",
    glyph: "♒",
    animal: "Aether Heron",
    names: ["Blue Oracle", "Cirrus", "Rain-That-Rises"],
    essence: "a future imagined clearly enough to become real",
  },
  pisces: {
    label: "Pisces",
    glyph: "♓",
    animal: "Dream Koi",
    names: ["Mira-Tide", "Opaline", "The Soft Current"],
    essence: "empathy that dissolves the border between worlds",
  },
} as const;

type ZodiacKey = keyof typeof ZODIAC;

const ALIGNMENTS = {
  "Lawful Good": {
    title: "The Steadfast Lantern",
    short: "Principle in service of mercy.",
    story:
      "You trust structure when it protects the vulnerable—and challenge it when it forgets why it exists.",
    accent: "#8ee8ff",
    accent2: "#f5d77a",
  },
  "Neutral Good": {
    title: "The Open Hand",
    short: "Compassion before doctrine.",
    story:
      "Rules and rebellion are both tools to you. The measure is simple: who is helped, and who is harmed?",
    accent: "#7ff0bd",
    accent2: "#f2dc94",
  },
  "Chaotic Good": {
    title: "The Rebel Flame",
    short: "Freedom with a generous heart.",
    story:
      "You break cages faster than you write policies. Your conscience is personal, vivid, and difficult to intimidate.",
    accent: "#ff8a70",
    accent2: "#ffd166",
  },
  "Lawful Neutral": {
    title: "The Argent Measure",
    short: "Order above impulse.",
    story:
      "You believe consistency is a form of fairness. A promise, process, or code matters most when keeping it is hard.",
    accent: "#a6c8ff",
    accent2: "#d7dce8",
  },
  "True Neutral": {
    title: "The Quiet Axis",
    short: "Balance without passivity.",
    story:
      "You resist moral theater and easy extremes. Context, consequence, and proportion guide your hand.",
    accent: "#cab6ff",
    accent2: "#a9e5d1",
  },
  "Chaotic Neutral": {
    title: "The Unbound Current",
    short: "Authenticity above permission.",
    story:
      "You protect the right to choose—even the right to surprise yourself. Control is your natural adversary.",
    accent: "#e99cff",
    accent2: "#70d9ff",
  },
  "Lawful Evil": {
    title: "The Iron Dominion",
    short: "Ambition made systematic.",
    story:
      "You understand that durable power wears a uniform, keeps records, and makes its demands sound inevitable.",
    accent: "#ff6d7a",
    accent2: "#b8a1ff",
  },
  "Neutral Evil": {
    title: "The Hollow Crown",
    short: "Advantage without allegiance.",
    story:
      "You owe systems and rebels the same loyalty they show you: exactly as much as the moment requires.",
    accent: "#d678ff",
    accent2: "#ff7c8e",
  },
  "Chaotic Evil": {
    title: "The Ruinous Star",
    short: "Will without restraint.",
    story:
      "You reject every leash, including sentiment. To others this is destruction; to you it is unedited possibility.",
    accent: "#ff4f71",
    accent2: "#a35cff",
  },
} as const;

type AlignmentKey = keyof typeof ALIGNMENTS;

const VARIANTS = [
  {
    label: "Starborn",
    note: "Your random thread is luminous: visible, catalytic, impossible to ignore.",
  },
  {
    label: "Veilwalker",
    note: "Your random thread is subtle: observant, private, and strongest between worlds.",
  },
  {
    label: "Wildmarked",
    note: "Your random thread is feral: improvisational, resilient, and allergic to stagnation.",
  },
];

function zodiacFor(month: number, day: number): ZodiacKey {
  const marker = month * 100 + day;
  if (marker >= 321 && marker <= 419) return "aries";
  if (marker >= 420 && marker <= 520) return "taurus";
  if (marker >= 521 && marker <= 620) return "gemini";
  if (marker >= 621 && marker <= 722) return "cancer";
  if (marker >= 723 && marker <= 822) return "leo";
  if (marker >= 823 && marker <= 922) return "virgo";
  if (marker >= 923 && marker <= 1022) return "libra";
  if (marker >= 1023 && marker <= 1121) return "scorpio";
  if (marker >= 1122 && marker <= 1221) return "sagittarius";
  if (marker >= 1222 || marker <= 119) return "capricorn";
  if (marker <= 218) return "aquarius";
  return "pisces";
}

function alignmentFor(law: number, good: number): AlignmentKey {
  const order = law >= 4 ? "Lawful" : law <= -4 ? "Chaotic" : "Neutral";
  const morality = good >= 4 ? "Good" : good <= -4 ? "Evil" : "Neutral";
  if (order === "Neutral" && morality === "Neutral") return "True Neutral";
  return `${order} ${morality}` as AlignmentKey;
}

function WebGLCosmos() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: false,
      powerPreference: "high-performance",
    });
    if (!gl) return;

    const vertex = `
      attribute vec2 position;
      void main() { gl_Position = vec4(position, 0.0, 1.0); }
    `;
    const fragment = `
      precision highp float;
      uniform vec2 resolution;
      uniform vec2 pointer;
      uniform float time;

      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        return mix(mix(hash(i), hash(i + vec2(1., 0.)), f.x),
                   mix(hash(i + vec2(0., 1.)), hash(i + vec2(1.)), f.x), f.y);
      }

      float fbm(vec2 p) {
        float value = 0.0;
        float amplitude = 0.52;
        for (int i = 0; i < 5; i++) {
          value += amplitude * noise(p);
          p = p * 2.03 + 8.17;
          amplitude *= 0.48;
        }
        return value;
      }

      void main() {
        vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
        vec2 drift = vec2(time * 0.018, -time * 0.011);
        vec2 pull = (pointer - 0.5) * 0.32;
        float cloud = fbm(uv * 1.18 + drift + pull);
        float veil = fbm(uv * 2.35 - drift * 1.7);
        float radial = 1.0 - smoothstep(0.0, 1.65, length(uv + pull * 0.35));
        vec3 ink = vec3(0.008, 0.010, 0.035);
        vec3 violet = vec3(0.24, 0.055, 0.42);
        vec3 cyan = vec3(0.025, 0.30, 0.40);
        vec3 color = ink + violet * pow(cloud, 2.7) * 0.58;
        color += cyan * pow(veil, 4.0) * radial * 0.36;
        vec2 starCell = floor((uv + 4.0) * 95.0);
        float starSeed = hash(starCell);
        float star = step(0.994, starSeed) * pow(hash(starCell + 9.3), 8.0);
        color += vec3(0.55, 0.72, 1.0) * star * (0.45 + 0.55 * sin(time * 1.4 + starSeed * 18.0));
        float grain = (hash(gl_FragCoord.xy + time) - 0.5) * 0.025;
        gl_FragColor = vec4(color + grain, 0.92);
      }
    `;

    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = compile(gl.VERTEX_SHADER, vertex);
    const fs = compile(gl.FRAGMENT_SHADER, fragment);
    if (!vs || !fs) return;
    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );
    const position = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const resolution = gl.getUniformLocation(program, "resolution");
    const pointer = gl.getUniformLocation(program, "pointer");
    const time = gl.getUniformLocation(program, "time");
    const mouse = { x: 0.5, y: 0.5 };
    let frame = 0;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    const move = (event: PointerEvent) => {
      mouse.x = event.clientX / window.innerWidth;
      mouse.y = 1 - event.clientY / window.innerHeight;
    };
    const draw = (now: number) => {
      gl.uniform2f(resolution, canvas.width, canvas.height);
      gl.uniform2f(pointer, mouse.x, mouse.y);
      gl.uniform1f(time, reduced ? 4.0 : now * 0.001);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (!reduced) frame = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", move, { passive: true });
    frame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", move);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, []);

  return <canvas className="cosmos" ref={canvasRef} aria-hidden="true" />;
}

function AlignmentGrid({ active }: { active?: AlignmentKey }) {
  const cells: AlignmentKey[] = [
    "Lawful Good",
    "Neutral Good",
    "Chaotic Good",
    "Lawful Neutral",
    "True Neutral",
    "Chaotic Neutral",
    "Lawful Evil",
    "Neutral Evil",
    "Chaotic Evil",
  ];

  return (
    <div className="alignment-grid" aria-label="The nine moral alignments">
      {cells.map((cell) => (
        <div
          key={cell}
          className={`alignment-cell ${active === cell ? "is-active" : ""}`}
          aria-current={active === cell ? "true" : undefined}
        >
          <span>{cell.split(" ")[0][0]}</span>
          <span>{cell === "True Neutral" ? "N" : cell.split(" ")[1][0]}</span>
        </div>
      ))}
    </div>
  );
}

function ArrowIcon() {
  return <span aria-hidden="true">↗</span>;
}

export default function Home() {
  const [stage, setStage] = useState<Stage>("intro");
  const [question, setQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>(() =>
    createQuizSession(0x4d4f5241),
  );
  const [sessionSeed, setSessionSeed] = useState(0x4d4f5241);
  const [month, setMonth] = useState(0);
  const [day, setDay] = useState(0);
  const [copied, setCopied] = useState(false);

  const daysInMonth = month
    ? new Date(2024, month, 0).getDate()
    : 31;

  const scores = useMemo(
    () => scoreQuiz(quizQuestions, answers),
    [answers, quizQuestions],
  );

  const alignment = alignmentFor(scores.law, scores.good);
  const zodiacKey = zodiacFor(month || 1, day || 1);
  const zodiac = ZODIAC[zodiacKey];
  const seed =
    (sessionSeed +
      answers.reduce(
        (sum, value, index) => sum + (value + 1) * (index + 7),
        0,
      ) +
      month * 17 +
      day * 31) >>>
    0;
  const variant = VARIANTS[Math.abs(seed) % VARIANTS.length];
  const familiarName = zodiac.names[Math.abs(seed) % zodiac.names.length];
  const profile = ALIGNMENTS[alignment];

  const transitionTo = (update: () => void) => {
    const doc = document as Document & {
      startViewTransition?: (callback: () => void) => { finished: Promise<void> };
    };
    if (doc.startViewTransition) {
      doc.startViewTransition(update);
    } else {
      update();
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const begin = () => {
    const nextSeed = createSessionSeed();
    const nextQuestions = createQuizSession(nextSeed);
    transitionTo(() => {
      setSessionSeed(nextSeed);
      setQuizQuestions(nextQuestions);
      setAnswers([]);
      setQuestion(0);
      setCopied(false);
      setStage("quiz");
    });
  };

  const answer = (choiceIndex: number) => {
    const next = [...answers.slice(0, question), choiceIndex];
    setAnswers(next);
    if (question === quizQuestions.length - 1) {
      transitionTo(() => setStage("birth"));
    } else {
      transitionTo(() => setQuestion((current) => current + 1));
    }
  };

  const goBack = () => {
    if (stage === "birth") {
      transitionTo(() => {
        setStage("quiz");
        setQuestion(quizQuestions.length - 1);
      });
      return;
    }
    if (stage === "quiz" && question > 0) {
      transitionTo(() => setQuestion((current) => current - 1));
      return;
    }
    transitionTo(() => setStage("intro"));
  };

  const reveal = () => {
    if (!month || !day) return;
    transitionTo(() => setStage("result"));
  };

  const copyResult = async () => {
    const text = `I am ${alignment} × ${zodiac.label}. My celestial familiar is ${familiarName}, the ${variant.label} ${zodiac.animal}.`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <main
      className="experience"
      data-stage={stage}
      style={
        stage === "result"
          ? ({
              "--accent": profile.accent,
              "--accent-2": profile.accent2,
            } as React.CSSProperties)
          : undefined
      }
    >
      <WebGLCosmos />
      <div className="grain" aria-hidden="true" />

      <header className="site-header">
        <button
          className="brand"
          onClick={() => transitionTo(() => setStage("intro"))}
          aria-label="Moralis home"
        >
          <span className="brand-mark" aria-hidden="true">
            ◇
          </span>
          <span>MORALIS</span>
        </button>
        <div className="header-meta">
          <span>D&amp;D alignment × zodiac</span>
          <span className="live-dot" aria-hidden="true" />
          <span>Familiar engine v2</span>
        </div>
      </header>

      {stage === "intro" && (
        <section className="intro stage-panel" aria-labelledby="intro-title">
          <div className="intro-copy">
            <p className="kicker">
              An interactive moral divination <span>•</span> 03 minutes
            </p>
            <h1 id="intro-title">
              What shape
              <br />
              does your <em>soul</em> take?
            </h1>
            <p className="intro-deck">
              Ten impossible choices, drawn from a shifting bank of thirty. One
              birth date. A celestial animal familiar forged from your ethics,
              your stars, and one thread of beautiful chance.
            </p>
            <button className="primary-cta" onClick={begin}>
              <span>Begin the divination</span>
              <ArrowIcon />
            </button>
            <p className="privacy-note">
              No account. No year of birth. Nothing leaves your browser.
            </p>
          </div>

          <div className="intro-oracle" aria-label="Preview of a celestial familiar">
            <div className="orbit orbit-one" aria-hidden="true" />
            <div className="orbit orbit-two" aria-hidden="true" />
            <div className="oracle-card">
              <Image
                src={`${BASE_PATH}/avatars/aquarius.png`}
                alt="An anime-style celestial heron surrounded by water and stars"
                fill
                priority
                sizes="(max-width: 760px) 86vw, 32vw"
              />
              <div className="oracle-sheen" aria-hidden="true" />
              <div className="oracle-caption">
                <span>Specimen 11 / 12</span>
                <strong>The Aether Heron</strong>
                <small>Alignment unresolved</small>
              </div>
            </div>
            <div className="oracle-stamp" aria-hidden="true">
              <span>ETHICS</span>
              <b>×</b>
              <span>ASTRA</span>
            </div>
          </div>

          <aside className="intro-index">
            <span>01</span>
            <i />
            <span>Awaken</span>
          </aside>
        </section>
      )}

      {stage === "quiz" && (
        <section className="quiz stage-panel" aria-labelledby="question-title">
          <div className="quiz-rail">
            <button className="text-button" onClick={goBack}>
              ← Back
            </button>
            <div className="progress-copy">
              <span>
                Question {String(question + 1).padStart(2, "0")} /{" "}
                {quizQuestions.length}
              </span>
              <strong>
                {Math.round(((question + 1) / quizQuestions.length) * 100)}%
              </strong>
            </div>
            <div className="progress-track" aria-hidden="true">
              <i
                style={{
                  width: `${((question + 1) / quizQuestions.length) * 100}%`,
                }}
              />
            </div>
            <p>
              Choose the response closest to your instinct—not the one that
              sounds most virtuous.
            </p>
          </div>

          <div className="question-wrap">
            <p className="kicker">{quizQuestions[question].eyebrow}</p>
            <h2 id="question-title">{quizQuestions[question].prompt}</h2>
            <div className="choice-list">
              {quizQuestions[question].choices.map((choice, index) => (
                <button
                  className={`choice-card ${
                    answers[question] === index ? "is-selected" : ""
                  }`}
                  key={choice.label}
                  onClick={() => answer(index)}
                  aria-pressed={answers[question] === index}
                >
                  <span className="choice-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="choice-content">
                    <strong>{choice.label}</strong>
                    <small>{choice.detail}</small>
                  </span>
                  <span className="choice-arrow" aria-hidden="true">
                    →
                  </span>
                </button>
              ))}
            </div>
          </div>

          <aside className="alignment-preview">
            <span>Signal forming</span>
            <AlignmentGrid />
            <small>
              Order / freedom
              <br />
              altruism / self
            </small>
          </aside>
        </section>
      )}

      {stage === "birth" && (
        <section className="birth stage-panel" aria-labelledby="birth-title">
          <button className="text-button birth-back" onClick={goBack}>
            ← Back
          </button>
          <div className="birth-constellation" aria-hidden="true">
            <span>♈</span>
            <span>♊</span>
            <span>♌</span>
            <span>♎</span>
            <span>♐</span>
            <span>♒</span>
          </div>
          <div className="birth-card">
            <p className="kicker">The celestial coordinate</p>
            <h2 id="birth-title">
              Now, lend us
              <br />
              your <em>stars.</em>
            </h2>
            <p>
              We only need your month and day to find your zodiac sign. Your
              birth year is neither asked for nor stored.
            </p>
            <div className="date-fields">
              <label>
                <span>Month</span>
                <select
                  value={month}
                  onChange={(event) => {
                    const nextMonth = Number(event.target.value);
                    const maxDay = nextMonth
                      ? new Date(2024, nextMonth, 0).getDate()
                      : 31;
                    setMonth(nextMonth);
                    setDay((current) => Math.min(current, maxDay));
                  }}
                >
                  <option value={0}>Select month</option>
                  {MONTHS.map((name, index) => (
                    <option value={index + 1} key={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                <span>Day</span>
                <select
                  value={day}
                  onChange={(event) => setDay(Number(event.target.value))}
                >
                  <option value={0}>Select day</option>
                  {Array.from({ length: daysInMonth }, (_, index) => (
                    <option value={index + 1} key={index + 1}>
                      {index + 1}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <button
              className="primary-cta reveal-cta"
              onClick={reveal}
              disabled={!month || !day}
            >
              <span>Reveal my familiar</span>
              <ArrowIcon />
            </button>
          </div>
          <div className="birth-note">
            <span className="zodiac-glyph">
              {month && day ? zodiac.glyph : "✦"}
            </span>
            <div>
              <small>Detected sign</small>
              <strong>{month && day ? zodiac.label : "Awaiting date"}</strong>
            </div>
          </div>
        </section>
      )}

      {stage === "result" && (
        <section className="result stage-panel" aria-labelledby="result-title">
          <div className="result-heading">
            <p className="kicker">The reading is complete</p>
            <h1 id="result-title">
              {familiarName}
              <em>has found you.</em>
            </h1>
          </div>

          <div className="familiar-portrait">
            <div className="portrait-halo" aria-hidden="true" />
            <Image
              src={`${BASE_PATH}/avatars/${zodiacKey}.png`}
              alt={`Anime-style celestial ${zodiac.animal}, the familiar for ${zodiac.label}`}
              fill
              priority
              sizes="(max-width: 760px) 100vw, (max-width: 1050px) 38vw, 29vw"
            />
            <div className="portrait-vignette" aria-hidden="true" />
            <span className="portrait-glyph" aria-hidden="true">
              {zodiac.glyph}
            </span>
            <div className="portrait-label">
              <small>Celestial familiar</small>
              <strong>{zodiac.animal}</strong>
            </div>
          </div>

          <div className="result-dossier">
            <div className="identity-line">
              <span>{alignment}</span>
              <i>×</i>
              <span>{zodiac.label}</span>
              <i>×</i>
              <span>{variant.label}</span>
            </div>
            <h2>{profile.title}</h2>
            <p className="profile-short">{profile.short}</p>
            <p className="profile-story">
              {profile.story} Your {zodiac.label} familiar adds{" "}
              {zodiac.essence}. {variant.note}
            </p>

            <div className="axis-readout">
              <div>
                <span>Order</span>
                <i>
                  <b
                    style={{
                      left: `${Math.max(5, Math.min(95, 50 - scores.law * 2.25))}%`,
                    }}
                  />
                </i>
                <span>Freedom</span>
              </div>
              <div>
                <span>Self</span>
                <i>
                  <b
                    style={{
                      left: `${Math.max(5, Math.min(95, 50 + scores.good * 2.25))}%`,
                    }}
                  />
                </i>
                <span>Others</span>
              </div>
            </div>

            <div className="result-actions">
              <button className="primary-cta" onClick={copyResult}>
                <span>{copied ? "Copied to your stars" : "Copy my result"}</span>
                <ArrowIcon />
              </button>
              <button className="text-button" onClick={begin}>
                Read another fate
              </button>
            </div>
          </div>

          <div className="result-grid-card">
            <span>Your moral coordinate</span>
            <AlignmentGrid active={alignment} />
            <strong>{alignment}</strong>
          </div>

          <footer className="result-footer">
            <span>MORALIS / Celestial familiar no. {String((seed % 89) + 10).padStart(2, "0")}</span>
            <span>Made from choices, stars &amp; chance</span>
          </footer>
        </section>
      )}

      <div className="corner-coordinate" aria-hidden="true">
        <span>39.7392° N</span>
        <span>104.9903° W</span>
      </div>
    </main>
  );
}
