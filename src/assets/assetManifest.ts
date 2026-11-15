import { BilingualText, OriginalCharacterId } from '../types/game';

/**
 * Registro centralizado de recursos gráficos del proyecto.
 * Incluye todas las ilustraciones originales enviadas por la autora en `public/assets/aistudio/`
 * y los fondos espaciales de ambiente.
 */

export const GAME_ART_ASSETS = {
  // Ilustraciones originales proporcionadas por la autora:
  originalRocketCrewArt: '/assets/aistudio/image_b0c57c87.png',
  originalAlienArt: '/assets/aistudio/image_0167e682.png',
  characterAstronaut: '/assets/aistudio/image_d65638e7.png',
  characterExplorer: '/assets/aistudio/image_c1bc26bc.png',
  characterAthlete: '/assets/aistudio/image_9f0fe8f6.png',
  characterRobot: '/assets/aistudio/image_4dea4ef0.png',
  characterProfessor: '/assets/aistudio/image_6e8a1715.png',
  // Escenarios y elementos de ambiente 2D:
  titleBackdrop: '/src/assets/images/title_space_backdrop_1794696470062.jpg',
  meteorSet: '/src/assets/images/meteor_hazard_set_1794696471362.jpg',
} as const;

export interface CrewCharacterAsset {
  id: OriginalCharacterId;
  image: string;
  name: BilingualText;
  role: BilingualText;
}

export const CREW_ART_CHARACTERS: CrewCharacterAsset[] = [
  {
    id: 'classic',
    image: GAME_ART_ASSETS.originalAlienArt,
    name: { es: 'Lumi Clásico', en: 'Classic Lumi' },
    role: { es: 'Capitán de expedición', en: 'Expedition Captain' },
  },
  {
    id: 'astronaut',
    image: GAME_ART_ASSETS.characterAstronaut,
    name: { es: 'Comandante Traje', en: 'Suit Commander' },
    role: { es: 'Piloto espacial', en: 'Space Pilot' },
  },
  {
    id: 'explorer',
    image: GAME_ART_ASSETS.characterExplorer,
    name: { es: 'Detective Cósmico', en: 'Cosmic Detective' },
    role: { es: 'Explorador planetario', en: 'Planetary Explorer' },
  },
  {
    id: 'robot',
    image: GAME_ART_ASSETS.characterRobot,
    name: { es: 'Bip-Bop', en: 'Beep-Boop' },
    role: { es: 'Robot ingeniero', en: 'Engineer Robot' },
  },
  {
    id: 'professor',
    image: GAME_ART_ASSETS.characterProfessor,
    name: { es: 'Profesor Astro', en: 'Professor Astro' },
    role: { es: 'Científico y matemático', en: 'Science & Math Guide' },
  },
  {
    id: 'athlete',
    image: GAME_ART_ASSETS.characterAthlete,
    name: { es: 'Aero Estelar', en: 'Star Jumper' },
    role: { es: 'Especialista de gravedad', en: 'Gravity Specialist' },
  },
];

export function getCrewCharacterAsset(id: OriginalCharacterId): CrewCharacterAsset {
  return CREW_ART_CHARACTERS.find((c) => c.id === id) || CREW_ART_CHARACTERS[0];
}

export const HOME_PLANET_PALETTE = {
  sandBeige: '#C8C7A5',
  warmCream: '#C8BCA5',
  skyAqua: '#A5C8C2',
  alienSage: '#6B7E65',
  rocketIndigo: '#262C71',
  rocketPlum: '#502671',
  deepSpace: '#0F1336',
  starGold: '#E7C873',
  softCoral: '#E07A5F',
} as const;

export const ROCKET_PALETTE = {
  hullOrange: '#FF7B3D',
  hullHighlight: '#FF9F1C',
  finCoral: '#EF476F',
  noseGold: '#FFD166',
  windowTeal: '#7DD3FC',
  flameYellow: '#FFD166',
  flameCore: '#FFF8E7',
  outlineDark: '#1A1E2E',
} as const;
