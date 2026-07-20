export type Choice = {
  label: string;
  detail: string;
  law: number;
  good: number;
};

export type QuestionAxis = "law" | "good" | "mixed";

export type QuizQuestion = {
  id: string;
  axis: QuestionAxis;
  eyebrow: string;
  prompt: string;
  choices: Choice[];
};

export const QUIZ_LENGTH = 10;

const QUESTION_BANK: QuizQuestion[] = [
  {
    id: "borrowed-key",
    axis: "law",
    eyebrow: "The borrowed key",
    prompt:
      "You find a master key that opens every locked door in your city. What do you do first?",
    choices: [
      {
        label: "Turn it in",
        detail: "Power this broad needs accountable hands, not a private pocket.",
        law: 2,
        good: 1,
      },
      {
        label: "Use it once",
        detail: "Someone is trapped behind a door the authorities refuse to open.",
        law: -1,
        good: 2,
      },
      {
        label: "Keep the advantage",
        detail: "A door is simply an opportunity with hinges.",
        law: -2,
        good: -2,
      },
    ],
  },
  {
    id: "public-lie",
    axis: "law",
    eyebrow: "The public lie",
    prompt:
      "A beloved leader built peace on a lie. Revealing it could fracture the city.",
    choices: [
      {
        label: "Tell everyone",
        detail: "People deserve the truth, even when it arrives like a storm.",
        law: -1,
        good: 1,
      },
      {
        label: "Protect the peace",
        detail: "Stability is a public good; disclose it carefully, if ever.",
        law: 2,
        good: 1,
      },
      {
        label: "Trade the secret",
        detail: "Truth has value. Spend it where it buys the most power.",
        law: 0,
        good: -2,
      },
    ],
  },
  {
    id: "fallen-rival",
    axis: "good",
    eyebrow: "The fallen rival",
    prompt:
      "Your fiercest rival is injured at the edge of a dangerous wilderness.",
    choices: [
      {
        label: "Carry them home",
        detail: "No contest is worth a life, and mercy settles its own score.",
        law: 0,
        good: 2,
      },
      {
        label: "Leave supplies",
        detail: "Give them a fair chance, but do not inherit their consequences.",
        law: 0,
        good: 0,
      },
      {
        label: "Walk away",
        detail: "They would not save you. The wilderness can decide.",
        law: -1,
        good: -2,
      },
    ],
  },
  {
    id: "unjust-statute",
    axis: "mixed",
    eyebrow: "The unjust statute",
    prompt:
      "A new law is legal, popular, and quietly cruel to a powerless minority.",
    choices: [
      {
        label: "Fight through the system",
        detail: "Build a coalition, challenge it in court, and make reform last.",
        law: 2,
        good: 2,
      },
      {
        label: "Break it openly",
        detail: "An unjust law deserves visible defiance, consequences included.",
        law: -2,
        good: 2,
      },
      {
        label: "Exploit the loophole",
        detail: "If the law is a weapon, learn to aim it before anyone aims at you.",
        law: 1,
        good: -2,
      },
    ],
  },
  {
    id: "last-seat",
    axis: "good",
    eyebrow: "The last seat",
    prompt:
      "A rescue craft has one seat left. Three strangers reach it at once.",
    choices: [
      {
        label: "Use a fair draw",
        detail: "No life is inherently worth more; chance can carry the burden.",
        law: 1,
        good: 1,
      },
      {
        label: "Choose the most vulnerable",
        detail: "Need, not status, should decide who receives protection.",
        law: -1,
        good: 2,
      },
      {
        label: "Take the seat",
        detail: "Someone will choose themselves. Better that it is you.",
        law: -1,
        good: -2,
      },
    ],
  },
  {
    id: "oath",
    axis: "law",
    eyebrow: "The oath",
    prompt:
      "You swore never to reveal a friend’s secret. Keeping it now may hurt an innocent person.",
    choices: [
      {
        label: "Keep the oath",
        detail: "Trust means little if it disappears the moment it becomes costly.",
        law: 2,
        good: -1,
      },
      {
        label: "Break it",
        detail: "Promises exist to protect people, not to become shields for harm.",
        law: -2,
        good: 2,
      },
      {
        label: "Force a confession",
        detail: "Honor the words of the oath while making silence impossible.",
        law: 1,
        good: 0,
      },
    ],
  },
  {
    id: "impossible-cure",
    axis: "good",
    eyebrow: "The impossible cure",
    prompt:
      "You can save thousands with a cure stolen from the scientist who created it.",
    choices: [
      {
        label: "Negotiate first",
        detail: "Respect the creator, mobilize pressure, and exhaust lawful paths.",
        law: 2,
        good: 1,
      },
      {
        label: "Release it freely",
        detail: "No one owns the right to keep thousands alive.",
        law: -2,
        good: 2,
      },
      {
        label: "Sell it yourself",
        detail: "Risk deserves reward, especially when the product is priceless.",
        law: -1,
        good: -2,
      },
    ],
  },
  {
    id: "empty-throne",
    axis: "mixed",
    eyebrow: "The empty throne",
    prompt:
      "By accident, you become the only person able to command a powerful kingdom.",
    choices: [
      {
        label: "Build institutions",
        detail: "Make the kingdom just, then make yourself unnecessary.",
        law: 2,
        good: 2,
      },
      {
        label: "Dissolve the throne",
        detail: "No single person should hold this power—not even a good one.",
        law: -2,
        good: 1,
      },
      {
        label: "Rule without apology",
        detail: "Power unused is merely power waiting for a less capable hand.",
        law: 1,
        good: -2,
      },
    ],
  },
  {
    id: "hungry-crowd",
    axis: "mixed",
    eyebrow: "The hungry crowd",
    prompt:
      "A merchant hoards food during a famine while families starve outside.",
    choices: [
      {
        label: "Seize and distribute it",
        detail: "Property ends where preventable suffering begins.",
        law: -2,
        good: 2,
      },
      {
        label: "Compel a legal sale",
        detail: "Use emergency authority and preserve an accountable process.",
        law: 2,
        good: 1,
      },
      {
        label: "Guard the warehouse",
        detail: "Scarcity rewards whoever can defend what they have.",
        law: 1,
        good: -2,
      },
    ],
  },
  {
    id: "story-told",
    axis: "mixed",
    eyebrow: "The story told of you",
    prompt:
      "At the end of your legend, which sentence would you most want to be true?",
    choices: [
      {
        label: "They made the world kinder",
        detail: "Your strength became shelter, especially for people unlike you.",
        law: 0,
        good: 2,
      },
      {
        label: "They never bent",
        detail: "Your principles endured pressure, temptation, and time.",
        law: 2,
        good: 0,
      },
      {
        label: "They were never controlled",
        detail: "No law, ruler, custom, or fear ever wrote your path for you.",
        law: -2,
        good: 0,
      },
    ],
  },
  {
    id: "city-curfew",
    axis: "law",
    eyebrow: "The midnight curfew",
    prompt:
      "A strict curfew lowers crime but makes ordinary life harder for an entire district.",
    choices: [
      {
        label: "Demand formal review",
        detail: "Emergency rules need evidence, limits, and accountable oversight.",
        law: 2,
        good: 1,
      },
      {
        label: "Organize mass defiance",
        detail: "A city cannot call collective punishment public safety.",
        law: -2,
        good: 2,
      },
      {
        label: "Buy an exemption",
        detail: "Every rule has a price if you know the right official.",
        law: -1,
        good: -2,
      },
    ],
  },
  {
    id: "runaway-construct",
    axis: "law",
    eyebrow: "The runaway construct",
    prompt:
      "A newly sentient clockwork servant asks you to hide it from its legal owner.",
    choices: [
      {
        label: "Petition for its freedom",
        detail: "Personhood should be recognized through a process others must honor.",
        law: 2,
        good: 2,
      },
      {
        label: "Cut its tracking rune",
        detail: "Freedom does not need permission from the person claiming ownership.",
        law: -2,
        good: 2,
      },
      {
        label: "Return it for a reward",
        detail: "Ownership is clear, and sentiment does not pay nearly as well.",
        law: 2,
        good: -2,
      },
    ],
  },
  {
    id: "inherited-office",
    axis: "law",
    eyebrow: "The inherited office",
    prompt:
      "An ancient charter unexpectedly grants you authority over a town you have never visited.",
    choices: [
      {
        label: "Serve provisionally",
        detail: "Keep the town stable while arranging a legitimate local election.",
        law: 2,
        good: 1,
      },
      {
        label: "Burn the charter",
        detail: "No dead ancestor gets to choose who commands the living.",
        law: -2,
        good: 1,
      },
      {
        label: "Collect what is owed",
        detail: "If tradition grants the title, tradition can fund your ambitions.",
        law: 1,
        good: -2,
      },
    ],
  },
  {
    id: "guild-strike",
    axis: "law",
    eyebrow: "The broken contract",
    prompt:
      "A guild breaks its contract and strikes after working conditions become dangerous.",
    choices: [
      {
        label: "Arbitrate immediately",
        detail: "Suspend the contract, protect the workers, and bind both sides to review.",
        law: 2,
        good: 2,
      },
      {
        label: "Help blockade the guildhall",
        detail: "Rules that demand obedience through danger have voided themselves.",
        law: -2,
        good: 1,
      },
      {
        label: "Hire replacements",
        detail: "A broken promise is an opening for someone less sentimental.",
        law: 1,
        good: -2,
      },
    ],
  },
  {
    id: "forbidden-archive",
    axis: "law",
    eyebrow: "The forbidden archive",
    prompt:
      "The royal archive contains banned histories that could undermine the crown.",
    choices: [
      {
        label: "Seek lawful release",
        detail: "Truth lasts longer when institutions cannot dismiss how it surfaced.",
        law: 2,
        good: 1,
      },
      {
        label: "Copy everything tonight",
        detail: "Knowledge imprisoned by power should escape by any available door.",
        law: -2,
        good: 1,
      },
      {
        label: "Sell selected pages",
        detail: "A dangerous truth is most useful when scarcity raises its value.",
        law: -1,
        good: -2,
      },
    ],
  },
  {
    id: "captains-order",
    axis: "law",
    eyebrow: "The captain’s order",
    prompt:
      "Your commander orders a retreat that will abandon civilians but save the unit.",
    choices: [
      {
        label: "Challenge the order",
        detail: "Use the chain of command, demand alternatives, and document the cost.",
        law: 2,
        good: 2,
      },
      {
        label: "Disobey and evacuate",
        detail: "Rank cannot make abandoned lives acceptable.",
        law: -2,
        good: 2,
      },
      {
        label: "Retreat without debate",
        detail: "Orders exist so responsibility belongs to someone else.",
        law: 2,
        good: -2,
      },
    ],
  },
  {
    id: "gate-bribe",
    axis: "law",
    eyebrow: "The sealed gate",
    prompt:
      "A guard offers to ignore quarantine rules if you pay enough to leave the city.",
    choices: [
      {
        label: "Report the guard",
        detail: "Rules protecting thousands cannot survive private exceptions.",
        law: 2,
        good: 1,
      },
      {
        label: "Escape another way",
        detail: "No guard owns your movement, but you will not fund corruption.",
        law: -2,
        good: 0,
      },
      {
        label: "Pay and sell the route",
        detail: "If the gate has a price, information about it should too.",
        law: -1,
        good: -2,
      },
    ],
  },
  {
    id: "village-medicine",
    axis: "good",
    eyebrow: "The winter medicine",
    prompt:
      "You have enough rare medicine for yourself or for two gravely ill strangers.",
    choices: [
      {
        label: "Give them both doses",
        detail: "Two lives protected outweigh the fear of what may happen to you.",
        law: 0,
        good: 2,
      },
      {
        label: "Keep one and draw lots",
        detail: "Compassion need not require pretending your own life is worthless.",
        law: 1,
        good: 0,
      },
      {
        label: "Keep it all",
        detail: "Their misfortune does not create an obligation in your blood.",
        law: 0,
        good: -2,
      },
    ],
  },
  {
    id: "dangerous-refugee",
    axis: "good",
    eyebrow: "The marked refugee",
    prompt:
      "A hunted stranger seeks shelter, but hiding them could endanger your household.",
    choices: [
      {
        label: "Hide them",
        detail: "Safety means little if it ends precisely where courage becomes costly.",
        law: -1,
        good: 2,
      },
      {
        label: "Find safer passage",
        detail: "Help them escape without making every person under your roof a target.",
        law: 1,
        good: 1,
      },
      {
        label: "Turn them away",
        detail: "Your household comes first; strangers must carry their own risks.",
        law: 0,
        good: -2,
      },
    ],
  },
  {
    id: "scarce-water",
    axis: "good",
    eyebrow: "The last waterskin",
    prompt:
      "Your expedition is lost, and another traveler has run out of water.",
    choices: [
      {
        label: "Share equally",
        detail: "Survival is uncertain, but dignity does not need to be.",
        law: 0,
        good: 2,
      },
      {
        label: "Trade measured sips",
        detail: "Aid them while protecting the supplies your group depends on.",
        law: 1,
        good: 0,
      },
      {
        label: "Conceal your supply",
        detail: "Their desperation becomes your danger the moment they see it.",
        law: -1,
        good: -2,
      },
    ],
  },
  {
    id: "guilty-sibling",
    axis: "good",
    eyebrow: "The blood debt",
    prompt:
      "You learn that your sibling ruined an innocent person’s life years ago.",
    choices: [
      {
        label: "Make restitution possible",
        detail: "Protect neither secrecy nor punishment—center the person who was harmed.",
        law: 1,
        good: 2,
      },
      {
        label: "Demand a confession",
        detail: "Love does not exempt anyone from owning what they did.",
        law: 2,
        good: 1,
      },
      {
        label: "Bury the evidence",
        detail: "Blood is permanent; everyone else is negotiable.",
        law: -1,
        good: -2,
      },
    ],
  },
  {
    id: "painful-memory",
    axis: "good",
    eyebrow: "The merciful spell",
    prompt:
      "You can erase a grieving friend’s worst memory, but they cannot consent right now.",
    choices: [
      {
        label: "Stay beside them",
        detail: "Care means helping them endure, not rewriting them without permission.",
        law: 1,
        good: 2,
      },
      {
        label: "Erase only the pain",
        detail: "Mercy sometimes acts before suffering can ask for it.",
        law: -1,
        good: 1,
      },
      {
        label: "Keep the spell as leverage",
        detail: "People pay dearly for relief once they understand its price.",
        law: 0,
        good: -2,
      },
    ],
  },
  {
    id: "enemys-child",
    axis: "good",
    eyebrow: "The enemy’s child",
    prompt:
      "The child of a defeated warlord is left alone in the burning stronghold.",
    choices: [
      {
        label: "Carry them to safety",
        detail: "No child inherits guilt, allegiance, or deserved suffering.",
        law: 0,
        good: 2,
      },
      {
        label: "Leave them with witnesses",
        detail: "Ensure their rescue without personally accepting the danger.",
        law: 1,
        good: 0,
      },
      {
        label: "Leave no future rival",
        detail: "Mercy today may simply arm vengeance tomorrow.",
        law: -1,
        good: -2,
      },
    ],
  },
  {
    id: "final-wish",
    axis: "good",
    eyebrow: "The final wish",
    prompt:
      "A dying stranger asks you to deliver a letter across a dangerous border.",
    choices: [
      {
        label: "Carry it yourself",
        detail: "A promise to the powerless matters most when nobody can enforce it.",
        law: 1,
        good: 2,
      },
      {
        label: "Find a trusted courier",
        detail: "Honor the request without confusing sacrifice with sincerity.",
        law: 1,
        good: 1,
      },
      {
        label: "Search it for valuables",
        detail: "The dead cannot reward good intentions, but secrets still can.",
        law: -1,
        good: -2,
      },
    ],
  },
  {
    id: "sentient-weapon",
    axis: "mixed",
    eyebrow: "The sentient blade",
    prompt:
      "A legendary weapon promises victory but demands control over whoever wields it.",
    choices: [
      {
        label: "Seal it under guard",
        detail: "Dangerous power needs rules, witnesses, and distance from temptation.",
        law: 2,
        good: 1,
      },
      {
        label: "Free its trapped spirit",
        detail: "Destroy the weapon’s purpose even if the coming battle becomes harder.",
        law: -2,
        good: 2,
      },
      {
        label: "Accept the bargain",
        detail: "Control is only frightening when someone weaker holds it.",
        law: -1,
        good: -2,
      },
    ],
  },
  {
    id: "dragon-pact",
    axis: "mixed",
    eyebrow: "The dragon’s peace",
    prompt:
      "A dragon will protect the valley if each village pays a harsh annual tribute.",
    choices: [
      {
        label: "Write a binding pact",
        detail: "Limit the tribute, protect the villages, and make every obligation explicit.",
        law: 2,
        good: 1,
      },
      {
        label: "Unite the villages to resist",
        detail: "Safety purchased through permanent submission is another kind of ruin.",
        law: -2,
        good: 2,
      },
      {
        label: "Collect more than required",
        detail: "Fear makes an excellent tax collector and an even better disguise.",
        law: 1,
        good: -2,
      },
    ],
  },
  {
    id: "rebel-sabotage",
    axis: "mixed",
    eyebrow: "The rebel signal",
    prompt:
      "Sabotaging a military bridge could end an occupation but strand nearby civilians.",
    choices: [
      {
        label: "Delay for evacuation",
        detail: "A just objective does not make avoidable victims invisible.",
        law: 0,
        good: 2,
      },
      {
        label: "Strike on schedule",
        detail: "Rebellion fails when every imposed rule dictates its timing.",
        law: -2,
        good: 0,
      },
      {
        label: "Warn both sides for payment",
        detail: "Loyalty is less useful than being valuable to everyone.",
        law: -1,
        good: -2,
      },
    ],
  },
  {
    id: "prophetic-arrest",
    axis: "mixed",
    eyebrow: "The prophecy of harm",
    prompt:
      "An infallible oracle says a harmless citizen will commit a terrible crime next year.",
    choices: [
      {
        label: "Protect and monitor them",
        detail: "Prevent harm through accountable safeguards without punishing the innocent.",
        law: 2,
        good: 1,
      },
      {
        label: "Tell them and reject fate",
        detail: "No prophecy gets to replace a person’s freedom to choose.",
        law: -2,
        good: 2,
      },
      {
        label: "Remove them quietly",
        detail: "Certainty turns morality into a question of efficient timing.",
        law: 1,
        good: -2,
      },
    ],
  },
  {
    id: "crystal-surveillance",
    axis: "mixed",
    eyebrow: "The watching crystal",
    prompt:
      "A magical network can prevent most violence by watching every citizen constantly.",
    choices: [
      {
        label: "Authorize narrow warrants",
        detail: "Safety needs evidence, limits, appeal, and someone watching the watchers.",
        law: 2,
        good: 1,
      },
      {
        label: "Shatter the network",
        detail: "A peaceful cage is still a cage, and power this total will spread.",
        law: -2,
        good: 1,
      },
      {
        label: "Take control in secret",
        detail: "Perfect information should belong to the person best able to use it.",
        law: -1,
        good: -2,
      },
    ],
  },
  {
    id: "defeated-tyrant",
    axis: "mixed",
    eyebrow: "The defeated tyrant",
    prompt:
      "The ruler who terrorized your country surrenders personally to you.",
    choices: [
      {
        label: "Deliver a public trial",
        detail: "Justice must become a standard, not merely the victor’s preference.",
        law: 2,
        good: 1,
      },
      {
        label: "Let the survivors decide",
        detail: "Those who carried the suffering should shape what accountability means.",
        law: -1,
        good: 1,
      },
      {
        label: "Offer protection for secrets",
        detail: "A fallen tyrant may still be worth more alive and indebted.",
        law: 0,
        good: -2,
      },
    ],
  },
];

