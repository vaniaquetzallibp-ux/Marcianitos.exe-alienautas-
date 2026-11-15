// Procedural Web Audio API sound effects, alien voice chirps, cosmic background music,
// and Web Speech API localized narration for instructions & fun facts (zero external dependencies)

import { Language } from '../types/game';

export type AlienVoiceMood = 'happy' | 'alert' | 'curious' | 'victory';

class SpaceSoundEngine {
  private ctx: AudioContext | null = null;
  public muted = false;
  public musicEnabled = true;

  private musicTimer: number | null = null;
  private musicStep = 0;
  private musicRunning = false;
  private gestureHooked = false;
  private speakDelayTimer: number | null = null;
  private isSpeakingVoice = false;

  private ensureCtx(forMusic = false): AudioContext | null {
    if (this.muted) return null;
    if (forMusic && !this.musicEnabled) return null;
    if (typeof window === 'undefined') return null;

    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return null;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public initAutoMusicOnGesture() {
    if (this.gestureHooked || typeof window === 'undefined') return;
    this.gestureHooked = true;

    const unlock = () => {
      if (!this.muted && this.musicEnabled) {
        this.startMusic();
      }
      if ('speechSynthesis' in window) {
        // Trigger voice list population in browsers
        window.speechSynthesis.getVoices();
      }
    };

    window.addEventListener('pointerdown', unlock, { passive: true });
    window.addEventListener('keydown', unlock, { passive: true });
  }

  public syncState(muted: boolean, musicEnabled: boolean) {
    this.muted = muted;
    this.musicEnabled = musicEnabled;

    if (this.muted) {
      this.stopSpeaking();
    }
    if (this.muted || !this.musicEnabled) {
      this.stopMusic();
    } else if (this.ctx && this.ctx.state === 'running') {
      this.startMusic();
    }
  }

  public startMusic() {
    if (this.muted || !this.musicEnabled || this.musicRunning) return;
    const ctx = this.ensureCtx(true);
    if (!ctx) return;

    this.musicRunning = true;

    // Gentle, playful cosmic arpeggio + warm pad bass (C Lydian / Pentatonic space loop)
    const melodyPattern = [
      523.25, 0, 659.25, 783.99, 987.77, 783.99, 659.25, 0,
      440.0, 0, 523.25, 659.25, 880.0, 659.25, 523.25, 0,
      349.23, 0, 440.0, 523.25, 698.46, 523.25, 440.0, 0,
      392.0, 0, 493.88, 587.33, 783.99, 659.25, 587.33, 0,
    ];
    const bassPattern = [
      130.81, 0, 0, 0, 196.0, 0, 0, 0,
      110.0, 0, 0, 0, 164.81, 0, 0, 0,
      174.61, 0, 0, 0, 130.81, 0, 0, 0,
      196.0, 0, 0, 0, 146.83, 0, 0, 0,
    ];

    const playStep = () => {
      if (this.muted || !this.musicEnabled || !this.musicRunning) return;
      const audioCtx = this.ensureCtx(true);
      if (!audioCtx || audioCtx.state !== 'running') return;

      const idx = this.musicStep % melodyPattern.length;
      const melFreq = melodyPattern[idx];
      const bassFreq = bassPattern[idx];
      const now = audioCtx.currentTime;
      const duckScale = this.isSpeakingVoice ? 0.35 : 1;

      if (melFreq > 0) {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        const filter = audioCtx.createBiquadFilter();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(melFreq, now);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1600, now);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.026 * duckScale, now + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0008, now + 0.36);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.38);
      }

      if (bassFreq > 0) {
        const bOsc = audioCtx.createOscillator();
        const bGain = audioCtx.createGain();
        bOsc.type = 'sine';
        bOsc.frequency.setValueAtTime(bassFreq, now);

        bGain.gain.setValueAtTime(0.001, now);
        bGain.gain.linearRampToValueAtTime(0.03 * duckScale, now + 0.08);
        bGain.gain.exponentialRampToValueAtTime(0.0008, now + 0.72);

        bOsc.connect(bGain);
        bGain.connect(audioCtx.destination);
        bOsc.start(now);
        bOsc.stop(now + 0.75);
      }

