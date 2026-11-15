import React, { useEffect, useRef, useState } from 'react';
import { Gem, Pause, Play, RotateCcw, Shield, Star, Volume2 } from 'lucide-react';
import { ROCKET_PALETTE } from '../assets/assetManifest';
import { UI_STRINGS } from '../i18n/translations';
import { Language, PlanetChapter, RocketUpgrades } from '../types/game';
import { soundFX } from '../utils/audio';

interface SpaceRunnerGameProps {
  language: Language;
  chapter: PlanetChapter;
  rocketUpgrades: RocketUpgrades;
  onVictory: (stats: { score: number; starsCollected: number; rocksCollected: number }) => void;
}

type RunnerStatus = 'PLAYING' | 'PAUSED' | 'VICTORY' | 'GAME_OVER';

interface MeteorObstacle {
  id: number;
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  rotation: number;
  rotSpeed: number;
  vertices: number[];
  kind: 'normal' | 'fast';
}

interface StarItem {
  id: number;
  x: number;
  y: number;
  vx: number;
  collected: boolean;
  pulse: number;
}

interface PlanetRockItem {
  id: number;
  x: number;
  y: number;
  vx: number;
  radius: number;
  rotation: number;
  rotSpeed: number;
  pulse: number;
  collected: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

interface TelegraphWarning {
  id: number;
  y: number;
  timer: number;
  spawned: boolean;
}

export const SpaceRunnerGame: React.FC<SpaceRunnerGameProps> = ({
  language,
  chapter,
  rocketUpgrades,
  onVictory,
}) => {
  const t = UI_STRINGS[language];
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const effectiveTargetKm = Math.round(
    chapter.runnerConfig.targetDistanceKm * (1 - (rocketUpgrades.tankLevel - 1) * 0.1)
  );
  const maxShields = 1 + rocketUpgrades.shieldLevel;

  const [status, setStatus] = useState<RunnerStatus>('PLAYING');
  const [hud, setHud] = useState({
    distanceKm: 0,
    targetKm: effectiveTargetKm,
    shields: maxShields,
    stars: 0,
    rocks: 0,
    score: 0,
    boostReady: 100,
  });

  const statusRef = useRef<RunnerStatus>('PLAYING');
  statusRef.current = status;

  const [runSeed, setRunSeed] = useState(0);

  const handleRestart = () => {
    soundFX.click();
    setStatus('PLAYING');
    setHud({
      distanceKm: 0,
      targetKm: effectiveTargetKm,
      shields: maxShields,
      stars: 0,
      rocks: 0,
      score: 0,
      boostReady: 100,
    });
    setRunSeed((n) => n + 1);
  };

  useEffect(() => {
    const rockName = chapter.runnerConfig.collectibleRock.name[language];
    const flightTip =
      language === 'es'
        ? `Sube y baja el cohete. Atrapa ${rockName} y esquiva los meteoritos.`
        : `Move your rocket up and down. Catch ${rockName} and dodge meteorites.`;
    soundFX.speak(flightTip, language, 520);
    return () => {
      soundFX.stopSpeaking();
    };
  }, [chapter.id, chapter.runnerConfig.collectibleRock.name, language]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = 900;
    const H = 440;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = W * dpr;
    canvas.height = H * dpr;

    const heldKeys = new Set<string>();
    let pointerTargetY: number | null = null;
    let boostTrigger = false;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setStatus((prev) => (prev === 'PLAYING' ? 'PAUSED' : prev === 'PAUSED' ? 'PLAYING' : prev));
        return;
      }
      if (['ArrowUp', 'ArrowDown', 'w', 'W', 's', 'S', ' '].includes(e.key)) {
        e.preventDefault();
      }
      if (e.key === ' ' && !e.repeat) {
        boostTrigger = true;
      }
      heldKeys.add(e.key.toLowerCase());
    };

    const onKeyUp = (e: KeyboardEvent) => {
      heldKeys.delete(e.key.toLowerCase());
    };

    const onBlur = () => {
      heldKeys.clear();
      pointerTargetY = null;
    };

