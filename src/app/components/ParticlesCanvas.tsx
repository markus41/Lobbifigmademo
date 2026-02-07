import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  baseSize: number;
  vy: number;
  vx: number;
  opacity: number;
  maxOpacity: number;
  fadeIn: boolean;
  life: number;
  maxLife: number;
  waveAmplitude: number;
  waveFrequency: number;
  phase: number;
  pulseSpeed: number;
  pulseAmount: number;
  type: 'normal' | 'slow' | 'bright';
}

interface ParticlesCanvasProps {
  color?: string;
  intensity?: number;
}

export function ParticlesCanvas({ color = '212,175,55', intensity = 1 }: ParticlesCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();
  const isRunningRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    // More particles for richer effect
    const particleCount = Math.floor(100 * intensity);
    particlesRef.current = Array.from({ length: particleCount }, () => createParticle(canvas));

    const animate = () => {
      if (!isRunningRef.current) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle) => {
        particle.life++;

        // Size pulsing
        const pulseFactor = 1 + Math.sin(particle.life * particle.pulseSpeed) * particle.pulseAmount;
        particle.size = particle.baseSize * pulseFactor;

        // Movement with wave
        particle.y += particle.vy;
        particle.x += particle.vx + Math.sin(particle.life * particle.waveFrequency + particle.phase) * particle.waveAmplitude;

        // Fade in
        if (particle.fadeIn && particle.opacity < particle.maxOpacity) {
          const fadeSpeed = particle.type === 'bright' ? 0.005 : 0.003;
          particle.opacity += fadeSpeed;
          if (particle.opacity >= particle.maxOpacity) {
            particle.fadeIn = false;
          }
        }

        // Fade out near end of life
        if (particle.life > particle.maxLife * 0.7) {
          particle.opacity -= 0.002;
        }

        // Reset if dead or out of bounds
        if (particle.opacity <= 0 || particle.y < -20) {
          Object.assign(particle, createParticle(canvas));
        }

        // Draw particle with layered glow
        const particleColor = `rgba(${color}, ${particle.opacity})`;

        // Outer glow layer (very soft)
        if (particle.type === 'bright' || particle.size > 1.2) {
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size * 4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${color}, ${particle.opacity * 0.08})`;
          ctx.fill();
        }

        // Inner glow
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.shadowColor = particleColor;
        ctx.shadowBlur = particle.type === 'bright' ? particle.size * 12 : particle.size * 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      isRunningRef.current = false;
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [color, intensity]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}

function createParticle(canvas: HTMLCanvasElement): Particle {
  // Determine particle type for variety
  const typeRoll = Math.random();
  let type: Particle['type'] = 'normal';
  if (typeRoll > 0.92) type = 'bright';
  else if (typeRoll > 0.7) type = 'slow';

  const baseSize = type === 'bright'
    ? Math.random() * 2.5 + 1.0
    : type === 'slow'
      ? Math.random() * 1.0 + 0.3
      : Math.random() * 1.8 + 0.4;

  const speed = type === 'slow'
    ? -(Math.random() * 0.15 + 0.05)
    : type === 'bright'
      ? -(Math.random() * 0.3 + 0.15)
      : -(Math.random() * 0.4 + 0.1);

  return {
    x: Math.random() * canvas.width,
    y: canvas.height + 10 + Math.random() * 100,
    size: baseSize,
    baseSize,
    vy: speed,
    vx: (Math.random() - 0.5) * 0.15,
    opacity: 0,
    maxOpacity: type === 'bright'
      ? Math.random() * 0.5 + 0.3
      : Math.random() * 0.5 + 0.15,
    fadeIn: true,
    life: 0,
    maxLife: type === 'slow'
      ? Math.random() * 1200 + 800
      : Math.random() * 800 + 400,
    waveAmplitude: type === 'slow' ? Math.random() * 0.8 : Math.random() * 0.5,
    waveFrequency: Math.random() * 0.015 + 0.005,
    phase: Math.random() * Math.PI * 2,
    pulseSpeed: Math.random() * 0.03 + 0.01,
    pulseAmount: type === 'bright' ? 0.3 : 0.15,
    type,
  };
}
