"use client";

import React, { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Shield, Cpu, Sparkles, ArrowRight, Check } from "lucide-react";
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

  const curatedSuffixes = [
    { tld: ".com", price: "$14.99/yr", desc: "Commercial standard" },
    { tld: ".ai", price: "$59.99/yr", desc: "Machine intelligence" },
    { tld: ".io", price: "$39.99/yr", desc: "Tech infrastructure" },
    { tld: ".design", price: "$19.99/yr", desc: "Creative studios" },
  ];

  // Subtle animations configurations mapping Apple's premium look
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } }
  };

  return (
    <main className="min-h-screen flex flex-col pt-36 pb-32 px-6 md:px-12 relative overflow-hidden bg-apple-bg">
      {/* Structural layout grid bounds */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.005)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.005)_1px,transparent_1px)] bg-[size:80px_80px] pointer-events-none" />

      {/* 1. Hero Section - Massive Typographic Layout & Wireframe Graphic */}
      <section className="max-w-5xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 mb-44 mt-8 items-center">
        {/* Left Side Copy */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="lg:col-span-7 space-y-8 text-left border-l border-white/5 pl-6 md:pl-8"
        >
          <div className="inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-apple-gray">
            <span className="w-1.5 h-1.5 rounded-full bg-apple-blue" />
            Registry Module v3.1
          </div>

          <h1 className="apple-hero-heading text-apple-text">
            Aether Domains. <br />
            Premium digital <br />
            coordinates.
          </h1>

          <p className="apple-body max-w-xl">
            Secure premium domain coordinates, configure clean editorial layouts, and publish your identity directly to decentralized nodes. Simple setup, absolute visual precision.
          </p>

          {/* Clean Input Search bar */}
          <div className="w-full pt-4">
            <DomainSearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              onSearch={handleSearch}
            />
          </div>

          {/* Suffix rates shortcuts */}
          <div className="flex flex-wrap gap-x-8 gap-y-3 font-mono text-[9px] uppercase tracking-wider text-apple-gray/70 pt-4">
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-apple-teal" />
              Propagation under 15 seconds
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-apple-teal" />
              Complete WHOIS privacy shielding
            </span>
          </div>
        </motion.div>

        {/* Right Side: Clean Mathematical Wireframe Sphere (Apple style) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as const }}
          className="lg:col-span-5 w-full flex justify-center items-center relative min-h-[300px] border border-white/5 bg-apple-card/30 rounded-2xl p-6"
        >
          <WireframeSphere searchQuery={searchQuery} />
        </motion.div>
      </section>

      {/* 2. Curated Extensions Row */}
      <section className="max-w-5xl mx-auto w-full mb-44">
        <h3 className="font-mono text-[9px] uppercase tracking-[0.2em] text-apple-gray mb-8">
          Curated suffix registers
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {curatedSuffixes.map((item) => (
            <div
              key={item.tld}
              onClick={() => handleSearch(`domain${item.tld}`)}
              className="group bg-apple-card/40 border border-white/5 p-6 rounded-xl hover:bg-apple-card/60 hover:border-white/10 transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[140px]"
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
                <span className="text-[10px] text-apple-blue hover:underline flex items-center gap-1 font-medium">
                  Acquire <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Product Benefits section */}
      <section className="max-w-5xl mx-auto w-full mb-44">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Shield className="w-6 h-6 text-apple-blue" />,
              title: "Privacy Shielded",
              desc: "We encrypt your physical registry credentials globally at zero additional cost. Absolute privacy.",
            },
            {
              icon: <Cpu className="w-6 h-6 text-apple-blue" />,
              title: "Propagated Fast",
              desc: "DNS name translation grids deploy nameservers and route channels globally in less than 15 seconds.",
            },
            {
              icon: <Sparkles className="w-6 h-6 text-apple-blue" />,
              title: "Customized Output",
              desc: "Draft branding properties inside the editor workspace and export code configurations.",
            },
          ].map((item, idx) => (
            <div key={idx} className="bg-apple-card/50 border border-white/5 p-8 rounded-2xl space-y-4 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                {item.icon}
              </div>
              <h3 className="apple-card-heading text-apple-text">
                {item.title}
              </h3>
              <p className="text-sm text-apple-gray leading-relaxed font-light">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. How It Works (Blueprint workflow) */}
      <section className="max-w-5xl mx-auto w-full mb-44">
        <div className="text-center mb-16 space-y-3">
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-apple-blue font-bold">
            DEPLOYMENT PIPELINE
          </span>
          <h2 className="apple-section-heading text-apple-text">
            Simple integration steps.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { step: "01", title: "Coordinates Scan", desc: "Check availability of TLD extension targets in the search input." },
            { step: "02", title: "Select Template", desc: "Select visual layout frameworks built for high-end conversion." },
            { step: "03", title: "Configure Styles", desc: "Fine-tune color system colors, sitemap pages, and typography specs." },
            { step: "04", title: "Publish Live", desc: "Integrate configuration data and deploy files directly to live DNS names." }
          ].map((item, idx) => (
            <div key={idx} className="space-y-4">
              <span className="font-mono text-xl font-bold text-apple-blue block border-b border-white/5 pb-2">
                {item.step}
              </span>
              <h4 className="font-heading font-bold text-base text-apple-text">
                {item.title}
              </h4>
              <p className="text-xs text-apple-gray leading-relaxed font-light">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Featured Examples (Templates Row) */}
      <section className="max-w-5xl mx-auto w-full mb-44">
        <div className="flex justify-between items-end mb-12 border-b border-white/5 pb-6">
          <div>
            <span className="font-mono text-[9px] uppercase tracking-wider text-apple-gray">GALLERIES</span>
            <h2 className="apple-section-heading text-apple-text">
              Curated Layout Engines.
            </h2>
          </div>
          <button
            onClick={() => router.push("/templates")}
            className="flex items-center gap-1.5 text-xs font-sans font-medium tracking-wide text-apple-blue hover:text-apple-text transition-colors cursor-pointer group"
          >
            Explore Options
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
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

      {/* 6. Trust & Final CTA */}
      <section className="max-w-4xl mx-auto w-full mb-20 text-center py-16 bg-apple-card/35 border border-white/5 rounded-2xl space-y-8">
        <div className="space-y-4 max-w-xl mx-auto px-6">
          <h2 className="apple-section-heading text-apple-text">
            Start your project today.
          </h2>
          <p className="text-sm md:text-base text-apple-gray leading-relaxed font-light">
            Acquire your name coordinates, build custom layout templates, and publish your identity on the web instantly.
          </p>
        </div>
        <div className="flex justify-center gap-4">
          <CyberButton onClick={() => router.push("/templates")} variant="primary" size="lg">
            Get Started
          </CyberButton>
          <CyberButton onClick={() => router.push("/studio")} variant="secondary" size="lg">
            Studio Customizer
          </CyberButton>
        </div>
      </section>

      {/* Footer Details */}
      <section className="max-w-5xl mx-auto w-full border-t border-white/5 pt-16 text-center text-xs text-apple-gray font-light">
        <p className="uppercase tracking-[0.25em] font-mono text-[8px] mb-2">
          Secure Resolvers — Protected DNS Routing — Aether Domains System
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
