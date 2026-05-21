import React, { useEffect, useRef } from 'react';
import { playExplosion, playClick, playGlitch } from '../utils/audioEngine';

// Global trigger function to manually fire explosions from other pages (e.g. Hero page!)
let externalTriggerExplosion = null;

export const triggerHeavyExplosion = (x, y) => {
  if (externalTriggerExplosion) {
    externalTriggerExplosion(x, y);
  }
};

const BlastParticles = () => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const shockwavesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Adjust canvas dimensions to viewport
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    // Particle and shockwave animator update cycle
    let animationFrameId;
    const update = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Update & Draw Particles (Embers & Shrapnel)
      particlesRef.current = particlesRef.current.filter((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity; // Gravity pulling shards down
        p.alpha -= p.decay;
        p.size *= 0.96; // Shrink as they burn out

        if (p.alpha <= 0 || p.size <= 0.5) return false;

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        return true;
      });

      // 2. Update & Draw Shockwaves (Detonation Rings)
      shockwavesRef.current = shockwavesRef.current.filter((s) => {
        s.radius += s.expansion;
        s.alpha -= s.decay;

        if (s.alpha <= 0) return false;

        ctx.save();
        ctx.globalAlpha = s.alpha;
        ctx.strokeStyle = s.color;
        ctx.lineWidth = s.lineWidth;
        ctx.shadowBlur = 12;
        ctx.shadowColor = s.color;
        
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
        return true;
      });

      animationFrameId = requestAnimationFrame(update);
    };
    update();

    // Spawns a beautiful, fiery explosion at co-ordinates
    const spawnExplosion = (x, y, scale = 1.0) => {
      // 1. Spawn a blast wave shockwave
      shockwavesRef.current.push({
        x,
        y,
        radius: 10,
        expansion: 8 * scale,
        decay: 0.02,
        alpha: 1.0,
        lineWidth: 4 * scale,
        color: scale > 1.5 ? '#ff3a0a' : 'var(--color-cyan, #ff2a00)'
      });
      
      if (scale > 1.5) {
        // Spawn second glowing containment ring
        shockwavesRef.current.push({
          x,
          y,
          radius: 5,
          expansion: 5 * scale,
          decay: 0.015,
          alpha: 0.8,
          lineWidth: 2 * scale,
          color: 'var(--color-pink, #ff960c)'
        });
      }

      // 2. Spawn fire shrapnel pieces
      const particleCount = Math.round((28 + Math.random() * 20) * scale);
      const colors = ['#ffffff', '#ffe57f', '#ffc107', '#ff5722', '#d84315', '#64748b']; // Embers changing to carbon ash

      for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const velocity = (3 + Math.random() * 12) * scale;
        
        particlesRef.current.push({
          x,
          y,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity - (2 * scale), // Upward force bias
          gravity: 0.18,
          size: (3 + Math.random() * 6) * scale,
          alpha: 1.0,
          decay: 0.015 + Math.random() * 0.02,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }

      // 3. Trigger physical screen shake on the main DOM layout
      const appContainer = document.querySelector('.app-container');
      if (appContainer) {
        appContainer.classList.remove('shake-active');
        // Force layout reflow to restart animation
        void appContainer.offsetWidth;
        appContainer.classList.add('shake-active');
        
        // Remove class after animation resolves (450ms)
        setTimeout(() => {
          appContainer.classList.remove('shake-active');
        }, 460);
      }
    };

    // Register global trigger callback
    externalTriggerExplosion = (x, y) => {
      spawnExplosion(x, y, 2.2);
      playExplosion();
    };

    // Viewport-wide click event listener
    const handleWindowClick = (e) => {
      const target = e.target;
      
      // Determine if clicking on tactical interactive elements
      const isButton = target.closest('button') || target.closest('a') || target.closest('.hud-nav-item') || target.closest('.glass-card');
      const isHeroPayloadBtn = target.closest('.btn-neon-payload');

      if (isHeroPayloadBtn) {
        // Massive nuclear detonation trigger!
        spawnExplosion(e.clientX, e.clientY, 2.5);
        playExplosion();
      } else if (isButton) {
        // Spawn standard combat explosion and play rumble
        spawnExplosion(e.clientX, e.clientY, 1.0);
        playExplosion();
      } else {
        // Minimal screen tap - spawn small spark + mechanical click
        spawnExplosion(e.clientX, e.clientY, 0.35);
        playClick();
      }
    };

    window.addEventListener('click', handleWindowClick);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('click', handleWindowClick);
      cancelAnimationFrame(animationFrameId);
      externalTriggerExplosion = null;
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 99999, // Layer above all elements
      }}
    />
  );
};

export default BlastParticles;
