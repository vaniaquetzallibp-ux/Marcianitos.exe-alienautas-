import React, { useEffect, useState } from 'react';
import { Volume2 } from 'lucide-react';
import { UI_STRINGS } from '../i18n/translations';
import { AlienCustomization, Language } from '../types/game';
import { AlienVoiceMood, soundFX } from '../utils/audio';
import { AlienAvatar } from './AlienAvatar';

interface AlienNarratorBarProps {
  language: Language;
  text: string;
  speakerName: string;
  mood?: AlienVoiceMood;
  narrationKey: string;
  companionImage?: string;
  companionRole?: string;
  alien?: AlienCustomization;
  autoSpeak?: boolean;
}

export const AlienNarratorBar: React.FC<AlienNarratorBarProps> = ({
  language,
  text,
  speakerName,
  mood = 'happy',
  narrationKey,
  companionImage,
  companionRole,
  alien,
  autoSpeak = true,
}) => {
  const t = UI_STRINGS[language];
  const [speaking, setSpeaking] = useState(false);

  const triggerVoice = () => {
    soundFX.alienSpeak(mood);
    setSpeaking(true);
    window.setTimeout(() => setSpeaking(false), 450);
  };

  useEffect(() => {
    if (!autoSpeak) return;
    soundFX.alienSpeak(mood);
    setSpeaking(true);
    const timer = window.setTimeout(() => setSpeaking(false), 450);
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [narrationKey]);

  const bubbleBorder =
    mood === 'alert'
      ? 'border-[#EF476F] bg-[#FFF1F2]'
      : mood === 'victory'
      ? 'border-[#FFD166] bg-[#FFF8E7]'
      : 'border-[#FF8C42] bg-[#FFF8E7]';

  const speakerBadgeColor =
    mood === 'alert' ? 'text-[#BE123C]' : mood === 'victory' ? 'text-[#B45309]' : 'text-[#D9480F]';

  return (
    <div
      className={`max-w-4xl w-full mx-auto flex flex-col sm:flex-row items-center gap-3.5 rounded-3xl border-3 ${bubbleBorder} px-4 py-3 shadow-lg transition-transform`}
    >
      {/* Speaking Alien Portrait */}
      <div
        className={`flex items-center gap-2.5 shrink-0 transition-transform duration-200 ${
          speaking ? 'scale-110 -rotate-3' : 'scale-100'
        }`}
      >
        {companionImage ? (
          <div className="w-14 h-14 rounded-2xl bg-[#0B2239] border-2 border-[#0284C7] overflow-hidden p-1 shadow">
            <img src={companionImage} alt={speakerName} className="w-full h-full object-contain" />
          </div>
        ) : alien ? (
          <AlienAvatar alien={alien} size={56} />
        ) : null}
      </div>

      {/* Speech Text in Selected Language */}
      <div className="flex-1 text-center sm:text-left min-w-0">
        <div className={`text-xs md:text-sm font-display font-bold flex flex-wrap items-center justify-center sm:justify-start gap-2 ${speakerBadgeColor}`}>
          <span>{speakerName}</span>
          {companionRole && (
            <span className="text-[#0284C7] font-sans font-bold">· {companionRole}</span>
          )}
        </div>
        <p className="text-base md:text-xl font-display font-bold text-[#0F2942] leading-snug">
          “{text}”
        </p>
      </div>

      {/* Replay Alien Sound Button */}
      <button
        type="button"
        onClick={triggerVoice}
        title={t.listenAlienVoice}
        className="shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-[#BAE6FD] hover:bg-[#38BDF8] text-[#0F2942] border-2 border-[#0284C7] text-xs font-display font-bold cursor-pointer transition-colors"
      >
        <Volume2 className={`w-4 h-4 text-[#0284C7] ${speaking ? 'animate-pulse' : ''}`} />
        <span>{t.listenAlienVoice}</span>
      </button>
    </div>
  );
};
