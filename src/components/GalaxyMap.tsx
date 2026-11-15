import React, { useState } from 'react';
import {
  Award,
  BookOpen,
  Calculator,
  CheckCircle2,
  Compass,
  Globe,
  GraduationCap,
  HelpCircle,
  Home,
  Lock,
  Music,
  Paintbrush,
  Play,
  Rocket,
  RotateCcw,
  Search,
  Star,
  Volume2,
  VolumeX,
  Wrench,
} from 'lucide-react';
import { GAME_ART_ASSETS, HOME_PLANET_PALETTE } from '../assets/assetManifest';
import { PLANET_CHAPTERS } from '../data/planets';
import { UI_STRINGS } from '../i18n/translations';
import { Language, PlanetChapter, PlanetId, SaveData } from '../types/game';
import { AlienAvatar } from './AlienAvatar';
import { AlienNarratorBar } from './AlienNarratorBar';
import { AlienVoiceMood, soundFX } from '../utils/audio';

interface GalaxyMapProps {
  saveData: SaveData;
  onSelectPlanet: (planetId: PlanetId) => void;
  onOpenWorkshop: () => void;
  onOpenLogbook: () => void;
  onOpenAdults: () => void;
  onChangeLanguage: (lang: Language) => void;
  onBackToTitle: () => void;
  onToggleMute: () => void;
  onToggleMusic: () => void;
}

