import React from 'react';
import { BookOpen, CheckCircle2, GraduationCap, ShieldCheck, X } from 'lucide-react';
import { MATH_LEVEL_LABELS, MATH_SKILL_LABELS } from '../data/mathCurriculum';
import { PLANET_CHAPTERS } from '../data/planets';
import { Language, MathSkillCategory, SaveData } from '../types/game';
import { soundFX } from '../utils/audio';

interface ParentsTeachersModalProps {
  language: Language;
  saveData: SaveData;
  onClose: () => void;
}

export const ParentsTeachersModal: React.FC<ParentsTeachersModalProps> = ({
  language,
  saveData,
  onClose,
}) => {
  const isEs = language === 'es';
  const completedChapters = PLANET_CHAPTERS.filter((p) => saveData.planetProgress[p.id].completed);
  const skillKeys = Object.keys(MATH_SKILL_LABELS) as MathSkillCategory[];

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
      <div className="max-w-5xl w-full bg-[#E0F2FE] border-4 border-[#0284C7] rounded-[2rem] p-6 md:p-8 max-h-[92vh] overflow-y-auto space-y-6 shadow-2xl text-[#0F2942]">
        <div className="flex items-start justify-between gap-4 border-b-2 border-[#38BDF8] pb-4">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-2xl bg-[#FF8C42] text-[#FFF8E7] shrink-0">
              <GraduationCap className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-[#0F2942]">
                {isEs ? 'Panel para Padres y Docentes' : 'Parents & Teachers Dashboard'}
              </h2>
              <p className="text-sm font-bold text-[#0284C7]">
                {isEs
                  ? 'Seguimiento educativo de progreso matemático, ciencia espacial y diseño seguro.'
                  : 'Educational tracking of math growth, space science, and child-safe design.'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              soundFX.click();
              onClose();
            }}
            className="p-3 rounded-2xl bg-[#EF476F] hover:bg-[#FF6B6B] text-[#FFF8E7] border-2 border-b-4 border-[#9B2242] cursor-pointer"
            aria-label="Cerrar"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Summary KPI Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-[#FFF8E7] text-[#1A1E2E] border-2 border-[#38BDF8] space-y-1">
            <div className="text-xs font-bold text-[#0284C7]">
              {isEs ? 'Misiones completadas' : 'Completed missions'}
            </div>
            <div className="text-3xl font-display font-bold text-[#0F2942] font-mono-nums">
              {completedChapters.length} / 10
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#FFF8E7] text-[#1A1E2E] border-2 border-[#FFD166] space-y-1">
            <div className="text-xs font-bold text-[#D97706]">
              {isEs ? 'Nivel matemático adaptativo' : 'Adaptive math level'}
            </div>
            <div className="text-lg font-display font-bold text-[#1A1E2E]">
              {MATH_LEVEL_LABELS[saveData.mathProgress.currentLevel][language]}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#FFF8E7] text-[#1A1E2E] border-2 border-[#FF8C42] space-y-1">
            <div className="text-xs font-bold text-[#D9480F]">
              {isEs ? 'Conceptos científicos' : 'Science concepts'}
            </div>
            <div className="text-3xl font-display font-bold text-[#D9480F] font-mono-nums">
              {saveData.scienceConceptsLearned.length}
            </div>
          </div>
        </div>

        {/* Math Skills Progress */}
        <div className="bg-[#BAE6FD] border-2 border-[#38BDF8] rounded-3xl p-5 space-y-3">
          <h3 className="text-lg font-display font-bold text-[#0F2942]">
            {isEs
              ? 'Habilidades Matemáticas Practicadas (SEP NEM · Saberes y Pensamiento Científico)'
              : 'Math Skills Practiced (Primary Curriculum Alignment)'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {skillKeys.map((skillKey) => {
              const stat = saveData.mathProgress.skillsPracticed[skillKey] || { correct: 0, attempts: 0 };
              const pct = stat.attempts > 0 ? Math.round((stat.correct / stat.attempts) * 100) : 0;
              return (
                <div key={skillKey} className="p-3.5 rounded-2xl bg-[#E0F2FE] border-2 border-[#38BDF8] space-y-1">
                  <div className="text-sm font-bold text-[#0F2942]">{MATH_SKILL_LABELS[skillKey][language]}</div>
                  <div className="text-xs font-bold text-[#0284C7] font-mono-nums">
                    {stat.attempts > 0
                      ? isEs
                        ? `Resueltos: ${stat.correct} · Precisión: ${pct}%`
                        : `Solved: ${stat.correct} · Accuracy: ${pct}%`
                      : isEs
                      ? 'Pendiente de practicar'
                      : 'Not yet practiced'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Educational Objectives by Activity */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#BAE6FD] border-2 border-[#FFD166] rounded-3xl p-5 space-y-2.5">
            <div className="flex items-center gap-2 text-base font-display font-bold text-[#B45309]">
              <BookOpen className="w-5 h-5" />
              <span>{isEs ? 'Qué aprende en cada actividad' : 'What your child learns in each stage'}</span>
            </div>
            <ul className="text-xs md:text-sm text-[#0F2942] font-semibold space-y-2">
              <li>
                <strong>{isEs ? 'Viaje Espacial:' : 'Space Flight:'}</strong>{' '}
                {isEs
                  ? 'Coordinación visomotora, discriminación visual (atrapar rocas del planeta vs. esquivar meteoritos) y atención.'
                  : 'Visuomotor coordination, visual discrimination (catching planet rocks vs. dodging hazards), and focus.'}
              </li>
              <li>
                <strong>{isEs ? 'Reparación y Emergencias:' : 'Ship Repair & Emergencies:'}</strong>{' '}
                {isEs
                  ? 'Pensamiento lógico, emparejamiento visual y resolución de problemas.'
                  : 'Logical thinking, visual matching, and problem solving.'}
              </li>
              <li>
                <strong>{isEs ? 'Retos Matemáticos:' : 'Math Challenges:'}</strong>{' '}
                {isEs
                  ? 'Conteo, operaciones, patrones, fracciones, geometría y lectura de datos.'
                  : 'Counting, operations, patterns, fractions, geometry, and table reading.'}
              </li>
              <li>
                <strong>{isEs ? 'Detectives y Bitácora:' : 'Detectives & Logbook:'}</strong>{' '}
                {isEs
                  ? 'Lectura de pistas verificables de la NASA y recuerdo activo.'
                  : 'Analyzing verified NASA clues and active recall.'}
              </li>
            </ul>
          </div>

          <div className="bg-[#BAE6FD] border-2 border-[#0284C7] rounded-3xl p-5 space-y-2.5">
            <div className="flex items-center gap-2 text-base font-display font-bold text-[#0284C7]">
              <ShieldCheck className="w-5 h-5" />
              <span>{isEs ? 'Privacidad y Diseño Seguro' : 'Privacy & Safe Design'}</span>
            </div>
            <ul className="text-xs md:text-sm text-[#0F2942] font-semibold space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0284C7] shrink-0 mt-0.5" />
                <span>
                  {isEs
                    ? 'Guardado 100% local en este dispositivo: no recopilamos datos personales del menor.'
                    : '100% local device storage: zero collection of personal child data.'}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0284C7] shrink-0 mt-0.5" />
                <span>
                  {isEs
                    ? 'Sin publicidad, sin compras y sin recompensas aleatorias manipulativas.'
                    : 'Zero ads, zero purchases, and zero manipulative loot boxes.'}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0284C7] shrink-0 mt-0.5" />
                <span>
                  {isEs
                    ? 'Datos abiertos e imágenes de la NASA con fines educativos (sin patrocinio oficial).'
                    : 'Uses open NASA data and public photos for education (not endorsed by NASA).'}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Science Concepts Discovered List */}
        {saveData.scienceConceptsLearned.length > 0 && (
          <div className="bg-[#BAE6FD] border-2 border-[#FF8C42] rounded-3xl p-5 space-y-2">
            <h3 className="text-base font-display font-bold text-[#D9480F]">
              {isEs ? 'Conceptos científicos registrados' : 'Recorded Science Concepts'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {saveData.scienceConceptsLearned.map((item, idx) => (
                <div
                  key={idx}
                  className="text-xs font-semibold text-[#1A1E2E] p-3 rounded-xl bg-[#FFF8E7] border border-[#FFD166]"
                >
                  {item[language]}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
