"use client";

import React, { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Shield, Cpu, Sparkles, ArrowRight, CornerDownRight } from "lucide-react";
import { DomainSearchBar } from "@/components/ui/DomainSearchBar";
import { CyberButton } from "@/components/ui/CyberButton";
import { templatesData } from "@/data/templatesData";
import { TemplatePreviewCard } from "@/components/ui/TemplatePreviewCard";

export default function Home() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  const curatedTLDs = [
    { tld: ".ai", price: "$59.99/yr", desc: "Cognitive Nodes" },
    { tld: ".io", price: "$39.99/yr", desc: "Tech Core" },
    { tld: ".com", price: "$14.99/yr", desc: "Global Standard" },
    { tld: ".design", price: "$19.99/yr", desc: "Creative Studio" },
  ];

  return (
    <main className="min-h-screen flex flex-col pt-36 pb-32 px-6 md:px-12 relative overflow-hidden">
      {/* Subtle mathematical blueprint backdrop grid - Apple minimal style */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.006)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.006)_1px,transparent_1px)] bg-[size:80px_80px] pointer-events-none" />

      {/* Hero Section - Clean, Sophisticated Asymmetrical Spacing */}
      <section className="max-w-5xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 mb-36 mt-8 items-center">
        {/* Left Side Copy and Search */}
        <div className="lg:col-span-7 space-y-8 text-left border-l border-white/5 pl-6 md:pl-8">
          <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-apple-gray">
            <span className="w-1.5 h-1.5 rounded-full bg-apple-teal" />
            Registry Module v3.0
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-6.5xl font-display font-bold tracking-tight leading-[1.05] text-apple-text">
            Aether Domains. <br />
            Premium digital <br />
            coordinates.
          </h1>

          <p className="text-sm md:text-base text-apple-gray max-w-xl leading-relaxed font-sans font-light">
            Secure premium domain coordinates, configure clean editorial layouts, and publish your identity directly to decentralized nodes. Simple setup, absolute visual precision.
          </p>

          {/* Clean Search Bar */}
          <div className="w-full pt-4">
            <DomainSearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              onSearch={handleSearch}
            />
          </div>

          {/* Monospaced metadata parameters */}
          <div className="flex flex-wrap gap-x-8 gap-y-3 font-mono text-[9px] uppercase tracking-wider text-apple-gray/70 pt-4">
            <span className="flex items-center gap-1.5">
              <CornerDownRight className="w-3.5 h-3.5 text-apple-teal" />
              Propagation under 15 seconds
            </span>
            <span className="flex items-center gap-1.5">
              <CornerDownRight className="w-3.5 h-3.5 text-apple-teal" />
              Complete registry cloaking
            </span>
          </div>
        </div>

        {/* Right Side: Clean Mathematical Wireframe Sphere Canvas */}
        <div className="lg:col-span-5 w-full flex justify-center items-center relative min-h-[300px] border border-white/5 bg-[#161922]/30 rounded-2xl p-6">
          <WireframeSphere searchQuery={searchQuery} />
        </div>
      </section>

      {/* Spacing breathing room line */}
      <div className="max-w-5xl mx-auto w-full h-[1px] bg-white/5 mb-36" />

      {/* Curated Suffix Registry rows */}
      <section className="max-w-5xl mx-auto w-full mb-36">
        <h3 className="font-mono text-[9px] uppercase tracking-[0.2em] text-apple-gray mb-8">
          CURATED EXTENSIONS
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {curatedTLDs.map((item) => (
            <div
              key={item.tld}
              onClick={() => handleSearch(`domain${item.tld}`)}
              className="group bg-[#161922]/40 border border-white/5 p-6 rounded-xl hover:bg-[#161922]/60 hover:border-white/10 transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[140px]"
            >
              <div>
                <span className="font-display text-3xl font-bold text-apple-text">
                  {item.tld}
                </span>
                <p className="font-mono text-[9px] uppercase tracking-wider text-apple-gray mt-1">
                  {item.desc}
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-white/5 pt-3.5 mt-4">
                <span className="font-mono text-[10px] text-apple-text/80">{item.price}</span>
                <span className="text-[9px] text-apple-teal hover:underline flex items-center gap-1">
                  Acquire <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Product Benefits Showcase section */}
      <section className="max-w-5xl mx-auto w-full mb-36">
        <div className="bg-[#161922]/35 border border-white/5 p-8 md:p-14 rounded-2xl flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="max-w-xl space-y-6">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-apple-teal font-bold block">
              PLATFORM SYNERGY
            </span>
            <h2 className="text-3xl md:text-4.5xl font-display font-bold text-apple-text tracking-tight leading-tight">
              One coordinate. <br />
              Complete web presence.
            </h2>
            <p className="text-xs md:text-sm text-apple-gray leading-relaxed font-light">
              Skip complex DNS records, configuration overlays, and deployment delays. Customize design settings in the editor, export raw code blocks, and register coordinates. We sync your styling keys directly to live domains.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <CyberButton onClick={() => router.push("/templates")} variant="primary">
                Verify Layouts
              </CyberButton>
              <CyberButton onClick={() => router.push("/studio")} variant="secondary">
                Configure Design
              </CyberButton>
            </div>
          </div>

          <div className="w-full lg:w-80 border border-white/5 rounded-xl p-6 bg-black/20 font-mono text-[9px] text-apple-gray/80 space-y-4">
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <span>CONFIG_SYNC.JSON</span>
              <span className="text-apple-teal">v3.0.0</span>
            </div>
            <div className="space-y-1 text-[8px]">
              <p className="text-apple-text/60">"brandName": "Aether Inc"</p>
              <p className="text-apple-text/60">"themeColors": &#123;</p>
              <p className="pl-4 text-apple-teal">"primary": "#00A8A0"</p>
              <p className="pl-4 text-apple-text/60">"background": "#0A0C12"</p>
              <p className="text-apple-text/60">&#125;</p>
            </div>
            <div className="pt-2 flex justify-between items-center border-t border-white/5">
              <span className="flex items-center gap-1">
                BUILD_NOMINAL
              </span>
              <span className="text-apple-text font-bold">READY</span>
            </div>
          </div>
        </div>
      </section>

      {/* Templates Row */}
      <section className="max-w-5xl mx-auto w-full mb-36">
        <div className="flex justify-between items-end mb-12 border-b border-white/5 pb-6">
          <div>
            <span className="font-mono text-[9px] uppercase tracking-wider text-apple-gray">TEMPLATES</span>
            <h2 className="text-2.5xl font-display font-bold text-apple-text tracking-tight mt-1">
              Curated Layout Configurations
            </h2>
          </div>
          <button
            onClick={() => router.push("/templates")}
            className="flex items-center gap-1 text-xs font-heading font-bold uppercase tracking-wider text-apple-teal hover:text-apple-text transition-colors cursor-pointer group"
          >
            Explore <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
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

      {/* Trust & Details indicators */}
      <section className="max-w-5xl mx-auto w-full border-t border-white/5 pt-16 text-center text-xs text-apple-gray font-light">
        <p className="uppercase tracking-[0.25em] font-mono text-[8px] mb-2">
          Secure Registry Resolvers — Protected DNS Routing
        </p>
        <p>© 2026 Aether Domains. All rights reserved.</p>
      </section>
    </main>
  );
}

