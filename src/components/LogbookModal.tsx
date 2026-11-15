import React, { useEffect, useState } from 'react';
import { Award, BookOpen, Calculator, Camera, Globe, Sparkles, Star, Volume2, X } from 'lucide-react';
import { MATH_LEVEL_LABELS } from '../data/mathCurriculum';
import { PLANET_CHAPTERS } from '../data/planets';
import { fetchPlanetNasaImages } from '../services/nasaClient';
import { NasaGalleryImage, PlanetId, SaveData } from '../types/game';
import { AlienAvatar } from './AlienAvatar';
import { MissionHistory } from './MissionHistory';
import { soundFX } from '../utils/audio';

interface LogbookModalProps {
  saveData: SaveData;
  onClose: () => void;
}

export const LogbookModal: React.FC<LogbookModalProps> = ({ saveData, onClose }) => {
  const lang = saveData.language;
  const isEs = lang === 'es';
  const unlockedPlanets = PLANET_CHAPTERS.filter((p) => saveData.planetProgress[p.id].unlocked);
  const visitedPlanets = PLANET_CHAPTERS.filter((p) => saveData.planetProgress[p.id].completed);

  const [selectedPlanetId, setSelectedPlanetId] = useState<PlanetId>(
    visitedPlanets[visitedPlanets.length - 1]?.id || unlockedPlanets[0]?.id || 'mercury'
  );
  const [galleryState, setGalleryState] = useState<{
    loading: boolean;
    items: NasaGalleryImage[];
    offline: boolean;
  }>({ loading: false, items: [], offline: false });

  const activePlanet = PLANET_CHAPTERS.find((p) => p.id === selectedPlanetId) || PLANET_CHAPTERS[0];

  useEffect(() => {
    let active = true;
    setGalleryState((prev) => ({ ...prev, loading: true }));
    fetchPlanetNasaImages(activePlanet.id, activePlanet.nasaData.nasaQuery).then((res) => {
      if (!active) return;
      setGalleryState({
        loading: false,
        items: res.items,
        offline: res.fromOfflineArchive,
      });
    });
    return () => {
      active = false;
    };
  }, [activePlanet]);

  return (
    <div className="fixed inset-0 z-50 bg-[#0F2942]/65 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="max-w-5xl w-full bg-[#E0F2FE] border-4 border-[#0284C7] rounded-[2rem] p-5 md:p-7 max-h-[92vh] overflow-y-auto space-y-6 shadow-2xl text-[#0F2942]">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-[#38BDF8] pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-[#FF8C42] text-[#FFF8E7] border-2 border-[#0F2942]">
              <BookOpen className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-[#0F2942]">
                {isEs
                  ? `Bitácora de ${saveData.alien.explorerName}`
                  : `${saveData.alien.explorerName}'s Logbook`}
              </h2>
              <p className="text-sm font-bold text-[#0284C7]">
                {isEs
                  ? 'Tus estrellas, historial de misiones e imágenes de la NASA.'
                  : 'Your stars, mission history, and real NASA photos.'}
              </p>
            </div>
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

        {/* Explorer Summary Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-[#BAE6FD] border-2 border-[#38BDF8] rounded-3xl p-4">
          <div className="md:col-span-4 flex items-center gap-3.5">
            <AlienAvatar alien={saveData.alien} size={72} />
            <div>
              <div className="text-xs font-bold text-[#0284C7]">{isEs ? 'Alienauta' : 'Explorer'}</div>
              <div className="text-xl font-display font-bold text-[#0F2942]">
                {saveData.alien.explorerName}
              </div>
              <div className="text-xs font-bold text-[#B45309] inline-flex items-center gap-1">
                <Calculator className="w-3.5 h-3.5 text-[#D97706]" />
                <span>{MATH_LEVEL_LABELS[saveData.mathProgress.currentLevel][lang]}</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-8 grid grid-cols-3 gap-3 text-center">
            <div className="p-3 rounded-2xl bg-[#FFF8E7] text-[#1A1E2E] border-2 border-[#38BDF8]">
              <div className="text-2xl font-display font-bold text-[#0284C7] font-mono-nums">
                {visitedPlanets.length}/10
              </div>
              <div className="text-xs font-bold">{isEs ? 'Mundos' : 'Worlds'}</div>
            </div>
            <div className="p-3 rounded-2xl bg-[#FFF8E7] text-[#1A1E2E] border-2 border-[#FFD166]">
              <div className="text-2xl font-display font-bold text-[#D97706] font-mono-nums inline-flex items-center gap-1">
                <Star className="w-5 h-5 fill-[#FFD166] text-[#D97706]" />
                <span>{saveData.totalStars}</span>
              </div>
              <div className="text-xs font-bold">{isEs ? 'Estrellas' : 'Stars'}</div>
            </div>
            <div className="p-3 rounded-2xl bg-[#FFF8E7] text-[#1A1E2E] border-2 border-[#FF8C42]">
              <div className="text-2xl font-display font-bold text-[#D9480F] font-mono-nums">
                {saveData.unlockedBadges.length}/10
              </div>
              <div className="text-xs font-bold">{isEs ? 'Insignias' : 'Badges'}</div>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="space-y-2">
          <div className="text-sm font-display font-bold text-[#0284C7] flex items-center gap-1.5">
            <Award className="w-5 h-5 text-[#D9480F]" />
            <span>{isEs ? 'Insignias de misión' : 'Mission Badges'}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {PLANET_CHAPTERS.map((p) => {
              const hasBadge = saveData.unlockedBadges.includes(p.badge.id);
              return (
                <div
                  key={p.badge.id}
                  className={`px-3.5 py-2 rounded-xl border-2 text-xs font-bold ${
                    hasBadge
                      ? 'bg-[#FFD166] border-[#0F2942] text-[#0F2942]'
                      : 'bg-[#BAE6FD]/65 border-[#38BDF8]/50 text-[#0F2942]/50'
                  }`}
                >
                  <strong>{p.badge.name[lang]}</strong> · {p.name[lang]}
                </div>
              );
            })}
          </div>
        </div>

        {/* Visual History of Completed Missions */}
        <MissionHistory
          language={lang}
          history={saveData.missionHistory}
          planetProgress={saveData.planetProgress}
        />

        {/* Planet Archive & Real NASA Photos */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            {PLANET_CHAPTERS.map((p) => {
              const isUnlocked = saveData.planetProgress[p.id].unlocked;
              const isSelected = selectedPlanetId === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  disabled={!isUnlocked}
                  onClick={() => {
                    soundFX.click();
                    setSelectedPlanetId(p.id);
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-display font-bold cursor-pointer border-2 ${
                    isSelected
                      ? 'bg-[#FF8C42] text-[#FFF8E7] border-[#0F2942]'
                      : isUnlocked
                      ? 'bg-[#BAE6FD] text-[#0F2942] border-[#38BDF8] hover:bg-[#38BDF8]'
                      : 'bg-[#BAE6FD]/40 border-[#38BDF8]/30 text-[#0F2942]/35 cursor-not-allowed'
                  }`}
                >
                  {p.name[lang]}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 bg-[#BAE6FD] border-2 border-[#38BDF8] rounded-3xl p-5">
            <div className="lg:col-span-5 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <div className="inline-flex items-center gap-1.5 text-sm font-display font-bold text-[#0284C7]">
                  <Globe className="w-4 h-4" />
                  <span>{activePlanet.nasaData.title[lang]}</span>
                </div>
                <button
                  type="button"
                  onClick={() => soundFX.speak(activePlanet.nasaData.summaryForKids[lang], lang)}
                  className="p-1.5 rounded-lg bg-[#E0F2FE] hover:bg-[#FFD166] border border-[#0284C7] text-[#0284C7] cursor-pointer"
                  aria-label={isEs ? 'Escuchar dato NASA' : 'Listen to NASA fact'}
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
              <p className="text-sm font-bold text-[#0F2942] leading-relaxed">
                {activePlanet.nasaData.summaryForKids[lang]}
              </p>

              <div className="space-y-1 text-xs text-[#1A1E2E] font-bold font-mono-nums bg-[#FFF8E7] p-3.5 rounded-2xl border-2 border-[#FF8C42]">
                <div>{isEs ? 'Diámetro' : 'Diameter'}: {activePlanet.nasaData.verifiedMetrics.diameterKm}</div>
                <div>{isEs ? 'Día' : 'Day'}: {activePlanet.nasaData.verifiedMetrics.dayLength[lang]}</div>
                <div>{isEs ? 'Año' : 'Year'}: {activePlanet.nasaData.verifiedMetrics.yearLength[lang]}</div>
                <div>{isEs ? 'Temp.' : 'Temp.'}: {activePlanet.nasaData.verifiedMetrics.avgTemp}</div>
                <div>{isEs ? 'Lunas' : 'Moons'}: {activePlanet.nasaData.verifiedMetrics.moons[lang]}</div>
              </div>

              <div className="text-[11px] font-bold text-[#0F2942]/80">
                {activePlanet.nasaData.missionNames} · {activePlanet.nasaData.sourceName}
              </div>
            </div>

            <div className="lg:col-span-7 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <div className="inline-flex items-center gap-1.5 text-sm font-display font-bold text-[#0F2942]">
                  <Camera className="w-4 h-4 text-[#D9480F]" />
                  <span>
                    {isEs ? 'Imágenes oficiales de la NASA' : 'Official NASA Imagery'}
                  </span>
                </div>
                <span className="text-[11px] font-bold text-[#0284C7]">
                  {galleryState.offline
                    ? isEs
                      ? 'Archivo offline verificado'
                      : 'Verified offline archive'
                    : 'NASA Image Library'}
                </span>
              </div>

              {galleryState.loading ? (
                <div className="py-12 text-center text-sm font-bold text-[#0284C7]">
                  {isEs ? 'Cargando archivo NASA...' : 'Loading NASA archive...'}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {galleryState.items.slice(0, 2).map((img) => (
                    <div
                      key={img.nasaId}
                      className="rounded-2xl overflow-hidden bg-[#FFF8E7] border-2 border-[#0284C7] flex flex-col"
                    >
                      <div className="h-36 bg-[#0B2239] relative overflow-hidden flex items-center justify-center">
                        <img
                          src={img.imageUrl}
                          alt={img.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).style.display = 'none';
                          }}
                        />
                        <span className="text-[11px] text-[#E0F2FE] px-3 text-center">
                          {activePlanet.nasaData.fallbackImageCaption[lang]}
                        </span>
                      </div>
                      <div className="p-3 space-y-1">
                        <div className="text-xs font-bold text-[#0F2942] line-clamp-1">{img.title}</div>
                        <div className="text-[11px] font-bold text-[#0284C7]">
                          {img.isRealNasaPhoto
                            ? isEs
                              ? `Fotografía real · ${img.nasaId}`
                              : `Real NASA photo · ${img.nasaId}`
                            : isEs
                            ? `Ilustración científica NASA · ${img.nasaId}`
                            : `NASA science concept · ${img.nasaId}`}
                        </div>
                        <div className="text-[10px] font-semibold text-[#0F2942]/70 line-clamp-2">{img.credit}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Fun Facts History */}
        {saveData.discoveredFacts.length > 0 && (
          <div className="space-y-2">
            <div className="text-sm font-display font-bold text-[#0284C7] flex items-center gap-1.5">
              <Sparkles className="w-5 h-5 text-[#D9480F]" />
              <span>{isEs ? 'Datos curiosos descubiertos' : 'Discovered Fun Facts'}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {saveData.discoveredFacts.map((fact, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-[#FFF8E7] border-2 border-[#38BDF8] text-sm font-semibold text-[#1A1E2E] flex items-start justify-between gap-2"
                >
                  <span>{fact[lang]}</span>
                  <button
                    type="button"
                    onClick={() => soundFX.speak(fact[lang], lang)}
                    className="shrink-0 p-1.5 rounded-lg bg-[#BAE6FD] hover:bg-[#FFD166] border border-[#0284C7] text-[#0284C7] cursor-pointer"
                    aria-label={isEs ? 'Escuchar dato curioso' : 'Listen to fun fact'}
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
