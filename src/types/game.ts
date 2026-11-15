export type Language = 'es' | 'en';

export type ScreenMode = 'LANGUAGE' | 'STORY' | 'TITLE' | 'MAP' | 'MISSION';

export type MissionPhase =
  | 'INTRO'
  | 'SPACE_TRAVEL'
  | 'SHIP_REPAIR'
  | 'MATH_CHALLENGE'
  | 'DETECTIVE'
  | 'EXPLORATION'
  | 'QUIZ'
  | 'VICTORY';

export type EmergencyType = 'CABLES' | 'OXYGEN' | 'ENERGY' | 'COMMUNICATION';

export type PlanetId =
  | 'mercury'
  | 'venus'
  | 'earth'
  | 'mars'
  | 'jupiter'
  | 'saturn'
  | 'uranus'
  | 'neptune'
  | 'moon'
  | 'exoplanets';

export type MathLevel = 1 | 2 | 3; // 1: Inicial (6-7), 2: Intermedio (8-9), 3: Avanzado (9-10)

export type MathSkillCategory =
  | 'counting_comparison'
  | 'addition_subtraction'
  | 'multiplication_division'
  | 'patterns_geometry'
  | 'fractions_measurement'
  | 'data_problems';

export type MathMechanicType =
  | 'fuel_calc'
  | 'resource_sharing'
  | 'energy_ops'
  | 'pattern_lock'
  | 'galactic_fractions'
  | 'planetary_geometry'
  | 'math_lab';

export interface BilingualText {
  es: string;
  en: string;
}

export type OriginalCharacterId =
  | 'classic'
  | 'astronaut'
  | 'explorer'
  | 'athlete'
  | 'robot'
  | 'professor';

export interface AlienCustomization {
  explorerName: string;
  useOriginalArt: boolean;
  originalCharacterId: OriginalCharacterId;
  species: 'antena' | 'orejudo' | 'cristalino';
  skinColor: string;
  eyeStyle: 'curioso' | 'estelar' | 'gafas' | 'tres_ojos';
  suitColor: string;
  accessory: string;
}

export interface RocketUpgrades {
  thrusterLevel: number; // Unlocked by stars & missions
  tankLevel: number;
  shieldLevel: number;
}

export interface MathProgressStats {
  currentLevel: MathLevel;
  consecutiveCorrect: number;
  consecutiveWrong: number;
  totalCorrect: number;
  totalAttempts: number;
  skillsPracticed: Record<MathSkillCategory, { correct: number; attempts: number }>;
}

export interface DetectiveClue {
  label: BilingualText;
  value: BilingualText;
  category: BilingualText;
}

export interface ExplorationSpot {
  id: string;
  title: BilingualText;
  subtitle: BilingualText;
  xPercent: number;
  yPercent: number;
  discoveryText: BilingualText;
  nasaMissionRef: string;
  discoveryStamp: BilingualText;
}

export interface ScienceQuestion {
  id: string;
  prompt: BilingualText;
  options: { es: string[]; en: string[] };
  correctIndex: number;
  hint: BilingualText;
  explanation: BilingualText;
  funFact: BilingualText;
}

export interface NasaVerifiedRecord {
  title: BilingualText;
  nasaQuery: string;
  sourceName: string;
  missionNames: string;
  credit: string;
  summaryForKids: BilingualText;
  verifiedMetrics: {
    diameterKm: string;
    dayLength: BilingualText;
    yearLength: BilingualText;
    avgTemp: string;
    moons: BilingualText;
  };
  fallbackImageCaption: BilingualText;
}

export interface PlanetChapter {
  id: PlanetId;
  order: number;
  name: BilingualText;
  subtitle: BilingualText;
  palette: {
    primary: string;
    secondary: string;
    atmosphere: string;
    accent: string;
  };
  radiusVisual: number;
  hasRings?: boolean;
  storyIntro: BilingualText;
  storyConclusion: BilingualText;
  crewDialogue: BilingualText;
  mainMissionTitle: BilingualText;
  secondaryChallengeTitle: BilingualText;
  runnerConfig: {
    targetDistanceKm: number;
    baseSpeed: number;
    hazardSpawnRate: number;
    meteorColor: string;
    bgTint: string;
    hazardLabel: BilingualText;
    collectibleRock: {
      name: BilingualText;
      color: string;
      glowColor: string;
    };
  };
  emergencyType: EmergencyType;
  emergencyTitle: BilingualText;
  emergencyBrief: BilingualText;
  mathMechanic: MathMechanicType;
  mathThemePrompt: BilingualText;
  detectiveClues: DetectiveClue[];
  detectiveTraitsQuestion: BilingualText;
  detectiveChoices: {
    id: string;
    label: BilingualText;
    isCorrect: boolean;
    feedback: BilingualText;
  }[];
  explorationLabTitle: BilingualText;
  explorationLabGuide: BilingualText;
  explorationSpots: ExplorationSpot[];
  questions: ScienceQuestion[];
  badge: {
    id: string;
    name: BilingualText;
    description: BilingualText;
  };
  unlockAccessoryId?: string;
  nasaData: NasaVerifiedRecord;
}

export interface NasaGalleryImage {
  nasaId: string;
  title: string;
  description: string;
  dateCreated: string;
  center: string;
  credit: string;
  imageUrl: string;
  isRealNasaPhoto: boolean;
}

export interface ExoplanetRecord {
  name: string;
  hostStar: string;
  discoveryYear: number;
  method: string;
  radiusEarth: number | null;
  orbitalPeriodDays: number | null;
  equilibriumTempK: number | null;
  credit: string;
}

export interface PlanetProgress {
  unlocked: boolean;
  completed: boolean;
  bestScore: number;
  starsEarned: number; // 1..3
  timesCompleted: number;
}

export interface MissionHistoryEntry {
  id: string;
  planetId: PlanetId;
  completedAt: string;
  score: number;
  starsEarned: number; // 1..3
  starsCollectedInFlight: number;
  mathLevel: MathLevel;
  stampsCount: number;
}

export interface SaveData {
  version: number;
  language: Language;
  languageSelected: boolean;
  totalStars: number;
  alien: AlienCustomization;
  rocket: RocketUpgrades;
  unlockedAccessories: string[];
  unlockedBadges: string[];
  discoveryStamps: string[];
  discoveredFacts: { planetId: PlanetId; es: string; en: string }[];
  scienceConceptsLearned: { planetId: PlanetId; es: string; en: string }[];
  mathProgress: MathProgressStats;
  planetProgress: Record<PlanetId, PlanetProgress>;
  missionHistory: MissionHistoryEntry[];
  muted: boolean;
  musicEnabled: boolean;
  hasSeenStory: boolean;
}
