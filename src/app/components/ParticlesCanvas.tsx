import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  driftX: number;
  driftY: number;
  size: number;
  vy: number;
  vx: number;
  opacity: number;
  maxOpacity: number;
  life: number;
  maxLife: number;
  twinkleFrequency: number;
  twinkleAmplitude: number;
  phase: number;
}

interface ParticlesCanvasProps {
  color?: string;
  intensity?: number;
  cinematic?: boolean;
}

export function ParticlesCanvas({
  color = '212,175,55',
  intensity = 1,
  cinematic = true,
}: ParticlesCanvasProps) {
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

    const particleCount = Math.floor((cinematic ? 110 : 80) * intensity);
    particlesRef.current = Array.from({ length: particleCount }, () => createParticle(canvas));

    const animate = () => {
      if (!isRunningRef.current) return;

      if (cinematic) {
        ctx.fillStyle = 'rgba(248, 243, 232, 0.16)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }

      particlesRef.current.forEach((particle) => {
        particle.life++;
        particle.y += particle.vy + particle.driftY;
        particle.x += particle.vx + particle.driftX;
        particle.x += Math.sin(particle.life * particle.twinkleFrequency + particle.phase) * particle.twinkleAmplitude;
        particle.y += Math.cos(particle.life * particle.twinkleFrequency + particle.phase) * (particle.twinkleAmplitude * 0.06);

        const lifeProgress = particle.life / particle.maxLife;
        const fadeIn = Math.min(lifeProgress * 4, 1);
        const fadeOut = Math.max(0, 1 - Math.max(0, lifeProgress - 0.65) / 0.35);
        particle.opacity = particle.maxOpacity * fadeIn * fadeOut;

        if (particle.opacity <= 0.005 || particle.y < -28 || particle.x < -28 || particle.x > canvas.width + 28) {
          Object.assign(particle, createParticle(canvas));
        }

        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          particle.size * 0.2,
          particle.x,
          particle.y,
          particle.size * (cinematic ? 4.8 : 3.2),
        );
        gradient.addColorStop(0, `rgba(${color}, ${particle.opacity})`);
        gradient.addColorStop(1, `rgba(${color}, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * (cinematic ? 4.8 : 3.2), 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${particle.opacity * 0.9})`;
        ctx.fill();
      });

      if (cinematic) {
        drawParticleConnections(ctx, particlesRef.current, color);
      }

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
  }, [cinematic, color, intensity]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1]"
    />
  );
}

function createParticle(canvas: HTMLCanvasElement): Particle {
  const startOnSide = Math.random() > 0.58;
  const startX = startOnSide
    ? (Math.random() > 0.5 ? -10 : canvas.width + 10)
    : Math.random() * canvas.width;
  const startY = startOnSide ? Math.random() * canvas.height : canvas.height + 10;

  return {
    x: startX,
    y: startY,
    driftX: (Math.random() - 0.5) * 0.08,
    driftY: -(Math.random() * 0.04 + 0.015),
    size: Math.random() * 1.9 + 0.4,
    vy: -(Math.random() * 0.34 + 0.09),
    vx: (Math.random() - 0.5) * 0.25,
    opacity: 0,
    maxOpacity: Math.random() * 0.45 + 0.1,
    life: 0,
    maxLife: Math.random() * 960 + 460,
    twinkleFrequency: Math.random() * 0.02 + 0.005,
    twinkleAmplitude: Math.random() * 0.6 + 0.08,
    phase: Math.random() * Math.PI * 2,
  };
}

function drawParticleConnections(ctx: CanvasRenderingContext2D, particles: Particle[], color: string) {
  const maxDistance = 92;
  const cap = Math.min(particles.length, 52);

  for (let source = 0; source < cap; source++) {
    const sourceParticle = particles[source];
    for (let target = source + 1; target < cap; target++) {
      const targetParticle = particles[target];
      const dx = sourceParticle.x - targetParticle.x;
      const dy = sourceParticle.y - targetParticle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > maxDistance) continue;

      const sharedOpacity = Math.min(sourceParticle.opacity, targetParticle.opacity);
      const lineOpacity = ((maxDistance - distance) / maxDistance) * sharedOpacity * 0.32;

      ctx.beginPath();
      ctx.moveTo(sourceParticle.x, sourceParticle.y);
      ctx.lineTo(targetParticle.x, targetParticle.y);
      ctx.strokeStyle = `rgba(${color}, ${lineOpacity})`;
      ctx.lineWidth = 0.65;
      ctx.stroke();
    }
  }
}