    const updatePointer = (clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.height <= 0) return;
      const normalized = ((clientY - rect.top) / rect.height) * H;
      pointerTargetY = Math.max(36, Math.min(H - 36, normalized));
    };

    const onPointerDown = (e: PointerEvent) => updatePointer(e.clientY);
    const onPointerMove = (e: PointerEvent) => {
      if (e.buttons > 0 || e.pointerType === 'touch') updatePointer(e.clientY);
    };
    const onPointerUp = () => {
      pointerTargetY = null;
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    window.addEventListener('blur', onBlur);
    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    let shipY = H / 2;
    let shipVy = 0;
    const shipX = 128;
    let shields = maxShields;
    let invulnTimer = 0;
    let boostTimer = 0;
    let boostCooldown = 0;
    let hitstopTimer = 0;
    let shakeIntensity = 0;
    let distanceKm = 0;
    let starsCollected = 0;
    let rocksCollected = 0;
    let score = 0;
    let spawnTimer = 0.7;
    let starSpawnTimer = 0.9;
    let rockSpawnTimer = 1.25;
    let telegraphTimer = 4.2;
    let nextId = 1;

    const obstacles: MeteorObstacle[] = [];
    const stars: StarItem[] = [];
    const rocks: PlanetRockItem[] = [];
    const particles: Particle[] = [];
    const telegraphs: TelegraphWarning[] = [];

    const bgStars = Array.from({ length: 65 }, (_, i) => ({
      x: (i * 137) % W,
      y: (i * 89) % H,
      size: (i % 3) + 1,
      speed: 25 + (i % 4) * 22,
      alpha: 0.35 + (i % 5) * 0.12,
    }));

    const spawnParticles = (x: number, y: number, color: string, count: number, speedScale = 1) => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = (40 + Math.random() * 140) * speedScale;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 0.35 + Math.random() * 0.3,
          maxLife: 0.65,
          color,
          size: 2 + Math.random() * 3.5,
        });
      }
    };

    const createMeteor = (x: number, y: number, kind: 'normal' | 'fast'): MeteorObstacle => {
      const radius = kind === 'fast' ? 18 : 20 + Math.random() * 16;
      const verts = Array.from({ length: 8 }, () => 0.78 + Math.random() * 0.35);
      const speedRamp = 1 + (distanceKm / effectiveTargetKm) * 0.45;
      const vx = -(
        chapter.runnerConfig.baseSpeed *
        speedRamp *
        (kind === 'fast' ? 1.48 : 0.92 + Math.random() * 0.24)
      );
      return {
        id: nextId++,
        x,
        y,
        radius,
        vx,
        vy: (Math.random() - 0.5) * (kind === 'fast' ? 20 : 48),
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 3.4,
        vertices: verts,
        kind,
      };
    };

    let lastTime = performance.now();
    let hudSyncAccum = 0;
    let rafId = 0;

    const frame = (now: number) => {
      const rawDt = (now - lastTime) / 1000;
      lastTime = now;
      const dt = Math.min(rawDt, 0.05);

      if (statusRef.current === 'PLAYING') {
        if (hitstopTimer > 0) {
          hitstopTimer -= dt;
        } else {
          if (boostTrigger) {
            boostTrigger = false;
            if (boostCooldown <= 0) {
              boostTimer = 1.1;
              boostCooldown = 4.5;
              soundFX.boost();
              spawnParticles(shipX - 18, shipY, '#7DD3FC', 14, 1.3);
            }
          }
          if (boostTimer > 0) boostTimer -= dt;
          if (boostCooldown > 0) boostCooldown = Math.max(0, boostCooldown - dt);
          if (invulnTimer > 0) invulnTimer = Math.max(0, invulnTimer - dt);

          const maneuverAccel = 1450 + (rocketUpgrades.thrusterLevel - 1) * 240;
          const maxVy = 320 + (rocketUpgrades.thrusterLevel - 1) * 45;
          let inputDir = 0;
          if (heldKeys.has('arrowup') || heldKeys.has('w')) inputDir -= 1;
          if (heldKeys.has('arrowdown') || heldKeys.has('s')) inputDir += 1;

          if (inputDir !== 0) {
            pointerTargetY = null;
            shipVy += inputDir * maneuverAccel * dt;
          } else if (pointerTargetY !== null) {
            const diff = pointerTargetY - shipY;
            shipVy = Math.max(-maxVy, Math.min(maxVy, diff * 7.5));
          } else {
            shipVy *= Math.pow(0.004, dt);
          }

          shipVy = Math.max(-maxVy, Math.min(maxVy, shipVy));
          shipY = Math.max(36, Math.min(H - 36, shipY + shipVy * dt));

          const boostMult = boostTimer > 0 ? 1.75 : 1;
          const kmPerSec = 95 * boostMult;
          distanceKm = Math.min(effectiveTargetKm, distanceKm + kmPerSec * dt);
          score += Math.round(kmPerSec * dt);

          if (Math.random() < 0.78) {
            particles.push({
              x: shipX - 30,
              y: shipY + (Math.random() - 0.5) * 9,
              vx: -130 - Math.random() * 80,
              vy: (Math.random() - 0.5) * 35,
              life: 0.24,
              maxLife: 0.24,
              color: boostTimer > 0 ? '#7DD3FC' : ROCKET_PALETTE.flameYellow,
              size: boostTimer > 0 ? 5.5 : 4,
            });
          }

          for (const st of bgStars) {
            st.x -= st.speed * boostMult * dt;
            if (st.x < -5) {
              st.x = W + 5;
              st.y = Math.random() * H;
            }
          }

          spawnTimer -= dt;
          if (spawnTimer <= 0) {
            const progressRatio = distanceKm / effectiveTargetKm;
            const interval = Math.max(
              0.52,
              (1.22 - progressRatio * 0.4) / chapter.runnerConfig.hazardSpawnRate
            );
            spawnTimer = interval * (0.78 + Math.random() * 0.48);
            obstacles.push(createMeteor(W + 40, 38 + Math.random() * (H - 76), 'normal'));
          }

          telegraphTimer -= dt;
          if (telegraphTimer <= 0) {
            telegraphTimer = Math.max(2.6, 4.5 - (distanceKm / effectiveTargetKm) * 1.4);
            telegraphs.push({
              id: nextId++,
              y: 48 + Math.random() * (H - 96),
              timer: 0.9,
              spawned: false,
            });
          }

          for (let i = telegraphs.length - 1; i >= 0; i--) {
            const tel = telegraphs[i];
            tel.timer -= dt;
            if (tel.timer <= 0 && !tel.spawned) {
              tel.spawned = true;
              obstacles.push(createMeteor(W + 30, tel.y, 'fast'));
              telegraphs.splice(i, 1);
            }
          }

          starSpawnTimer -= dt;
          if (starSpawnTimer <= 0) {
            starSpawnTimer = 1.15 + Math.random() * 0.7;
            stars.push({
              id: nextId++,
              x: W + 24,
              y: 44 + Math.random() * (H - 88),
              vx: -(chapter.runnerConfig.baseSpeed * 0.78),
              collected: false,
              pulse: Math.random() * Math.PI * 2,
            });
          }

          // Planet-specific collectible rocks!
          rockSpawnTimer -= dt;
          if (rockSpawnTimer <= 0) {
            rockSpawnTimer = 1.3 + Math.random() * 0.75;
            rocks.push({
              id: nextId++,
              x: W + 30,
              y: 48 + Math.random() * (H - 96),
              vx: -(chapter.runnerConfig.baseSpeed * 0.84),
              radius: 15,
              rotation: Math.random() * Math.PI * 2,
              rotSpeed: (Math.random() - 0.5) * 2.4,
              pulse: Math.random() * Math.PI * 2,
              collected: false,
            });
          }

          const magnetRadius = 38 + (rocketUpgrades.thrusterLevel - 1) * 26;
          for (let i = stars.length - 1; i >= 0; i--) {
            const s = stars[i];
            s.x += s.vx * boostMult * dt;
            s.pulse += dt * 5;

            const dx = shipX - s.x;
            const dy = shipY - s.y;
            const dist = Math.hypot(dx, dy);
            if (dist < magnetRadius + 24) {
              s.x += (dx / Math.max(1, dist)) * 340 * dt;
              s.y += (dy / Math.max(1, dist)) * 340 * dt;
            }

            if (dist < 32 && !s.collected) {
              s.collected = true;
              starsCollected += 1;
              score += 25;
              soundFX.starCollect();
              spawnParticles(s.x, s.y, '#FFD166', 10, 0.9);
              stars.splice(i, 1);
              continue;
            }
            if (s.x < -30) stars.splice(i, 1);
          }

          for (let i = rocks.length - 1; i >= 0; i--) {
            const rk = rocks[i];
            rk.x += rk.vx * boostMult * dt;
            rk.rotation += rk.rotSpeed * dt;
            rk.pulse += dt * 6;

            const dx = shipX - rk.x;
            const dy = shipY - rk.y;
            const dist = Math.hypot(dx, dy);
            if (dist < magnetRadius + 28) {
              rk.x += (dx / Math.max(1, dist)) * 360 * dt;
              rk.y += (dy / Math.max(1, dist)) * 360 * dt;
            }

            if (dist < 34 && !rk.collected) {
              rk.collected = true;
              rocksCollected += 1;
              score += 40;
              soundFX.starCollect();
              spawnParticles(
                rk.x,
                rk.y,
                chapter.runnerConfig.collectibleRock.color,
                14,
                1.1
              );
              rocks.splice(i, 1);
              continue;
            }
            if (rk.x < -40) rocks.splice(i, 1);
          }

          for (let i = obstacles.length - 1; i >= 0; i--) {
            const obs = obstacles[i];
            obs.x += obs.vx * boostMult * dt;
            obs.y += obs.vy * dt;
            obs.rotation += obs.rotSpeed * dt;
            if (obs.y < obs.radius || obs.y > H - obs.radius) obs.vy *= -1;

            const dist = Math.hypot(obs.x - shipX, obs.y - shipY);
            if (dist < obs.radius + 20) {
              if (boostTimer > 0) {
                spawnParticles(obs.x, obs.y, '#7DD3FC', 14, 1.2);
                score += 15;
                obstacles.splice(i, 1);
                continue;
              } else if (invulnTimer <= 0) {
                shields -= 1;
                invulnTimer = 1.25;
                hitstopTimer = 0.06;
                shakeIntensity = 9;
                soundFX.hit();
                spawnParticles(shipX, shipY, '#EF476F', 16, 1.3);
                obstacles.splice(i, 1);

                if (shields <= 0) setStatus('GAME_OVER');
                continue;
              }
            }
            if (obs.x < -60) obstacles.splice(i, 1);
          }

          for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.x += p.vx * dt;
            p.y += p.vy * dt;
            p.life -= dt;
            if (p.life <= 0) particles.splice(i, 1);
          }

          if (shakeIntensity > 0) shakeIntensity = Math.max(0, shakeIntensity - 28 * dt);

          if (distanceKm >= effectiveTargetKm) {
            soundFX.victory();
            setStatus('VICTORY');
          }
        }

        hudSyncAccum += dt;
        if (hudSyncAccum >= 0.08) {
          hudSyncAccum = 0;
          setHud({
            distanceKm: Math.round(distanceKm),
            targetKm: effectiveTargetKm,
            shields: Math.max(0, shields),
            stars: starsCollected,
            rocks: rocksCollected,
            score,
            boostReady: Math.round(Math.max(0, 100 - (boostCooldown / 4.5) * 100)),
          });
        }
      }

      ctx.save();
      ctx.scale(dpr, dpr);

      if (shakeIntensity > 0) {
        ctx.translate(
          (Math.random() - 0.5) * shakeIntensity,
          (Math.random() - 0.5) * shakeIntensity
        );
      }

      ctx.fillStyle = chapter.runnerConfig.bgTint;
      ctx.fillRect(0, 0, W, H);

      const progressRatio = Math.min(1, distanceKm / effectiveTargetKm);
      const destRadius = 26 + progressRatio * 68;
      const destX = W - 40 - progressRatio * 35;
      const destY = H * 0.28;
      const grad = ctx.createRadialGradient(
        destX - destRadius * 0.3,
        destY - destRadius * 0.3,
        4,
        destX,
        destY,
        destRadius
      );
      grad.addColorStop(0, chapter.palette.atmosphere);
      grad.addColorStop(0.6, chapter.palette.primary);
      grad.addColorStop(1, chapter.palette.secondary);
      ctx.globalAlpha = 0.4 + progressRatio * 0.55;
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(destX, destY, destRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;

      for (const st of bgStars) {
        ctx.fillStyle = `rgba(255, 248, 231, ${st.alpha})`;
        ctx.fillRect(st.x, st.y, st.size, st.size);
      }

      // Golden Stars
      for (const s of stars) {
        const scale = 1 + Math.sin(s.pulse) * 0.12;
        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.scale(scale, scale);
        ctx.fillStyle = '#FFD166';
        ctx.strokeStyle = '#1A1E2E';
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let p = 0; p < 10; p++) {
          const r = p % 2 === 0 ? 12 : 5.5;
          const a = (p * Math.PI) / 5 - Math.PI / 2;
          if (p === 0) ctx.moveTo(Math.cos(a) * r, Math.sin(a) * r);
          else ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }

      // Planet-Specific Collectible Crystal Rocks (Bright glow & faceted shape)
      for (const rk of rocks) {
        const scale = 1 + Math.sin(rk.pulse) * 0.1;
        ctx.save();
        ctx.translate(rk.x, rk.y);
        ctx.scale(scale, scale);

        // Friendly Sky-Blue Glow Halo
        ctx.fillStyle = chapter.runnerConfig.collectibleRock.glowColor;
        ctx.globalAlpha = 0.28;
        ctx.beginPath();
        ctx.arc(0, 0, rk.radius + 7, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;

        ctx.rotate(rk.rotation);
        ctx.fillStyle = chapter.runnerConfig.collectibleRock.color;
        ctx.strokeStyle = '#7DD3FC';
        ctx.lineWidth = 2.6;
        ctx.beginPath();
        ctx.moveTo(0, -rk.radius);
        ctx.lineTo(rk.radius * 0.85, -rk.radius * 0.25);
        ctx.lineTo(rk.radius * 0.65, rk.radius * 0.85);
        ctx.lineTo(-rk.radius * 0.65, rk.radius * 0.85);
        ctx.lineTo(-rk.radius * 0.85, -rk.radius * 0.25);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Inner shine facet
        ctx.fillStyle = 'rgba(255,255,255,0.55)';
        ctx.beginPath();
        ctx.moveTo(0, -rk.radius * 0.6);
        ctx.lineTo(rk.radius * 0.35, -rk.radius * 0.1);
        ctx.lineTo(0, rk.radius * 0.35);
        ctx.lineTo(-rk.radius * 0.35, -rk.radius * 0.1);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
      }

      // Dangerous Meteorites (Irregular dark rock with coral danger border)
      for (const obs of obstacles) {
        ctx.save();
        ctx.translate(obs.x, obs.y);
        ctx.rotate(obs.rotation);
        ctx.fillStyle = obs.kind === 'fast' ? '#D9480F' : chapter.runnerConfig.meteorColor;
        ctx.strokeStyle = '#EF476F';
        ctx.lineWidth = 2.6;
        ctx.beginPath();
        obs.vertices.forEach((v, idx) => {
          const angle = (idx / obs.vertices.length) * Math.PI * 2;
          const r = obs.radius * v;
          if (idx === 0) ctx.moveTo(Math.cos(angle) * r, Math.sin(angle) * r);
          else ctx.lineTo(Math.cos(angle) * r, Math.sin(angle) * r);
        });
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = 'rgba(26, 30, 46, 0.32)';
        ctx.beginPath();
        ctx.arc(-obs.radius * 0.25, -obs.radius * 0.15, obs.radius * 0.24, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      for (const tel of telegraphs) {
        ctx.save();
        ctx.fillStyle = '#EF476F';
        ctx.strokeStyle = '#FFD166';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(W - 24, tel.y, 14, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = '#FFF8E7';
        ctx.font = 'bold 16px Fredoka, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('!', W - 24, tel.y + 1);
        ctx.restore();
      }

      for (const p of particles) {
        ctx.globalAlpha = Math.max(0, p.life / p.maxLife);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // Rocket with New Bright Orange / Gold / Coral / Teal Palette
      const flicker = invulnTimer > 0 && Math.floor(invulnTimer * 18) % 2 === 0;
      if (!flicker) {
        ctx.save();
        ctx.translate(shipX, shipY);
        ctx.rotate(Math.max(-0.22, Math.min(0.22, shipVy * 0.0007)));

        if (boostTimer > 0) {
          ctx.strokeStyle = '#7DD3FC';
          ctx.lineWidth = 3.5;
          ctx.beginPath();
          ctx.ellipse(4, 0, 42, 26, 0, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Fins (Vibrant Coral)
        ctx.fillStyle = ROCKET_PALETTE.finCoral;
        ctx.strokeStyle = ROCKET_PALETTE.outlineDark;
        ctx.lineWidth = 2.2;
        ctx.beginPath();
        ctx.moveTo(-18, -10);
        ctx.lineTo(-28, -22);
        ctx.lineTo(-4, -12);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(-18, 10);
        ctx.lineTo(-28, 22);
        ctx.lineTo(-4, 12);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Hull (Bright Solar Orange)
        ctx.fillStyle = ROCKET_PALETTE.hullOrange;
        ctx.beginPath();
        ctx.ellipse(2, 0, 30, 14, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Nose Cone (Sunny Gold)
        ctx.fillStyle = ROCKET_PALETTE.noseGold;
        ctx.beginPath();
        ctx.moveTo(16, -11);
        ctx.quadraticCurveTo(36, 0, 16, 11);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Window (Bright Teal)
        ctx.fillStyle = ROCKET_PALETTE.windowTeal;
        ctx.beginPath();
        ctx.arc(4, 0, 6.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.restore();
      }

      ctx.restore();
      rafId = requestAnimationFrame(frame);
    };

    rafId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('blur', onBlur);
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, [chapter, rocketUpgrades, effectiveTargetKm, maxShields, runSeed]);

  const progressPct = Math.min(100, Math.round((hud.distanceKm / hud.targetKm) * 100));
  const planetName = chapter.name[language];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-3">
      {/* Top Runner HUD + Planet Rock Mission Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#E0F2FE] border-3 border-[#0284C7] rounded-2xl px-4 py-3 text-[#0F2942] shadow-lg">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-1.5" aria-label="Shields">
            {Array.from({ length: maxShields }).map((_, idx) => (
              <Shield
                key={idx}
                className={`w-6 h-6 ${
                  idx < hud.shields ? 'text-[#0284C7] fill-[#38BDF8]/65' : 'text-[#0F2942]/20'
                }`}
              />
            ))}
          </div>
          <div className="text-base font-mono-nums text-[#B45309] inline-flex items-center gap-1.5 font-bold">
            <Star className="w-5 h-5 fill-[#FFD166] text-[#B45309]" />
            <span>{hud.stars}</span>
          </div>

          {/* Planet-specific rock badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#BAE6FD] border-2 border-[#38BDF8] text-xs md:text-sm font-bold text-[#0F2942]">
            <Gem
              className="w-4 h-4 shrink-0"
              style={{ color: chapter.runnerConfig.collectibleRock.color }}
            />
            <span>
              {t.catchLabel} {chapter.runnerConfig.collectibleRock.name[language]}
            </span>
            <span className="font-mono-nums text-[#0284C7]">({hud.rocks})</span>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-1 max-w-sm">
          <div className="flex-1">
            <div className="flex justify-between text-xs font-bold font-mono-nums text-[#0F2942] mb-1">
              <span>{t.distanceTo.replace('{planet}', planetName)}</span>
              <span>
                {hud.distanceKm} / {hud.targetKm} km
              </span>
            </div>
            <div className="h-3 rounded-full bg-[#BAE6FD] overflow-hidden border border-[#0284C7]">
              <div
                className="h-full bg-[#FF8C42] transition-all duration-150"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={() => setStatus((s) => (s === 'PLAYING' ? 'PAUSED' : 'PLAYING'))}
            className="p-2.5 rounded-xl bg-[#FF8C42] hover:bg-[#FFD166] text-[#0F2942] border-2 border-[#0F2942] font-bold cursor-pointer"
            aria-label="Pause"
          >
            {status === 'PAUSED' ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <div className="relative rounded-3xl overflow-hidden border-4 border-[#0284C7] bg-[#0B2239] shadow-2xl">
        <canvas
          ref={canvasRef}
          className="w-full h-auto block touch-none cursor-ns-resize"
          style={{ aspectRatio: '900 / 440' }}
        />

        {status === 'PAUSED' && (
          <div className="absolute inset-0 bg-[#0F2942]/70 flex flex-col items-center justify-center p-6 text-center space-y-4">
            <div className="bg-[#E0F2FE] border-4 border-[#0284C7] rounded-3xl p-7 max-w-md w-full space-y-4 shadow-2xl text-[#0F2942]">
              <h3 className="text-3xl font-display font-bold text-[#0284C7]">{t.pauseTitle}</h3>
              <p className="text-base font-bold text-[#0F2942]">{t.pauseSubtitle}</p>
              <div className="flex justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setStatus('PLAYING')}
                  className="px-6 py-3.5 rounded-2xl bg-[#38BDF8] hover:bg-[#7DD3FC] text-[#0F2942] border-2 border-b-4 border-[#0284C7] font-display font-bold text-lg cursor-pointer"
                >
                  {t.resumeBtn}
                </button>
                <button
                  type="button"
                  onClick={handleRestart}
                  className="px-6 py-3.5 rounded-2xl bg-[#FF8C42] hover:bg-[#FFD166] text-[#0F2942] border-2 border-b-4 border-[#0F2942] font-display font-bold text-lg cursor-pointer"
                >
                  {t.restartBtn}
                </button>
              </div>
            </div>
          </div>
        )}

        {status === 'GAME_OVER' && (
          <div className="absolute inset-0 bg-[#0F2942]/75 flex flex-col items-center justify-center p-6 text-center">
            <div className="bg-[#E0F2FE] border-4 border-[#EF476F] rounded-3xl p-7 max-w-md w-full space-y-4 shadow-2xl text-[#0F2942]">
              <h3 className="text-3xl font-display font-bold text-[#D9480F]">{t.gameOverTitle}</h3>
              <p className="text-base font-bold text-[#0F2942]">
                {t.gameOverDesc.replace('{planet}', planetName)}
              </p>
              <button
                type="button"
                onClick={handleRestart}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-[#FFD166] hover:bg-[#FF8C42] text-[#0F2942] border-2 border-b-4 border-[#0F2942] font-display font-bold text-xl cursor-pointer"
              >
                <RotateCcw className="w-6 h-6" />
                <span>{t.retryBtn}</span>
              </button>
            </div>
          </div>
        )}

        {status === 'VICTORY' && (
          <div className="absolute inset-0 bg-[#0F2942]/70 flex flex-col items-center justify-center p-6 text-center">
            <div className="bg-[#E0F2FE] border-4 border-[#0284C7] rounded-3xl p-7 max-w-md w-full space-y-4 shadow-2xl text-[#0F2942]">
              <h3 className="text-3xl font-display font-bold text-[#0284C7]">
                {t.runnerVictoryTitle.replace('{planet}', planetName)}
              </h3>
              <p className="text-lg font-bold text-[#0F2942]">
                {t.runnerVictoryDesc
                  .replace('{stars}', String(hud.stars))
                  .replace('{rocks}', String(hud.rocks))
                  .replace('{score}', String(hud.score))}
              </p>
              <button
                type="button"
                onClick={() => {
                  soundFX.click();
                  onVictory({
                    score: hud.score,
                    starsCollected: hud.stars,
                    rocksCollected: hud.rocks,
                  });
                }}
                className="w-full px-8 py-4 rounded-2xl bg-[#FFD166] hover:bg-[#FF8C42] text-[#0F2942] border-2 border-b-4 border-[#0F2942] font-display font-bold text-xl cursor-pointer"
              >
                {t.continueExpedition}
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 text-xs md:text-sm font-bold text-[#0F2942] bg-[#E0F2FE] border-2 border-[#0284C7] rounded-2xl px-4 py-2">
        <span className="inline-flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              const rockName = chapter.runnerConfig.collectibleRock.name[language];
              soundFX.speak(
                language === 'es'
                  ? `Sube y baja el cohete. Atrapa ${rockName} y esquiva los meteoritos.`
                  : `Move your rocket up and down. Catch ${rockName} and dodge meteorites.`,
                language
              );
            }}
            className="p-1.5 rounded-lg bg-[#BAE6FD] hover:bg-[#FFD166] border border-[#0284C7] text-[#0284C7] cursor-pointer"
            aria-label={language === 'es' ? 'Escuchar instrucción' : 'Listen to instruction'}
          >
            <Volume2 className="w-4 h-4" />
          </button>
          <span>
            {t.runnerControls} · <span className="text-[#D9480F]">{t.dodgeLabel} {chapter.runnerConfig.hazardLabel[language]}</span>
          </span>
        </span>
        <span className="font-mono-nums text-[#0284C7]">
          {t.boostLabel}: {hud.boostReady}% ({hud.boostReady === 100 ? t.ready : t.recharging})
        </span>
      </div>
    </div>
  );
};
