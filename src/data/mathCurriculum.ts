import {
  BilingualText,
  MathLevel,
  MathMechanicType,
  MathProgressStats,
  MathSkillCategory,
} from '../types/game';

export interface MathProblemItem {
  id: string;
  mechanic: MathMechanicType;
  level: MathLevel;
  skill: MathSkillCategory;
  title: BilingualText;
  storyContext: BilingualText;
  visualAid: {
    type: 'bars' | 'groups' | 'sequence' | 'fraction' | 'grid' | 'table';
    items: string[];
  };
  question: BilingualText;
  options: number[];
  optionLabels?: { es: string[]; en: string[] };
  correctIndex: number;
  hint: BilingualText;
  explanation: BilingualText;
}

export const MATH_SKILL_LABELS: Record<MathSkillCategory, BilingualText> = {
  counting_comparison: { es: 'Conteo y comparación', en: 'Counting & comparison' },
  addition_subtraction: { es: 'Sumas y restas', en: 'Addition & subtraction' },
  multiplication_division: { es: 'Multiplicación y división', en: 'Multiplication & division' },
  patterns_geometry: { es: 'Patrones y geometría', en: 'Patterns & geometry' },
  fractions_measurement: { es: 'Fracciones y medición', en: 'Fractions & measurement' },
  data_problems: { es: 'Tablas y problemas de pasos', en: 'Data tables & multi-step problems' },
};

export const MATH_LEVEL_LABELS: Record<MathLevel, BilingualText> = {
  1: { es: 'Nivel Inicial (6–7 años)', en: 'Starter Level (Ages 6–7)' },
  2: { es: 'Nivel Intermedio (8–9 años)', en: 'Intermediate Level (Ages 8–9)' },
  3: { es: 'Nivel Avanzado (9–10 años)', en: 'Advanced Level (Ages 9–10)' },
};

