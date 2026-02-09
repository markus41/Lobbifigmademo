import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
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

    // Initialize more particles for richer effect
    const particleCount = Math.floor(80 * intensity);
    particlesRef.current = Array.from({ length: particleCount }, () => createParticle(canvas));

    const animate = () => {
      if (!isRunningRef.current) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle) => {
        particle.life++;
        particle.y += particle.vy;
        particle.x += particle.vx + Math.sin(particle.life * particle.waveFrequency + particle.phase) * particle.waveAmplitude;

        // Fade in
        if (particle.fadeIn && particle.opacity < particle.maxOpacity) {
          particle.opacity += 0.003;
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

        // Draw particle with enhanced glow
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        const particleColor = `rgba(${color}, ${particle.opacity})`;
        ctx.fillStyle = particleColor;
        ctx.shadowColor = particleColor;
        ctx.shadowBlur = particle.size * 6;
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
      className="fixed inset-0 pointer-events-none z-[1]"
    />
  );
}

function createParticle(canvas: HTMLCanvasElement): Particle {
  return {
    x: Math.random() * canvas.width,
    y: canvas.height + 10,
    size: Math.random() * 1.8 + 0.4,
    vy: -(Math.random() * 0.4 + 0.1),
    vx: (Math.random() - 0.5) * 0.15,
    opacity: 0,
    maxOpacity: Math.random() * 0.5 + 0.15,
    fadeIn: true,
    life: 0,
    maxLife: Math.random() * 800 + 400,
    waveAmplitude: Math.random() * 0.5,
    waveFrequency: Math.random() * 0.015 + 0.005,
    phase: Math.random() * Math.PI * 2,
  };
}