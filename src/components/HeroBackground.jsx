import React, { useRef, useEffect } from 'react';

// Upgraded particle system to dynamic constellation mesh with mouse tracking
const HeroBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const particles = [];
    const particleCount = 75;
    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;

    const mouse = { x: null, y: null, radius: 150 };

    const initParticles = () => {
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          r: Math.random() * 2 + 0.8,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          opacity: Math.random() * 0.4 + 0.2,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw connections between close particles
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dist = Math.hypot(particles[a].x - particles[b].x, particles[a].y - particles[b].y);
          if (dist < 100) {
            const alpha = (100 - dist) / 100 * 0.12;
            ctx.strokeStyle = `rgba(0, 210, 255, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }

      // Draw interactive connections from mouse cursor
      if (mouse.x !== null && mouse.y !== null) {
        particles.forEach(p => {
          const dist = Math.hypot(p.x - mouse.x, p.y - mouse.y);
          if (dist < mouse.radius) {
            const alpha = (mouse.radius - dist) / mouse.radius * 0.25;
            ctx.strokeStyle = `rgba(0, 210, 255, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        });
      }

      // Draw particle circles
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 210, 255, ${p.opacity})`;
        ctx.fill();
      });
    };

    const update = () => {
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx = -p.vx;
        if (p.y < 0 || p.y > height) p.vy = -p.vy;
      });
    };

    const loop = () => {
      update();
      draw();
      requestAnimationFrame(loop);
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    initParticles();
    loop();

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
      initParticles();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-bg-canvas" />;
};

export default HeroBackground;
