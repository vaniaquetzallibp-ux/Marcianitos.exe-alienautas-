import { useEffect, useState } from 'react';
import { GalaxyMap } from './components/GalaxyMap';
import { LanguageSelectScreen } from './components/LanguageSelectScreen';
import { LogbookModal } from './components/LogbookModal';
import { MissionOrchestrator } from './components/MissionOrchestrator';
import { ParentsTeachersModal } from './components/ParentsTeachersModal';
import { StoryIntroScreen } from './components/StoryIntroScreen';
import { TitleScreen } from './components/TitleScreen';
import { WorkshopModal } from './components/WorkshopModal';
import { updateMathStatsAdaptive } from './data/mathCurriculum';
import { PLANET_CHAPTERS } from './data/planets';
import {
  AlienCustomization,
  Language,
  MathLevel,
  MathSkillCategory,
  MissionHistoryEntry,
  PlanetId,
  SaveData,
  ScreenMode,
} from './types/game';
import { soundFX } from './utils/audio';
import { loadSaveData, persistSaveData, PLANET_ORDER } from './utils/storage';

export default function App() {
  const [saveData, setSaveData] = useState<SaveData>(() => loadSaveData());
  const [screen, setScreen] = useState<ScreenMode>(() =>
    saveData.languageSelected ? 'TITLE' : 'LANGUAGE'
  );
  const [activePlanetId, setActivePlanetId] = useState<PlanetId>('mercury');
  const [storyNextScreen, setStoryNextScreen] = useState<'TITLE' | 'MAP'>('TITLE');
  const [workshopOpen, setWorkshopOpen] = useState(false);
  const [logbookOpen, setLogbookOpen] = useState(false);
  const [adultsOpen, setAdultsOpen] = useState(false);

  useEffect(() => {
    soundFX.initAutoMusicOnGesture();
  }, []);

  useEffect(() => {
    soundFX.syncState(saveData.muted, saveData.musicEnabled);
    persistSaveData(saveData);
  }, [saveData]);

  const handleToggleMute = () => {
    setSaveData((prev) => ({ ...prev, muted: !prev.muted }));
  };

  const handleToggleMusic = () => {
    setSaveData((prev) => ({
      ...prev,
      musicEnabled: !prev.musicEnabled,
      muted: false,
    }));
  };

  const handleSelectLanguageInitial = (language: Language) => {
    setSaveData((prev) => ({
      ...prev,
      language,
      languageSelected: true,
    }));
    if (saveData.hasSeenStory) {
      setScreen('TITLE');
    } else {
      setStoryNextScreen('TITLE');
      setScreen('STORY');
    }
  };

  const handleCompleteStory = () => {
    setSaveData((prev) => ({ ...prev, hasSeenStory: true }));
    setScreen(storyNextScreen);
  };

  const handleChangeLanguage = (language: Language) => {
    setSaveData((prev) => ({
      ...prev,
      language,
      languageSelected: true,
    }));
  };

  const handleUpdateAlien = (alien: AlienCustomization) => {
    setSaveData((prev) => ({ ...prev, alien }));
  };

  const handleMathResult = (result: {
    skill: MathSkillCategory;
    solvedFirstTry: boolean;
    hadErrors: boolean;
  }) => {
    setSaveData((prev) => ({
      ...prev,
      mathProgress: updateMathStatsAdaptive(
        prev.mathProgress,
        result.skill,
        result.solvedFirstTry,
        result.hadErrors
      ),
    }));
  };

  const handleFinishMission = (result: {
    planetId: PlanetId;
    score: number;
    starsEarned: number;
    starsCollectedInFlight: number;
    mathLevel: MathLevel;
    collectedStamps: string[];
    newConcepts: { planetId: PlanetId; es: string; en: string }[];
    newFacts: { planetId: PlanetId; es: string; en: string }[];
    badgeId: string;
    unlockAccessoryId?: string;
  }) => {
    setSaveData((prev) => {
      const currProg = prev.planetProgress[result.planetId];
      const nextPlanetIdx = PLANET_ORDER.indexOf(result.planetId) + 1;
      const nextPlanetId =
        nextPlanetIdx > 0 && nextPlanetIdx < PLANET_ORDER.length
          ? PLANET_ORDER[nextPlanetIdx]
          : null;

      const updatedProgress = {
        ...prev.planetProgress,
        [result.planetId]: {
          unlocked: true,
          completed: true,
          bestScore: Math.max(currProg.bestScore, result.score),
          starsEarned: Math.max(currProg.starsEarned, result.starsEarned),
          timesCompleted: currProg.timesCompleted + 1,
        },
      };

      if (nextPlanetId) {
        updatedProgress[nextPlanetId] = {
          ...updatedProgress[nextPlanetId],
          unlocked: true,
        };
      }

      const newTotalStars = prev.totalStars + result.starsEarned;
      const completedChapters = Object.values(updatedProgress).filter((p) => p.completed).length;

      // Non-commercial automatic rocket upgrades unlocked through exploration & stars
      const nextThruster = Math.min(4, 1 + Math.floor((newTotalStars + completedChapters) / 4));
      const nextTank = Math.min(4, 1 + Math.floor(completedChapters / 3));
      const nextShield = Math.min(4, 1 + Math.floor((completedChapters + 1) / 3));

      const mergedStamps = Array.from(
        new Set([...prev.discoveryStamps, ...result.collectedStamps])
      );

      const factKeys = new Set(prev.discoveredFacts.map((f) => `${f.planetId}:${f.es}`));
      const mergedFacts = [
        ...prev.discoveredFacts,
        ...result.newFacts.filter((f) => !factKeys.has(`${f.planetId}:${f.es}`)),
      ];

      const conceptKeys = new Set(prev.scienceConceptsLearned.map((c) => `${c.planetId}:${c.es}`));
      const mergedConcepts = [
        ...prev.scienceConceptsLearned,
        ...result.newConcepts.filter((c) => !conceptKeys.has(`${c.planetId}:${c.es}`)),
      ];

      const mergedBadges = prev.unlockedBadges.includes(result.badgeId)
        ? prev.unlockedBadges
        : [...prev.unlockedBadges, result.badgeId];

      const mergedAccessories =
        result.unlockAccessoryId && !prev.unlockedAccessories.includes(result.unlockAccessoryId)
          ? [...prev.unlockedAccessories, result.unlockAccessoryId]
          : prev.unlockedAccessories;

      const newHistoryEntry: MissionHistoryEntry = {
        id: `${result.planetId}_${Date.now()}`,
        planetId: result.planetId,
        completedAt: new Date().toISOString(),
        score: result.score,
        starsEarned: result.starsEarned,
        starsCollectedInFlight: result.starsCollectedInFlight,
        mathLevel: result.mathLevel,
        stampsCount: result.collectedStamps.length,
      };

      return {
        ...prev,
        totalStars: newTotalStars,
        rocket: {
          thrusterLevel: Math.max(prev.rocket.thrusterLevel, nextThruster),
          tankLevel: Math.max(prev.rocket.tankLevel, nextTank),
          shieldLevel: Math.max(prev.rocket.shieldLevel, nextShield),
        },
        discoveryStamps: mergedStamps,
        discoveredFacts: mergedFacts,
        scienceConceptsLearned: mergedConcepts,
        unlockedBadges: mergedBadges,
        unlockedAccessories: mergedAccessories,
        planetProgress: updatedProgress,
        missionHistory: [newHistoryEntry, ...prev.missionHistory].slice(0, 50),
      };
    });

    setScreen('MAP');
  };

  const activeChapter =
    PLANET_CHAPTERS.find((p) => p.id === activePlanetId) || PLANET_CHAPTERS[0];

  return (
    <>
      {screen === 'LANGUAGE' && (
        <LanguageSelectScreen onSelectLanguage={handleSelectLanguageInitial} />
      )}

      {screen === 'STORY' && (
        <StoryIntroScreen
          saveData={saveData}
          onComplete={handleCompleteStory}
        />
      )}

      {screen === 'TITLE' && (
        <TitleScreen
          saveData={saveData}
          onStartExpedition={() => {
            if (!saveData.hasSeenStory) {
              setStoryNextScreen('MAP');
              setScreen('STORY');
            } else {
              setScreen('MAP');
            }
          }}
          onOpenStory={() => {
            setStoryNextScreen('MAP');
            setScreen('STORY');
          }}
          onOpenWorkshop={() => setWorkshopOpen(true)}
          onOpenLogbook={() => setLogbookOpen(true)}
          onOpenAdults={() => setAdultsOpen(true)}
          onChangeLanguage={handleChangeLanguage}
          onToggleMute={handleToggleMute}
          onToggleMusic={handleToggleMusic}
        />
      )}

      {screen === 'MAP' && (
        <GalaxyMap
          saveData={saveData}
          onSelectPlanet={(planetId) => {
            setActivePlanetId(planetId);
            setScreen('MISSION');
          }}
          onOpenWorkshop={() => setWorkshopOpen(true)}
          onOpenLogbook={() => setLogbookOpen(true)}
          onOpenAdults={() => setAdultsOpen(true)}
          onChangeLanguage={handleChangeLanguage}
          onBackToTitle={() => setScreen('TITLE')}
          onToggleMute={handleToggleMute}
          onToggleMusic={handleToggleMusic}
        />
      )}

      {screen === 'MISSION' && (
        <MissionOrchestrator
          chapter={activeChapter}
          saveData={saveData}
          onMathResult={handleMathResult}
          onExitToMap={() => setScreen('MAP')}
          onToggleMute={handleToggleMute}
          onToggleMusic={handleToggleMusic}
          onFinishMission={handleFinishMission}
        />
      )}

      {workshopOpen && (
        <WorkshopModal
          saveData={saveData}
          onUpdateAlien={handleUpdateAlien}
          onClose={() => setWorkshopOpen(false)}
        />
      )}

      {logbookOpen && (
        <LogbookModal saveData={saveData} onClose={() => setLogbookOpen(false)} />
      )}

      {adultsOpen && (
        <ParentsTeachersModal
          language={saveData.language}
          saveData={saveData}
          onClose={() => setAdultsOpen(false)}
        />
      )}
    </>
  );
}
