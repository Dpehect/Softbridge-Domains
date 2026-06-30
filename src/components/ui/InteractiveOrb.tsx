"use client";

import React, { useRef, useEffect } from "react";

interface InteractiveOrbProps {
  onSelectDomain: (domainName: string) => void;
  searchQuery?: string;
}

export function InteractiveOrb({ onSelectDomain, searchQuery = "" }: InteractiveOrbProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = canvas.width;
    let height = canvas.height;

    // Support Retina screens
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      width = canvas.width;
      height = canvas.height;
    };
    resize();

    // Particle Object Interface
    interface Particle {
      x3d: number;
      y3d: number;
      z3d: number;
      baseX3d: number;
      baseY3d: number;
      baseZ3d: number;
      color: string;
      size: number;
      speedMult: number;
      clusterIndex: number;
    }

    const particles: Particle[] = [];
    const numParticles = 160;
    
    // Controlled color tokens
    const teal = "#00F5E6";
    const coral = "#FF6B35";
    const mutedSlate = "#64748B";

    // 3D Spherical Coordinate mapping
    for (let i = 0; i < numParticles; i++) {
      const phi = Math.acos(-1 + (2 * i) / numParticles);
      const theta = Math.sqrt(numParticles * Math.PI) * phi;
      const radius = 90 + (i % 3 === 0 ? Math.random() * 15 - 7.5 : 0); // Cluster offsets

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      // Distribute to clusters representing domain names
      const clusterIndex = i % 4;

      particles.push({
        x3d: x,
        y3d: y,
        z3d: z,
        baseX3d: x,
        baseY3d: y,
        baseZ3d: z,
        color: clusterIndex === 0 ? coral : clusterIndex === 1 ? teal : mutedSlate,
        size: clusterIndex === 0 ? 2.5 : clusterIndex === 1 ? 1.8 : 1.2,
        speedMult: Math.random() * 0.4 + 0.8,
        clusterIndex,
      });
    }

    // Interaction Parameters
    let rotationSpeedX = 0.006;
    let rotationSpeedY = 0.006;
    let mouseX = 0;
    let mouseY = 0;
    let isHovering = false;
    
    // Burst state
    let burstIntensity = 1.0;
    let burstTimer = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.clientX - rect.left - rect.width / 2;
      const clientY = e.clientY - rect.top - rect.height / 2;
      
      mouseX = clientX;
      mouseY = clientY;
      
      // Update target rotation speeds based on mouse drag velocity
      rotationSpeedY = clientX * 0.00008;
      rotationSpeedX = clientY * 0.00008;
    };

    const handleMouseEnter = () => {
      isHovering = true;
    };

    const handleMouseLeave = () => {
      isHovering = false;
      rotationSpeedX = 0.006;
      rotationSpeedY = 0.006;
    };

    const handleCanvasClick = () => {
      // Trigger signature burst explosion
      burstIntensity = 3.2;
      burstTimer = 35;

      // Suggest a random premium domain coordinate
      const curatedSuggestions = [
        "quantum.io",
        "softbridge.ai",
        "novacore.design",
        "vortex.tech",
        "plasma.store",
        "matrix.space",
      ];
      const randomSuggest = curatedSuggestions[Math.floor(Math.random() * curatedSuggestions.length)];
      onSelectDomain(randomSuggest);
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseenter", handleMouseEnter);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    canvas.addEventListener("click", handleCanvasClick);

    // 60FPS Render Loop
    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Decrement burst timer and return particles to core sphere gravity
      if (burstTimer > 0) {
        burstTimer--;
        burstIntensity -= (burstIntensity - 1.0) * 0.08;
      } else {
        burstIntensity = 1.0;
      }

      // If user is searching/typing in the UI, make particles vibrate (UI ↔ WebGL linkage)
      const queryVibe = searchQuery.length > 0 ? Math.sin(Date.now() * 0.05) * 1.5 : 0;

      const cosX = Math.cos(rotationSpeedX * (isHovering ? 1.5 : 1));
      const sinX = Math.sin(rotationSpeedX * (isHovering ? 1.5 : 1));
      const cosY = Math.cos(rotationSpeedY * (isHovering ? 1.5 : 1));
      const sinY = Math.sin(rotationSpeedY * (isHovering ? 1.5 : 1));

      const centerX = width / 2;
      const centerY = height / 2;

      // Rotate and Project Particles
      const projected = particles.map((p) => {
        // Rotate local coordinate space
        const y1 = p.y3d * cosX - p.z3d * sinX;
        const z1 = p.z3d * cosX + p.y3d * sinX;
        const x2 = p.x3d * cosY - z1 * sinY;
        const z2 = z1 * cosY + p.x3d * sinY;

        // Apply state coordinate update
        p.x3d = x2;
        p.y3d = y1;
        p.z3d = z2;

        // Apply structural drift towards mouse position on hover (Calm magnetic drift)
        let driftX = 0;
        let driftY = 0;
        if (isHovering) {
          const distanceToMouse = Math.sqrt(mouseX * mouseX + mouseY * mouseY);
          if (distanceToMouse < 250) {
            const angleToMouse = Math.atan2(mouseY, mouseX);
            // Move particles slightly towards mouse vector
            driftX = Math.cos(angleToMouse) * 12 * (1.0 - distanceToMouse / 250);
            driftY = Math.sin(angleToMouse) * 12 * (1.0 - distanceToMouse / 250);
          }
        }

        // Apply dynamic burst explosion scalar multiplier
        const tempX = x2 * burstIntensity + driftX + (p.clusterIndex === 0 ? queryVibe : 0);
        const tempY = y1 * burstIntensity + driftY + (p.clusterIndex === 1 ? queryVibe : 0);
        const tempZ = z2;

        const fov = 350;
        const scale = fov / (fov + tempZ);
        const x2d = centerX + tempX * scale;
        const y2d = centerY + tempY * scale;

        return { ...p, x2d, y2d, scale };
      });

      // Sort by depth Z descending
      projected.sort((a, b) => b.z3d - a.z3d);

      // Draw thin mathematical structural wireframe grid lines between cluster nodes
      ctx.beginPath();
      ctx.strokeStyle = "rgba(255, 255, 255, 0.02)";
      ctx.lineWidth = 0.8;
      for (let i = 0; i < projected.length; i += 6) {
        const nextIdx = (i + 6) % projected.length;
        ctx.moveTo(projected[i].x2d, projected[i].y2d);
        ctx.lineTo(projected[nextIdx].x2d, projected[nextIdx].y2d);
      }
      ctx.stroke();

      // Render Projected Node particles
      projected.forEach((p) => {
        const opacity = Math.min(Math.max((220 - p.z3d) / 300, 0.12), 0.95);
        ctx.beginPath();
        // Particle size scaling
        ctx.arc(p.x2d, p.y2d, p.size * p.scale, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = opacity;
        ctx.fill();

        // Front glowing indicator nodes
        if (p.z3d < 0 && p.clusterIndex === 0) {
          ctx.beginPath();
          ctx.arc(p.x2d, p.y2d, p.size * p.scale * 3.0, 0, Math.PI * 2);
          ctx.fillStyle = coral;
          ctx.globalAlpha = opacity * 0.15;
          ctx.fill();
        }
        if (p.z3d < 0 && p.clusterIndex === 1) {
          ctx.beginPath();
          ctx.arc(p.x2d, p.y2d, p.size * p.scale * 3.0, 0, Math.PI * 2);
          ctx.fillStyle = teal;
          ctx.globalAlpha = opacity * 0.15;
          ctx.fill();
        }
      });

      ctx.globalAlpha = 1.0;
      animationFrameId = window.requestAnimationFrame(draw);
    };
    draw();

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseenter", handleMouseEnter);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      canvas.removeEventListener("click", handleCanvasClick);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [searchQuery]);

  return (
    <div className="relative w-full h-full flex items-center justify-center cursor-crosshair">
      <canvas ref={canvasRef} className="w-full h-full" />
      {/* Floating Helper monospaced label */}
      <span className="absolute bottom-4 right-4 font-mono text-[8px] uppercase tracking-widest text-[#64748B] pointer-events-none select-none opacity-50">
        [ Click to Burst / Suggest ]
      </span>
    </div>
  );
}
