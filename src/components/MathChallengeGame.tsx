import React, { useEffect, useMemo, useState } from 'react';
import { Calculator, CheckCircle2, Lightbulb, Volume2 } from 'lucide-react';
import { MATH_LEVEL_LABELS, selectAdaptiveMathProblem } from '../data/mathCurriculum';
import { pickPhrase, UI_STRINGS } from '../i18n/translations';
import { Language, MathLevel, MathMechanicType, MathSkillCategory } from '../types/game';
import { soundFX } from '../utils/audio';

interface MathChallengeGameProps {
  language: Language;
  currentLevel: MathLevel;
  preferredMechanic: MathMechanicType;
  themePrompt: string;
  onSolved: (result: {
    skill: MathSkillCategory;
    solvedFirstTry: boolean;
    hadErrors: boolean;
  }) => void;
}

function shuffleIndices(length: number): number[] {
  const arr = Array.from({ length }, (_, i) => i);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export const MathChallengeGame: React.FC<MathChallengeGameProps> = ({
  language,
  currentLevel,
  preferredMechanic,
  themePrompt,
  onSolved,
}) => {
  const t = UI_STRINGS[language];
  const problem = useMemo(
    () => selectAdaptiveMathProblem(currentLevel, preferredMechanic),
    [currentLevel, preferredMechanic]
  );

  const rawOptions = problem.optionLabels
    ? problem.optionLabels[language]
    : problem.options.map((n) => String(n));

  const shuffledOrder = useMemo(
    () => shuffleIndices(rawOptions.length),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [problem.id]
  );

  const [selectedOrigIdx, setSelectedOrigIdx] = useState<number | null>(null);
  const [hadErrors, setHadErrors] = useState(false);
  const [solved, setSolved] = useState(false);

  useEffect(() => {
    soundFX.speak(problem.question[language], language, 520);
    return () => {
      soundFX.stopSpeaking();
    };
  }, [problem.id, problem.question, language]);

  const handleOption = (origIdx: number) => {
    if (solved) return;
    setSelectedOrigIdx(origIdx);
    if (origIdx === problem.correctIndex) {
      soundFX.repairSuccess();
      setSolved(true);
      soundFX.speak(problem.explanation[language], language, 320);
    } else {
      soundFX.hint();
      setHadErrors(true);
      soundFX.speak(`${t.hintLabel} ${problem.hint[language]}`, language);
    }
  };

  return (
    <div className="max-w-3xl w-full mx-auto bg-[#E0F2FE] border-4 border-[#0284C7] rounded-[2rem] p-6 md:p-8 space-y-5 shadow-2xl text-[#0F2942]">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3.5">
          <div className="p-3.5 rounded-2xl bg-[#FF8C42] border-2 border-[#0F2942] text-[#FFF8E7] shrink-0">
            <Calculator className="w-8 h-8" />
          </div>
          <div>
            <div className="text-sm font-bold text-[#0284C7]">{problem.title[language]}</div>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-[#0F2942]">
              {themePrompt}
            </h2>
          </div>
        </div>

        <div className="text-xs font-bold text-[#0F2942] bg-[#FFD166] border-2 border-[#0F2942] px-3.5 py-1.5 rounded-xl">
          {MATH_LEVEL_LABELS[problem.level][language]}
        </div>
      </div>

      {/* Rich Visual Graphic Card (Zero Text Overload) */}
      <div className="bg-[#BAE6FD] border-2 border-[#38BDF8] rounded-3xl p-5 md:p-6 space-y-5">
        {problem.visualAid.type === 'fraction' ? (
          <div className="flex flex-col items-center gap-2 py-2">
            <div className="grid grid-cols-8 gap-1.5 w-full max-w-md">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className={`h-12 rounded-xl border-2 ${
                    i < 4
                      ? 'bg-[#38BDF8] border-[#0F2942]'
                      : 'bg-[#E0F2FE] border-[#0284C7]/45'
                  }`}
                />
              ))}
            </div>
            <span className="text-base font-display font-bold text-[#0F2942]">
              4 / 8
            </span>
          </div>
        ) : problem.visualAid.type === 'sequence' ? (
          <div className="flex flex-wrap items-center justify-center gap-2.5 py-2">
            {problem.visualAid.items.map((item, idx) => (
              <React.Fragment key={idx}>
                <div
                  className={`w-16 h-16 rounded-2xl border-2 flex items-center justify-center text-3xl font-display font-bold font-mono-nums ${
                    item === '?'
                      ? 'bg-[#FFD166] text-[#0F2942] border-[#0F2942]'
                      : 'bg-[#FFF8E7] text-[#0F2942] border-[#0284C7]'
                  }`}
                >
                  {item}
                </div>
                {idx < problem.visualAid.items.length - 1 && (
                  <span className="text-2xl font-bold text-[#0284C7]">→</span>
                )}
              </React.Fragment>
            ))}
          </div>
        ) : problem.visualAid.type === 'grid' && problem.id === 'm1_geometry' ? (
          <div className="flex flex-wrap items-center justify-center gap-6 py-2">
            <div className="flex flex-col items-center gap-1.5 p-3 rounded-2xl bg-[#FFF8E7] border-2 border-[#0284C7]">
              <svg width="58" height="58" viewBox="0 0 60 60">
                <polygon points="30,6 54,52 6,52" fill="#FFD166" stroke="#0F2942" strokeWidth="3" />
              </svg>
              <span className="text-sm font-bold text-[#0F2942]">3</span>
            </div>
            <div className="flex flex-col items-center gap-1.5 p-3 rounded-2xl bg-[#FFF8E7] border-2 border-[#0284C7]">
              <svg width="58" height="58" viewBox="0 0 60 60">
                <rect x="8" y="8" width="44" height="44" rx="4" fill="#38BDF8" stroke="#0F2942" strokeWidth="3" />
              </svg>
              <span className="text-sm font-bold text-[#D9480F]">?</span>
            </div>
            <div className="flex flex-col items-center gap-1.5 p-3 rounded-2xl bg-[#FFF8E7] border-2 border-[#0284C7]">
              <svg width="58" height="58" viewBox="0 0 60 60">
                <polygon points="30,6 52,18 52,42 30,54 8,42 8,18" fill="#FF8C42" stroke="#0F2942" strokeWidth="3" />
              </svg>
              <span className="text-sm font-bold text-[#0F2942]">6</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap items-center justify-center gap-3.5 py-2">
            {problem.visualAid.items.map((item, idx) => (
              <div
                key={idx}
                className="px-5 py-3.5 rounded-2xl bg-[#FFF8E7] border-2 border-[#0284C7] text-xl md:text-2xl font-display font-bold text-[#0F2942] font-mono-nums shadow"
              >
                {item}
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center justify-center gap-3">
          <h3 className="text-xl md:text-2xl font-display font-bold text-[#0F2942] text-center leading-snug">
            {problem.question[language]}
          </h3>
          <button
            type="button"
            onClick={() => soundFX.speak(problem.question[language], language)}
            className="shrink-0 p-2.5 rounded-xl bg-[#E0F2FE] hover:bg-[#FFD166] border-2 border-[#0284C7] text-[#0284C7] cursor-pointer"
            aria-label={language === 'es' ? 'Escuchar pregunta' : 'Listen to question'}
          >
            <Volume2 className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {shuffledOrder.map((origIdx) => {
            const label = rawOptions[origIdx];
            const isPicked = selectedOrigIdx === origIdx;
            const isRight = origIdx === problem.correctIndex;
            let style =
              'bg-[#E0F2FE] border-[#0284C7] hover:bg-[#FF8C42] hover:text-[#FFF8E7] hover:border-[#0F2942] text-[#0F2942]';
            if (solved && isRight) {
              style = 'bg-[#38BDF8] border-[#0F2942] text-[#0F2942]';
            } else if (isPicked && !isRight) {
              style = 'bg-[#EF476F]/25 border-[#EF476F] text-[#0F2942]';
            }

            return (
              <button
                key={origIdx}
                type="button"
                disabled={solved}
                onClick={() => handleOption(origIdx)}
                className={`py-5 px-5 rounded-3xl border-2 border-b-[6px] text-2xl md:text-3xl font-display font-bold transition-all active:translate-y-0.5 cursor-pointer font-mono-nums ${style}`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Non-punitive visual hint */}
        {!solved && hadErrors && (
          <div className="p-4 rounded-2xl bg-[#FFF8E7] border-2 border-[#FF8C42] flex items-center gap-3 text-base md:text-lg font-bold text-[#1A1E2E]">
            <Lightbulb className="w-6 h-6 text-[#D9480F] shrink-0" />
            <div>
              {t.hintLabel} {problem.hint[language]}
            </div>
          </div>
        )}

        {/* Celebration */}
        {solved && (
          <div className="p-5 rounded-2xl bg-[#FFF8E7] border-2 border-[#0284C7] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-base md:text-lg text-[#0F2942] font-bold">
              <CheckCircle2 className="w-7 h-7 text-[#0284C7] shrink-0" />
              <span>
                {pickPhrase('correct', language)} {problem.explanation[language]}
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                soundFX.stopSpeaking();
                soundFX.click();
                onSolved({
                  skill: problem.skill,
                  solvedFirstTry: !hadErrors,
                  hadErrors,
                });
              }}
              className="shrink-0 px-8 py-4 rounded-2xl bg-[#FFD166] hover:bg-[#FF8C42] text-[#0F2942] border-2 border-b-4 border-[#0F2942] font-display font-bold text-xl cursor-pointer"
            >
              {t.continueExpedition}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
