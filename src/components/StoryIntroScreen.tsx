import React, { useEffect, useState } from 'react';
import { ArrowRight, Gem, Globe, Rocket, Sparkles, Star, Volume2, Wrench } from 'lucide-react';
import { CREW_ART_CHARACTERS, GAME_ART_ASSETS, HOME_PLANET_PALETTE } from '../assets/assetManifest';
import { SaveData } from '../types/game';
import { AlienVoiceMood, soundFX } from '../utils/audio';
import { AlienAvatar } from './AlienAvatar';

interface StoryIntroScreenProps {
  saveData: SaveData;
  onComplete: () => void;
}

interface StorySlide {
  id: string;
  mood: AlienVoiceMood;
  badge: { es: string; en: string };
  title: { es: string; en: string };
  narration: { es: string; en: string };
}

const STORY_SLIDES: StorySlide[] = [
  {
    id: 'community',
    mood: 'happy',
    badge: { es: 'Capítulo 0 · Nuestro Hogar', en: 'Chapter 0 · Our Home' },
    title: {
      es: 'La Comunidad de Alienautas',
      en: 'The Alienautas Community',
    },
    narration: {
      es: 'En un planeta claro beige, amarillo y azul vive nuestra alegre comunidad de aliens exploradores.',
      en: 'On a bright beige, yellow, and blue planet lives our happy community of alien explorers.',
    },
  },
  {
    id: 'conquer',
    mood: 'curious',
    badge: { es: '¡Gran Objetivo!', en: 'Big Mission!' },
    title: {
      es: 'Conquistar Planetas y Conseguir Recursos',
      en: 'Conquer Planets & Gather Resources',
    },
    narration: {
      es: '¡Queremos viajar por 10 mundos del espacio para conquistar planetas y recolectar cristales y energía!',
      en: 'We want to travel across 10 space worlds to conquer planets and collect crystals and energy!',
    },
  },
  {
    id: 'adventure',
    mood: 'victory',
    badge: { es: '¡Contigo a bordo!', en: 'With You On Board!' },
    title: {
      es: '¡Hora de Despegar!',
      en: 'Time for Liftoff!',
    },
    narration: {
      es: 'Pilota el cohete con {name}, repara la nave si se daña y descubre ciencia real de la NASA.',
      en: 'Pilot the rocket with {name}, fix the ship if it breaks, and discover real NASA science.',
    },
  },
];

