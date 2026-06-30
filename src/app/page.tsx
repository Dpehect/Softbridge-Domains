"use client";

import React, { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Shield, Cpu, ArrowRight, Star, RefreshCw } from "lucide-react";
import { DomainSearchBar } from "@/components/ui/DomainSearchBar";
import { CyberButton } from "@/components/ui/CyberButton";
import { templatesData } from "@/data/templatesData";
import { TemplatePreviewCard } from "@/components/ui/TemplatePreviewCard";

export default function Home() {
  const router = useRouter();

  const handleSearch = (query: string) => {
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  const curatedSuffixes = [
    { tld: ".ai", price: "$59.99/yr", theme: "bg-creative-teal/5 text-creative-teal border-creative-teal/20", tag: "Intelligence" },
    { tld: ".io", price: "$39.99/yr", theme: "bg-creative-magenta/5 text-creative-magenta border-creative-magenta/20", tag: "Tech Core" },
    { tld: ".com", price: "$14.99/yr", theme: "bg-playful-dark/5 text-playful-dark border-playful-dark/15", tag: "Global Standard" },
    { tld: ".design", price: "$19.99/yr", theme: "bg-creative-orange/5 text-creative-orange border-creative-orange/20", tag: "Creative Studio" },
  ];

  return (
    <main className="min-h-screen flex flex-col pt-36 pb-32 px-6 md:px-12 relative overflow-hidden playful-grid-bg">
      {/* Background ambient colorful vector blots */}
      <div className="absolute top-[5%] right-[-10%] w-[500px] h-[500px] rounded-full bg-creative-teal/5 blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute top-[25%] left-[-10%] w-[450px] h-[450px] rounded-full bg-creative-magenta/5 blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute bottom-[10%] right-[10%] w-[600px] h-[600px] rounded-full bg-creative-orange/5 blur-[150px] -z-10 pointer-events-none" />

      {/* Hero Section - Joyful Asymmetrical Layout with Interactive 3D Canvas */}
      <section className="max-w-6xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 mb-36 mt-4 items-center">
        {/* Left Side: Joyful Editorial Typography & search */}
        <div className="lg:col-span-7 flex flex-col items-start text-left relative">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 350, damping: 15 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-playful-dark/5 shadow-[0_4px_15px_rgba(15,23,42,0.02)] mb-8"
          >
            <Sparkles className="w-4 h-4 text-creative-orange animate-spin [animation-duration:10s]" />
            <span className="text-[10px] font-heading font-extrabold uppercase tracking-widest text-creative-orange">
              Magical Digital Realty
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl font-heading font-black tracking-tight leading-[1.02] text-playful-dark mb-8"
          >
            FIND YOUR SPACE. <br />
            BUILD YOUR <span className="text-creative-gradient">MAGIC</span>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.2 }}
            className="text-sm md:text-base text-muted-slate max-w-xl mb-12 leading-relaxed font-sans font-normal"
          >
            Claim the perfect name coordinates for your project, choose a delightful visual template page, and customize colors or content layout inside our joyful digital configurator deck.
          </motion.p>

          {/* Search bar wrapper with bounce */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.3 }}
            className="w-full mb-14"
          >
            <DomainSearchBar onSearch={handleSearch} />
          </motion.div>

          {/* Suffix Tags lists */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="flex flex-wrap gap-3"
          >
            {curatedSuffixes.map((suff) => (
              <span
                key={suff.tld}
                onClick={() => handleSearch(`orbit${suff.tld}`)}
                className={`px-4 py-2 rounded-full border text-xs font-heading font-bold cursor-pointer hover:scale-105 hover:bg-white transition-all shadow-[0_2px_8px_rgba(15,23,42,0.01)] flex items-center gap-1.5 ${suff.theme}`}
              >
                {suff.tld}
                <span className="opacity-50 text-[10px] font-normal">({suff.tag})</span>
              </span>
            ))}
          </motion.div>
        </div>

        {/* Right Side: Interactive 3D HTML5 Canvas Orb */}
        <div className="lg:col-span-5 w-full flex items-center justify-center relative min-h-[350px]">
          <div className="w-full max-w-[360px] aspect-square rounded-[36px] bg-white border border-playful-dark/5 shadow-[0_20px_50px_rgba(15,23,42,0.05)] relative p-4 overflow-hidden flex items-center justify-center">
            {/* Ambient inner backing gradient */}
            <div className="absolute inset-0 bg-gradient-to-tr from-creative-teal/5 via-transparent to-creative-orange/5" />
            <Interactive3DCanvas />
          </div>
        </div>
      </section>

      {/* Spacing Divider */}
      <div className="max-w-6xl mx-auto w-full h-[1px] bg-playful-dark/5 mb-32" />

      {/* Trust elements row */}
      <section className="max-w-6xl mx-auto w-full mb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Shield className="w-8 h-8 text-creative-magenta" />,
              title: "Complete WHOIS Protection",
              desc: "We mask your physical registry coordinates globally at zero extra cost. Safe and secure.",
            },
            {
              icon: <Cpu className="w-8 h-8 text-creative-teal" />,
              title: "Optic Name Propagation",
              desc: "Instant nameservers deploy configurations globally in less than 15 seconds.",
            },
            {
              icon: <Sparkles className="w-8 h-8 text-creative-orange" />,
              title: "Creative Config Exports",
              desc: "Save site files, edit structures inside the studio, and download custom layout packages.",
            },
          ].map((item, idx) => (
            <div key={idx} className="playful-panel p-6.5 rounded-[24px] space-y-3.5 hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm">
                {item.icon}
              </div>
              <h3 className="text-base font-heading font-extrabold text-playful-dark">
                {item.title}
              </h3>
              <p className="text-xs text-muted-slate leading-relaxed font-light">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Integration details bundle box */}
      <section className="max-w-6xl mx-auto w-full mb-32">
        <div className="playful-panel p-8 md:p-16 rounded-[40px] relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Backing patterns */}
          <div className="absolute inset-0 playful-grid-bg opacity-10 pointer-events-none" />
          <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-creative-orange/5 blur-[80px] pointer-events-none" />

          <div className="max-w-xl relative z-10">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-creative-magenta mb-4 block font-extrabold">
              MAGICAL DEPLOYMENT FLOW
            </span>
            <h2 className="text-3xl md:text-5xl font-heading font-black text-playful-dark tracking-tight leading-tight mb-6">
              DOMAIN + WEBSITE <br />
              <span className="text-teal-orange-gradient">CREATOR SUITE</span>
            </h2>
            <p className="text-xs md:text-sm text-muted-slate leading-relaxed mb-8">
              Why configure DNS records, nameservers and boilerplate assets separately? Simply draft your logo, colors, and sitemap inside our customization editor, add it as a package to your cart, and launch your coordinates instantly.
            </p>
            <div className="flex flex-wrap gap-4">
              <CyberButton onClick={() => router.push("/templates")} variant="magenta">
                Explore Layouts
              </CyberButton>
              <CyberButton onClick={() => router.push("/studio")} variant="glass">
                Launch Configurator
              </CyberButton>
            </div>
          </div>

          <div className="w-full lg:w-96 relative flex items-center justify-center min-h-[250px] bg-white border border-playful-dark/5 rounded-[24px] p-6 shadow-sm">
            <div className="w-full space-y-4 font-mono text-[10px] text-muted-slate">
              <div className="flex justify-between items-center border-b border-playful-dark/5 pb-2">
                <span>CONFIG_MANIFEST.JSON</span>
                <span className="text-creative-teal">v1.2.0</span>
              </div>
              <div className="space-y-1 text-[9px]">
                <p className="text-playful-dark">"templateId": "tpl-1"</p>
                <p className="text-playful-dark">"brandName": "Orbit SaaS"</p>
                <p className="text-playful-dark">"colors": &#123;</p>
                <p className="pl-4 text-creative-orange">"primary": "#FF6B00"</p>
                <p className="pl-4 text-creative-teal">"secondary": "#00D2C4"</p>
                <p className="text-playful-dark">&#125;</p>
              </div>
              <div className="pt-2 flex justify-between items-center border-t border-playful-dark/5">
                <span className="flex items-center gap-1">
                  <RefreshCw className="w-3.5 h-3.5 text-creative-magenta animate-spin [animation-duration:8s]" />
                  ACTIVE_COMPILATION
                </span>
                <span className="text-playful-dark font-bold">LIVE</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Templates Row Gallery */}
      <section className="max-w-6xl mx-auto w-full mb-32">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 border-b border-playful-dark/5 pb-6">
          <div>
            <span className="font-mono text-[9px] uppercase tracking-wider text-muted-slate">VIBRANT STYLINGS</span>
            <h2 className="text-3xl font-heading font-black text-playful-dark tracking-tight mt-1">
              THE LAYOUT UNIVERSE
            </h2>
          </div>
          <button
            onClick={() => router.push("/templates")}
            className="flex items-center gap-1 text-xs font-heading font-extrabold uppercase tracking-wider text-creative-teal hover:text-playful-dark transition-colors cursor-pointer group"
          >
            All Templates <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {templatesData.slice(0, 3).map((tpl) => (
            <TemplatePreviewCard
              key={tpl.id}
              template={tpl}
              onPreview={(t) => router.push("/templates")}
              onConfigure={(t) => {
                router.push(`/studio?template=${t.id}`);
              }}
            />
          ))}
        </div>
      </section>

      {/* Satellite Testimonials */}
      <section className="max-w-6xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-heading font-black text-playful-dark tracking-tight uppercase">
            ORBIT FEEDBACKS
          </h2>
          <p className="text-xs text-muted-slate mt-2">Verified creative setups from our digital satellite networks.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              name: "Figma Gear",
              quote: "Drafting our assets inside the Studio was absolute magic. We customized colors, sitemaps, and bought our domain in 4 minutes. A masterpiece experience.",
              rating: 5,
              title: "Product Designer",
            },
            {
              name: "Neon Labs",
              quote: "The interface makes buying domains look fun! The canvas orb reacts dynamically, and the pricing sayaç counting is smooth. Delivered within minutes.",
              rating: 5,
              title: "Creative Developer",
            },
          ].map((testi, idx) => (
            <div key={idx} className="playful-panel p-8 rounded-3xl relative border-playful-dark/5 flex flex-col justify-between">
              <div className="flex gap-1 mb-4 text-creative-orange">
                {Array.from({ length: testi.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-creative-orange text-creative-orange" />
                ))}
              </div>
              <p className="text-sm md:text-base italic text-playful-dark font-light leading-relaxed mb-6">
                "{testi.quote}"
              </p>
              <div className="flex justify-between items-center border-t border-playful-dark/5 pt-4">
                <div>
                  <h4 className="text-sm font-heading font-extrabold text-playful-dark">
                    {testi.name}
                  </h4>
                  <span className="text-[10px] text-muted-slate">{testi.title}</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-playful-dark/5 border border-playful-dark/10 flex items-center justify-center font-bold text-xs text-playful-dark">
                  {testi.name[0]}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

// Custom High-Performance 3D HTML5 Canvas Orb (React 19 & SSR Safe)
function Interactive3DCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = canvas.width;
    let height = canvas.height;

    // Handle high DPI retina screens
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      width = canvas.width;
      height = canvas.height;
    };
    resizeCanvas();

    // 3D Particles Definition
    interface Particle3D {
      x3d: number;
      y3d: number;
      z3d: number;
      color: string;
      size: number;
    }

    const numParticles = 140;
    const particles: Particle3D[] = [];
    const colors = ["#00D2C4", "#E60067", "#FF6B00"];

    // Distribute particles evenly on a sphere using Golden Spiral
    for (let i = 0; i < numParticles; i++) {
      const phi = Math.acos(-1 + (2 * i) / numParticles);
      const theta = Math.sqrt(numParticles * Math.PI) * phi;

      const radius = 95; // Spherical radius
      particles.push({
        x3d: radius * Math.sin(phi) * Math.cos(theta),
        y3d: radius * Math.sin(phi) * Math.sin(theta),
        z3d: radius * Math.cos(phi),
        color: colors[i % colors.length],
        size: Math.random() * 2 + 1.8,
      });
    }

    // Mouse movement interaction vectors
    let angleX = 0.007;
    let angleY = 0.007;
    let targetAngleX = 0.007;
    let targetAngleY = 0.007;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left - rect.width / 2;
      const mouseY = e.clientY - rect.top - rect.height / 2;
      
      // Map mouse coordinates to angular velocity targets
      targetAngleY = mouseX * 0.0001;
      targetAngleX = mouseY * 0.0001;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Render loop running at 60fps
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Dampen rotation acceleration
      angleX += (targetAngleX - angleX) * 0.05;
      angleY += (targetAngleY - angleY) * 0.05;

      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);

      // Center translations
      const centerX = width / 2;
      const centerY = height / 2;

      // Project, Rotate & Sort particles by depth Z to draw back-to-front (avoid overlap defects)
      const rotated = particles.map((p) => {
        // Rotate X axis
        const y1 = p.y3d * cosX - p.z3d * sinX;
        const z1 = p.z3d * cosX + p.y3d * sinX;

        // Rotate Y axis
        const x2 = p.x3d * cosY - z1 * sinY;
        const z2 = z1 * cosY + p.x3d * sinY;

        // Update particle state coordinates for next frames
        p.x3d = x2;
        p.y3d = y1;
        p.z3d = z2;

        // Project to 2D perspective screen space
        const fov = 350; // Camera focal length
        const scale = fov / (fov + z2);
        const x2d = centerX + x2 * scale;
        const y2d = centerY + y1 * scale;

        return { ...p, x2d, y2d, scale };
      });

      // Sort by Z coordinate descending (largest Z represents the back)
      rotated.sort((a, b) => b.z3d - a.z3d);

      // Draw projected lines first to represent wireframe grids
      ctx.beginPath();
      ctx.strokeStyle = "rgba(15, 23, 42, 0.03)";
      ctx.lineWidth = 1;
      for (let i = 0; i < rotated.length; i += 8) {
        const nextIdx = (i + 8) % rotated.length;
        ctx.moveTo(rotated[i].x2d, rotated[i].y2d);
        ctx.lineTo(rotated[nextIdx].x2d, rotated[nextIdx].y2d);
      }
      ctx.stroke();

      // Render projected particle nodes
      rotated.forEach((p) => {
        // Opacity mapping to depth (Z coord)
        const opacity = Math.min(Math.max((200 - p.z3d) / 300, 0.15), 0.95);
        ctx.beginPath();
        ctx.arc(p.x2d, p.y2d, p.size * p.scale, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = opacity;
        ctx.fill();

        // Subtle glow dots for front nodes
        if (p.z3d < 0) {
          ctx.beginPath();
          ctx.arc(p.x2d, p.y2d, p.size * p.scale * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = opacity * 0.12;
          ctx.fill();
        }
      });

      ctx.globalAlpha = 1.0;
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full cursor-grab active:cursor-grabbing" />;
}