export const MATH_PROBLEMS: MathProblemItem[] = [
  // ---------- LEVEL 1 (Inicial: conteo, suma/resta simple, patrones, figuras) ----------
  {
    id: 'm1_fuel',
    mechanic: 'fuel_calc',
    level: 1,
    skill: 'addition_subtraction',
    title: { es: 'Combustible Espacial', en: 'Space Fuel' },
    storyContext: {
      es: 'Para llegar a la órbita necesitamos sumar las celdas de energía del tanque.',
      en: 'To reach orbit, we need to add up the fuel cells in our tank.',
    },
    visualAid: { type: 'bars', items: ['⚡ 7 unidades', '⚡ 5 unidades'] },
    question: {
      es: 'Tenemos 7 unidades de combustible y cargamos 5 más. ¿Cuántas tenemos ahora?',
      en: 'We have 7 fuel units and load 5 more. How many do we have now?',
    },
    options: [11, 12, 13],
    correctIndex: 1,
    hint: { es: 'Cuenta desde 7 cinco pasos hacia adelante: 8, 9, 10, 11...', en: 'Count 5 steps up from 7: 8, 9, 10, 11...' },
    explanation: { es: '7 + 5 = 12 unidades de combustible listas para despegar.', en: '7 + 5 = 12 fuel units ready for liftoff.' },
  },
  {
    id: 'm1_pattern',
    mechanic: 'pattern_lock',
    level: 1,
    skill: 'patterns_geometry',
    title: { es: 'Patrón de la Compuerta', en: 'Airlock Pattern' },
    storyContext: {
      es: 'La puerta de la nave se abre completando la secuencia numérica.',
      en: 'The ship door opens when you complete the number sequence.',
    },
    visualAid: { type: 'sequence', items: ['2', '4', '6', '8', '?'] },
    question: {
      es: '¿Qué número sigue en el código de la compuerta: 2, 4, 6, 8, ___?',
      en: 'Which number comes next in the code: 2, 4, 6, 8, ___?',
    },
    options: [9, 10, 12],
    correctIndex: 1,
    hint: { es: 'Cada número aumenta de 2 en 2.', en: 'Each number goes up by 2.' },
    explanation: { es: '8 + 2 = 10. ¡Compuerta desbloqueada!', en: '8 + 2 = 10. Airlock unlocked!' },
  },
  {
    id: 'm1_sharing',
    mechanic: 'resource_sharing',
    level: 1,
    skill: 'counting_comparison',
    title: { es: 'Raciones para la Tripulación', en: 'Crew Rations' },
    storyContext: {
      es: 'Preparamos botellas de agua para el viaje planetario.',
      en: 'We are packing water bottles for the planetary trip.',
    },
    visualAid: { type: 'groups', items: ['💧 14 botellas hoy', '💧 6 usadas'] },
    question: {
      es: 'Si teníamos 14 botellas de agua y usamos 6, ¿cuántas botellas quedan?',
      en: 'If we had 14 water bottles and used 6, how many are left?',
    },
    options: [7, 8, 9],
    correctIndex: 1,
    hint: { es: 'Resta 6 a 14 (14 - 4 = 10, y quita 2 más).', en: 'Subtract 6 from 14 (14 - 4 = 10, minus 2 more).' },
    explanation: { es: '14 - 6 = 8 botellas guardadas.', en: '14 - 6 = 8 bottles stored.' },
  },
  {
    id: 'm1_geometry',
    mechanic: 'planetary_geometry',
    level: 1,
    skill: 'patterns_geometry',
    title: { es: 'Escudo Geométrico', en: 'Geometric Shield' },
    storyContext: {
      es: 'Elegimos la placa correcta para reparar la ventana de observación.',
      en: 'Choose the right panel shape to repair our observation window.',
    },
    visualAid: { type: 'grid', items: ['△ 3 lados', '□ 4 lados', '⬡ 6 lados'] },
    question: {
      es: 'Necesitamos una placa con 4 lados iguales para el panel. ¿Cuántos lados tiene un cuadrado?',
      en: 'We need a panel with 4 equal sides. How many sides does a square have?',
    },
    options: [3, 4, 6],
    correctIndex: 1,
    hint: { es: 'Observa el dibujo del cuadrado □ y cuenta sus bordes.', en: 'Look at the square □ and count its edges.' },
    explanation: { es: 'Un cuadrado tiene exactamente 4 lados iguales.', en: 'A square has exactly 4 equal sides.' },
  },

  // ---------- LEVEL 2 (Intermedio: sumas/restas mayores, multiplicación, división inicial, medición) ----------
  {
    id: 'm2_fuel',
    mechanic: 'fuel_calc',
    level: 2,
    skill: 'addition_subtraction',
    title: { es: 'Cálculo de Reserva', en: 'Reserve Calculation' },
    storyContext: {
      es: 'Debemos verificar cuánta energía falta para completar el salto orbital.',
      en: 'Check how much energy is missing to complete the orbital jump.',
    },
    visualAid: { type: 'bars', items: ['Meta: 85 L', 'Actual: 47 L'] },
    question: {
      es: 'El tanque necesita 85 litros y tiene 47 litros. ¿Cuántos litros faltan?',
      en: 'The tank needs 85 liters and holds 47 liters. How many more liters are needed?',
    },
    options: [36, 38, 42],
    correctIndex: 1,
    hint: { es: 'De 47 a 50 son 3, y de 50 a 85 son 35. Suma 3 + 35.', en: 'From 47 to 50 is 3, and 50 to 85 is 35. Add 3 + 35.' },
    explanation: { es: '85 - 47 = 38 litros necesarios.', en: '85 - 47 = 38 liters needed.' },
  },
  {
    id: 'm2_energy',
    mechanic: 'energy_ops',
    level: 2,
    skill: 'multiplication_division',
    title: { es: 'Paneles Solares en Serie', en: 'Solar Array Power' },
    storyContext: {
      es: 'Cada panel solar limpio genera la misma cantidad de energía.',
      en: 'Each clean solar panel produces the same amount of power.',
    },
    visualAid: { type: 'groups', items: ['☀️ 6', '☀️ 6', '☀️ 6', '☀️ 6'] },
    question: {
      es: 'Si 4 paneles solares producen 6 unidades cada uno, ¿cuánta energía total generan?',
      en: 'If 4 solar panels generate 6 units each, how much total power do they make?',
    },
    options: [20, 24, 28],
    correctIndex: 1,
    hint: { es: 'Suma 6 + 6 + 6 + 6 (o multiplica 4 × 6).', en: 'Add 6 + 6 + 6 + 6 (or multiply 4 × 6).' },
    explanation: { es: '4 × 6 = 24 unidades de energía limpia.', en: '4 × 6 = 24 units of clean power.' },
  },
  {
    id: 'm2_sharing',
    mechanic: 'resource_sharing',
    level: 2,
    skill: 'multiplication_division',
    title: { es: 'Reparto en la Tripulación', en: 'Crew Supply Split' },
    storyContext: {
      es: 'Los 3 exploradores necesitan la misma cantidad de cápsulas de oxígeno.',
      en: 'All 3 explorers need the exact same number of oxygen capsules.',
    },
    visualAid: { type: 'groups', items: ['👩‍🚀 A', '👨‍🚀 B', '👽 C', 'Total: 18'] },
    question: {
      es: 'Repartimos 18 cápsulas en partes iguales entre 3 exploradores. ¿Cuántas recibe cada uno?',
      en: 'Share 18 capsules equally among 3 explorers. How many does each one get?',
    },
    options: [5, 6, 7],
    correctIndex: 1,
    hint: { es: '¿Qué número multiplicado por 3 da 18?', en: 'Which number times 3 equals 18?' },
    explanation: { es: '18 ÷ 3 = 6 cápsulas para cada integrante.', en: '18 ÷ 3 = 6 capsules for each crew member.' },
  },
  {
    id: 'm2_lab',
    mechanic: 'math_lab',
    level: 2,
    skill: 'fractions_measurement',
    title: { es: 'Medición de Órbita', en: 'Orbit Measurement' },
    storyContext: {
      es: 'Comparando distancias medidas por los sensores de navegación.',
      en: 'Comparing distances measured by our navigation sensors.',
    },
    visualAid: { type: 'table', items: ['Tramo A: 250 km', 'Tramo B: 175 km'] },
    question: {
      es: 'La sonda recorrió 250 km en la mañana y 175 km en la tarde. ¿Cuántos km recorrió en total?',
      en: 'The probe traveled 250 km in the morning and 175 km in the afternoon. Total km?',
    },
    options: [415, 425, 435],
    correctIndex: 1,
    hint: { es: 'Suma 250 + 100 = 350, y luego agrega 75.', en: 'Add 250 + 100 = 350, then add 75.' },
    explanation: { es: '250 + 175 = 425 kilómetros recorridos.', en: '250 + 175 = 425 kilometers traveled.' },
  },

  // ---------- LEVEL 3 (Avanzado: fracciones, perímetros/áreas, gráficas/tablas, problemas 2 pasos) ----------
  {
    id: 'm3_fractions',
    mechanic: 'galactic_fractions',
    level: 3,
    skill: 'fractions_measurement',
    title: { es: 'Fracciones Galácticas', en: 'Galactic Fractions' },
    storyContext: {
      es: 'Analizamos una muestra dividida en partes iguales dentro del laboratorio.',
      en: 'We are analyzing a sample split into equal parts inside the lab.',
    },
    visualAid: { type: 'fraction', items: ['🟩', '🟩', '🟩', '⬜', '⬜', '⬜', '⬜', '⬜'] },
    question: {
      es: 'Un contenedor tiene 8 partes iguales y 4 están llenas de agua purificada. ¿Qué fracción equivale a 4/8?',
      en: 'A container has 8 equal parts and 4 are filled with pure water. What fraction equals 4/8?',
    },
    options: [0, 1, 2],
    optionLabels: { es: ['1/2 (la mitad)', '1/4 (un cuarto)', '3/4 (tres cuartos)'], en: ['1/2 (one half)', '1/4 (one quarter)', '3/4 (three quarters)'] },
    correctIndex: 0,
    hint: { es: '4 es exactamente la mitad de 8.', en: '4 is exactly half of 8.' },
    explanation: { es: '4/8 = 1/2 porque 4 de 8 partes forman justo la mitad del contenedor.', en: '4/8 = 1/2 because 4 out of 8 parts make exactly half.' },
  },
  {
    id: 'm3_geometry',
    mechanic: 'planetary_geometry',
    level: 3,
    skill: 'patterns_geometry',
    title: { es: 'Perímetro de Zona Rover', en: 'Rover Zone Perimeter' },
    storyContext: {
      es: 'Marcamos un área rectangular segura para que el rover tome muestras.',
      en: 'We mark a rectangular safe zone for our rover to collect samples.',
    },
    visualAid: { type: 'grid', items: ['Largo: 9 m', 'Ancho: 5 m'] },
    question: {
      es: 'Si la zona rectangular mide 9 metros de largo y 5 metros de ancho, ¿cuál es su perímetro total?',
      en: 'If the rectangular zone is 9 meters long and 5 meters wide, what is its total perimeter?',
    },
    options: [14, 28, 45],
    correctIndex: 1,
    hint: { es: 'El perímetro suma los 4 lados: 9 + 5 + 9 + 5.', en: 'Perimeter adds all 4 sides: 9 + 5 + 9 + 5.' },
    explanation: { es: '9 + 5 + 9 + 5 = 28 metros alrededor de toda la zona.', en: '9 + 5 + 9 + 5 = 28 meters all around the zone.' },
  },
  {
    id: 'm3_lab',
    mechanic: 'math_lab',
    level: 3,
    skill: 'data_problems',
    title: { es: 'Tabla de Telemetría', en: 'Telemetry Data Table' },
    storyContext: {
      es: 'Interpreta los registros semanales de energía recolectada por los satélites.',
      en: 'Read the weekly energy table collected by our satellites.',
    },
    visualAid: { type: 'table', items: ['Día 1: 12 kW', 'Día 2: 18 kW', 'Día 3: 15 kW'] },
    question: {
      es: 'En 3 días se juntaron 12, 18 y 15 kW, pero la antena gastó 10 kW. ¿Cuántos kW sobran?',
      en: 'Over 3 days we gathered 12, 18, and 15 kW, and the antenna used 10 kW. How many kW remain?',
    },
    options: [35, 40, 45],
    correctIndex: 0,
    hint: { es: 'Paso 1: suma 12 + 18 + 15. Paso 2: resta los 10 kW gastados.', en: 'Step 1: add 12 + 18 + 15. Step 2: subtract 10 kW used.' },
    explanation: { es: '12 + 18 + 15 = 45 kW; luego 45 - 10 = 35 kW disponibles.', en: '12 + 18 + 15 = 45 kW; then 45 - 10 = 35 kW left.' },
  },
  {
    id: 'm3_energy',
    mechanic: 'energy_ops',
    level: 3,
    skill: 'multiplication_division',
    title: { es: 'Celdas de Propulsión', en: 'Propulsion Cells' },
    storyContext: {
      es: 'Calculamos cuántas cajas de baterías necesitamos para los 6 motores.',
      en: 'Calculate how many battery packs are needed for 6 thrusters.',
    },
    visualAid: { type: 'groups', items: ['6 motores', '8 celdas c/u', 'Ya hay: 18'] },
    question: {
      es: 'Cada uno de los 6 motores ocupa 8 celdas. Si ya tenemos 18 celdas, ¿cuántas faltan?',
      en: 'Each of the 6 thrusters needs 8 cells. If we already have 18 cells, how many more are needed?',
    },
    options: [28, 30, 32],
    correctIndex: 1,
    hint: { es: 'Primero calcula 6 × 8 = 48. Después resta las 18 que ya tenemos.', en: 'First find 6 × 8 = 48. Then subtract the 18 we already have.' },
    explanation: { es: '6 × 8 = 48 celdas en total; 48 - 18 = 30 celdas faltantes.', en: '6 × 8 = 48 cells total; 48 - 18 = 30 missing cells.' },
  },
];

