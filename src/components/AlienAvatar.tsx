import React from 'react';
import { getCrewCharacterAsset } from '../assets/assetManifest';
import { SUIT_COLORS } from '../data/customization';
import { AlienCustomization } from '../types/game';

interface AlienAvatarProps {
  alien: AlienCustomization;
  size?: number;
  className?: string;
}

export const AlienAvatar: React.FC<AlienAvatarProps> = ({ alien, size = 120, className = '' }) => {
  if (alien.useOriginalArt) {
    const charAsset = getCrewCharacterAsset(alien.originalCharacterId || 'classic');
    return (
      <div
        className={`relative rounded-2xl overflow-hidden bg-[#05060C] border-2 border-[#FFD166]/65 shrink-0 flex items-center justify-center ${className}`}
        style={{ width: size, height: size }}
      >
        <img
          src={charAsset.image}
          alt={alien.explorerName}
          className="w-full h-full object-contain p-1"
        />
      </div>
    );
  }

  const suit = SUIT_COLORS.find((s) => s.hex === alien.suitColor) || SUIT_COLORS[0];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 140 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label={alien.explorerName}
    >
      {alien.accessory === 'capa_nebula' && (
        <path
          d="M36 78 C20 100 18 126 30 132 L110 132 C122 126 120 100 104 78 Z"
          fill="#502671"
          stroke="#A5C8C2"
          strokeWidth="2.5"
        />
      )}

      {alien.accessory === 'mochila_solar' && (
        <g>
          <rect x="20" y="84" width="18" height="34" rx="5" fill="#262C71" stroke="#A5C8C2" strokeWidth="2" />
          <rect x="102" y="84" width="18" height="34" rx="5" fill="#262C71" stroke="#A5C8C2" strokeWidth="2" />
        </g>
      )}

      <path
        d="M40 94 C40 82 52 78 70 78 C88 78 100 82 100 94 L106 130 C106 134 102 136 96 136 L44 136 C38 136 34 134 34 130 Z"
        fill={suit.hex}
        stroke="#0F1336"
        strokeWidth="3"
      />
      <ellipse cx="70" cy="84" rx="26" ry="7" fill={suit.trimHex} stroke="#0F1336" strokeWidth="2" />
      <rect x="57" y="98" width="26" height="18" rx="4" fill="#0F1336" fillOpacity="0.45" stroke={suit.trimHex} strokeWidth="1.5" />

      {alien.species === 'orejudo' && (
        <g>
          <path d="M36 52 C20 42 18 64 34 66 Z" fill={alien.skinColor} stroke="#0F1336" strokeWidth="2.5" />
          <path d="M104 52 C120 42 122 64 106 66 Z" fill={alien.skinColor} stroke="#0F1336" strokeWidth="2.5" />
        </g>
      )}

      {alien.species === 'antena' && (
        <g>
          <path d="M56 30 Q50 14 44 14" stroke="#0F1336" strokeWidth="3" strokeLinecap="round" />
          <path d="M84 30 Q90 14 96 14" stroke="#0F1336" strokeWidth="3" strokeLinecap="round" />
          <circle cx="44" cy="14" r="5" fill={alien.accessory === 'antena_oro' ? '#E7C873' : '#A5C8C2'} stroke="#0F1336" strokeWidth="2" />
          <circle cx="96" cy="14" r="5" fill={alien.accessory === 'antena_oro' ? '#E7C873' : '#A5C8C2'} stroke="#0F1336" strokeWidth="2" />
        </g>
      )}

      {alien.species === 'cristalino' && (
        <g>
          <polygon points="70,10 61,30 79,30" fill="#A5C8C2" stroke="#0F1336" strokeWidth="2.2" />
          <polygon points="54,18 48,34 62,32" fill="#C8C7A5" stroke="#0F1336" strokeWidth="2" />
          <polygon points="86,18 92,34 78,32" fill="#C8C7A5" stroke="#0F1336" strokeWidth="2" />
        </g>
      )}

      <ellipse cx="70" cy="56" rx="34" ry="30" fill={alien.skinColor} stroke="#0F1336" strokeWidth="3" />
      <ellipse cx="47" cy="65" rx="5" ry="3" fill="#D48B82" fillOpacity="0.45" />
      <ellipse cx="93" cy="65" rx="5" ry="3" fill="#D48B82" fillOpacity="0.45" />

      {alien.eyeStyle === 'curioso' && (
        <g>
          <circle cx="56" cy="55" r="8.5" fill="#FFFFFF" stroke="#0F1336" strokeWidth="2.2" />
          <circle cx="84" cy="55" r="8.5" fill="#FFFFFF" stroke="#0F1336" strokeWidth="2.2" />
          <circle cx="57" cy="55" r="4.5" fill="#1E2346" />
          <circle cx="85" cy="55" r="4.5" fill="#1E2346" />
        </g>
      )}
      {alien.eyeStyle === 'estelar' && (
        <g>
          <ellipse cx="56" cy="55" rx="9" ry="10" fill="#1E2346" stroke="#0F1336" strokeWidth="2" />
          <ellipse cx="84" cy="55" rx="9" ry="10" fill="#1E2346" stroke="#0F1336" strokeWidth="2" />
          <path d="M56 49 L57.5 53.5 L62 55 L57.5 56.5 L56 61 L54.5 56.5 L50 55 L54.5 53.5 Z" fill="#C8C7A5" />
          <path d="M84 49 L85.5 53.5 L90 55 L85.5 56.5 L84 61 L82.5 56.5 L78 55 L82.5 53.5 Z" fill="#C8C7A5" />
        </g>
      )}
      {alien.eyeStyle === 'gafas' && (
        <g>
          <rect x="42" y="46" width="56" height="18" rx="9" fill="#262C71" stroke="#A5C8C2" strokeWidth="2.5" />
          <path d="M49 52 L58 52 M82 52 L91 52" stroke="#A5C8C2" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      )}
      {alien.eyeStyle === 'tres_ojos' && (
        <g>
          <circle cx="53" cy="57" r="7" fill="#FFFFFF" stroke="#0F1336" strokeWidth="2" />
          <circle cx="87" cy="57" r="7" fill="#FFFFFF" stroke="#0F1336" strokeWidth="2" />
          <circle cx="70" cy="43" r="6.5" fill="#FFFFFF" stroke="#0F1336" strokeWidth="2" />
          <circle cx="53" cy="57" r="3.5" fill="#1E2346" />
          <circle cx="87" cy="57" r="3.5" fill="#1E2346" />
          <circle cx="70" cy="43" r="3.3" fill="#1E2346" />
        </g>
      )}

      <path d="M62 69 Q70 75 78 69" stroke="#0F1336" strokeWidth="2.6" strokeLinecap="round" fill="none" />

      {alien.accessory === 'corona_anillos' && (
        <ellipse cx="70" cy="25" rx="28" ry="6" stroke="#C8C7A5" strokeWidth="3.5" fill="none" />
      )}
      {alien.accessory === 'visor_aqua' && (
        <circle cx="70" cy="55" r="41" stroke="#A5C8C2" strokeWidth="3" fill="#A5C8C2" fillOpacity="0.12" />
      )}
    </svg>
  );
};
