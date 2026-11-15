import React, { useEffect } from 'react';
import {
  BookOpen,
  Globe,
  GraduationCap,
  Music,
  Paintbrush,
  Rocket,
  Sparkles,
  Star,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { CREW_ART_CHARACTERS, GAME_ART_ASSETS } from '../assets/assetManifest';
import { UI_STRINGS } from '../i18n/translations';
import { Language, SaveData } from '../types/game';
import { AlienAvatar } from './AlienAvatar';
import { soundFX } from '../utils/audio';

interface TitleScreenProps {
  saveData: SaveData;
  onStartExpedition: () => void;
  onOpenStory: () => void;
  onOpenWorkshop: () => void;
  onOpenLogbook: () => void;
  onOpenAdults: () => void;
  onChangeLanguage: (lang: Language) => void;
  onToggleMute: () => void;
  onToggleMusic: () => void;
}

export const TitleScreen: React.FC<TitleScreenProps> = ({
  saveData,
  onStartExpedition,
  onOpenStory,
  onOpenWorkshop,
  onOpenLogbook,
  onOpenAdults,
  onChangeLanguage,
  onToggleMute,
  onToggleMusic,
}) => {
  const lang = saveData.language;
  const t = UI_STRINGS[lang];
  const hasProgress = Object.values(saveData.planetProgress).some((p) => p.completed);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        soundFX.click();
        onStartExpedition();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onStartExpedition]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#7DD3FC] flex flex-col justify-between">
      <img
        src={GAME_ART_ASSETS.titleBackdrop}
        alt="Planeta hogar de los Alienautas"
        referrerPolicy="no-referrer"
        className="absolute inset-0 h-full w-full object-cover object-right opacity-85 select-none pointer-events-none"
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(95deg, rgba(2,132,199,0.92) 0%, rgba(56,189,248,0.82) 52%, rgba(125,211,252,0.35) 100%)',
        }}
      />

      {/* Minimal Top Utility Bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 px-6 md:px-12 pt-5">
        <div className="text-sm md:text-base font-display font-bold text-[#FFF8E7] drop-shadow">
          {t.titleTagline}
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => {
              soundFX.click();
              onChangeLanguage(lang === 'es' ? 'en' : 'es');
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-[#E0F2FE] hover:bg-[#FFD166] text-[#0F2942] border-2 border-[#0284C7] text-sm font-bold cursor-pointer shadow"
          >
            <Globe className="w-4 h-4 text-[#0284C7]" />
            <span>{lang === 'es' ? 'ES / EN' : 'EN / ES'}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundFX.click();
              onOpenAdults();
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-[#E0F2FE] hover:bg-[#FF8C42] text-[#0F2942] border-2 border-[#0284C7] text-sm font-bold cursor-pointer shadow"
          >
            <GraduationCap className="w-4 h-4 text-[#D9480F]" />
            <span>{t.adultsBtn}</span>
          </button>

          <button
            type="button"
            onClick={onToggleMusic}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-[#E0F2FE] hover:bg-[#FFD166] text-[#0F2942] border-2 border-[#0284C7] text-sm font-bold cursor-pointer shadow"
          >
            <Music
              className={`w-4 h-4 ${
                saveData.musicEnabled && !saveData.muted ? 'text-[#0284C7]' : 'text-[#0F2942]/45'
              }`}
            />
            <span>{saveData.musicEnabled && !saveData.muted ? t.musicOn : t.musicOff}</span>
          </button>

          <button
            type="button"
            onClick={onToggleMute}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-[#E0F2FE] hover:bg-[#FFD166] text-[#0F2942] border-2 border-[#0284C7] text-sm font-bold cursor-pointer shadow"
          >
            {saveData.muted ? (
              <VolumeX className="w-4 h-4 text-[#D9480F]" />
            ) : (
              <Volume2 className="w-4 h-4 text-[#0284C7]" />
            )}
            <span>{saveData.muted ? t.soundOff : t.soundOn}</span>
          </button>
        </div>
      </div>

      {/* Main Title & Big Visual Stage */}
      <div className="relative z-10 max-w-6xl w-full mx-auto px-6 md:px-12 py-4 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <h1 className="text-5xl sm:text-7xl font-display font-bold text-[#FFD166] drop-shadow-[0_3px_0_rgba(15,41,66,0.65)] leading-none">
              {t.appTitle}
            </h1>
            <div className="text-2xl sm:text-3xl font-display font-bold text-[#E0F2FE] drop-shadow">
              {t.appSubtitle}
            </div>
          </div>

          <p className="text-xl md:text-2xl font-bold text-[#FFF8E7] drop-shadow max-w-lg leading-snug">
            {t.titleDesc.replace('{name}', saveData.alien.explorerName)}
          </p>

          {/* Big Tactile Kid-Friendly Game Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-1">
            <button
              type="button"
              onClick={() => {
                soundFX.boost();
                onStartExpedition();
              }}
              className="inline-flex items-center gap-3 px-9 py-5 rounded-3xl bg-[#FFD166] hover:bg-[#FF8C42] text-[#0F2942] border-2 border-b-[6px] border-[#FFF8E7] font-display font-bold text-2xl shadow-2xl transition-all active:translate-y-1 cursor-pointer whitespace-nowrap"
            >
              <Rocket className="w-7 h-7" />
              <span>{hasProgress ? t.continueBtn : t.startBtn}</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-3.5">
            <button
              type="button"
              onClick={() => {
                soundFX.click();
                onOpenStory();
              }}
              className="inline-flex items-center gap-2.5 px-6 py-4 rounded-2xl bg-[#FFF8E7] hover:bg-[#FFD166] text-[#0F2942] border-2 border-b-4 border-[#0284C7] font-display font-bold text-lg cursor-pointer transition-all active:translate-y-0.5 whitespace-nowrap shadow-lg"
            >
              <Sparkles className="w-5 h-5 text-[#D9480F]" />
              <span>{t.storyBtn}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                soundFX.click();
                onOpenWorkshop();
              }}
              className="inline-flex items-center gap-2.5 px-6 py-4 rounded-2xl bg-[#FF8C42] hover:bg-[#FFD166] text-[#1A1E2E] border-2 border-b-4 border-[#FFF8E7] font-display font-bold text-lg cursor-pointer transition-all active:translate-y-0.5 whitespace-nowrap shadow-lg"
            >
              <Paintbrush className="w-5 h-5" />
              <span>{t.customizeBtn}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                soundFX.click();
                onOpenLogbook();
              }}
              className="inline-flex items-center gap-2.5 px-6 py-4 rounded-2xl bg-[#BAE6FD] hover:bg-[#FFD166] text-[#0F2942] border-2 border-b-4 border-[#FFF8E7] font-display font-bold text-lg cursor-pointer transition-all active:translate-y-0.5 whitespace-nowrap shadow-lg"
            >
              <BookOpen className="w-5 h-5" />
              <span>{t.logbookBtn}</span>
            </button>
          </div>
        </div>

        {/* Right Showcase with Big Rocket + Full Original Crew */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          <div className="relative flex flex-col items-center animate-float-slow">
            <div className="w-64 h-64 md:w-76 md:h-76 rounded-[2rem] overflow-hidden border-4 border-[#FFD166] bg-[#05060C] shadow-2xl p-2">
              <img
                src={GAME_ART_ASSETS.originalRocketCrewArt}
                alt="Diseño original de cohete y tripulación extraterrestre"
                className="w-full h-full object-contain rounded-2xl"
              />
            </div>

            <div className="-mt-7 flex items-center gap-3.5 bg-[#E0F2FE] border-4 border-[#0284C7] rounded-2xl px-5 py-3 shadow-xl">
              <AlienAvatar alien={saveData.alien} size={64} />
              <div>
                <div className="text-xl font-display font-bold text-[#0F2942]">
                  {saveData.alien.explorerName}
                </div>
                <div className="flex items-center gap-2 text-sm font-bold text-[#B45309] font-mono-nums">
                  <Star className="w-4 h-4 fill-[#FFD166] text-[#B45309]" />
                  <span>{saveData.totalStars}</span>
                  <span className="text-[#0284C7]">· {saveData.unlockedBadges.length}/10</span>
                </div>
              </div>
            </div>

            <div className="mt-3 bg-[#E0F2FE] border-2 border-[#FF8C42] rounded-2xl px-4 py-2.5 flex items-center gap-2 shadow-lg">
              {CREW_ART_CHARACTERS.map((member) => (
                <div
                  key={member.id}
                  title={member.name[lang]}
                  className="w-11 h-11 rounded-xl bg-[#05060C] border-2 border-[#38BDF8] overflow-hidden p-0.5"
                >
                  <img
                    src={member.image}
                    alt={member.name[lang]}
                    className="w-full h-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Minimal 1-Line Footer */}
      <div className="relative z-10 px-6 md:px-12 pb-4 text-center">
        <div className="text-xs md:text-sm font-bold text-[#FFF8E7] drop-shadow">{t.controlsHint}</div>
      </div>
    </div>
  );
};
