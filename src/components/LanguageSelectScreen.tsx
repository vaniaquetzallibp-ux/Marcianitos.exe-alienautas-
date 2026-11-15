import React from 'react';
import { Globe, Rocket } from 'lucide-react';
import { CREW_ART_CHARACTERS, GAME_ART_ASSETS } from '../assets/assetManifest';
import { UI_STRINGS } from '../i18n/translations';
import { Language } from '../types/game';
import { soundFX } from '../utils/audio';

interface LanguageSelectScreenProps {
  onSelectLanguage: (lang: Language) => void;
}

export const LanguageSelectScreen: React.FC<LanguageSelectScreenProps> = ({ onSelectLanguage }) => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#7DD3FC] flex items-center justify-center p-5">
      <img
        src={GAME_ART_ASSETS.titleBackdrop}
        alt=""
        referrerPolicy="no-referrer"
        className="absolute inset-0 h-full w-full object-cover opacity-20 pointer-events-none select-none"
      />

      <div className="relative z-10 max-w-3xl w-full bg-[#E0F2FE] border-4 border-[#0284C7] rounded-[2rem] p-7 md:p-10 text-center space-y-6 shadow-2xl">
        <div className="flex flex-col items-center space-y-3">
          <div className="flex items-center justify-center gap-3">
            <div className="w-28 h-28 md:w-32 md:h-32 rounded-3xl overflow-hidden border-4 border-[#FF8C42] bg-[#05060C] p-1.5 shadow-xl">
              <img
                src={GAME_ART_ASSETS.originalRocketCrewArt}
                alt="Cohete y tripulación"
                className="w-full h-full object-contain rounded-2xl"
              />
            </div>
            <div className="hidden sm:grid grid-cols-3 gap-1.5">
              {CREW_ART_CHARACTERS.map((c) => (
                <div
                  key={c.id}
                  className="w-12 h-12 rounded-xl bg-[#05060C] border-2 border-[#38BDF8] p-0.5 overflow-hidden"
                >
                  <img src={c.image} alt="" className="w-full h-full object-contain" />
                </div>
              ))}
            </div>
          </div>

          <div className="inline-flex items-center gap-2 text-base font-display font-bold text-[#0284C7]">
            <Globe className="w-5 h-5" />
            <span>ALIENAUTAS</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-display font-bold text-[#0F2942] leading-tight">
            {UI_STRINGS.es.langTitle}
          </h1>
          <p className="text-base md:text-lg font-bold text-[#B45309]">
            {UI_STRINGS.es.langSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => {
              soundFX.boost();
              onSelectLanguage('es');
            }}
            className="group p-7 rounded-3xl bg-[#FF8C42] hover:bg-[#FFD166] border-2 border-b-[6px] border-[#0F2942] text-[#1A1E2E] transition-all active:translate-y-1 cursor-pointer flex flex-col items-center gap-2 shadow-xl"
          >
            <Rocket className="w-8 h-8 text-[#FFF8E7] group-hover:text-[#1A1E2E]" />
            <span className="text-4xl font-display font-bold">Español</span>
            <span className="text-base font-bold opacity-95">¡Jugar en español!</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundFX.boost();
              onSelectLanguage('en');
            }}
            className="group p-7 rounded-3xl bg-[#38BDF8] hover:bg-[#FFD166] border-2 border-b-[6px] border-[#0F2942] text-[#0F2942] transition-all active:translate-y-1 cursor-pointer flex flex-col items-center gap-2 shadow-xl"
          >
            <Rocket className="w-8 h-8 text-[#0F2942]" />
            <span className="text-4xl font-display font-bold">English</span>
            <span className="text-base font-bold opacity-95">Play in English!</span>
          </button>
        </div>
      </div>
    </div>
  );
};
