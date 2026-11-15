import React, { useEffect, useMemo, useState } from 'react';
import { CheckCircle2, HelpCircle, Lightbulb, Sparkles, Volume2 } from 'lucide-react';
import { pickPhrase, UI_STRINGS } from '../i18n/translations';
import { Language, PlanetId, ScienceQuestion } from '../types/game';
import { soundFX } from '../utils/audio';

interface ScienceQuizPanelProps {
  language: Language;
  planetId: PlanetId;
  planetName: string;
  questions: ScienceQuestion[];
  onCompleted: (unlockedFunFacts: { planetId: PlanetId; es: string; en: string }[]) => void;
}

function shuffleIndexOrder(length: number): number[] {
  const arr = Array.from({ length }, (_, i) => i);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export const ScienceQuizPanel: React.FC<ScienceQuizPanelProps> = ({
  language,
  planetId,
  planetName,
  questions,
  onCompleted,
}) => {
  const t = UI_STRINGS[language];
  const [qIndex, setQIndex] = useState(0);
  const [selectedOrigIdx, setSelectedOrigIdx] = useState<number | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showSimpleAnswer, setShowSimpleAnswer] = useState(false);
  const [facts, setFacts] = useState<{ planetId: PlanetId; es: string; en: string }[]>([]);

  const currentQ = questions[qIndex];

  const shuffledOptionIndices = useMemo(
    () => shuffleIndexOrder(currentQ.options[language].length),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentQ.id, qIndex, planetId]
  );

  useEffect(() => {
    soundFX.speak(currentQ.prompt[language], language, qIndex === 0 ? 520 : 120);
    return () => {
      soundFX.stopSpeaking();
    };
  }, [currentQ.id, currentQ.prompt, language, qIndex]);

  const handleSelectOption = (origIdx: number) => {
    if (isCorrect || showSimpleAnswer) return;
    setSelectedOrigIdx(origIdx);

    if (origIdx === currentQ.correctIndex) {
      soundFX.victory();
      setIsCorrect(true);
      setFacts((f) => [
        ...f,
        {
          planetId,
          es: `${currentQ.funFact.es}`,
          en: `${currentQ.funFact.en}`,
        },
      ]);
      soundFX.speak(
        `${currentQ.explanation[language]}. ${t.funFactSaved} ${currentQ.funFact[language]}`,
        language,
        380
      );
    } else {
      soundFX.hint();
      setAttempts((a) => a + 1);
      soundFX.speak(`${t.hintLabel} ${currentQ.hint[language]}`, language);
    }
  };

  const handleRevealFriendly = () => {
    soundFX.click();
    setShowSimpleAnswer(true);
    setFacts((f) => [
      ...f,
      {
        planetId,
        es: `${currentQ.funFact.es}`,
        en: `${currentQ.funFact.en}`,
      },
    ]);
    soundFX.speak(
      `${currentQ.explanation[language]}. ${t.funFactSaved} ${currentQ.funFact[language]}`,
      language
    );
  };

  const handleNext = () => {
    soundFX.stopSpeaking();
    soundFX.click();
    if (qIndex + 1 < questions.length) {
      setQIndex(qIndex + 1);
      setSelectedOrigIdx(null);
      setAttempts(0);
      setIsCorrect(false);
      setShowSimpleAnswer(false);
    } else {
      onCompleted(facts);
    }
  };

  const finishedQuestion = isCorrect || showSimpleAnswer;

  return (
    <div className="max-w-3xl w-full mx-auto bg-[#E0F2FE] border-4 border-[#0284C7] rounded-[2rem] p-6 md:p-8 space-y-5 shadow-2xl text-[#0F2942]">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-bold text-[#0284C7]">{t.quizTag}</div>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-[#0F2942]">
            {t.quizTitle.replace('{planet}', planetName)}
          </h2>
        </div>
        <span className="text-base font-display font-bold font-mono-nums text-[#0284C7]">
          {qIndex + 1}/{questions.length}
        </span>
      </div>

      <div className="bg-[#BAE6FD] border-2 border-[#38BDF8] rounded-3xl p-5 md:p-6 space-y-5">
        <div className="flex items-start justify-between gap-3">
          <p className="text-xl md:text-2xl font-display font-bold text-[#0F2942] leading-snug">
            {currentQ.prompt[language]}
          </p>
          <button
            type="button"
            onClick={() => soundFX.speak(currentQ.prompt[language], language)}
            className="shrink-0 p-2.5 rounded-xl bg-[#E0F2FE] hover:bg-[#FFD166] border-2 border-[#0284C7] text-[#0284C7] cursor-pointer"
            aria-label={language === 'es' ? 'Escuchar pregunta' : 'Listen to question'}
          >
            <Volume2 className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3">
          {shuffledOptionIndices.map((origIdx, displayIdx) => {
            const opt = currentQ.options[language][origIdx];
            const isPicked = selectedOrigIdx === origIdx;
            const isRightOption = origIdx === currentQ.correctIndex;
            const letter = ['A', 'B', 'C', 'D'][displayIdx] || '★';
            let btnStyle =
              'bg-[#E0F2FE] border-[#0284C7] hover:border-[#0F2942] hover:bg-[#FF8C42] hover:text-[#FFF8E7] text-[#0F2942]';
            if (finishedQuestion && isRightOption) {
              btnStyle = 'bg-[#38BDF8] border-[#0F2942] text-[#0F2942]';
            } else if (isPicked && !isRightOption) {
              btnStyle = 'bg-[#EF476F]/25 border-[#EF476F] text-[#0F2942]';
            }

            return (
              <button
                key={origIdx}
                type="button"
                disabled={finishedQuestion}
                onClick={() => handleSelectOption(origIdx)}
                className={`w-full text-left px-5 py-4 rounded-2xl border-2 border-b-4 font-bold text-base md:text-lg transition-all cursor-pointer flex items-center gap-3.5 ${btnStyle}`}
              >
                <span className="w-9 h-9 rounded-xl bg-[#FFD166] border-2 border-[#0F2942] text-[#0F2942] flex items-center justify-center font-display font-bold text-lg shrink-0">
                  {letter}
                </span>
                <span>{opt}</span>
              </button>
            );
          })}
        </div>

        {!finishedQuestion && attempts > 0 && (
          <div className="p-4 rounded-2xl bg-[#FFF8E7] border-2 border-[#FF8C42] space-y-2.5">
            <div className="flex items-center gap-2.5 text-base font-bold text-[#1A1E2E]">
              <Lightbulb className="w-6 h-6 text-[#D9480F] shrink-0" />
              <div>
                {t.hintLabel} {currentQ.hint[language]}
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-[#1A1E2E]/85 font-semibold">
              <span>{t.tryAgainOrSee}</span>
              <button
                type="button"
                onClick={handleRevealFriendly}
                className="underline font-bold text-[#0284C7] hover:text-[#D9480F] cursor-pointer"
              >
                {t.showSimpleAnswer}
              </button>
            </div>
          </div>
        )}

        {finishedQuestion && (
          <div className="space-y-3 pt-1">
            <div className="p-4 rounded-2xl bg-[#E0F2FE] border-2 border-[#0284C7] space-y-1.5">
              <div className="flex items-center gap-2 text-base font-display font-bold text-[#0284C7]">
                {isCorrect ? (
                  <>
                    <CheckCircle2 className="w-6 h-6" />
                    <span>
                      {t.correctBanner} {pickPhrase('correct', language)}
                    </span>
                  </>
                ) : (
                  <>
                    <HelpCircle className="w-6 h-6" />
                    <span>{t.simpleBanner}</span>
                  </>
                )}
              </div>
              <p className="text-base font-semibold text-[#0F2942]">
                {currentQ.explanation[language]}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FFF8E7] border-2 border-[#FF8C42] flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <Sparkles className="w-6 h-6 text-[#D9480F] shrink-0 mt-0.5" />
                <div className="text-base font-semibold text-[#1A1E2E]">
                  <strong className="text-[#D9480F]">{t.funFactSaved}</strong>{' '}
                  {currentQ.funFact[language]}
                </div>
              </div>
              <button
                type="button"
                onClick={() => soundFX.speak(currentQ.funFact[language], language)}
                className="shrink-0 p-2 rounded-xl bg-[#BAE6FD] hover:bg-[#38BDF8] border border-[#0284C7] text-[#0284C7] cursor-pointer"
                aria-label={language === 'es' ? 'Escuchar dato curioso' : 'Listen to fun fact'}
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            <div className="flex justify-end pt-1">
              <button
                type="button"
                onClick={handleNext}
                className="px-8 py-4 rounded-2xl bg-[#FFD166] hover:bg-[#FF8C42] text-[#0F2942] border-2 border-b-4 border-[#0F2942] font-display font-bold text-xl cursor-pointer"
              >
                {t.finishMission}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