export function selectAdaptiveMathProblem(
  level: MathLevel,
  preferredMechanic: MathMechanicType,
  usedIds: string[] = []
): MathProblemItem {
  const byLevel = MATH_PROBLEMS.filter((p) => p.level === level);
  const matchingMechanic = byLevel.find(
    (p) => p.mechanic === preferredMechanic && !usedIds.includes(p.id)
  );
  if (matchingMechanic) return matchingMechanic;

  const unusedInLevel = byLevel.find((p) => !usedIds.includes(p.id));
  if (unusedInLevel) return unusedInLevel;

  return byLevel[Math.floor(Math.random() * byLevel.length)] || MATH_PROBLEMS[0];
}

export function updateMathStatsAdaptive(
  prev: MathProgressStats,
  skill: MathSkillCategory,
  solvedFirstTry: boolean,
  hadErrors: boolean
): MathProgressStats {
  const nextConsecutiveCorrect = !hadErrors ? prev.consecutiveCorrect + 1 : 0;
  const nextConsecutiveWrong = hadErrors ? prev.consecutiveWrong + 1 : 0;

  let nextLevel: MathLevel = prev.currentLevel;
  // Gentle, respectful adaptive progression without stress
  if (nextConsecutiveCorrect >= 2 && prev.currentLevel < 3) {
    nextLevel = (prev.currentLevel + 1) as MathLevel;
  } else if (nextConsecutiveWrong >= 2 && prev.currentLevel > 1) {
    nextLevel = (prev.currentLevel - 1) as MathLevel;
  }

  const prevSkill = prev.skillsPracticed[skill] || { correct: 0, attempts: 0 };

  return {
    currentLevel: nextLevel,
    consecutiveCorrect: nextLevel !== prev.currentLevel ? 0 : nextConsecutiveCorrect,
    consecutiveWrong: nextLevel !== prev.currentLevel ? 0 : nextConsecutiveWrong,
    totalCorrect: prev.totalCorrect + (solvedFirstTry ? 1 : 1),
    totalAttempts: prev.totalAttempts + 1,
    skillsPracticed: {
      ...prev.skillsPracticed,
      [skill]: {
        correct: prevSkill.correct + 1,
        attempts: prevSkill.attempts + (hadErrors ? 2 : 1),
      },
    },
  };
}
