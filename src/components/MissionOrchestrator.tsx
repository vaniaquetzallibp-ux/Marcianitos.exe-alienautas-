import React, { useState } from 'react';
import {
  ArrowLeft,
  Award,
  Calculator,
  Compass,
  HelpCircle,
  Music,
  Rocket,
  Search,
  Sparkles,
  Star,
  Volume2,
  VolumeX,
  Wrench,
} from 'lucide-react';
import { getCrewCharacterAsset } from '../assets/assetManifest';
import { UI_STRINGS } from '../i18n/translations';
import {
  MathSkillCategory,
  MissionPhase,
  OriginalCharacterId,
  PlanetChapter,
  PlanetId,
  SaveData,
} from '../types/game';
import { AlienAvatar } from './AlienAvatar';
import { AlienNarratorBar } from './AlienNarratorBar';
import { MathChallengeGame } from './MathChallengeGame';
import { PlanetDetectiveGame } from './PlanetDetectiveGame';
import { PlanetExplorationLab } from './PlanetExplorationLab';
import { RocketSprite } from './RocketSprite';
import { ScienceQuizPanel } from './ScienceQuizPanel';
import { ShipRepairGame } from './ShipRepairGame';
import { SpaceRunnerGame } from './SpaceRunnerGame';
import { AlienVoiceMood, soundFX } from '../utils/audio';

interface MissionOrchestratorProps {
  chapter: PlanetChapter;
  saveData: SaveData;
  onMathResult: (result: {
    skill: MathSkillCategory;
    solvedFirstTry: boolean;
    hadErrors: boolean;
  }) => void;
  onExitToMap: () => void;
  onToggleMute: () => void;
  onToggleMusic: () => void;
  onFinishMission: (result: {
    planetId: PlanetChapter['id'];
    score: number;
    starsEarned: number;
    starsCollectedInFlight: number;
    mathLevel: SaveData['mathProgress']['currentLevel'];
    collectedStamps: string[];
    newConcepts: { planetId: PlanetId; es: string; en: string }[];
    newFacts: { planetId: PlanetId; es: string; en: string }[];
    badgeId: string;
    unlockAccessoryId?: string;
  }) => void;
}