export const StoryIntroScreen: React.FC<StoryIntroScreenProps> = ({ saveData, onComplete }) => {
  const lang = saveData.language;
  const isEs = lang === 'es';
  const [slideIdx, setSlideIdx] = useState(0);

  const slide = STORY_SLIDES[slideIdx];
  const isLast = slideIdx === STORY_SLIDES.length - 1;
  const formattedText = slide.narration[lang].replace('{name}', saveData.alien.explorerName);

  useEffect(() => {
    soundFX.alienSpeak(slide.mood);
  }, [slideIdx, slide.mood]);

  const handleNext = () => {
    soundFX.click();
    if (isLast) {
      soundFX.boost();
      onComplete();
    } else {
      setSlideIdx((i) => i + 1);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#7DD3FC] flex items-center justify-center p-4 md:p-8">
      <img
        src={GAME_ART_ASSETS.titleBackdrop}
        alt=""
        referrerPolicy="no-referrer"
        className="absolute inset-0 h-full w-full object-cover opacity-20 pointer-events-none select-none"
      />

      <div className="relative z-10 max-w-4xl w-full bg-[#E0F2FE] border-4 border-[#0284C7] rounded-[2.2rem] p-6 md:p-9 space-y-6 shadow-2xl text-[#0F2942]">
        {/* Top Row: Step Dots & Skip */}
        <div className="flex items-center justify-between gap-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-2xl bg-[#FFD166] border-2 border-[#0F2942] text-sm font-display font-bold">
            <Sparkles className="w-4 h-4 text-[#D9480F]" />
            <span>{slide.badge[lang]}</span>
          </div>

          <div className="flex items-center gap-2">
            {STORY_SLIDES.map((s, idx) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setSlideIdx(idx)}
                className={`h-3.5 rounded-full transition-all cursor-pointer border border-[#0284C7] ${
                  idx === slideIdx ? 'w-10 bg-[#FF8C42]' : 'w-3.5 bg-[#BAE6FD]'
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => {
              soundFX.click();
              onComplete();
            }}
            className="px-4 py-1.5 rounded-xl bg-[#BAE6FD] hover:bg-[#38BDF8] text-[#0F2942] border-2 border-[#0284C7] text-sm font-display font-bold cursor-pointer"
          >
            {isEs ? 'Saltar' : 'Skip'}
          </button>
        </div>

        {/* Visual Comic Panel */}
        <div className="bg-[#BAE6FD] border-3 border-[#38BDF8] rounded-3xl p-6 md:p-8 flex flex-col items-center text-center space-y-5">
          {slideIdx === 0 && (
            <div className="flex flex-wrap items-center justify-center gap-5">
              {/* Home Planet */}
              <div className="flex flex-col items-center gap-2">
                <div
                  className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-[#0F2942] shadow-xl"
                  style={{
                    background: `linear-gradient(135deg, ${HOME_PLANET_PALETTE.sandBeige} 0%, ${HOME_PLANET_PALETTE.warmCream} 52%, ${HOME_PLANET_PALETTE.skyAqua} 100%)`,
                  }}
                />
                <span className="text-xs font-bold text-[#0284C7]">
                  {isEs ? 'Planeta Hogar' : 'Home Planet'}
                </span>
              </div>

              {/* Alien Community Crew */}
              <div className="grid grid-cols-3 gap-2.5 bg-[#E0F2FE] p-3 rounded-3xl border-2 border-[#0284C7]">
                {CREW_ART_CHARACTERS.map((member) => (
                  <div
                    key={member.id}
                    className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-[#0B2239] border-2 border-[#38BDF8] p-1 overflow-hidden"
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
          )}

          {slideIdx === 1 && (
            <div className="flex flex-wrap items-center justify-center gap-6">
              <div className="w-36 h-36 md:w-44 md:h-44 rounded-3xl overflow-hidden border-4 border-[#FF8C42] bg-[#0B2239] p-2 shadow-xl">
                <img
                  src={GAME_ART_ASSETS.originalRocketCrewArt}
                  alt="Alienautas"
                  className="w-full h-full object-contain rounded-2xl"
                />
              </div>

              <div className="grid grid-cols-1 gap-3 text-left">
                <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#FFF8E7] border-2 border-[#0284C7] font-display font-bold text-base md:text-lg">
                  <Globe className="w-6 h-6 text-[#0284C7]" />
                  <span>{isEs ? '10 Mundos por conquistar' : '10 Worlds to conquer'}</span>
                </div>
                <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#FFF8E7] border-2 border-[#FF8C42] font-display font-bold text-base md:text-lg">
                  <Gem className="w-6 h-6 text-[#D9480F]" />
                  <span>{isEs ? 'Cristales y minerales' : 'Crystals & minerals'}</span>
                </div>
                <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#FFF8E7] border-2 border-[#FFD166] font-display font-bold text-base md:text-lg">
                  <Star className="w-6 h-6 text-[#D97706] fill-[#FFD166]" />
                  <span>{isEs ? 'Estrellas de energía' : 'Energy stars'}</span>
                </div>
              </div>
            </div>
          )}

          {slideIdx === 2 && (
            <div className="flex flex-wrap items-center justify-center gap-6">
              <AlienAvatar alien={saveData.alien} size={116} />
              <div className="grid grid-cols-3 gap-3">
                <div className="p-4 rounded-2xl bg-[#FFF8E7] border-2 border-[#FF8C42] flex flex-col items-center gap-2">
                  <Rocket className="w-8 h-8 text-[#D9480F]" />
                  <span className="text-xs md:text-sm font-display font-bold">
                    {isEs ? 'Volar' : 'Fly'}
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-[#FFF8E7] border-2 border-[#0284C7] flex flex-col items-center gap-2">
                  <Wrench className="w-8 h-8 text-[#0284C7]" />
                  <span className="text-xs md:text-sm font-display font-bold">
                    {isEs ? 'Reparar' : 'Repair'}
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-[#FFF8E7] border-2 border-[#FFD166] flex flex-col items-center gap-2">
                  <Sparkles className="w-8 h-8 text-[#B45309]" />
                  <span className="text-xs md:text-sm font-display font-bold">
                    {isEs ? 'Ciencia' : 'Science'}
                  </span>
                </div>
              </div>
            </div>
          )}

          <h1 className="text-3xl md:text-4xl font-display font-bold text-[#0F2942]">
            {slide.title[lang]}
          </h1>
        </div>

        {/* Alien Speech Bubble + Alien Voice Replay */}
        <div className="bg-[#FFF8E7] border-3 border-[#FF8C42] rounded-3xl p-5 flex flex-col sm:flex-row items-center gap-4 shadow-md">
          <AlienAvatar alien={saveData.alien} size={64} />
          <div className="flex-1 text-center sm:text-left">
            <div className="text-xs font-display font-bold text-[#D9480F]">
              {saveData.alien.explorerName}
            </div>
            <p className="text-xl md:text-2xl font-display font-bold text-[#1A1E2E] leading-snug">
              “{formattedText}”
            </p>
          </div>
          <button
            type="button"
            onClick={() => soundFX.alienSpeak(slide.mood)}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-[#BAE6FD] hover:bg-[#38BDF8] text-[#0F2942] border-2 border-[#0284C7] text-xs font-display font-bold cursor-pointer shrink-0"
          >
            <Volume2 className="w-4 h-4 text-[#0284C7]" />
            <span>{isEs ? 'Voz alien' : 'Alien voice'}</span>
          </button>
        </div>

        {/* Bottom Next / Launch Action */}
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            disabled={slideIdx === 0}
            onClick={() => {
              soundFX.click();
              setSlideIdx((i) => Math.max(0, i - 1));
            }}
            className={`px-6 py-3.5 rounded-2xl font-display font-bold text-lg border-2 ${
              slideIdx === 0
                ? 'opacity-40 cursor-not-allowed bg-[#BAE6FD] border-[#38BDF8] text-[#0F2942]'
                : 'bg-[#BAE6FD] hover:bg-[#38BDF8] border-[#0284C7] text-[#0F2942] cursor-pointer'
            }`}
          >
            {isEs ? 'Atrás' : 'Back'}
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="inline-flex items-center gap-2.5 px-9 py-4 rounded-3xl bg-[#FFD166] hover:bg-[#FF8C42] text-[#0F2942] border-2 border-b-[6px] border-[#0F2942] font-display font-bold text-2xl transition-all active:translate-y-0.5 cursor-pointer shadow-xl"
          >
            <span>
              {isLast
                ? isEs
                  ? '¡Ir a Conquistar!'
                  : 'Let’s Conquer!'
                : isEs
                ? 'Siguiente'
                : 'Next'}
            </span>
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};