const DRAW_BY_AXIS: Record<QuestionAxis, number> = {
  law: 4,
  good: 4,
  mixed: 2,
};

function mulberry32(seed: number) {
  let value = seed >>> 0;
  return () => {
    value += 0x6d2b79f5;
    let result = value;
    result = Math.imul(result ^ (result >>> 15), result | 1);
    result ^= result + Math.imul(result ^ (result >>> 7), result | 61);
    return ((result ^ (result >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffled<T>(items: readonly T[], random: () => number): T[] {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const target = Math.floor(random() * (index + 1));
    [result[index], result[target]] = [result[target], result[index]];
  }
  return result;
}

export function createSessionSeed(): number {
  const values = new Uint32Array(1);
  if (globalThis.crypto?.getRandomValues) {
    globalThis.crypto.getRandomValues(values);
    return values[0];
  }
  return (Date.now() ^ Math.floor(Math.random() * 0xffffffff)) >>> 0;
}

export function createQuizSession(seed: number): QuizQuestion[] {
  const random = mulberry32(seed);
  const selected = (Object.keys(DRAW_BY_AXIS) as QuestionAxis[]).flatMap((axis) =>
    shuffled(
      QUESTION_BANK.filter((question) => question.axis === axis),
      random,
    ).slice(0, DRAW_BY_AXIS[axis]),
  );

  return shuffled(selected, random).map((question) => ({
    ...question,
    choices: shuffled(question.choices, random),
  }));
}

export function scoreQuiz(questions: QuizQuestion[], answers: number[]) {
  return answers.reduce(
    (total, choiceIndex, index) => {
      const choice = questions[index]?.choices[choiceIndex];
      if (choice) {
        total.law += choice.law;
        total.good += choice.good;
      }
      return total;
    },
    { law: 0, good: 0 },
  );
}

export function getQuestionBankSummary() {
  return {
    total: QUESTION_BANK.length,
    axes: (Object.keys(DRAW_BY_AXIS) as QuestionAxis[]).reduce(
      (summary, axis) => {
        summary[axis] = QUESTION_BANK.filter(
          (question) => question.axis === axis,
        ).length;
        return summary;
      },
      { law: 0, good: 0, mixed: 0 },
    ),
    draw: { ...DRAW_BY_AXIS },
  };
}