export const MissionOrchestrator: React.FC<MissionOrchestratorProps> = ({
  chapter,
  saveData,
  onMathResult,
  onExitToMap,
  onToggleMute,
  onToggleMusic,
  onFinishMission,
}) => {
  const lang = saveData.language;
  const t = UI_STRINGS[lang];
  const isEs = lang === 'es';

  const [phase, setPhase] = useState<MissionPhase>('INTRO');
  const [runnerStats, setRunnerStats] = useState({
    score: 0,
    starsCollected: 0,
    rocksCollected: 0,
  });
  const [collectedStamps, setCollectedStamps] = useState<string[]>([]);
  const [collectedConcepts, setCollectedConcepts] = useState<
    { planetId: PlanetId; es: string; en: string }[]
  >([]);
  const [unlockedFacts, setUnlockedFacts] = useState<
    { planetId: PlanetId; es: string; en: string }[]
  >([]);

  const phaseSteps: { id: MissionPhase; label: string; Icon: React.FC<{ className?: string }> }[] = [
    { id: 'INTRO', label: t.stepIntro, Icon: Sparkles },
    { id: 'SPACE_TRAVEL', label: t.stepTravel, Icon: Rocket },
    { id: 'SHIP_REPAIR', label: t.stepRepair, Icon: Wrench },
    { id: 'MATH_CHALLENGE', label: t.stepMath, Icon: Calculator },
    { id: 'DETECTIVE', label: t.stepDetective, Icon: Search },
    { id: 'EXPLORATION', label: t.stepExplore, Icon: Compass },
    { id: 'QUIZ', label: t.stepQuiz, Icon: HelpCircle },
  ];

  const starsEarned =
    runnerStats.starsCollected + runnerStats.rocksCollected >= 7
      ? 3
      : runnerStats.starsCollected + runnerStats.rocksCollected >= 3
      ? 2
      : 1;

  const phaseCompanionId: Partial<Record<MissionPhase, OriginalCharacterId>> = {
    SPACE_TRAVEL: 'astronaut',
    SHIP_REPAIR: 'robot',
    MATH_CHALLENGE: 'professor',
    DETECTIVE: 'explorer',
    EXPLORATION: 'athlete',
    QUIZ: 'professor',
  };

  const activeCompanionId = phaseCompanionId[phase];
  const activeCompanion = activeCompanionId ? getCrewCharacterAsset(activeCompanionId) : null;

  const phaseNarration: Record<MissionPhase, { text: string; mood: AlienVoiceMood }> = {
    INTRO: {
      text: t.narratorIntro.replace('{planet}', chapter.name[lang]),
      mood: 'happy',
    },
    SPACE_TRAVEL: {
      text: t.narratorTravel
        .replace('{planet}', chapter.name[lang])
        .replace('{rock}', chapter.runnerConfig.collectibleRock.name[lang]),
      mood: 'happy',
    },
    SHIP_REPAIR: {
      text: t.narratorRepair,
      mood: 'alert',
    },
    MATH_CHALLENGE: {
      text: t.narratorMath,
      mood: 'curious',
    },
    DETECTIVE: {
      text: t.narratorDetective.replace('{planet}', chapter.name[lang]),
      mood: 'curious',
    },
    EXPLORATION: {
      text: t.narratorExplore.replace('{planet}', chapter.name[lang]),
      mood: 'happy',
    },
    QUIZ: {
      text: t.narratorQuiz.replace('{planet}', chapter.name[lang]),
      mood: 'curious',
    },
    VICTORY: {
      text: t.narratorVictory.replace('{planet}', chapter.name[lang]),
      mood: 'victory',
    },
  };

  const activeNarration = phaseNarration[phase];

  const completeAll = (facts: { planetId: PlanetId; es: string; en: string }[]) => {
    setUnlockedFacts(facts);
    setPhase('VICTORY');
    soundFX.victory();
  };

  return (
    <div className="min-h-screen w-full bg-[#7DD3FC] text-[#0F2942] flex flex-col">
      {/* Visual Icon Step Top Bar */}
      <header className="w-full border-b-4 border-[#0284C7] bg-[#38BDF8] px-4 md:px-8 py-3 flex flex-wrap items-center justify-between gap-3 shadow">
        <button
          type="button"
          onClick={() => {
            soundFX.click();
            onExitToMap();
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#E0F2FE] hover:bg-[#FF8C42] text-[#0F2942] border-2 border-[#0284C7] text-sm md:text-base font-display font-bold cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>{t.backToMap}</span>
        </button>

        <div className="flex flex-wrap items-center gap-1.5">
          {phaseSteps.map((st, idx) => {
            const isActive = phase === st.id;
            const StepIcon = st.Icon;
            return (
              <span
                key={st.id}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs md:text-sm font-display font-bold ${
                  isActive
                    ? 'bg-[#FFD166] text-[#0F2942] border-2 border-[#0F2942] shadow'
                    : 'bg-[#E0F2FE] text-[#0F2942]/80'
                }`}
              >
                <StepIcon className="w-4 h-4" />
                <span className="hidden md:inline">{st.label}</span>
                <span className="md:hidden">{idx + 1}</span>
              </span>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <div className="text-base md:text-lg font-display font-bold text-[#0F2942] mr-1">
            {chapter.name[lang]}
          </div>
          <button
            type="button"
            onClick={onToggleMusic}
            className="p-2 rounded-xl bg-[#E0F2FE] hover:bg-[#FFD166] border-2 border-[#0284C7] text-[#0F2942] cursor-pointer"
            title={saveData.musicEnabled && !saveData.muted ? t.musicOn : t.musicOff}
            aria-label={t.musicOn}
          >
            <Music
              className={`w-4 h-4 ${
                saveData.musicEnabled && !saveData.muted ? 'text-[#0284C7]' : 'text-[#0F2942]/40'
              }`}
            />
          </button>
          <button
            type="button"
            onClick={onToggleMute}
            className="p-2 rounded-xl bg-[#E0F2FE] hover:bg-[#FFD166] border-2 border-[#0284C7] text-[#0F2942] cursor-pointer"
            aria-label={saveData.muted ? t.soundOn : t.soundOff}
          >
            {saveData.muted ? (
              <VolumeX className="w-4 h-4 text-[#D9480F]" />
            ) : (
              <Volume2 className="w-4 h-4 text-[#0284C7]" />
            )}
          </button>
        </div>
      </header>

      {/* Active Phase Workspace */}
      <main className="flex-1 w-full px-4 md:px-8 py-5 flex flex-col items-center justify-center gap-4">
        <AlienNarratorBar
          language={lang}
          text={activeNarration.text}
          speakerName={activeCompanion ? activeCompanion.name[lang] : saveData.alien.explorerName}
          companionRole={activeCompanion?.role[lang]}
          companionImage={activeCompanion?.image}
          alien={activeCompanion ? undefined : saveData.alien}
          mood={activeNarration.mood}
          narrationKey={`${chapter.id}_${phase}_${lang}`}
        />

        {phase === 'INTRO' && (
          <div className="max-w-3xl w-full bg-[#E0F2FE] border-4 border-[#0284C7] rounded-[2rem] p-6 md:p-8 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4 shrink-0">
                <AlienAvatar alien={saveData.alien} size={112} />
                <RocketSprite upgrades={saveData.rocket} size={112} />
              </div>

              <div className="space-y-1 text-center sm:text-left flex-1">
                <div className="text-sm font-bold text-[#0284C7]">{chapter.subtitle[lang]}</div>
                <h1 className="text-4xl md:text-5xl font-display font-bold text-[#0F2942]">
                  {chapter.name[lang]}
                </h1>
              </div>

              <div className="relative w-24 h-24 shrink-0 hidden md:flex items-center justify-center">
                {chapter.hasRings && (
                  <div
                    className="absolute w-28 h-8 rounded-full border-4 pointer-events-none"
                    style={{ borderColor: chapter.palette.accent, transform: 'rotate(-16deg)' }}
                  />
                )}
                <div
                  className="w-20 h-20 rounded-full border-2 border-[#0F2942]/35 shadow-xl"
                  style={{
                    background: `radial-gradient(circle at 30% 30%, ${chapter.palette.atmosphere}, ${chapter.palette.primary} 55%, ${chapter.palette.secondary} 100%)`,
                  }}
                />
              </div>
            </div>

            {/* Comic Speech Bubble (Short & Visual) */}
            <div className="bg-[#FFF8E7] border-2 border-[#FF8C42] rounded-3xl p-5 md:p-6 space-y-1.5">
              <div className="text-sm font-bold text-[#D9480F]">
                {saveData.alien.explorerName}:
              </div>
              <p className="text-xl md:text-2xl font-display font-bold text-[#1A1E2E] leading-snug">
                “{chapter.crewDialogue[lang]}”
              </p>
            </div>

            <div className="flex justify-center sm:justify-end">
              <button
                type="button"
                onClick={() => {
                  soundFX.boost();
                  setPhase('SPACE_TRAVEL');
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-9 py-5 rounded-3xl bg-[#FFD166] hover:bg-[#FF8C42] text-[#0F2942] border-2 border-b-[6px] border-[#0F2942] font-display font-bold text-2xl transition-all active:translate-y-1 cursor-pointer shadow-xl"
              >
                <Rocket className="w-7 h-7" />
                <span>{t.startEngines}</span>
              </button>
            </div>
          </div>
        )}

        {phase === 'SPACE_TRAVEL' && (
          <SpaceRunnerGame
            language={lang}
            chapter={chapter}
            rocketUpgrades={saveData.rocket}
            onVictory={(stats) => {
              setRunnerStats(stats);
              setPhase('SHIP_REPAIR');
            }}
          />
        )}

        {phase === 'SHIP_REPAIR' && (
          <ShipRepairGame
            language={lang}
            emergencyType={chapter.emergencyType}
            title={chapter.emergencyTitle[lang]}
            brief={chapter.emergencyBrief[lang]}
            onRepaired={() => setPhase('MATH_CHALLENGE')}
          />
        )}

        {phase === 'MATH_CHALLENGE' && (
          <MathChallengeGame
            language={lang}
            currentLevel={saveData.mathProgress.currentLevel}
            preferredMechanic={chapter.mathMechanic}
            themePrompt={chapter.mathThemePrompt[lang]}
            onSolved={(res) => {
              onMathResult(res);
              setPhase('DETECTIVE');
            }}
          />
        )}

        {phase === 'DETECTIVE' && (
          <PlanetDetectiveGame
            language={lang}
            chapter={chapter}
            onSolved={() => setPhase('EXPLORATION')}
          />
        )}

        {phase === 'EXPLORATION' && (
          <PlanetExplorationLab
            language={lang}
            chapter={chapter}
            onCompleteExploration={(stamps, concepts) => {
              setCollectedStamps(stamps);
              setCollectedConcepts(
                concepts.map((c) => ({
                  planetId: chapter.id,
                  es: c.es,
                  en: c.en,
                }))
              );
              setPhase('QUIZ');
            }}
          />
        )}

        {phase === 'QUIZ' && (
          <ScienceQuizPanel
            language={lang}
            planetId={chapter.id}
            planetName={chapter.name[lang]}
            questions={chapter.questions}
            onCompleted={(facts) => completeAll(facts)}
          />
        )}

        {phase === 'VICTORY' && (
          <div className="max-w-2xl w-full bg-[#E0F2FE] border-4 border-[#0284C7] rounded-[2rem] p-7 md:p-9 text-center space-y-6 shadow-2xl">
            <div className="flex justify-center gap-3">
              {[1, 2, 3].map((s) => (
                <Star
                  key={s}
                  className={`w-14 h-14 ${
                    s <= starsEarned ? 'text-[#FFD166] fill-[#FFD166]' : 'text-[#0F2942]/15'
                  }`}
                />
              ))}
            </div>

            <div className="space-y-2">
              <div className="text-base font-display font-bold text-[#0284C7]">
                {t.missionCompleteTag}
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-[#0F2942]">
                {t.missionCompleteTitle.replace('{planet}', chapter.name[lang])}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              <div className="p-5 rounded-2xl bg-[#BAE6FD] border-2 border-[#38BDF8] space-y-1">
                <div className="text-sm font-bold text-[#0F2942] flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#D9480F]" />
                  <span>{t.starsLabel}</span>
                </div>
                <div className="text-3xl font-display font-bold text-[#0F2942] font-mono-nums">
                  +{starsEarned} ⭐ · {runnerStats.rocksCollected} 💎
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#BAE6FD] border-2 border-[#38BDF8] space-y-1">
                <div className="text-sm font-bold text-[#0F2942] flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#0284C7]" />
                  <span>{t.badgesLabel}</span>
                </div>
                <div className="text-xl font-display font-bold text-[#0284C7]">
                  {chapter.badge.name[lang]}
                </div>
              </div>
            </div>

            {collectedStamps.length > 0 && (
              <div className="p-4 rounded-2xl bg-[#FFF8E7] border-2 border-[#FF8C42] text-left space-y-1">
                <div className="text-sm font-bold text-[#D9480F] flex items-center gap-2">
                  <Compass className="w-5 h-5" />
                  <span>{isEs ? 'Nuevos sellos:' : 'New stamps:'}</span>
                </div>
                <div className="text-base font-bold text-[#1A1E2E]">
                  {collectedStamps.join(' · ')}
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={() => {
                soundFX.click();
                onFinishMission({
                  planetId: chapter.id,
                  score: runnerStats.score + starsEarned * 120,
                  starsEarned,
                  starsCollectedInFlight: runnerStats.starsCollected,
                  mathLevel: saveData.mathProgress.currentLevel,
                  collectedStamps,
                  newConcepts: collectedConcepts,
                  newFacts: unlockedFacts,
                  badgeId: chapter.badge.id,
                  unlockAccessoryId: chapter.unlockAccessoryId,
                });
              }}
              className="w-full py-5 rounded-3xl bg-[#FFD166] hover:bg-[#FF8C42] text-[#0F2942] border-2 border-b-[6px] border-[#0F2942] font-display font-bold text-2xl transition-all active:translate-y-1 cursor-pointer"
            >
              {t.saveAndReturn}
            </button>
          </div>
        )}
      </main>
    </div>
  );
};