// Clean, slow-rotating mathematical wireframe coordinate sphere (Apple style)
function WireframeSphere({ searchQuery = "" }: { searchQuery?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = canvas.width;
    let height = canvas.height;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      width = canvas.width;
      height = canvas.height;
    };
    resize();

    // Coordinate node rings
    interface Dot3D {
      x: number;
      y: number;
      z: number;
    }

    const dots: Dot3D[] = [];
    const numRings = 8;
    const dotsPerRing = 16;
    const radius = 95;

    for (let r = 0; r < numRings; r++) {
      const phi = (Math.PI / numRings) * (r + 0.5);
      for (let d = 0; d < dotsPerRing; d++) {
        const theta = ((2 * Math.PI) / dotsPerRing) * d;
        dots.push({
          x: radius * Math.sin(phi) * Math.cos(theta),
          y: radius * Math.sin(phi) * Math.sin(theta),
          z: radius * Math.cos(phi),
        });
      }
    }

    let rotX = 0.002;
    let rotY = 0.002;

    const renderLoop = () => {
      ctx.clearRect(0, 0, width, height);

      // Typing in input increases spin velocity slightly for feedback sync
      const speedFactor = searchQuery.length > 0 ? 3.0 : 1.0;
      const cosX = Math.cos(rotX * speedFactor);
      const sinX = Math.sin(rotX * speedFactor);
      const cosY = Math.cos(rotY * speedFactor);
      const sinY = Math.sin(rotY * speedFactor);

      const cx = width / 2;
      const cy = height / 2;

      // Project nodes
      const projected = dots.map((dot) => {
        // Rotate X
        const y1 = dot.y * cosX - dot.z * sinX;
        const z1 = dot.z * cosX + dot.y * sinX;
        // Rotate Y
        const x2 = dot.x * cosY - z1 * sinY;
        const z2 = z1 * cosY + dot.x * sinY;

        dot.x = x2;
        dot.y = y1;
        dot.z = z2;

        const fov = 350;
        const scale = fov / (fov + z2);
        return {
          x2d: cx + x2 * scale,
          y2d: cy + y1 * scale,
          scale,
          z3d: z2,
        };
      });

      // Draw mathematical latitudinal lines
      ctx.strokeStyle = "rgba(255, 255, 255, 0.035)";
      ctx.lineWidth = 0.7;

      for (let r = 0; r < numRings; r++) {
        ctx.beginPath();
        for (let d = 0; d < dotsPerRing; d++) {
          const idx = r * dotsPerRing + d;
          const nextIdx = r * dotsPerRing + ((d + 1) % dotsPerRing);
          ctx.moveTo(projected[idx].x2d, projected[idx].y2d);
          ctx.lineTo(projected[nextIdx].x2d, projected[nextIdx].y2d);
        }
        ctx.stroke();
      }

      // Draw clean node coordinate dots
      projected.forEach((p) => {
        const opacity = Math.min(Math.max((200 - p.z3d) / 300, 0.1), 0.75);
        ctx.beginPath();
        ctx.arc(p.x2d, p.y2d, 1.2 * p.scale, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
        ctx.globalAlpha = opacity;
        ctx.fill();

        // Highlight nodes in teal
        if (p.z3d < -40 && Math.random() > 0.98) {
          ctx.beginPath();
          ctx.arc(p.x2d, p.y2d, 2.5 * p.scale, 0, Math.PI * 2);
          ctx.fillStyle = "#00A8A0";
          ctx.globalAlpha = opacity * 0.9;
          ctx.fill();
        }
      });

      ctx.globalAlpha = 1.0;
      animId = window.requestAnimationFrame(renderLoop);
    };
    renderLoop();

    return () => {
      window.cancelAnimationFrame(animId);
    };
  }, [searchQuery]);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}
