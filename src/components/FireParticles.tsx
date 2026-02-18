"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  life: number;
  maxLife: number;
  hue: number;
}

export default function FireParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Particle creation
    const createParticle = (): Particle => {
      const maxLife = 100 + Math.random() * 150;
      return {
        x: Math.random() * canvas.width,
        y: canvas.height + 10,
        size: 1 + Math.random() * 3,
        speedY: -0.5 - Math.random() * 1.5,
        speedX: (Math.random() - 0.5) * 0.8,
        opacity: 0.3 + Math.random() * 0.5,
        life: maxLife,
        maxLife,
        hue: 15 + Math.random() * 25, // Orange to amber range
      };
    };

    // Initialize particles
    for (let i = 0; i < 60; i++) {
      const p = createParticle();
      p.y = Math.random() * canvas.height;
      p.life = Math.random() * p.maxLife;
      particlesRef.current.push(p);
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Add new particles
      if (particlesRef.current.length < 80 && Math.random() > 0.92) {
        particlesRef.current.push(createParticle());
      }

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter((p) => {
        // Update position
        p.x += p.speedX + Math.sin(p.life * 0.02) * 0.3;
        p.y += p.speedY;
        p.life--;

        // Calculate opacity based on life
        const lifeRatio = p.life / p.maxLife;
        const currentOpacity = p.opacity * lifeRatio;

        // Draw particle
        const gradient = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          p.size * 2,
        );

        gradient.addColorStop(0, `hsla(${p.hue}, 90%, 60%, ${currentOpacity})`);
        gradient.addColorStop(
          0.4,
          `hsla(${p.hue - 5}, 85%, 50%, ${currentOpacity * 0.6})`,
        );
        gradient.addColorStop(1, `hsla(${p.hue - 10}, 80%, 40%, 0)`);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Keep particle if still alive and on screen
        return p.life > 0 && p.y > -20;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 ember-canvas"
      style={{ opacity: 0.6 }}
      aria-hidden="true"
    />
  );
}
