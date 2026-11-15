import { HOME_PLANET_PALETTE } from '../assets/assetManifest';
import { BilingualText } from '../types/game';

export interface SkinColorOption {
  id: string;
  label: BilingualText;
  hex: string;
}

export interface AccessoryOption {
  id: string;
  label: BilingualText;
  description: BilingualText;
  unlockRequirement: BilingualText;
}

export interface SuitOption {
  id: string;
  label: BilingualText;
  hex: string;
  trimHex: string;
}

export const ALIEN_SPECIES: { id: 'antena' | 'orejudo' | 'cristalino'; label: BilingualText; trait: BilingualText }[] = [
  {
    id: 'antena',
    label: { es: 'Antenita', en: 'Star-Antenna' },
    trait: { es: 'Capta señales estelares', en: 'Picks up star signals' },
  },
  {
    id: 'orejudo',
    label: { es: 'Orejas Cósmicas', en: 'Cosmic Ears' },
    trait: { es: 'Escucha ecos del espacio', en: 'Hears space echoes' },
  },
  {
    id: 'cristalino',
    label: { es: 'Astro-Cresta', en: 'Astro-Crest' },
    trait: { es: 'Brilla en la oscuridad', en: 'Glows in the dark' },
  },
];

export const SKIN_COLORS: SkinColorOption[] = [
  { id: 'sage', label: { es: 'Verde Sabio (Original)', en: 'Sage Green (Original)' }, hex: HOME_PLANET_PALETTE.alienSage },
  { id: 'aqua', label: { es: 'Celeste Nebula', en: 'Nebula Aqua' }, hex: '#A5C8C2' },
  { id: 'sand', label: { es: 'Beige Solar', en: 'Solar Beige' }, hex: '#C8C7A5' },
  { id: 'lavender', label: { es: 'Lila Galáctico', en: 'Galactic Lilac' }, hex: '#9D88B8' },
  { id: 'coral', label: { es: 'Coral Marciano', en: 'Martian Coral' }, hex: '#C98A7A' },
];

export const EYE_STYLES: { id: 'curioso' | 'estelar' | 'gafas' | 'tres_ojos'; label: BilingualText }[] = [
  { id: 'curioso', label: { es: 'Ojos Curiosos', en: 'Curious Eyes' } },
  { id: 'estelar', label: { es: 'Ojos Estelares', en: 'Starry Eyes' } },
  { id: 'gafas', label: { es: 'Visor Científico', en: 'Science Visor' } },
  { id: 'tres_ojos', label: { es: 'Tres Ojos', en: 'Three Eyes' } },
];

export const SUIT_COLORS: SuitOption[] = [
  { id: 'indigo', label: { es: 'Índigo Estelar', en: 'Star Indigo' }, hex: HOME_PLANET_PALETTE.rocketIndigo, trimHex: '#A5C8C2' },
  { id: 'plum', label: { es: 'Ciruela Cósmica', en: 'Cosmic Plum' }, hex: HOME_PLANET_PALETTE.rocketPlum, trimHex: '#C8C7A5' },
  { id: 'cream', label: { es: 'Crema Lunar', en: 'Lunar Cream' }, hex: '#C8BCA5', trimHex: '#262C71' },
  { id: 'aqua', label: { es: 'Acua Orbital', en: 'Orbital Aqua' }, hex: '#5D8E88', trimHex: '#F5F4EA' },
];

export const ACCESSORIES: AccessoryOption[] = [
  {
    id: 'none',
    label: { es: 'Clásico', en: 'Classic' },
    description: { es: 'Explorador listo para despegar.', en: 'Explorer ready for liftoff.' },
    unlockRequirement: { es: 'Disponible al inicio', en: 'Available at start' },
  },
  {
    id: 'visor_aqua',
    label: { es: 'Casco Acua', en: 'Aqua Helmet' },
    description: { es: 'Cúpula transparente de cristal espacial.', en: 'Clear space crystal dome.' },
    unlockRequirement: { es: 'Disponible al inicio', en: 'Available at start' },
  },
  {
    id: 'antena_oro',
    label: { es: 'Antena Dorada', en: 'Golden Antenna' },
    description: { es: 'Antena especial de explorador lunar.', en: 'Special explorer antenna.' },
    unlockRequirement: { es: 'Completa Mercurio', en: 'Complete Mercury' },
  },
  {
    id: 'mochila_solar',
    label: { es: 'Mochila Solar', en: 'Solar Backpack' },
    description: { es: 'Paneles en miniatura para el traje.', en: 'Mini solar panels for your suit.' },
    unlockRequirement: { es: 'Completa Tierra', en: 'Complete Earth' },
  },
  {
    id: 'insignia_nasa',
    label: { es: 'Parche Explorador', en: 'Explorer Patch' },
    description: { es: 'Parche de investigador planetario.', en: 'Planetary researcher patch.' },
    unlockRequirement: { es: 'Completa Marte', en: 'Complete Mars' },
  },
  {
    id: 'corona_anillos',
    label: { es: 'Diadema de Anillos', en: 'Ring Crown' },
    description: { es: 'Inspirada en los anillos helados de Saturno.', en: 'Inspired by Saturn’s icy rings.' },
    unlockRequirement: { es: 'Completa Saturno', en: 'Complete Saturn' },
  },
  {
    id: 'capa_nebula',
    label: { es: 'Capa Nebulosa', en: 'Nebula Cape' },
    description: { es: 'Tejido estelar de los exoplanetas.', en: 'Starlight cape from exoplanets.' },
    unlockRequirement: { es: 'Completa La Luna o Exoplanetas', en: 'Complete Moon or Exoplanets' },
  },
];
