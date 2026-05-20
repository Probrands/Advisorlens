export type Ticker = "GOOGL" | "AMD" | "ABBV" | "TSM";

export const TICKERS: Ticker[] = ["GOOGL", "AMD", "ABBV", "TSM"];

export type Holding = {
  ticker: Ticker;
  company: string;
  sector: string;
  role: string;
  concern: string;
  concernLevel: "LOW" | "MED" | "HIGH";
};

export const HOLDINGS: Holding[] = [
  {
    ticker: "GOOGL",
    company: "Alphabet",
    sector: "Communication Services / Tech",
    role: "AI, ads, cloud growth",
    concern: "Regulation, ad slowdown",
    concernLevel: "MED",
  },
  {
    ticker: "AMD",
    company: "Advanced Micro Devices",
    sector: "Semiconductors",
    role: "AI chip growth",
    concern: "High volatility, competition",
    concernLevel: "HIGH",
  },
  {
    ticker: "ABBV",
    company: "AbbVie",
    sector: "Healthcare / Pharma",
    role: "Defensive income and pharma exposure",
    concern: "Patent and drug pipeline risk",
    concernLevel: "LOW",
  },
  {
    ticker: "TSM",
    company: "Taiwan Semiconductor",
    sector: "Semiconductors",
    role: "Global chip manufacturing",
    concern: "Geopolitical and chip cycle risk",
    concernLevel: "HIGH",
  },
];

export const SNAPSHOT = {
  theme:
    "Growth heavy, tech exposed, semiconductor concentrated, with one healthcare defensive position.",
  strength: "Strong exposure to AI, cloud, chips, and healthcare.",
  concern:
    "AMD and TSM create semiconductor overlap. Google also adds tech concentration.",
  discussion:
    "Whether the portfolio needs more diversification outside of technology and semiconductors.",
};

export type ExposureTone =
  | "tech"
  | "semi"
  | "health"
  | "defense"
  | "risk"
  | "good";

export const EXPOSURES: {
  label: string;
  value: number;
  tone: ExposureTone;
  note: string;
}[] = [
  {
    label: "Technology / AI Exposure",
    value: 75,
    tone: "tech",
    note: "GOOGL, AMD, TSM all map to the AI thematic",
  },
  {
    label: "Semiconductor Exposure",
    value: 50,
    tone: "semi",
    note: "AMD design + TSM fabrication",
  },
  {
    label: "Healthcare Exposure",
    value: 25,
    tone: "health",
    note: "ABBV only",
  },
  {
    label: "Defensive Exposure",
    value: 25,
    tone: "defense",
    note: "ABBV dividend + pharma stability",
  },
  {
    label: "Dividend Stability",
    value: 20,
    tone: "good",
    note: "Concentrated in ABBV; GOOGL recently initiated small div",
  },
  {
    label: "Geopolitical Risk",
    value: 35,
    tone: "risk",
    note: "Driven primarily by TSM (Taiwan / US-China policy)",
  },
];

export type Overlap = {
  tickers: Ticker[];
  title: string;
  body: string;
};

export const OVERLAPS: Overlap[] = [
  {
    tickers: ["AMD", "TSM"],
    title: "Semiconductor exposure overlap",
    body: "AMD designs chips and TSM manufactures chips. They are different businesses, but both are exposed to semiconductor demand, AI infrastructure spending, and chip cycle risk.",
  },
  {
    tickers: ["GOOGL", "AMD", "TSM"],
    title: "AI buildout co-movement",
    body: "All three holdings are connected to the AI buildout. If AI spending slows down or tech sentiment weakens, multiple positions could be affected at the same time.",
  },
];

export type Scenario = {
  name: string;
  tagline: string;
  moves: Record<Ticker, number>;
  summary: string;
};

export const SCENARIOS: Scenario[] = [
  {
    name: "Semiconductor Pullback",
    tagline: "Chip cycle turns / inventory correction",
    moves: { AMD: -15, TSM: -12, GOOGL: -5, ABBV: 1 },
    summary:
      "Portfolio would be pressured mainly by AMD and TSM because of concentrated semiconductor exposure.",
  },
  {
    name: "AI Hype Cools Off",
    tagline: "Capex revisions / multiple compression",
    moves: { GOOGL: -8, AMD: -18, TSM: -10, ABBV: 2 },
    summary:
      "AI related holdings would take the largest hit, while AbbVie could act as a defensive stabilizer.",
  },
  {
    name: "Healthcare Defensive Rotation",
    tagline: "Risk-off / quality dividend bid",
    moves: { ABBV: 8, GOOGL: -3, AMD: -6, TSM: -4 },
    summary: "AbbVie helps offset weakness in growth and technology holdings.",
  },
];
