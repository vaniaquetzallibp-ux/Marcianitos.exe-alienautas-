import { HOME_PLANET_PALETTE } from '../assets/assetManifest';
import { PlanetId, SaveData } from '../types/game';

const STORAGE_KEY = 'astro_exploradores_save_v2';

export const PLANET_ORDER: PlanetId[] = [
  'mercury',
  'venus',
  'earth',
  'mars',
  'jupiter',
  'saturn',
  'uranus',
  'neptune',
  'moon',
  'exoplanets',
];

export function createInitialSaveData(): SaveData {
  return {
    version: 2,
    language: 'es',
    languageSelected: false,
    totalStars: 0,
    alien: {
      explorerName: 'Lumi',
      useOriginalArt: true,
      originalCharacterId: 'classic',
      species: 'antena',
      skinColor: HOME_PLANET_PALETTE.alienSage,
      eyeStyle: 'curioso',
      suitColor: HOME_PLANET_PALETTE.rocketIndigo,
      accessory: 'none',
    },
    rocket: {
      thrusterLevel: 1,
      tankLevel: 1,
      shieldLevel: 1,
    },
    unlockedAccessories: ['none', 'visor_aqua'],
    unlockedBadges: [],
    discoveryStamps: [],
    discoveredFacts: [],
    scienceConceptsLearned: [],
    mathProgress: {
      currentLevel: 1,
      consecutiveCorrect: 0,
      consecutiveWrong: 0,
      totalCorrect: 0,
      totalAttempts: 0,
      skillsPracticed: {
        counting_comparison: { correct: 0, attempts: 0 },
        addition_subtraction: { correct: 0, attempts: 0 },
        multiplication_division: { correct: 0, attempts: 0 },
        patterns_geometry: { correct: 0, attempts: 0 },
        fractions_measurement: { correct: 0, attempts: 0 },
        data_problems: { correct: 0, attempts: 0 },
      },
    },
    planetProgress: {
      mercury: { unlocked: true, completed: false, bestScore: 0, starsEarned: 0, timesCompleted: 0 },
      venus: { unlocked: false, completed: false, bestScore: 0, starsEarned: 0, timesCompleted: 0 },
      earth: { unlocked: false, completed: false, bestScore: 0, starsEarned: 0, timesCompleted: 0 },
      mars: { unlocked: false, completed: false, bestScore: 0, starsEarned: 0, timesCompleted: 0 },
      jupiter: { unlocked: false, completed: false, bestScore: 0, starsEarned: 0, timesCompleted: 0 },
      saturn: { unlocked: false, completed: false, bestScore: 0, starsEarned: 0, timesCompleted: 0 },
      uranus: { unlocked: false, completed: false, bestScore: 0, starsEarned: 0, timesCompleted: 0 },
      neptune: { unlocked: false, completed: false, bestScore: 0, starsEarned: 0, timesCompleted: 0 },
      moon: { unlocked: false, completed: false, bestScore: 0, starsEarned: 0, timesCompleted: 0 },
      exoplanets: { unlocked: false, completed: false, bestScore: 0, starsEarned: 0, timesCompleted: 0 },
    },
    missionHistory: [],
    muted: false,
    musicEnabled: true,
    hasSeenStory: false,
  };
}

export function loadSaveData(): SaveData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return createInitialSaveData();
    const parsed = JSON.parse(raw) as Partial<SaveData>;
    const base = createInitialSaveData();
    return {
      ...base,
      ...parsed,
      alien: { ...base.alien, ...(parsed.alien || {}) },
      rocket: { ...base.rocket, ...(parsed.rocket || {}) },
      mathProgress: {
        ...base.mathProgress,
        ...(parsed.mathProgress || {}),
        skillsPracticed: {
          ...base.mathProgress.skillsPracticed,
          ...(parsed.mathProgress?.skillsPracticed || {}),
        },
      },
      planetProgress: { ...base.planetProgress, ...(parsed.planetProgress || {}) },
      unlockedAccessories: Array.isArray(parsed.unlockedAccessories)
        ? parsed.unlockedAccessories
        : base.unlockedAccessories,
      unlockedBadges: Array.isArray(parsed.unlockedBadges) ? parsed.unlockedBadges : [],
      discoveryStamps: Array.isArray(parsed.discoveryStamps) ? parsed.discoveryStamps : [],
      discoveredFacts: Array.isArray(parsed.discoveredFacts) ? parsed.discoveredFacts : [],
      scienceConceptsLearned: Array.isArray(parsed.scienceConceptsLearned)
        ? parsed.scienceConceptsLearned
        : [],
      missionHistory: Array.isArray(parsed.missionHistory) ? parsed.missionHistory : [],
    };
  } catch {
    return createInitialSaveData();
  }
}

export function persistSaveData(data: SaveData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Ignore storage quota issues safely
  }
}

export function resetSaveData(): SaveData {
  const fresh = createInitialSaveData();
  persistSaveData(fresh);
  return fresh;
}
