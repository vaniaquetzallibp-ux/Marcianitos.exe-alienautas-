import React, { useEffect, useMemo, useState } from 'react';
import { Activity, CheckCircle2, Radio, Volume2, Wind, Zap } from 'lucide-react';
import { UI_STRINGS } from '../i18n/translations';
import { EmergencyType, Language } from '../types/game';
import { soundFX } from '../utils/audio';

interface ShipRepairGameProps {
  language: Language;
  emergencyType: EmergencyType;
  title: string;
  brief: string;
  onRepaired: () => void;
}

const WIRE_COLORS = [
  { id: 'aqua', es: 'Sensor Celeste', en: 'Sky Sensor', hex: '#38BDF8' },
  { id: 'gold', es: 'Núcleo Solar', en: 'Solar Core', hex: '#FFD166' },
  { id: 'orange', es: 'Turbina Naranja', en: 'Orange Turbo', hex: '#FF8C42' },
  { id: 'coral', es: 'Térmico Coral', en: 'Coral Heat', hex: '#EF476F' },
];

function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

const CableRepairBoard: React.FC<{ language: Language; onSuccess: () => void }> = ({
  language,
  onSuccess,
}) => {
  const isEs = language === 'es';
  const leftOrder = useMemo(() => shuffleArray(WIRE_COLORS), []);
  const rightOrder = useMemo(() => shuffleArray(WIRE_COLORS), []);
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [connected, setConnected] = useState<Record<string, boolean>>({});
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleRightClick = (rightId: string) => {
    if (!selectedLeft) {
      setErrorMsg(
        isEs
          ? 'Primero elige un conector de la columna izquierda.'
          : 'First pick a connector on the left side.'
      );
      soundFX.hint();
      return;
    }
    if (selectedLeft === rightId) {
      const next = { ...connected, [rightId]: true };
      setConnected(next);
      setSelectedLeft(null);
      setErrorMsg('');
      soundFX.cableConnect();
      if (Object.keys(next).length === WIRE_COLORS.length) {
        soundFX.repairSuccess();
        setTimeout(onSuccess, 550);
      }
    } else {
      setErrorMsg(
        isEs
          ? '¡Chispa! Intenta unir dos cables del mismo color.'
          : 'Spark! Try matching two cables of the same color.'
      );
      setSelectedLeft(null);
      soundFX.hit();
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative bg-[#BAE6FD] border-2 border-[#38BDF8] rounded-2xl p-5 md:p-7">
        <svg
          viewBox="0 0 600 280"
          className="absolute inset-0 w-full h-full pointer-events-none"
          preserveAspectRatio="none"
        >
          {leftOrder.map((lItem, lIdx) => {
            if (!connected[lItem.id]) return null;
            const rIdx = rightOrder.findIndex((r) => r.id === lItem.id);
            const y1 = 44 + lIdx * 64;
            const y2 = 44 + rIdx * 64;
            return (
              <path
                key={lItem.id}
                d={`M 140 ${y1} C 280 ${y1}, 320 ${y2}, 460 ${y2}`}
                stroke={lItem.hex}
                strokeWidth="8"
                strokeLinecap="round"
                fill="none"
              />
            );
          })}
        </svg>

        <div className="relative z-10 grid grid-cols-2 gap-10 md:gap-28">
          <div className="space-y-4">
            {leftOrder.map((wire) => {
              const isDone = !!connected[wire.id];
              const isSel = selectedLeft === wire.id;
              return (
                <button
                  key={wire.id}
                  type="button"
                  disabled={isDone}
                  onClick={() => {
                    soundFX.click();
                    setSelectedLeft(wire.id);
                    setErrorMsg('');
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border-2 font-bold text-sm transition-transform cursor-pointer text-[#0F2942] ${
                    isDone
                      ? 'opacity-70 border-[#38BDF8] bg-[#E0F2FE]'
                      : isSel
                      ? 'scale-105 border-[#0F2942] bg-[#FF8C42] text-[#FFF8E7]'
                      : 'border-[#0284C7] bg-[#E0F2FE] hover:border-[#0F2942]'
                  }`}
                >
                  <span className="truncate">{wire[language]}</span>
                  <span
                    className="w-5 h-5 rounded-full shrink-0 border-2 border-[#0F2942]"
                    style={{ backgroundColor: wire.hex }}
                  />
                </button>
              );
            })}
          </div>

          <div className="space-y-4">
            {rightOrder.map((wire) => {
              const isDone = !!connected[wire.id];
              return (
                <button
                  key={wire.id}
                  type="button"
                  disabled={isDone}
                  onClick={() => handleRightClick(wire.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border-2 font-bold text-sm transition-transform cursor-pointer text-[#0F2942] ${
                    isDone
                      ? 'opacity-70 border-[#0284C7] bg-[#E0F2FE]'
                      : 'border-[#0284C7] bg-[#E0F2FE] hover:border-[#0F2942]'
                  }`}
                >
                  <span
                    className="w-5 h-5 rounded-full shrink-0 border-2 border-[#0F2942]"
                    style={{ backgroundColor: wire.hex }}
                  />
                  <span className="truncate">
                    {isDone ? (isEs ? 'Conectado' : 'Connected') : wire[language]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="min-h-6 text-center text-sm font-bold text-[#0284C7]">
        {errorMsg ||
          `${isEs ? 'Cables reparados' : 'Cables patched'}: ${Object.keys(connected).length} / ${
            WIRE_COLORS.length
          }`}
      </div>
    </div>
  );
};

const OxygenEmergencyBoard: React.FC<{ language: Language; onSuccess: () => void }> = ({
  language,
  onSuccess,
}) => {
  const isEs = language === 'es';
  const [leaks, setLeaks] = useState([
    { id: 1, x: 22, y: 30, sealed: false },
    { id: 2, x: 68, y: 24, sealed: false },
    { id: 3, x: 48, y: 54, sealed: false },
    { id: 4, x: 28, y: 74, sealed: false },
    { id: 5, x: 76, y: 70, sealed: false },
  ]);
  const [oxygenLevel, setOxygenLevel] = useState(52);
  const sealedCount = leaks.filter((l) => l.sealed).length;
  const allSealed = sealedCount === leaks.length;

  const sealLeak = (id: number) => {
    soundFX.cableConnect();
    setLeaks((prev) => prev.map((l) => (l.id === id ? { ...l, sealed: true } : l)));
  };

  const pumpOxygen = () => {
    if (!allSealed) {
      soundFX.hint();
      return;
    }
    soundFX.click();
    setOxygenLevel((prev) => {
      const next = Math.min(100, prev + 16);
      if (next >= 95) {
        soundFX.repairSuccess();
        setTimeout(onSuccess, 500);
      }
      return next;
    });
  };

  return (
    <div className="space-y-5">
      <div className="relative h-64 rounded-2xl bg-[#BAE6FD] border-2 border-[#38BDF8] overflow-hidden p-4">
        <div className="text-xs font-bold text-[#0F2942]">
          {isEs
            ? 'Paso 1: Haz clic en las 5 fugas de aire para colocarles parches metálicos.'
            : 'Step 1: Tap all 5 air leaks to seal them with metal patches.'}
        </div>

        {leaks.map((leak) => (
          <button
            key={leak.id}
            type="button"
            disabled={leak.sealed}
            onClick={() => sealLeak(leak.id)}
            style={{ left: `${leak.x}%`, top: `${leak.y}%` }}
            className={`absolute -translate-x-1/2 -translate-y-1/2 px-3.5 py-2 rounded-xl border-2 text-xs font-bold transition-transform cursor-pointer ${
              leak.sealed
                ? 'bg-[#E0F2FE] border-[#0284C7] text-[#0284C7]'
                : 'bg-[#EF476F] border-[#FFF8E7] text-[#FFF8E7] hover:scale-110'
            }`}
          >
            {leak.sealed ? (isEs ? 'Sellada' : 'Sealed') : isEs ? 'Fuga O₂' : 'O₂ Leak'}
          </button>
        ))}
      </div>

      <div className="bg-[#BAE6FD] border-2 border-[#38BDF8] rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex-1 min-w-[200px]">
          <div className="flex justify-between text-xs font-bold font-mono-nums text-[#0F2942] mb-1.5">
            <span>{isEs ? 'Presión de Oxígeno' : 'Oxygen Pressure'}</span>
            <span>{oxygenLevel}% (95%+)</span>
          </div>
          <div className="h-3 rounded-full bg-[#E0F2FE] border border-[#0284C7] overflow-hidden">
            <div className="h-full bg-[#0284C7] transition-all duration-150" style={{ width: `${oxygenLevel}%` }} />
          </div>
        </div>

        <button
          type="button"
          onClick={pumpOxygen}
          className={`px-5 py-3 rounded-xl font-bold text-sm cursor-pointer border-2 ${
            allSealed
              ? 'bg-[#38BDF8] hover:bg-[#FFD166] text-[#0F2942] border-[#0F2942]'
              : 'bg-[#E0F2FE] text-[#0F2942]/60 border-[#38BDF8]'
          }`}
        >
          {allSealed
            ? isEs
              ? 'Bombear Oxígeno (+16%)'
              : 'Pump Oxygen (+16%)'
            : isEs
            ? `Faltan ${leaks.length - sealedCount} fugas`
            : `${leaks.length - sealedCount} leaks left`}
        </button>
      </div>
    </div>
  );
};

const EnergyEmergencyBoard: React.FC<{ language: Language; onSuccess: () => void }> = ({
  language,
  onSuccess,
}) => {
  const isEs = language === 'es';
  const [angles, setAngles] = useState([90, 180, 270, 90]);
  const targetAngle = 0;

  const rotatePanel = (index: number) => {
    soundFX.cableConnect();
    setAngles((prev) => {
      const next = prev.map((a, idx) => (idx === index ? (a + 90) % 360 : a));
      if (next.every((a) => a === targetAngle)) {
        soundFX.repairSuccess();
        setTimeout(onSuccess, 550);
      }
      return next;
    });
  };

  const alignedCount = angles.filter((a) => a === targetAngle).length;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-[#BAE6FD] border-2 border-[#38BDF8] rounded-2xl p-6">
        {angles.map((angle, idx) => {
          const isAligned = angle === targetAngle;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => rotatePanel(idx)}
              className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 cursor-pointer ${
                isAligned
                  ? 'bg-[#7DD3FC] border-[#0284C7]'
                  : 'bg-[#E0F2FE] border-[#38BDF8] hover:border-[#0F2942]'
              }`}
            >
              <div
                className="w-16 h-16 rounded-xl bg-[#FF8C42] border-2 border-[#0F2942] flex items-center justify-center transition-transform duration-200 mb-3"
                style={{ transform: `rotate(${angle}deg)` }}
              >
                <div className="w-2 h-10 bg-[#FFD166] rounded-full" />
              </div>
              <span className="text-xs font-bold text-[#0F2942]">
                {isEs ? `Panel ${idx + 1}` : `Panel ${idx + 1}`}
              </span>
              <span className={`text-xs font-bold mt-0.5 ${isAligned ? 'text-[#0284C7]' : 'text-[#D9480F]'}`}>
                {isAligned ? (isEs ? 'Alineado' : 'Aligned') : isEs ? 'Girar 90°' : 'Rotate 90°'}
              </span>
            </button>
          );
        })}
      </div>

      <div className="text-center text-sm font-bold text-[#0284C7] font-mono-nums">
        {isEs ? 'Paneles alineados' : 'Panels aligned'}: {alignedCount} / 4
      </div>
    </div>
  );
};

const CommunicationEmergencyBoard: React.FC<{ language: Language; onSuccess: () => void }> = ({
  language,
  onSuccess,
}) => {
  const isEs = language === 'es';
  const [freq, setFreq] = useState(2);
  const [amp, setAmp] = useState(25);
  const targetFreq = 4;
  const targetAmp = 45;

  const buildWavePath = (f: number, a: number) => {
    const pts: string[] = [];
    for (let x = 0; x <= 480; x += 8) {
      const y = 75 + Math.sin((x / 480) * Math.PI * 2 * f) * a;
      pts.push(`${x === 0 ? 'M' : 'L'} ${x} ${y.toFixed(1)}`);
    }
    return pts.join(' ');
  };

  const isLocked = freq === targetFreq && Math.abs(amp - targetAmp) <= 5;

  return (
    <div className="space-y-5">
      <div className="bg-[#0B2239] border-2 border-[#0284C7] rounded-2xl p-4">
        <svg viewBox="0 0 480 150" className="w-full h-36">
          <line x1="0" y1="75" x2="480" y2="75" stroke="#ffffff" strokeOpacity="0.18" strokeDasharray="4 4" />
          <path d={buildWavePath(targetFreq, targetAmp)} stroke="#FFD166" strokeWidth="4" strokeDasharray="6 6" fill="none" />
          <path d={buildWavePath(freq, amp)} stroke="#38BDF8" strokeWidth="4" fill="none" />
        </svg>
        <div className="flex justify-between text-xs font-bold text-[#E0F2FE] px-2">
          <span>{isEs ? 'Dorada: Baliza guía' : 'Gold: Guide beacon'}</span>
          <span>{isEs ? 'Celeste: Nuestra antena' : 'Sky blue: Ship antenna'}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="bg-[#FFF8E7] border-2 border-[#0284C7] rounded-2xl p-3.5 space-y-1.5">
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm font-display font-bold text-[#0284C7]">
              {isEs ? '🌊 ¿Qué es la Frecuencia?' : '🌊 What is Frequency?'}
            </span>
            <button
              type="button"
              onClick={() =>
                soundFX.speak(
                  isEs
                    ? 'Frecuencia es cuántas ondas caben en el espacio. Más frecuencia hace ondas más juntitas.'
                    : 'Frequency is how many waves repeat. Higher frequency makes waves closer together.',
                  language
                )
              }
              className="p-1.5 rounded-lg bg-[#BAE6FD] hover:bg-[#38BDF8] border border-[#0284C7] text-[#0284C7] cursor-pointer"
              aria-label={isEs ? 'Escuchar qué es frecuencia' : 'Listen to frequency explanation'}
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs md:text-sm font-semibold text-[#0F2942] leading-snug">
            {isEs
              ? 'Es cuántas ondas pasan rápido. Más frecuencia = ondas más juntitas.'
              : 'How fast the waves repeat. Higher frequency = waves closer together.'}
          </p>
        </div>

        <div className="bg-[#FFF8E7] border-2 border-[#FF8C42] rounded-2xl p-3.5 space-y-1.5">
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm font-display font-bold text-[#D9480F]">
              {isEs ? '⛰️ ¿Qué es la Amplitud?' : '⛰️ What is Amplitude?'}
            </span>
            <button
              type="button"
              onClick={() =>
                soundFX.speak(
                  isEs
                    ? 'Amplitud es qué tan alta es cada onda. Más amplitud hace olas más altas.'
                    : 'Amplitude is how tall each wave is. Higher amplitude makes taller waves.',
                  language
                )
              }
              className="p-1.5 rounded-lg bg-[#BAE6FD] hover:bg-[#38BDF8] border border-[#0284C7] text-[#0284C7] cursor-pointer"
              aria-label={isEs ? 'Escuchar qué es amplitud' : 'Listen to amplitude explanation'}
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs md:text-sm font-semibold text-[#0F2942] leading-snug">
            {isEs
              ? 'Es qué tan alta es cada onda. Más amplitud = olas más altas y grandes.'
              : 'How tall each wave is. Higher amplitude = bigger, taller waves.'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#BAE6FD] border-2 border-[#38BDF8] rounded-2xl p-4">
        <label className="space-y-1.5 text-sm font-bold">
          <div className="flex justify-between text-[#0F2942] font-mono-nums">
            <span>{isEs ? 'Frecuencia (ondas juntitas)' : 'Frequency (waves close)'}</span>
            <span>{freq} Hz</span>
          </div>
          <input
            type="range"
            min={1}
            max={6}
            step={1}
            value={freq}
            onChange={(e) => {
              soundFX.click();
              setFreq(Number(e.target.value));
            }}
            className="w-full accent-[#0284C7] cursor-pointer"
          />
        </label>

        <label className="space-y-1.5 text-sm font-bold">
          <div className="flex justify-between text-[#0F2942] font-mono-nums">
            <span>{isEs ? 'Amplitud (altura de onda)' : 'Amplitude (wave height)'}</span>
            <span>{amp}%</span>
          </div>
          <input
            type="range"
            min={15}
            max={65}
            step={5}
            value={amp}
            onChange={(e) => {
              soundFX.click();
              setAmp(Number(e.target.value));
            }}
            className="w-full accent-[#FF8C42] cursor-pointer"
          />
        </label>
      </div>

      <div className="flex justify-center">
        <button
          type="button"
          disabled={!isLocked}
          onClick={() => {
            soundFX.repairSuccess();
            onSuccess();
          }}
          className={`px-7 py-3.5 rounded-2xl font-display font-bold text-base cursor-pointer border-2 ${
            isLocked
              ? 'bg-[#38BDF8] hover:bg-[#FFD166] text-[#0F2942] border-[#0F2942]'
              : 'bg-[#BAE6FD] text-[#0F2942]/50 border-[#38BDF8] cursor-not-allowed'
          }`}
        >
          {isLocked
            ? isEs
              ? '¡Señal Alineada! Transmitir'
              : 'Signal Aligned! Transmit'
            : isEs
            ? 'Alinea ambas ondas'
            : 'Match both waves'}
        </button>
      </div>
    </div>
  );
};

export const ShipRepairGame: React.FC<ShipRepairGameProps> = ({
  language,
  emergencyType,
  title,
  brief,
  onRepaired,
}) => {
  const t = UI_STRINGS[language];
  const [done, setDone] = useState(false);

  const stepHint =
    emergencyType === 'CABLES'
      ? language === 'es'
        ? 'Une cada cable de la izquierda con su mismo color a la derecha.'
        : 'Match each cable on the left with the same color on the right.'
      : emergencyType === 'OXYGEN'
      ? language === 'es'
        ? 'Toca las 5 fugas de aire y luego bombea oxígeno.'
        : 'Tap all 5 air leaks and then pump oxygen.'
      : emergencyType === 'ENERGY'
      ? language === 'es'
        ? 'Gira los 4 paneles hasta alinearlos hacia arriba.'
        : 'Rotate all 4 panels until they point straight up.'
      : language === 'es'
      ? 'Mueve la frecuencia y la amplitud para igualar la onda dorada.'
      : 'Move frequency and amplitude to match the golden wave.';

  useEffect(() => {
    soundFX.speak(`${brief} ${stepHint}`, language, 520);
    return () => {
      soundFX.stopSpeaking();
    };
  }, [emergencyType, brief, stepHint, language]);

  const Icon =
    emergencyType === 'CABLES'
      ? Zap
      : emergencyType === 'OXYGEN'
      ? Wind
      : emergencyType === 'ENERGY'
      ? Activity
      : Radio;

  return (
    <div className="max-w-3xl w-full mx-auto bg-[#E0F2FE] border-4 border-[#0284C7] rounded-[2rem] p-6 md:p-8 space-y-6 shadow-2xl text-[#0F2942]">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3.5 rounded-2xl bg-[#FF8C42] border-2 border-[#0F2942] text-[#FFF8E7] shrink-0">
            <Icon className="w-8 h-8" />
          </div>
          <div>
            <div className="text-sm font-bold text-[#D9480F]">{t.emergencyTag}</div>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-[#0F2942]">{title}</h2>
            <p className="text-base font-semibold text-[#0284C7] mt-0.5">{brief}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => soundFX.speak(`${brief} ${stepHint}`, language)}
          className="shrink-0 p-2.5 rounded-xl bg-[#BAE6FD] hover:bg-[#FFD166] border-2 border-[#0284C7] text-[#0284C7] cursor-pointer"
          aria-label={language === 'es' ? 'Escuchar instrucción' : 'Listen to instruction'}
        >
          <Volume2 className="w-5 h-5" />
        </button>
      </div>

      {done ? (
        <div className="py-8 text-center space-y-4 bg-[#BAE6FD] rounded-3xl p-6 border-2 border-[#0284C7]">
          <CheckCircle2 className="w-16 h-16 text-[#0284C7] mx-auto" />
          <h3 className="text-3xl font-display font-bold text-[#0284C7]">{t.systemRestored}</h3>
          <p className="text-lg font-bold text-[#0F2942]">{t.systemRestoredDesc}</p>
          <button
            type="button"
            onClick={() => {
              soundFX.click();
              onRepaired();
            }}
            className="px-8 py-4 rounded-2xl bg-[#FFD166] hover:bg-[#FF8C42] text-[#0F2942] border-2 border-b-4 border-[#0F2942] font-display font-bold text-xl cursor-pointer"
          >
            {t.goToMath}
          </button>
        </div>
      ) : (
        <>
          {emergencyType === 'CABLES' && <CableRepairBoard language={language} onSuccess={() => setDone(true)} />}
          {emergencyType === 'OXYGEN' && <OxygenEmergencyBoard language={language} onSuccess={() => setDone(true)} />}
          {emergencyType === 'ENERGY' && <EnergyEmergencyBoard language={language} onSuccess={() => setDone(true)} />}
          {emergencyType === 'COMMUNICATION' && (
            <CommunicationEmergencyBoard language={language} onSuccess={() => setDone(true)} />
          )}
        </>
      )}
    </div>
  );
};