export const GalaxyMap: React.FC<GalaxyMapProps> = ({
  saveData,
  onSelectPlanet,
  onOpenWorkshop,
  onOpenLogbook,
  onOpenAdults,
  onChangeLanguage,
  onBackToTitle,
  onToggleMute,
  onToggleMusic,
}) => {
  const lang = saveData.language;
  const isEs = lang === 'es';
  const t = UI_STRINGS[lang];

  const [selectedId, setSelectedId] = useState<PlanetId>(() => {
    const nextUnfinished = PLANET_CHAPTERS.find(
      (p) => saveData.planetProgress[p.id].unlocked && !saveData.planetProgress[p.id].completed
    );
    return nextUnfinished?.id || 'mercury';
  });
  const [narrationState, setNarrationState] = useState<{
    mode: 'default' | 'go' | 'locked';
    planetId: PlanetId;
    mood: AlienVoiceMood;
    seq: number;
  }>({
    mode: 'default',
    planetId: 'mercury',
    mood: 'curious',
    seq: 0,
  });

  const activeChapter: PlanetChapter =
    PLANET_CHAPTERS.find((p) => p.id === selectedId) || PLANET_CHAPTERS[0];
  const activeProgress = saveData.planetProgress[activeChapter.id];
  const completedCount = PLANET_CHAPTERS.filter((p) => saveData.planetProgress[p.id].completed).length;

  const narratedChapter =
    PLANET_CHAPTERS.find((p) => p.id === narrationState.planetId) || activeChapter;
  const mapNarrationText =
    narrationState.mode === 'go'
      ? t.mapNarratorGo
          .replace('{planet}', narratedChapter.name[lang])
          .replace('{rock}', narratedChapter.runnerConfig.collectibleRock.name[lang])
      : narrationState.mode === 'locked'
      ? t.mapNarratorLocked.replace('{planet}', narratedChapter.name[lang])
      : t.mapNarratorDefault;

  const miniStageIcons = [
    { Icon: Rocket, label: t.stepTravel, color: '#D9480F' },
    { Icon: Wrench, label: t.stepRepair, color: '#0284C7' },
    { Icon: Calculator, label: t.stepMath, color: '#B45309' },
    { Icon: Search, label: t.stepDetective, color: '#0284C7' },
    { Icon: Compass, label: t.stepExplore, color: '#D9480F' },
    { Icon: HelpCircle, label: t.stepQuiz, color: '#B45309' },
  ];

  return (
    <div className="min-h-screen w-full bg-[#7DD3FC] text-[#0F2942] flex flex-col">
      {/* Big Kid-Friendly HUD */}
      <header className="w-full border-b-4 border-[#0284C7] bg-[#38BDF8] px-4 md:px-8 py-3 flex flex-wrap items-center justify-between gap-3 shadow">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              soundFX.click();
              onBackToTitle();
            }}
            className="p-3 rounded-2xl bg-[#E0F2FE] hover:bg-[#FF8C42] text-[#0F2942] border-2 border-[#0284C7] cursor-pointer"
            title={t.backToTitle}
          >
            <Home className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <AlienAvatar alien={saveData.alien} size={50} />
            <div>
              <div className="text-lg font-display font-bold text-[#0F2942] leading-tight">
                {saveData.alien.explorerName}
              </div>
              <div className="flex items-center gap-2 text-sm font-bold text-[#0F2942] font-mono-nums">
                <Star className="w-4 h-4 fill-[#FFD166] text-[#B45309]" />
                <span>{saveData.totalStars}</span>
                <span>· {completedCount}/10</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => {
              soundFX.click();
              onOpenWorkshop();
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#FF8C42] hover:bg-[#FFD166] text-[#1A1E2E] border-2 border-b-4 border-[#FFF8E7] text-sm md:text-base font-display font-bold cursor-pointer whitespace-nowrap"
          >
            <Paintbrush className="w-4 h-4" />
            <span>{t.customizeBtn}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundFX.click();
              onOpenLogbook();
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#E0F2FE] hover:bg-[#FFD166] text-[#0F2942] border-2 border-b-4 border-[#0284C7] text-sm md:text-base font-display font-bold cursor-pointer whitespace-nowrap"
          >
            <BookOpen className="w-4 h-4 text-[#0284C7]" />
            <span>{t.logbookBtn}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundFX.click();
              onOpenAdults();
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl bg-[#BAE6FD] hover:bg-[#FFD166] text-[#0F2942] border-2 border-[#0284C7] text-sm font-bold cursor-pointer whitespace-nowrap"
          >
            <GraduationCap className="w-4 h-4 text-[#0284C7]" />
            <span>{t.adultsBtn}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundFX.click();
              onChangeLanguage(lang === 'es' ? 'en' : 'es');
            }}
            className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-2xl bg-[#E0F2FE] hover:bg-[#FF8C42] text-[#0F2942] border-2 border-[#0284C7] text-sm font-bold cursor-pointer"
          >
            <Globe className="w-4 h-4 text-[#0284C7]" />
            <span>{lang.toUpperCase()}</span>
          </button>

          <button
            type="button"
            onClick={onToggleMusic}
            className="p-2.5 rounded-2xl bg-[#E0F2FE] hover:bg-[#FF8C42] border-2 border-[#0284C7] text-[#0F2942] cursor-pointer"
            title={saveData.musicEnabled && !saveData.muted ? t.musicOn : t.musicOff}
            aria-label={t.musicOn}
          >
            <Music
              className={`w-5 h-5 ${
                saveData.musicEnabled && !saveData.muted ? 'text-[#0284C7]' : 'text-[#0F2942]/40'
              }`}
            />
          </button>

          <button
            type="button"
            onClick={onToggleMute}
            className="p-2.5 rounded-2xl bg-[#E0F2FE] hover:bg-[#FF8C42] border-2 border-[#0284C7] text-[#0F2942] cursor-pointer"
            aria-label={saveData.muted ? t.soundOn : t.soundOff}
          >
            {saveData.muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5 text-[#0284C7]" />}
          </button>
        </div>
      </header>

      {/* Alien Narrator Bar */}
      <div className="max-w-7xl w-full mx-auto px-4 md:px-8 pt-4">
        <AlienNarratorBar
          language={lang}
          text={mapNarrationText}
          speakerName={saveData.alien.explorerName}
          mood={narrationState.mood}
          narrationKey={`map_${narrationState.seq}_${lang}`}
          alien={saveData.alien}
        />
      </div>

      {/* Main 10-World Visual Selector */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 py-4 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <section className="lg:col-span-7 bg-[#E0F2FE] border-4 border-[#0284C7] rounded-[2rem] p-5 md:p-6 flex flex-col justify-between space-y-5 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl md:text-3xl font-display font-bold text-[#0F2942]">
                {t.mapTitle}
              </h1>
              <p className="text-base text-[#0284C7] font-bold">{t.mapSubtitle}</p>
            </div>

            {/* Compact Home Planet Visual Chip */}
            <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-[#BAE6FD] border-2 border-[#38BDF8]">
              <div
                className="w-10 h-10 rounded-full shrink-0 border-2 border-[#0F2942]/40"
                style={{
                  background: `linear-gradient(135deg, ${HOME_PLANET_PALETTE.sandBeige} 0%, ${HOME_PLANET_PALETTE.warmCream} 55%, ${HOME_PLANET_PALETTE.skyAqua} 100%)`,
                }}
              />
              <div>
                <div className="text-sm font-display font-bold text-[#0F2942]">
                  {t.homePlanetTitle}
                </div>
                <div className="text-xs font-semibold text-[#0F2942]/85">{t.homePlanetDesc}</div>
              </div>
              <img
                src={GAME_ART_ASSETS.originalRocketCrewArt}
                alt=""
                className="w-10 h-10 rounded-xl object-contain shrink-0 bg-[#05060C] p-0.5"
              />
            </div>
          </div>

          {/* 10 Large Visual Planet Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5">
            {PLANET_CHAPTERS.map((planet) => {
              const prog = saveData.planetProgress[planet.id];
              const isSelected = selectedId === planet.id;
              return (
                <button
                  key={planet.id}
                  type="button"
                  onClick={() => {
                    soundFX.click();
                    setSelectedId(planet.id);
                    setNarrationState((prev) => ({
                      mode: prog.unlocked ? 'go' : 'locked',
                      planetId: planet.id,
                      mood: prog.unlocked ? 'happy' : 'alert',
                      seq: prev.seq + 1,
                    }));
                  }}
                  className={`group relative flex flex-col items-center p-3.5 rounded-3xl border-2 transition-all cursor-pointer text-center ${
                    isSelected
                      ? 'bg-[#FF8C42] text-[#1A1E2E] border-[#0F2942] border-b-[6px] shadow-xl -translate-y-1'
                      : prog.unlocked
                      ? 'bg-[#BAE6FD] border-[#38BDF8] hover:border-[#0284C7] hover:bg-[#7DD3FC] hover:-translate-y-0.5 text-[#0F2942]'
                      : 'bg-[#BAE6FD]/55 border-[#38BDF8]/40 opacity-70 text-[#0F2942]'
                  }`}
                >
                  <div className="relative flex items-center justify-center w-16 h-16 mb-2">
                    {planet.hasRings && (
                      <div
                        className="absolute w-20 h-6 rounded-full border-3 pointer-events-none"
                        style={{ borderColor: planet.palette.accent, transform: 'rotate(-16deg)' }}
                      />
                    )}
                    <div
                      className="rounded-full border-2 border-[#0F2942]/25 shadow-inner"
                      style={{
                        width: `${Math.min(54, Math.max(32, planet.radiusVisual + 10))}px`,
                        height: `${Math.min(54, Math.max(32, planet.radiusVisual + 10))}px`,
                        background: `radial-gradient(circle at 30% 30%, ${planet.palette.atmosphere}, ${planet.palette.primary} 55%, ${planet.palette.secondary} 100%)`,
                      }}
                    />
                    {!prog.unlocked && (
                      <div className="absolute inset-0 flex items-center justify-center bg-[#0F2942]/55 rounded-full">
                        <Lock className="w-6 h-6 text-[#FFD166]" />
                      </div>
                    )}
                    {prog.completed && (
                      <div className="absolute -top-1 -right-1 bg-[#E0F2FE] rounded-full p-0.5 border border-[#0284C7]">
                        <CheckCircle2 className="w-5 h-5 text-[#0284C7]" />
                      </div>
                    )}
                  </div>

                  <span
                    className={`text-xs font-bold font-mono-nums ${
                      isSelected ? 'text-[#1A1E2E]/85' : 'text-[#0284C7]'
                    }`}
                  >
                    {planet.order}
                  </span>
                  <span
                    className={`text-base md:text-lg font-display font-bold truncate w-full ${
                      isSelected ? 'text-[#1A1E2E]' : 'text-[#0F2942]'
                    }`}
                  >
                    {planet.name[lang]}
                  </span>

                  <div className="flex items-center gap-1 mt-1.5">
                    {[1, 2, 3].map((s) => (
                      <Star
                        key={s}
                        className={`w-4 h-4 ${
                          s <= prog.starsEarned
                            ? isSelected
                              ? 'text-[#FFF8E7] fill-[#FFF8E7]'
                              : 'text-[#FFD166] fill-[#FFD166]'
                            : 'text-[#0F2942]/20'
                        }`}
                      />
                    ))}
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Right Visual Launch Pad */}
        <aside className="lg:col-span-5 bg-[#E0F2FE] border-4 border-[#0284C7] rounded-[2rem] p-6 md:p-7 flex flex-col justify-between gap-5 shadow-xl">
          <div className="space-y-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-sm font-bold text-[#0284C7]">
                  {t.chapterLabel} {activeChapter.order} · {activeChapter.subtitle[lang]}
                </div>
                <h2 className="text-4xl font-display font-bold text-[#0F2942] mt-0.5">
                  {activeChapter.name[lang]}
                </h2>
              </div>

              <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
                {activeChapter.hasRings && (
                  <div
                    className="absolute w-28 h-8 rounded-full border-4 pointer-events-none"
                    style={{ borderColor: activeChapter.palette.accent, transform: 'rotate(-16deg)' }}
                  />
                )}
                <div
                  className="w-20 h-20 rounded-full border-2 border-[#0F2942]/30 shadow-2xl"
                  style={{
                    background: `radial-gradient(circle at 30% 30%, ${activeChapter.palette.atmosphere}, ${activeChapter.palette.primary} 55%, ${activeChapter.palette.secondary} 100%)`,
                  }}
                />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#FFF8E7] border-2 border-[#FF8C42]">
              <p className="text-lg font-bold text-[#1A1E2E] leading-snug">
                “{activeChapter.crewDialogue[lang]}”
              </p>
            </div>

            {/* Visual 6-Icon Adventure Preview */}
            <div className="space-y-2.5">
              <div className="text-sm font-display font-bold text-[#0F2942]">
                {t.challengesListTitle}
              </div>
              <div className="grid grid-cols-3 gap-2.5">
                {miniStageIcons.map((stage, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-2xl bg-[#BAE6FD] border-2 border-[#38BDF8] flex flex-col items-center text-center gap-1.5"
                  >
                    <stage.Icon className="w-6 h-6" style={{ color: stage.color }} />
                    <span className="text-xs font-bold text-[#0F2942]">{stage.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Fact Visual Strip */}
            <div className="p-3.5 rounded-2xl bg-[#BAE6FD] border-2 border-[#0284C7]/45 flex items-center justify-between text-xs md:text-sm font-bold text-[#0F2942]">
              <span>💎 {activeChapter.runnerConfig.collectibleRock.name[lang]}</span>
              <span>🌡️ {activeChapter.nasaData.verifiedMetrics.avgTemp}</span>
            </div>
          </div>

          <div className="space-y-3">
            {activeProgress.completed && (
              <div className="flex items-center justify-between text-sm font-bold text-[#0284C7] px-1 font-mono-nums">
                <span className="inline-flex items-center gap-1.5">
                  <Award className="w-5 h-5 text-[#D9480F]" />
                  {activeChapter.badge.name[lang]}
                </span>
                <span>{activeProgress.bestScore} pts</span>
              </div>
            )}

            {activeProgress.unlocked ? (
              <button
                type="button"
                onClick={() => {
                  soundFX.boost();
                  onSelectPlanet(activeChapter.id);
                }}
                className="w-full inline-flex items-center justify-center gap-3 px-6 py-5 rounded-3xl bg-[#FFD166] hover:bg-[#FF8C42] text-[#0F2942] border-2 border-b-[6px] border-[#0F2942] font-display font-bold text-2xl transition-all active:translate-y-1 cursor-pointer shadow-xl"
              >
                {activeProgress.completed ? (
                  <RotateCcw className="w-6 h-6" />
                ) : (
                  <Play className="w-6 h-6 fill-current" />
                )}
                <span>
                  {activeProgress.completed
                    ? `${t.replayMission} ${activeChapter.name[lang]}!`
                    : `${t.launchTo} ${activeChapter.name[lang]}!`}
                </span>
              </button>
            ) : (
              <div className="w-full px-5 py-4 rounded-2xl bg-[#BAE6FD] border-2 border-[#0284C7]/40 text-center text-base font-bold text-[#0F2942] flex items-center justify-center gap-2">
                <Lock className="w-5 h-5 text-[#D9480F]" />
                <span>{isEs ? t.lockedHint : t.lockedHint}</span>
              </div>
            )}
          </div>
        </aside>
      </main>
    </div>
  );
};
