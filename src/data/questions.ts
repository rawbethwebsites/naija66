export interface Question {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  realStory: {
    fact: string;
    date: string;
    source: string;
    sourceUrl: string;
  };
  zone: string;
  difficulty: "easy" | "medium" | "hard";
}

export const QUESTIONS: Question[] = [
  {
    id: "q1",
    question:
      "How many kilograms of jollof rice were cooked to set a Guinness World Record in Lagos in September 2025?",
    options: ["5,000 kg", "8,780 kg", "12,500 kg", "6,200 kg"],
    correctIndex: 1,
    realStory: {
      fact: "Hilda Baci's team and Gino partnered to cook 8,780 kg of jollof rice, serving over 16,600 portions at the event in Lagos.",
      date: "September 2025",
      source: "Guinness World Records",
      sourceUrl: "https://www.guinnessworldrecords.com",
    },
    zone: "south-west",
    difficulty: "easy",
  },
  {
    id: "q2",
    question:
      "How many people attended the single-screening record-breaking Nollywood film event in Lagos?",
    options: ["25,000", "38,400", "51,258", "44,100"],
    correctIndex: 2,
    realStory: {
      fact: "The Nollywood film 'Black Market' set a Guinness World Record with 51,258 attendees at a single Lagos screening.",
      date: "September 26, 2026",
      source: "Guinness World Records",
      sourceUrl: "https://www.guinnessworldrecords.com",
    },
    zone: "south-west",
    difficulty: "medium",
  },
  {
    id: "q3",
    question:
      "Which Nigerian women's football team won the 2026 WAFU-B Champions League on penalties?",
    options: [
      "Bayelsa Queens",
      "Rivers Angels",
      "Edo Queens",
      "Nasarawa Amazons",
    ],
    correctIndex: 2,
    realStory: {
      fact: "Edo Queens won both the 2025/26 NWFL Premier League and the 2026 WAFU-B Women's Champions League final on penalties.",
      date: "2026",
      source: "WAFU-B",
      sourceUrl: "https://www.wafu-b.com",
    },
    zone: "south-south",
    difficulty: "easy",
  },
  {
    id: "q4",
    question:
      "What did students at GTC Ikotun build that won a 2026 innovation challenge?",
    options: [
      "A water purification drone",
      "A solar-powered teaching robot",
      "An AI-powered translator",
      "A portable medical scanner",
    ],
    correctIndex: 1,
    realStory: {
      fact: "Students at Government Technical College Ikotun won a 2026 Kids Innovation Challenge with 'Smarteach', a solar-powered teaching robot designed for off-grid communities.",
      date: "2026",
      source: "Kids Innovation Challenge",
      sourceUrl: "https://www.kidsinnovationchallenge.org",
    },
    zone: "south-west",
    difficulty: "easy",
  },
  {
    id: "q5",
    question:
      "Rachel Ikemeh won a Rolex Award for her conservation work protecting which animal in the Niger Delta?",
    options: [
      "Forest elephant",
      "Nigerian-Cameroon chimpanzee",
      "Niger Delta red colobus monkey",
      "West African manatee",
    ],
    correctIndex: 2,
    realStory: {
      fact: "Rachel Ikemeh received a Rolex Award for Enterprise for her community-led conservation of the Niger Delta red colobus monkey, doubling the population within one protected forest between 2021 and 2024.",
      date: "2024",
      source: "Rolex Awards for Enterprise",
      sourceUrl: "https://www.rolex.org",
    },
    zone: "south-south",
    difficulty: "medium",
  },
  {
    id: "q6",
    question:
      "What was Nigeria's GDP growth rate that made it one of the fastest-growing economies in Africa?",
    options: ["2.15%", "3.89%", "4.43%", "5.02%"],
    correctIndex: 2,
    realStory: {
      fact: "Nigeria recorded a 4.43% GDP growth rate. Note: economic growth does not automatically translate to reduced hardship for individuals.",
      date: "2025",
      source: "National Bureau of Statistics",
      sourceUrl: "https://www.nigerianstat.gov.ng",
    },
    zone: "north-central",
    difficulty: "hard",
  },
  {
    id: "q7",
    question:
      "How many Nigerian children were vaccinated in the campaign targeting variant polio by October 2025?",
    options: [
      "12.5 million",
      "25 million",
      "38.5 million",
      "50 million",
    ],
    correctIndex: 2,
    realStory: {
      fact: "By October 30, 2025, approximately 38.5 million children had been vaccinated against variant polio in Nigeria's nationwide campaign.",
      date: "October 30, 2025",
      source: "WHO Nigeria",
      sourceUrl: "https://www.afro.who.int",
    },
    zone: "north-central",
    difficulty: "hard",
  },
  {
    id: "q8",
    question:
      "Nigeria is home to how many of Africa's five largest tech startup ecosystems?",
    options: ["1", "2", "3", "4"],
    correctIndex: 0,
    realStory: {
      fact: "Lagos is consistently ranked among Africa's top tech startup ecosystems, attracting significant venture capital investment and producing several unicorn companies.",
      date: "2025",
      source: "Partech Africa",
      sourceUrl: "https://www.partechpartners.com",
    },
    zone: "south-west",
    difficulty: "medium",
  },
  {
    id: "q9",
    question:
      "Which Nigerian city hosted the record-breaking single film screening of 'Black Market'?",
    options: ["Abuja", "Lagos", "Port Harcourt", "Ibadan"],
    correctIndex: 1,
    realStory: {
      fact: "Lagos hosted the Guinness World Record screening of 'Black Market' at Tafawa Balewa Square, welcoming 51,258 attendees in a single screening event.",
      date: "September 26, 2026",
      source: "Guinness World Records",
      sourceUrl: "https://www.guinnessworldrecords.com",
    },
    zone: "south-west",
    difficulty: "easy",
  },
  {
    id: "q10",
    question:
      "In what ecosystem did Rachel Ikemeh conduct her red colobus monkey conservation work?",
    options: [
      "Sahel savanna",
      "Jos Plateau highlands",
      "Niger Delta mangroves",
      "Obudu mountain forests",
    ],
    correctIndex: 2,
    realStory: {
      fact: "Rachel Ikemeh spent years working in the Niger Delta mangrove forests, building community-led conservation programs to protect the red colobus monkey.",
      date: "2021–2024",
      source: "Rolex Awards for Enterprise",
      sourceUrl: "https://www.rolex.org",
    },
    zone: "south-south",
    difficulty: "medium",
  },
  {
    id: "q11",
    question:
      "What was the name of the solar-powered robot built by GTC Ikotun students?",
    options: ["EduBot", "Smarteach", "SolarMind", "TeachBeam"],
    correctIndex: 1,
    realStory: {
      fact: "The robot was named 'Smarteach' and was designed to function as a teaching assistant in schools without reliable electricity.",
      date: "2026",
      source: "Kids Innovation Challenge",
      sourceUrl: "https://www.kidsinnovationchallenge.org",
    },
    zone: "south-west",
    difficulty: "easy",
  },
  {
    id: "q12",
    question:
      "How many portions of jollof rice were served at the Guinness World Record event?",
    options: ["8,000+", "12,400+", "16,600+", "20,000+"],
    correctIndex: 2,
    realStory: {
      fact: "Over 16,600 portions of jollof rice were served to attendees at the record-breaking event in Lagos.",
      date: "September 2025",
      source: "Guinness World Records",
      sourceUrl: "https://www.guinnessworldrecords.com",
    },
    zone: "south-west",
    difficulty: "medium",
  },
  {
    id: "q13",
    question:
      "Which league title did Edo Queens win alongside their WAFU-B Champions League victory?",
    options: [
      "NWFL Championship",
      "NWFL Premier League",
      "CAF Women's League",
      "Nigeria Cup",
    ],
    correctIndex: 1,
    realStory: {
      fact: "Edo Queens achieved a historic double by winning the 2025/26 Nigeria Women Football League Premier League and the WAFU-B Champions League in the same season.",
      date: "2026",
      source: "Nigeria Women Football League",
      sourceUrl: "https://www.nwfl.com.ng",
    },
    zone: "south-south",
    difficulty: "hard",
  },
  {
    id: "q14",
    question: "Nigeria celebrates its Independence Day on which date?",
    options: ["September 15", "October 1", "November 12", "August 6"],
    correctIndex: 1,
    realStory: {
      fact: "Nigeria gained independence from British colonial rule on October 1, 1960, making 2026 the country's 66th Independence Day.",
      date: "October 1, 1960",
      source: "Federal Government of Nigeria",
      sourceUrl: "https://www.nigeria.gov.ng",
    },
    zone: "north-central",
    difficulty: "easy",
  },
  {
    id: "q15",
    question:
      "In what year did Nigeria gain independence from Britain?",
    options: ["1957", "1958", "1960", "1963"],
    correctIndex: 2,
    realStory: {
      fact: "Nigeria became an independent nation on October 1, 1960. It became a republic in 1963.",
      date: "October 1, 1960",
      source: "Federal Government of Nigeria",
      sourceUrl: "https://www.nigeria.gov.ng",
    },
    zone: "north-central",
    difficulty: "easy",
  },
];

// Shuffle and pick questions for a game round
export function getGameQuestions(count: number = 15): Question[] {
  const shuffled = [...QUESTIONS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}
