import React, { useState } from 'react';
import { Award, Lock, Rocket, Shield, User, X } from 'lucide-react';
import { CREW_ART_CHARACTERS, GAME_ART_ASSETS } from '../assets/assetManifest';
import {
  ACCESSORIES,
  ALIEN_SPECIES,
  EYE_STYLES,
  SKIN_COLORS,
  SUIT_COLORS,
} from '../data/customization';
import { AlienCustomization, SaveData } from '../types/game';
import { AlienAvatar } from './AlienAvatar';
import { RocketSprite } from './RocketSprite';
import { soundFX } from '../utils/audio';

interface WorkshopModalProps {
  saveData: SaveData;
  onUpdateAlien: (alien: AlienCustomization) => void;
  onClose: () => void;
}

export const WorkshopModal: React.FC<WorkshopModalProps> = ({
  saveData,
  onUpdateAlien,
  onClose,
}) => {
  const lang = saveData.language;
  const isEs = lang === 'es';
  const [tab, setTab] = useState<'alien' | 'rocket'>('alien');

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
      <div className="max-w-5xl w-full bg-[#E0F2FE] border-4 border-[#0284C7] rounded-[2rem] p-5 md:p-7 max-h-[92vh] overflow-y-auto space-y-6 shadow-2xl text-[#0F2942]">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-[#38BDF8] pb-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-[#0F2942]">
              {isEs ? 'Tripulación y Cohete Alienauta' : 'Alienautas Crew & Spaceship'}
            </h2>
            <p className="text-sm font-bold text-[#0284C7]">
              {isEs
                ? '¡Elige tu personaje favorito y personaliza su nombre!'
                : 'Pick your favorite character and customize their name!'}
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              soundFX.click();
              onClose();
            }}
            className="p-3 rounded-2xl bg-[#EF476F] hover:bg-[#FF6B6B] text-[#FFF8E7] border-2 border-b-4 border-[#9B2242] cursor-pointer"
            aria-label="Cerrar"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex gap-2.5 bg-[#BAE6FD] p-2 rounded-2xl w-fit border-2 border-[#38BDF8]">
          <button
            type="button"
            onClick={() => {
              soundFX.click();
              setTab('alien');
            }}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-base font-display font-bold cursor-pointer ${
              tab === 'alien'
                ? 'bg-[#FFD166] text-[#0F2942] border-2 border-[#0F2942] shadow'
                : 'text-[#0F2942] hover:bg-[#7DD3FC]'
            }`}
          >
            <User className="w-5 h-5" />
            <span>{isEs ? 'Tripulación' : 'Crew'}</span>
          </button>
          <button
            type="button"
            onClick={() => {
              soundFX.click();
              setTab('rocket');
            }}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-base font-display font-bold cursor-pointer ${
              tab === 'rocket'
                ? 'bg-[#FF8C42] text-[#1A1E2E] border-2 border-[#0F2942] shadow'
                : 'text-[#0F2942] hover:bg-[#7DD3FC]'
            }`}
          >
            <Rocket className="w-5 h-5" />
            <span>{isEs ? 'Cohete' : 'Rocket'}</span>
          </button>
        </div>

        {tab === 'alien' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-4 bg-[#BAE6FD] border-2 border-[#38BDF8] rounded-3xl p-6 flex flex-col items-center text-center space-y-4">
              <AlienAvatar alien={saveData.alien} size={156} />

              <div className="w-full space-y-2 text-left">
                <div className="text-xs font-bold text-[#0284C7]">
                  {isEs ? 'Estilo del personaje' : 'Character style'}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      soundFX.click();
                      onUpdateAlien({ ...saveData.alien, useOriginalArt: true });
                    }}
                    className={`px-3 py-2.5 rounded-xl border-2 text-xs font-display font-bold cursor-pointer ${
                      saveData.alien.useOriginalArt
                        ? 'bg-[#FFD166] text-[#0F2942] border-[#0F2942]'
                        : 'bg-[#E0F2FE] text-[#0F2942] border-[#38BDF8]'
                    }`}
                  >
                    {isEs ? 'Ilustración Original' : 'Original Art'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      soundFX.click();
                      onUpdateAlien({ ...saveData.alien, useOriginalArt: false });
                    }}
                    className={`px-3 py-2.5 rounded-xl border-2 text-xs font-display font-bold cursor-pointer ${
                      !saveData.alien.useOriginalArt
                        ? 'bg-[#38BDF8] text-[#0F2942] border-[#0F2942]'
                        : 'bg-[#E0F2FE] text-[#0F2942] border-[#38BDF8]'
                    }`}
                  >
                    {isEs ? 'Personalizable' : 'Customizable'}
                  </button>
                </div>
              </div>

              <div className="w-full space-y-1.5 text-left">
                <label className="text-xs font-bold text-[#0284C7]" htmlFor="explorer-name-input">
                  {isEs ? 'Nombre del Alienauta' : 'Explorer name'}
                </label>
                <input
                  id="explorer-name-input"
                  type="text"
                  maxLength={18}
                  value={saveData.alien.explorerName}
                  onChange={(e) => onUpdateAlien({ ...saveData.alien, explorerName: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-[#FFF8E7] border-2 border-[#FF8C42] text-[#1A1E2E] font-display font-bold text-lg focus:outline-none"
                />
              </div>
            </div>

            <div className="lg:col-span-8 space-y-5">
              {/* When Original Art is selected: only show the 6 original drawings (NO accessories section) */}
              {saveData.alien.useOriginalArt && (
                <div className="space-y-3">
                  <div className="text-base font-display font-bold text-[#0F2942]">
                    {isEs
                      ? 'Elige a tu personaje (Ilustración Original)'
                      : 'Choose your character (Original Art)'}
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
                    {CREW_ART_CHARACTERS.map((char) => {
                      const isSelected =
                        (saveData.alien.originalCharacterId || 'classic') === char.id;
                      return (
                        <button
                          key={char.id}
                          type="button"
                          onClick={() => {
                            soundFX.click();
                            onUpdateAlien({
                              ...saveData.alien,
                              useOriginalArt: true,
                              originalCharacterId: char.id,
                            });
                          }}
                          className={`p-3.5 rounded-2xl border-2 border-b-4 flex flex-col items-center text-center gap-2 transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#FF8C42] border-[#0F2942] text-[#1A1E2E] shadow-lg'
                              : 'bg-[#BAE6FD] border-[#38BDF8] hover:border-[#0284C7] hover:bg-[#7DD3FC] text-[#0F2942]'
                          }`}
                        >
                          <div className="w-22 h-22 rounded-xl bg-[#05060C] border-2 border-[#FFD166]/60 overflow-hidden flex items-center justify-center p-1">
                            <img
                              src={char.image}
                              alt={char.name[lang]}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div>
                            <div className="text-sm font-display font-bold">{char.name[lang]}</div>
                            <div className="text-xs opacity-90 font-semibold">{char.role[lang]}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Customizable mode keeps full species, skin, eyes, suit & accessories */}
              {!saveData.alien.useOriginalArt && (
                <>
                  <div className="space-y-2">
                    <div className="text-sm font-display font-bold text-[#0284C7]">
                      {isEs ? 'Especie extraterrestre' : 'Alien species'}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {ALIEN_SPECIES.map((sp) => (
                        <button
                          key={sp.id}
                          type="button"
                          onClick={() => {
                            soundFX.click();
                            onUpdateAlien({ ...saveData.alien, species: sp.id });
                          }}
                          className={`p-3 rounded-2xl border-2 text-left cursor-pointer ${
                            saveData.alien.species === sp.id
                              ? 'bg-[#FF8C42] border-[#0F2942] text-[#1A1E2E]'
                              : 'bg-[#BAE6FD] border-[#38BDF8] text-[#0F2942]'
                          }`}
                        >
                          <div className="text-sm font-display font-bold">{sp.label[lang]}</div>
                          <div className="text-xs opacity-90">{sp.trait[lang]}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-display font-bold text-[#0284C7]">
                      {isEs ? 'Color del personaje' : 'Character color'}
                    </div>
                    <div className="flex flex-wrap gap-2.5">
                      {SKIN_COLORS.map((c) => (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => {
                            soundFX.click();
                            onUpdateAlien({ ...saveData.alien, skinColor: c.hex });
                          }}
                          className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl border-2 text-xs font-bold cursor-pointer ${
                            saveData.alien.skinColor === c.hex
                              ? 'bg-[#FFD166] border-[#0F2942] text-[#0F2942]'
                              : 'bg-[#BAE6FD] border-[#38BDF8] text-[#0F2942]'
                          }`}
                        >
                          <span className="w-4 h-4 rounded-full border border-black/40" style={{ backgroundColor: c.hex }} />
                          <span>{c.label[lang]}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="text-sm font-display font-bold text-[#0284C7]">{isEs ? 'Ojos' : 'Eyes'}</div>
                      <div className="grid grid-cols-2 gap-2">
                        {EYE_STYLES.map((eye) => (
                          <button
                            key={eye.id}
                            type="button"
                            onClick={() => {
                              soundFX.click();
                              onUpdateAlien({ ...saveData.alien, eyeStyle: eye.id });
                            }}
                            className={`px-3 py-2 rounded-xl border-2 text-xs font-bold cursor-pointer ${
                              saveData.alien.eyeStyle === eye.id
                                ? 'bg-[#38BDF8] border-[#0F2942] text-[#0F2942]'
                                : 'bg-[#BAE6FD] border-[#38BDF8] text-[#0F2942]'
                            }`}
                          >
                            {eye.label[lang]}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-sm font-display font-bold text-[#0284C7]">
                        {isEs ? 'Traje espacial' : 'Space suit'}
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {SUIT_COLORS.map((s) => (
                          <button
                            key={s.id}
                            type="button"
                            onClick={() => {
                              soundFX.click();
                              onUpdateAlien({ ...saveData.alien, suitColor: s.hex });
                            }}
                            className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl border-2 text-xs font-bold cursor-pointer ${
                              saveData.alien.suitColor === s.hex
                                ? 'bg-[#FF8C42] border-[#0F2942] text-[#1A1E2E]'
                                : 'bg-[#BAE6FD] border-[#38BDF8] text-[#0F2942]'
                            }`}
                          >
                            <span className="w-3.5 h-3.5 rounded-full border border-black/25" style={{ backgroundColor: s.hex }} />
                            <span className="truncate">{s.label[lang]}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-display font-bold text-[#0284C7]">
                      {isEs
                        ? 'Accesorios espaciales (desbloqueados en misiones)'
                        : 'Space accessories (unlocked in missions)'}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {ACCESSORIES.map((acc) => {
                        const unlocked = saveData.unlockedAccessories.includes(acc.id);
                        const equipped = saveData.alien.accessory === acc.id;
                        return (
                          <div
                            key={acc.id}
                            className={`p-3 rounded-2xl border-2 flex items-center justify-between gap-2 ${
                              equipped
                                ? 'bg-[#FF8C42] border-[#0F2942] text-[#1A1E2E]'
                                : 'bg-[#BAE6FD] border-[#38BDF8] text-[#0F2942]'
                            }`}
                          >
                            <div className="min-w-0">
                              <div className="text-sm font-bold truncate">{acc.label[lang]}</div>
                              <div className="text-[11px] opacity-90 truncate">
                                {unlocked ? acc.description[lang] : acc.unlockRequirement[lang]}
                              </div>
                            </div>

                            {unlocked ? (
                              <button
                                type="button"
                                onClick={() => {
                                  soundFX.click();
                                  onUpdateAlien({ ...saveData.alien, accessory: acc.id });
                                }}
                                className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 cursor-pointer border ${
                                  equipped
                                    ? 'bg-[#FFD166] text-[#0F2942] border-[#0F2942]'
                                    : 'bg-[#38BDF8] text-[#0F2942] border-[#0284C7]'
                                }`}
                              >
                                {equipped ? (isEs ? 'Puesto' : 'Equipped') : isEs ? 'Elegir' : 'Equip'}
                              </button>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-xs opacity-80 shrink-0">
                                <Lock className="w-3.5 h-3.5" />
                                <span>{isEs ? 'Misión' : 'Quest'}</span>
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {tab === 'rocket' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-5 bg-[#BAE6FD] border-2 border-[#38BDF8] rounded-3xl p-6 flex flex-col items-center text-center space-y-4">
              <RocketSprite upgrades={saveData.rocket} size={200} />
              <img
                src={GAME_ART_ASSETS.originalRocketCrewArt}
                alt="Cohete Alienauta"
                className="w-32 h-32 object-contain rounded-2xl bg-[#05060C] p-1 border-2 border-[#38BDF8]"
              />
            </div>

            <div className="lg:col-span-7 space-y-4">
              <div className="p-5 rounded-2xl bg-[#FFF8E7] text-[#1A1E2E] border-2 border-[#FF8C42] space-y-1">
                <div className="flex items-center gap-2 text-lg font-display font-bold text-[#D9480F]">
                  <Award className="w-6 h-6 text-[#FF8C42]" />
                  <span>
                    {isEs
                      ? '¡Tu cohete mejora gratis con cada estrella!'
                      : 'Your rocket upgrades free with every star!'}
                  </span>
                </div>
                <p className="text-sm font-semibold text-[#0F2942]">
                  {isEs
                    ? 'Completa planetas y junta estrellas para subir propulsores, tanque y escudos.'
                    : 'Clear planets and collect stars to boost thrusters, tank, and shields.'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div className="p-4 rounded-2xl bg-[#BAE6FD] border-2 border-[#FF8C42] space-y-1">
                  <div className="text-xs font-bold text-[#D9480F]">{isEs ? 'Propulsores' : 'Thrusters'}</div>
                  <div className="text-2xl font-display font-bold text-[#0F2942] font-mono-nums">
                    Nv. {saveData.rocket.thrusterLevel}/4
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-[#BAE6FD] border-2 border-[#FFD166] space-y-1">
                  <div className="text-xs font-bold text-[#B45309]">{isEs ? 'Tanque' : 'Tank'}</div>
                  <div className="text-2xl font-display font-bold text-[#0F2942] font-mono-nums">
                    Nv. {saveData.rocket.tankLevel}/4
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-[#BAE6FD] border-2 border-[#0284C7] space-y-1">
                  <div className="text-xs font-bold text-[#0284C7] inline-flex items-center gap-1">
                    <Shield className="w-4 h-4" />
                    <span>{isEs ? 'Escudos' : 'Shields'}</span>
                  </div>
                  <div className="text-2xl font-display font-bold text-[#0284C7] font-mono-nums">
                    {1 + saveData.rocket.shieldLevel}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
