import React, { useEffect, useState } from 'react';
import { Award, Compass, Sparkles, Volume2 } from 'lucide-react';
import { UI_STRINGS } from '../i18n/translations';
import { Language, PlanetChapter } from '../types/game';
import { soundFX } from '../utils/audio';

interface PlanetExplorationLabProps {
  language: Language;
  chapter: PlanetChapter;
  onCompleteExploration: (stamps: string[], concepts: { es: string; en: string }[]) => void;
}

export const PlanetExplorationLab: React.FC<PlanetExplorationLabProps> = ({
  language,
  chapter,
  onCompleteExploration,
}) => {
  const t = UI_STRINGS[language];
  const [scannedIds, setScannedIds] = useState<string[]>([]);
  const [activeSpotId, setActiveSpotId] = useState<string | null>(null);

  useEffect(() => {
    soundFX.speak(`${t.selectPointHint} ${t.selectPointSub}`, language, 520);
    return () => {
      soundFX.stopSpeaking();
    };
  }, [chapter.id, language, t.selectPointHint, t.selectPointSub]);

  const handleScanSpot = (spotId: string) => {
    soundFX.starCollect();
    setActiveSpotId(spotId);
    if (!scannedIds.includes(spotId)) {
      setScannedIds([...scannedIds, spotId]);
    }
    const spot = chapter.explorationSpots.find((s) => s.id === spotId);
    if (spot) {
      soundFX.speak(`${spot.title[language]}. ${spot.discoveryText[language]}`, language);
    }
  };

  const activeSpot = chapter.explorationSpots.find((s) => s.id === activeSpotId);
  const allScanned = scannedIds.length === chapter.explorationSpots.length;

  const collectedStamps = scannedIds
    .map((id) => chapter.explorationSpots.find((s) => s.id === id)?.discoveryStamp[language])
    .filter((s): s is string => Boolean(s));

  const collectedConcepts = scannedIds
    .map((id) => chapter.explorationSpots.find((s) => s.id === id))
    .filter((s): s is NonNullable<typeof s> => Boolean(s))
    .map((s) => ({
      es: `${chapter.name.es} — ${s.title.es}: ${s.discoveryText.es}`,
      en: `${chapter.name.en} — ${s.title.en}: ${s.discoveryText.en}`,
    }));

  return (
    <div className="max-w-4xl w-full mx-auto bg-[#E0F2FE] border-4 border-[#0284C7] rounded-[2rem] p-6 md:p-8 space-y-6 shadow-2xl text-[#0F2942]">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3.5 rounded-2xl bg-[#FF8C42] border-2 border-[#0F2942] text-[#FFF8E7] shrink-0">
            <Compass className="w-8 h-8" />
          </div>
          <div>
            <div className="text-sm font-bold text-[#0284C7]">{t.exploreTag}</div>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-[#0F2942]">
              {chapter.explorationLabTitle[language]}
            </h2>
          </div>
        </div>
        <div className="text-base font-display font-bold font-mono-nums text-[#0284C7] shrink-0">
          {scannedIds.length}/{chapter.explorationSpots.length} ⭐
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
        <div className="md:col-span-6 relative h-80 rounded-3xl bg-[#0B2239] border-2 border-[#0284C7] overflow-hidden flex items-center justify-center">
          {chapter.hasRings && (
            <div
              className="absolute w-72 h-20 rounded-full border-4 pointer-events-none"
              style={{ borderColor: chapter.palette.accent, transform: 'rotate(-16deg)' }}
            />
          )}
          <div
            className="w-48 h-48 rounded-full border-2 border-white/30 shadow-2xl"
            style={{
              background: `radial-gradient(circle at 30% 30%, ${chapter.palette.atmosphere}, ${chapter.palette.primary} 55%, ${chapter.palette.secondary} 100%)`,
            }}
          />

          {chapter.explorationSpots.map((spot, idx) => {
            const isScanned = scannedIds.includes(spot.id);
            const isActive = activeSpotId === spot.id;
            return (
              <button
                key={spot.id}
                type="button"
                onClick={() => handleScanSpot(spot.id)}
                style={{ left: `${spot.xPercent}%`, top: `${spot.yPercent}%` }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 px-4 py-2.5 rounded-2xl border-2 border-b-4 text-sm font-display font-bold transition-transform cursor-pointer shadow-lg ${
                  isActive
                    ? 'scale-110 bg-[#38BDF8] text-[#0F2942] border-[#FFF8E7]'
                    : isScanned
                    ? 'bg-[#E0F2FE] text-[#0284C7] border-[#38BDF8]'
                    : 'bg-[#FFD166] text-[#0F2942] border-[#FFF8E7] hover:scale-105'
                }`}
              >
                {isScanned ? `${idx + 1} ✓` : `🔍 ${idx + 1}`}
              </button>
            );
          })}
        </div>

        <div className="md:col-span-6 bg-[#BAE6FD] border-2 border-[#38BDF8] rounded-3xl p-5 md:p-6 flex flex-col justify-between space-y-4">
          {activeSpot ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <div className="text-xs font-bold text-[#0284C7]">NASA · {activeSpot.nasaMissionRef}</div>
                <button
                  type="button"
                  onClick={() =>
                    soundFX.speak(
                      `${activeSpot.title[language]}. ${activeSpot.discoveryText[language]}`,
                      language
                    )
                  }
                  className="p-2 rounded-xl bg-[#E0F2FE] hover:bg-[#FFD166] border-2 border-[#0284C7] text-[#0284C7] cursor-pointer"
                  aria-label={language === 'es' ? 'Escuchar descubrimiento' : 'Listen to discovery'}
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
              <h3 className="text-2xl font-display font-bold text-[#0F2942]">
                {activeSpot.title[language]}
              </h3>
              <p className="text-base md:text-lg font-semibold text-[#0F2942]/90 leading-snug">
                {activeSpot.discoveryText[language]}
              </p>

              <div className="p-4 rounded-2xl bg-[#FFF8E7] border-2 border-[#FF8C42] flex items-center gap-3">
                <Award className="w-7 h-7 text-[#D9480F] shrink-0" />
                <div>
                  <div className="text-xs font-bold text-[#D9480F]">{t.stampUnlocked}</div>
                  <div className="text-base font-display font-bold text-[#1A1E2E]">
                    {activeSpot.discoveryStamp[language]}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-8 space-y-3">
              <Sparkles className="w-12 h-12 text-[#D9480F]" />
              <div className="text-2xl font-display font-bold text-[#0F2942]">
                {t.selectPointHint}
              </div>
              <p className="text-base font-semibold text-[#0284C7]">{t.selectPointSub}</p>
            </div>
          )}

          <div className="pt-2 flex items-center justify-between gap-3">
            <span className="text-sm font-bold font-mono-nums text-[#0F2942]">
              {t.scannedZones
                .replace('{done}', String(scannedIds.length))
                .replace('{total}', String(chapter.explorationSpots.length))}
            </span>
            {allScanned && (
              <button
                type="button"
                onClick={() => {
                  soundFX.stopSpeaking();
                  soundFX.click();
                  onCompleteExploration(collectedStamps, collectedConcepts);
                }}
                className="px-7 py-3.5 rounded-2xl bg-[#FFD166] hover:bg-[#FF8C42] text-[#0F2942] border-2 border-b-4 border-[#0F2942] font-display font-bold text-lg cursor-pointer"
              >
                {t.goToQuiz}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