      this.musicStep += 1;
    };

    playStep();
    this.musicTimer = window.setInterval(playStep, 260);
  }

  public stopMusic() {
    this.musicRunning = false;
    if (this.musicTimer !== null) {
      clearInterval(this.musicTimer);
      this.musicTimer = null;
    }
  }

  public stopSpeaking() {
    if (this.speakDelayTimer !== null) {
      clearTimeout(this.speakDelayTimer);
      this.speakDelayTimer = null;
    }
    this.isSpeakingVoice = false;
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {
        // Ignore speech synthesis errors
      }
    }
  }

  // Spoken voice for instructions and fun facts in the selected language (ES or EN)
  public speak(text: string, language: Language, delayMs = 0) {
    if (this.muted || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    const cleanText = text.replace(/[“”"]/g, '').trim();
    if (!cleanText) return;

    this.stopSpeaking();

    const runUtterance = () => {
      if (this.muted) return;
      try {
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(cleanText);
        const voices = synth.getVoices();

        const targetPrefix = language === 'es' ? 'es' : 'en';
        const matchingVoices = voices.filter((v) =>
          v.lang.toLowerCase().startsWith(targetPrefix)
        );
        const preferredVoice =
          matchingVoices.find((v) =>
            language === 'es'
              ? /es-mx|es-419|es-us|es-es/i.test(v.lang)
              : /en-us|en-gb/i.test(v.lang)
          ) || matchingVoices[0];

        if (preferredVoice) {
          utterance.voice = preferredVoice;
          utterance.lang = preferredVoice.lang;
        } else {
          utterance.lang = language === 'es' ? 'es-MX' : 'en-US';
        }

        utterance.rate = 0.96;
        utterance.pitch = 1.06;
        utterance.volume = 0.95;

        utterance.onstart = () => {
          this.isSpeakingVoice = true;
        };
        utterance.onend = () => {
          this.isSpeakingVoice = false;
        };
        utterance.onerror = () => {
          this.isSpeakingVoice = false;
        };

        synth.speak(utterance);
      } catch {
        this.isSpeakingVoice = false;
      }
    };

    if (delayMs > 0) {
      this.speakDelayTimer = window.setTimeout(runUtterance, delayMs);
    } else {
      runUtterance();
    }
  }

  private playTone(
    freq: number,
    endFreq: number,
    duration: number,
    type: OscillatorType = 'sine',
    gainLevel = 0.09,
    delay = 0
  ) {
    const ctx = this.ensureCtx();
    if (!ctx) return;

    const startTime = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, startTime);
    if (endFreq !== freq) {
      osc.frequency.exponentialRampToValueAtTime(Math.max(30, endFreq), startTime + duration);
    }

    gain.gain.setValueAtTime(0.001, startTime);
    gain.gain.linearRampToValueAtTime(gainLevel, startTime + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(startTime);
    osc.stop(startTime + duration + 0.02);
  }

  // Cute alien voice chirps / gibberish syllables ("soniditos de alien")
  alienSpeak(mood: AlienVoiceMood = 'happy') {
    const ctx = this.ensureCtx();
    if (!ctx) return;

    const patterns: Record<AlienVoiceMood, { f1: number; f2: number; dur: number; gap: number }[]> = {
      happy: [
        { f1: 420, f2: 640, dur: 0.065, gap: 0.0 },
        { f1: 580, f2: 760, dur: 0.06, gap: 0.075 },
        { f1: 510, f2: 700, dur: 0.07, gap: 0.145 },
        { f1: 680, f2: 920, dur: 0.085, gap: 0.225 },
        { f1: 560, f2: 780, dur: 0.075, gap: 0.32 },
      ],
      alert: [
        { f1: 620, f2: 390, dur: 0.08, gap: 0.0 },
        { f1: 590, f2: 340, dur: 0.08, gap: 0.095 },
        { f1: 660, f2: 430, dur: 0.07, gap: 0.19 },
        { f1: 520, f2: 310, dur: 0.11, gap: 0.27 },
      ],
      curious: [
        { f1: 440, f2: 520, dur: 0.065, gap: 0.0 },
        { f1: 510, f2: 470, dur: 0.06, gap: 0.075 },
        { f1: 490, f2: 640, dur: 0.075, gap: 0.15 },
        { f1: 620, f2: 880, dur: 0.095, gap: 0.235 },
      ],
      victory: [
        { f1: 520, f2: 780, dur: 0.065, gap: 0.0 },
        { f1: 660, f2: 880, dur: 0.065, gap: 0.075 },
        { f1: 780, f2: 1040, dur: 0.07, gap: 0.15 },
        { f1: 880, f2: 1180, dur: 0.11, gap: 0.23 },
      ],
    };

    const syllables = patterns[mood];
    syllables.forEach((syl, idx) => {
      const startTime = ctx.currentTime + syl.gap;
      const osc = ctx.createOscillator();
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      const gain = ctx.createGain();

      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(syl.f1, startTime);
      osc.frequency.exponentialRampToValueAtTime(Math.max(80, syl.f2), startTime + syl.dur);

      lfo.type = 'sine';
      lfo.frequency.setValueAtTime(28, startTime);
      lfoGain.gain.setValueAtTime(22, startTime);
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);

      gain.gain.setValueAtTime(0.001, startTime);
      gain.gain.linearRampToValueAtTime(0.075, startTime + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + syl.dur);

      osc.connect(gain);
      gain.connect(ctx.destination);

      lfo.start(startTime);
      osc.start(startTime);
      lfo.stop(startTime + syl.dur + 0.02);
      osc.stop(startTime + syl.dur + 0.02);
    });
  }

  click() {
    this.playTone(540, 680, 0.06, 'triangle', 0.07);
  }

  starCollect() {
    this.playTone(660, 880, 0.09, 'sine', 0.08, 0);
    this.playTone(880, 1174, 0.12, 'sine', 0.07, 0.06);
  }

  boost() {
    this.playTone(180, 420, 0.16, 'triangle', 0.08);
  }

  hit() {
    this.playTone(190, 65, 0.22, 'sawtooth', 0.11);
  }

  cableConnect() {
    this.playTone(440, 660, 0.1, 'triangle', 0.08);
  }

  repairSuccess() {
    this.playTone(523.25, 523.25, 0.11, 'sine', 0.08, 0);
    this.playTone(659.25, 659.25, 0.11, 'sine', 0.08, 0.09);
    this.playTone(783.99, 1046.5, 0.24, 'triangle', 0.09, 0.18);
  }

  hint() {
    this.playTone(380, 440, 0.14, 'sine', 0.06);
  }

  victory() {
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((n, idx) => {
      this.playTone(n, n, 0.18, 'triangle', 0.08, idx * 0.1);
    });
  }
}

export const soundFX = new SpaceSoundEngine();
