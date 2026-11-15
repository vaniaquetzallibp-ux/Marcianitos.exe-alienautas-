import React from 'react';
import { ROCKET_PALETTE } from '../assets/assetManifest';
import { RocketUpgrades } from '../types/game';

interface RocketSpriteProps {
  upgrades: RocketUpgrades;
  size?: number;
  className?: string;
}

export const RocketSprite: React.FC<RocketSpriteProps> = ({ upgrades, size = 150, className = '' }) => {
  const height = Math.round(size * 0.62);
  return (
    <svg
      width={size}
      height={height}
      viewBox="0 0 180 112"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Cohete Alienauta"
    >
      {/* Shield Aura if upgraded */}
      {upgrades.shieldLevel > 1 && (
        <ellipse
          cx="102"
          cy="56"
          rx="70"
          ry="44"
          stroke="#38BDF8"
          strokeWidth={upgrades.shieldLevel >= 3 ? '2.8' : '1.8'}
          strokeDasharray="6 4"
          strokeOpacity="0.75"
        />
      )}

      {/* Thruster Flame */}
      <path
        d={
          upgrades.thrusterLevel >= 3
            ? 'M42 44 C20 40 8 50 2 56 C8 62 20 72 42 68 Z'
            : 'M42 46 C26 44 18 51 12 56 C18 61 26 68 42 66 Z'
        }
        fill={ROCKET_PALETTE.flameYellow}
        fillOpacity="0.92"
      />
      <path d="M42 50 C31 50 25 53 20 56 C25 59 31 62 42 62 Z" fill={ROCKET_PALETTE.flameCore} />

      {/* Top & Bottom Fins */}
      <path
        d="M58 34 L42 15 L78 28 Z"
        fill={ROCKET_PALETTE.finCoral}
        stroke={ROCKET_PALETTE.outlineDark}
        strokeWidth="2.5"
      />
      <path
        d="M58 78 L42 97 L78 84 Z"
        fill={ROCKET_PALETTE.finCoral}
        stroke={ROCKET_PALETTE.outlineDark}
        strokeWidth="2.5"
      />

      {/* Extra Tank Pods */}
      {upgrades.tankLevel >= 2 && (
        <g>
          <rect
            x="64"
            y="21"
            width="32"
            height="10"
            rx="5"
            fill={ROCKET_PALETTE.noseGold}
            stroke={ROCKET_PALETTE.outlineDark}
            strokeWidth="2"
          />
          <rect
            x="64"
            y="81"
            width="32"
            height="10"
            rx="5"
            fill={ROCKET_PALETTE.noseGold}
            stroke={ROCKET_PALETTE.outlineDark}
            strokeWidth="2"
          />
        </g>
      )}

      {/* Thruster Nozzle */}
      <rect
        x="38"
        y="42"
        width="14"
        height="28"
        rx="4"
        fill={ROCKET_PALETTE.finCoral}
        stroke={ROCKET_PALETTE.outlineDark}
        strokeWidth="2.5"
      />

      {/* Main Rocket Hull */}
      <path
        d="M50 32 C78 24 128 28 164 56 C128 84 78 88 50 80 Z"
        fill={ROCKET_PALETTE.hullOrange}
        stroke={ROCKET_PALETTE.outlineDark}
        strokeWidth="3"
      />

      {/* Gold Nose Cone & Stripe */}
      <path
        d="M134 39 C146 44 156 50 164 56 C156 62 146 68 134 73 Z"
        fill={ROCKET_PALETTE.noseGold}
        stroke={ROCKET_PALETTE.outlineDark}
        strokeWidth="2.5"
      />
      <path d="M62 34 L62 78" stroke={ROCKET_PALETTE.noseGold} strokeWidth="3.5" strokeOpacity="0.85" />

      {/* Porthole Window */}
      <circle
        cx="104"
        cy="56"
        r="15"
        fill={ROCKET_PALETTE.noseGold}
        stroke={ROCKET_PALETTE.outlineDark}
        strokeWidth="2.5"
      />
      <circle
        cx="104"
        cy="56"
        r="10.5"
        fill={ROCKET_PALETTE.windowTeal}
        stroke={ROCKET_PALETTE.outlineDark}
        strokeWidth="1.8"
      />
      <circle cx="100" cy="52" r="3" fill="#FFFFFF" fillOpacity="0.78" />

      {/* Nose Antenna */}
      <line
        x1="164"
        y1="56"
        x2="174"
        y2="56"
        stroke={ROCKET_PALETTE.noseGold}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="174" cy="56" r="2.8" fill={ROCKET_PALETTE.finCoral} />
    </svg>
  );
};
