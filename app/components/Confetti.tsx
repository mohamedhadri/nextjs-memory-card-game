'use client'
import { useEffect, useRef } from 'react';

const Confetti = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const particles = useRef<Particle[]>([]);
  const animationTimer = useRef<number | undefined>(undefined);

  interface Particle {
    x: number;
    y: number;
    area: number;
    tilt: number;
    tiltAngle: number;
    color?: string;
    draw: () => void;
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    contextRef.current = context;

    const width = window.innerWidth;
    const height = window.innerHeight;

    const randomNumberGenerator = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    class ParticleClass implements Particle {
      x: number;
      y: number;
      area: number;
      tilt: number;
      tiltAngle: number;
      color?: string;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height - height;
        this.area = randomNumberGenerator(10, 15);
        this.tilt = randomNumberGenerator(-4, 4);
        this.tiltAngle = 0;
      }

      draw() {
        if (!contextRef.current) return;
        contextRef.current.beginPath();
        contextRef.current.lineWidth = this.area;
        contextRef.current.strokeStyle = this.color || 'black';
        this.x = this.x + this.tilt;
        contextRef.current.moveTo(this.x + this.area / 2, this.y);
        contextRef.current.lineTo(this.x, this.y + this.tilt + this.area / 2);
        contextRef.current.stroke();
      }
    }

    const createConfetti = () => {
      while (particles.current.length < 500) {
        let particle = new ParticleClass();
        particle.color = `rgb( ${randomNumberGenerator(0, 255)}, ${randomNumberGenerator(0, 255)}, ${randomNumberGenerator(0, 255)}`;
        particles.current.push(particle);
      }
    };

    const startConfetti = () => {
      if (!contextRef.current) return;
      contextRef.current.clearRect(0, 0, width, height);
      createConfetti();
      for (let i in particles.current) {
        particles.current[i].tiltAngle += randomNumberGenerator(0.01, 2);
        particles.current[i].y +=
          (Math.sin(0.4) +
            particles.current[i].area +
            0.05) *
          0.2;
        particles.current[i].tilt = Math.cos(particles.current[i].tiltAngle) * 0.3;
        particles.current[i].draw();

        if (particles.current[i].y > height) {
          particles.current[i] = new ParticleClass();
          particles.current[i].color = `rgb( ${randomNumberGenerator(0, 255)}, ${randomNumberGenerator(0, 255)}, ${randomNumberGenerator(0, 255)}`;
        }
      }
      animationTimer.current = requestAnimationFrame(startConfetti);
    };

    canvas.width = width;
    canvas.height = height;
    startConfetti();

    return () => {
      if (animationTimer.current !== undefined) {
        cancelAnimationFrame(animationTimer.current);
      }
    };
  });
  const canvasStyles: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -1,
  };

  return <canvas style={canvasStyles}  ref={canvasRef} width={window.innerWidth} height={window.innerHeight}></canvas>;
};

export default Confetti;