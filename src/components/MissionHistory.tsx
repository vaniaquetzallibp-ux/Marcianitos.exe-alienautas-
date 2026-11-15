import React from 'react';
import { Calendar, CheckCircle2, Compass, History, Star, Trophy } from 'lucide-react';
import { MATH_LEVEL_LABELS } from '../data/mathCurriculum';
import { PLANET_CHAPTERS } from '../data/planets';
import { Language, MissionHistoryEntry, PlanetId, PlanetProgress } from '../types/game';

interface MissionHistoryProps {
  language: Language;
  history: MissionHistoryEntry[];
  planetProgress?: Record<PlanetId, PlanetProgress>;
}

function formatMissionDate(iso: string, language: Language): string {
  try {
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return iso;
    return new Intl.DateTimeFormat(language === 'es' ? 'es-MX' : 'en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(date);
  } catch {
    return iso;
  }
}

function getPerformanceLabel(stars: number, isEs: boolean): { label: string; barColor: string } {
  if (stars >= 3) {
    return {
      label: isEs ? 'Rendimiento Sobresaliente' : 'Outstanding Performance',
      barColor: '#FFD166',
    };
  }
  if (stars === 2) {
    return {
      label: isEs ? 'Buen Rendimiento' : 'Great Performance',
      barColor: '#38BDF8',
    };
  }
  return {
    label: isEs ? 'Misión Completada' : 'Mission Completed',
    barColor: '#FF8C42',
  };
}

export const MissionHistory: React.FC<MissionHistoryProps> = ({
  language,
  history,
  planetProgress,
}) => {
  const isEs = language === 'es';

  const legacyCompletedEntries: MissionHistoryEntry[] =
    history.length === 0 && planetProgress
      ? PLANET_CHAPTERS.filter((p) => planetProgress[p.id]?.completed).map((p) => ({
          id: `legacy_${p.id}`,
          planetId: p.id,
          completedAt: '',
          score: planetProgress[p.id].bestScore,
          starsEarned: Math.max(1, planetProgress[p.id].starsEarned),
          starsCollectedInFlight: 0,
          mathLevel: 1,
          stampsCount: p.explorationSpots.length,
        }))
      : [];

  const entries = history.length > 0 ? history : legacyCompletedEntries;

  return (
    <section className="space-y-3" aria-label={isEs ? 'Historial de Misiones' : 'Mission History'}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="text-sm font-display font-bold text-[#0284C7] flex items-center gap-1.5">
          <History className="w-5 h-5 text-[#0284C7]" />
          <span>
            {isEs ? 'Historial de Misiones Completadas' : 'Completed Missions History'}
          </span>
        </div>
        <span className="text-xs font-bold text-[#0F2942] font-mono-nums">
          {entries.length}{' '}
          {isEs
            ? entries.length === 1
              ? 'expedición registrada'
              : 'expediciones registradas'
            : entries.length === 1
            ? 'logged expedition'
            : 'logged expeditions'}
        </span>
      </div>

      {entries.length === 0 ? (
        <div className="p-5 rounded-2xl bg-[#BAE6FD] border-2 border-dashed border-[#0284C7]/60 text-center space-y-1.5">
          <div className="text-base font-display font-bold text-[#0F2942]">
            {isEs
              ? 'Aún no hay misiones en tu historial'
              : 'No completed missions in your history yet'}
          </div>
          <p className="text-sm font-semibold text-[#0F2942]/80">
            {isEs
              ? 'Completa tu primer viaje desde el Mapa Espacial para ver la fecha y tu rendimiento.'
              : 'Finish your first trip from the Space Map to log the date and your performance.'}
          </p>
        </div>
      ) : (
        <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
          {entries.map((entry) => {
            const chapter =
              PLANET_CHAPTERS.find((p) => p.id === entry.planetId) || PLANET_CHAPTERS[0];
            const perf = getPerformanceLabel(entry.starsEarned, isEs);
            const starRatio = Math.min(100, Math.round((entry.starsEarned / 3) * 100));

            return (
              <article
                key={entry.id}
                className="p-3.5 rounded-2xl bg-[#BAE6FD] border-2 border-[#38BDF8] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div className="relative w-12 h-12 rounded-xl bg-[#E0F2FE] border border-[#0284C7]/40 flex items-center justify-center shrink-0">
                    <span
                      className="w-7 h-7 rounded-full block"
                      style={{
                        background: `radial-gradient(circle at 32% 30%, ${chapter.palette.accent}, ${chapter.palette.primary})`,
                      }}
                    />
                    {chapter.hasRings && (
                      <span
                        className="absolute w-10 h-2.5 rounded-full border-2 pointer-events-none"
                        style={{
                          borderColor: chapter.palette.accent,
                          transform: 'rotate(-18deg)',
                        }}
                      />
                    )}
                  </div>

                  <div className="min-w-0 space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-base font-display font-bold text-[#0F2942]">
                        {isEs ? 'Cap.' : 'Ch.'} {chapter.order} · {chapter.name[language]}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-[#0284C7]">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{perf.label}</span>
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-semibold text-[#0F2942]/85">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#0284C7]" />
                        <span>
                          {entry.completedAt
                            ? formatMissionDate(entry.completedAt, language)
                            : isEs
                            ? 'Expedición previa'
                            : 'Earlier expedition'}
                        </span>
                      </span>

                      <span className="inline-flex items-center gap-1 font-mono-nums">
                        <Trophy className="w-3.5 h-3.5 text-[#B45309]" />
                        <span>{entry.score} pts</span>
                      </span>

                      <span className="inline-flex items-center gap-1">
                        <Compass className="w-3.5 h-3.5 text-[#D9480F]" />
                        <span>
                          {entry.stampsCount} {isEs ? 'sellos' : 'stamps'}
                        </span>
                      </span>

                      <span>{MATH_LEVEL_LABELS[entry.mathLevel][language]}</span>
                    </div>
                  </div>
                </div>

                <div className="sm:w-36 shrink-0 flex sm:flex-col items-center sm:items-end justify-between gap-2">
                  <div className="flex items-center gap-1" aria-label={`${entry.starsEarned}/3`}>
                    {[1, 2, 3].map((s) => (
                      <Star
                        key={s}
                        className={`w-5 h-5 ${
                          s <= entry.starsEarned
                            ? 'text-[#FFD166] fill-[#FFD166]'
                            : 'text-[#0F2942]/20'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="w-24 sm:w-full h-2 rounded-full bg-[#E0F2FE] overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${starRatio}%`,
                        backgroundColor: perf.barColor,
                      }}
                    />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
};
