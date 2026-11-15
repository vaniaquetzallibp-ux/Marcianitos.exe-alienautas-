import React, { useEffect, useMemo, useState } from 'react';
import {
  CheckCircle2,
  Droplets,
  HelpCircle,
  Mountain,
  Search,
  Thermometer,
  Volume2,
  Wind,
} from 'lucide-react';
import { UI_STRINGS } from '../i18n/translations';
import { Language, PlanetChapter } from '../types/game';
import { soundFX } from '../utils/audio';

interface PlanetDetectiveGameProps {
  language: Language;
  chapter: PlanetChapter;
  onSolved: () => void;
}

const CLUE_ICONS = [Mountain, Thermometer, Wind, Droplets];

function shuffleItems<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export const PlanetDetectiveGame: React.FC<PlanetDetectiveGameProps> = ({
  language,
  chapter,
  onSolved,
}) => {
  const t = UI_STRINGS[language];
  const [inspectedClues, setInspectedClues] = useState<number[]>([0]);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [solved, setSolved] = useState(false);

  const randomizedChoices = useMemo(
    () => shuffleItems(chapter.detectiveChoices),
    [chapter.id, chapter.detectiveChoices]
  );

  useEffect(() => {
    soundFX.speak(
      `${t.detectiveSub} ${chapter.detectiveTraitsQuestion[language]}`,
      language,
      520
    );
    return () => {
      soundFX.stopSpeaking();
    };
  }, [chapter.id, language, t.detectiveSub, chapter.detectiveTraitsQuestion]);

  const inspectClue = (idx: number) => {
    soundFX.click();
    if (!inspectedClues.includes(idx)) {
      setInspectedClues([...inspectedClues, idx]);
    }
    const clue = chapter.detectiveClues[idx];
    if (clue) {
      soundFX.speak(`${clue.label[language]}. ${clue.value[language]}`, language);
    }
  };

  const allInspected = inspectedClues.length === chapter.detectiveClues.length;
  const activeChoice = randomizedChoices.find((c) => c.id === selectedChoice);

  const handleSelectChoice = (choiceId: string, isCorrect: boolean, feedback: string) => {
    setSelectedChoice(choiceId);
    if (isCorrect) {
      soundFX.repairSuccess();
      setSolved(true);
    } else {
      soundFX.hint();
    }
    soundFX.speak(feedback, language);
  };

  return (
    <div className="max-w-4xl w-full mx-auto bg-[#E0F2FE] border-4 border-[#0284C7] rounded-[2rem] p-6 md:p-8 space-y-6 shadow-2xl text-[#0F2942]">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3.5 rounded-2xl bg-[#38BDF8] border-2 border-[#0F2942] text-[#0F2942] shrink-0">
            <Search className="w-8 h-8" />
          </div>
          <div>
            <div className="text-sm font-bold text-[#0284C7]">{t.detectiveTag}</div>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-[#0F2942]">
              {t.detectiveHeader.replace('{planet}', chapter.name[language])}
            </h2>
          </div>
        </div>
        <div className="text-sm font-bold text-[#0284C7] font-mono-nums hidden sm:block">
          {inspectedClues.length}/{chapter.detectiveClues.length} 🔍
        </div>
      </div>

      {/* Big Sensor Clue Cards with Visual Icons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {chapter.detectiveClues.map((clue, idx) => {
          const revealed = inspectedClues.includes(idx);
          const IconComp = CLUE_ICONS[idx % CLUE_ICONS.length];
          return (
            <button
              key={idx}
              type="button"
              onClick={() => inspectClue(idx)}
              className={`text-left p-5 rounded-3xl border-2 transition-all cursor-pointer flex items-start gap-4 ${
                revealed
                  ? 'bg-[#BAE6FD] border-[#0284C7]'
                  : 'bg-[#FF8C42] border-b-4 border-[#0F2942] hover:bg-[#FFD166] text-[#0F2942]'
              }`}
            >
              <div
                className={`p-3 rounded-2xl shrink-0 border-2 ${
                  revealed
                    ? 'bg-[#FFF8E7] border-[#0284C7] text-[#0284C7]'
                    : 'bg-[#FFF8E7] border-[#0F2942] text-[#0F2942]'
                }`}
              >
                <IconComp className="w-7 h-7" />
              </div>

              <div className="min-w-0">
                <div
                  className={`text-xs font-bold uppercase ${
                    revealed ? 'text-[#0284C7]' : 'text-[#0F2942]/85'
                  }`}
                >
                  {clue.category[language]}
                </div>
                {revealed ? (
                  <>
                    <div className="text-lg font-display font-bold text-[#0F2942] mt-0.5">
                      {clue.label[language]}
                    </div>
                    <p className="text-base font-semibold text-[#0F2942]/85 mt-0.5 leading-snug">
                      {clue.value[language]}
                    </p>
                  </>
                ) : (
                  <div className="py-2 text-lg font-display font-bold text-[#0F2942]">
                    {t.tapSensor}
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <div className="bg-[#BAE6FD] border-2 border-[#38BDF8] rounded-3xl p-5 md:p-6 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="text-xl md:text-2xl font-display font-bold text-[#0F2942]">
            {chapter.detectiveTraitsQuestion[language]}
          </div>
          <button
            type="button"
            onClick={() =>
              soundFX.speak(
                `${t.detectiveSub} ${chapter.detectiveTraitsQuestion[language]}`,
                language
              )
            }
            className="shrink-0 p-2.5 rounded-xl bg-[#E0F2FE] hover:bg-[#FFD166] border-2 border-[#0284C7] text-[#0284C7] cursor-pointer"
            aria-label={language === 'es' ? 'Escuchar instrucción' : 'Listen to instruction'}
          >
            <Volume2 className="w-5 h-5" />
          </button>
        </div>

        {!allInspected && (
          <div className="text-sm font-bold text-[#0284C7]">
            {t.detectiveTip
              .replace('{done}', String(inspectedClues.length))
              .replace('{total}', String(chapter.detectiveClues.length))}
          </div>
        )}

        <div className="space-y-3">
          {randomizedChoices.map((choice, idx) => {
            const isPicked = selectedChoice === choice.id;
            const letter = ['A', 'B', 'C'][idx] || '★';
            return (
              <button
                key={choice.id}
                type="button"
                disabled={solved}
                onClick={() =>
                  handleSelectChoice(choice.id, choice.isCorrect, choice.feedback[language])
                }
                className={`w-full text-left px-5 py-4 rounded-2xl border-2 border-b-4 text-base md:text-lg font-bold transition-all cursor-pointer flex items-center gap-3.5 ${
                  isPicked && choice.isCorrect
                    ? 'bg-[#38BDF8] border-[#0F2942] text-[#0F2942]'
                    : isPicked && !choice.isCorrect
                    ? 'bg-[#EF476F]/25 border-[#EF476F] text-[#0F2942]'
                    : 'bg-[#E0F2FE] border-[#0284C7] hover:bg-[#7DD3FC] text-[#0F2942]'
                }`}
              >
                <span className="w-9 h-9 rounded-xl bg-[#FFD166] border-2 border-[#0F2942] text-[#0F2942] flex items-center justify-center font-display font-bold text-lg shrink-0">
                  {letter}
                </span>
                <span>{choice.label[language]}</span>
              </button>
            );
          })}
        </div>

        {activeChoice && (
          <div
            className={`p-4 rounded-2xl text-base font-bold flex items-center gap-3 border-2 ${
              activeChoice.isCorrect
                ? 'bg-[#FFF8E7] border-[#0284C7] text-[#0284C7]'
                : 'bg-[#FFF8E7] border-[#FF8C42] text-[#1A1E2E]'
            }`}
          >
            {activeChoice.isCorrect ? (
              <CheckCircle2 className="w-6 h-6 shrink-0" />
            ) : (
              <HelpCircle className="w-6 h-6 text-[#D9480F] shrink-0" />
            )}
            <span>{activeChoice.feedback[language]}</span>
          </div>
        )}

        {solved && (
          <div className="pt-1 flex justify-end">
            <button
              type="button"
              onClick={() => {
                soundFX.stopSpeaking();
                soundFX.click();
                onSolved();
              }}
              className="px-8 py-4 rounded-2xl bg-[#FFD166] hover:bg-[#FF8C42] text-[#0F2942] border-2 border-b-4 border-[#0F2942] font-display font-bold text-xl cursor-pointer"
            >
              {t.goToExplore}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
