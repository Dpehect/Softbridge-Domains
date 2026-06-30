"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sparkles, ShieldCheck, Zap, Globe, Cpu, ArrowRight, Star } from "lucide-react";
import { DomainSearchBar } from "@/components/ui/DomainSearchBar";
import { CyberButton } from "@/components/ui/CyberButton";
import { templatesData } from "@/data/templatesData";
import { TemplatePreviewCard } from "@/components/ui/TemplatePreviewCard";

export default function Home() {
  const router = useRouter();

  const handleSearch = (query: string) => {
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  const trendingTLDs = [
    { tld: ".ai", price: "$59.99", desc: "Quantum Intelligent Nodes", color: "text-electric-cyan" },
    { tld: ".io", price: "$39.99", desc: "Data Input/Output Gates", color: "text-sky-blue" },
    { tld: ".com", price: "$14.99", desc: "Universal Commerce Anchor", color: "text-star-white" },
    { tld: ".store", price: "$8.99", desc: "E-Commerce Core", color: "text-solar-pink" },
  ];

  return (
    <main className="min-h-screen flex flex-col pt-32 pb-24 px-4 md:px-8 relative overflow-hidden mesh-bg">
      {/* 3D Orb Simulation background */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-cosmic-purple/10 blur-[120px] -z-10 animate-pulse" />
      <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-electric-cyan/10 blur-[130px] -z-10 animate-pulse" />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto w-full text-center relative z-10 mb-28">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2 px-4.5 py-1.5 rounded-full bg-white/5 border border-white/5 backdrop-blur-md mb-8"
        >
          <Sparkles className="w-4 h-4 text-electric-cyan" />
          <span className="text-xs font-heading font-extrabold uppercase tracking-widest text-sky-blue">
            AWWARDS-LEVEL DIGITAL REALTY
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-5xl md:text-8xl font-heading font-black tracking-tight leading-[1.05] mb-8 text-star-white"
        >
          CLAIM YOUR <br />
          <span className="text-neon-gradient">DIGITAL ORBIT</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="text-base md:text-xl text-nebula-slate max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Discover elite domains, select an immersive industry template, customize color parameters, and deploy your site in minutes.
        </motion.p>

        {/* Search Bar Molecule */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mb-14"
        >
          <DomainSearchBar onSearch={handleSearch} />
        </motion.div>

        {/* Trending TLDs list */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {trendingTLDs.map((tldObj) => (
            <div
              key={tldObj.tld}
              onClick={() => handleSearch(`orbit${tldObj.tld}`)}
              className="glass-panel p-4 rounded-xl hover:border-white/20 transition-all duration-300 cursor-pointer text-left hover:scale-[1.03] group relative"
            >
              <div className="flex justify-between items-start">
                <span className={`text-2xl font-display font-black ${tldObj.color}`}>
                  {tldObj.tld}
                </span>
                <span className="text-[10px] bg-white/5 border border-white/5 px-2 py-0.5 rounded text-nebula-slate/80 font-mono">
                  {tldObj.price}
                </span>
              </div>
              <p className="text-[9px] text-nebula-slate/50 font-bold uppercase tracking-wider mt-2 group-hover:text-star-white transition-colors">
                {tldObj.desc}
              </p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Trust Elements Section */}
      <section className="max-w-7xl mx-auto w-full mb-32 border-t border-b border-white/5 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <ShieldCheck className="w-8 h-8 text-electric-cyan" />,
              title: "Free Privacy Locks",
              desc: "Complete WHOIS protection protocols. Hide physical registry credentials on all orbits.",
            },
            {
              icon: <Zap className="w-8 h-8 text-solar-pink" />,
              title: "Optic-Speed Setup",
              desc: "Instant nameservers and custom configurator exports synced instantly to live domains.",
            },
            {
              icon: <Globe className="w-8 h-8 text-cosmic-purple" />,
              title: "Decentralized Registry",
              desc: "Multi-datacenter distribution secures maximum uptime and secure DNS configurations.",
            },
          ].map((item, idx) => (
            <div key={idx} className="flex gap-4 p-4">
              <div className="shrink-0">{item.icon}</div>
              <div>
                <h4 className="text-base font-heading font-bold text-star-white uppercase tracking-wider mb-2">
                  {item.title}
                </h4>
                <p className="text-xs text-nebula-slate leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Dynamic Bundle Showcase Section */}
      <section className="max-w-7xl mx-auto w-full mb-32">
        <div className="glass-panel p-8 md:p-16 rounded-[40px] relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Animated visual element */}
          <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" />
          <div className="absolute -left-20 -bottom-20 w-[400px] h-[400px] rounded-full bg-cosmic-purple/10 blur-[80px] pointer-events-none" />

          <div className="max-w-xl relative z-10">
            <span className="text-[10px] bg-cosmic-purple/20 text-cosmic-purple border border-cosmic-purple/30 px-3 py-1 rounded-full uppercase font-black tracking-widest font-mono mb-6 inline-block">
              Infinite Pipeline
            </span>
            <h2 className="text-3xl md:text-5xl font-heading font-black tracking-tight text-star-white mb-6 leading-tight">
              DOMAIN + WEBSITE <br />
              <span className="text-pink-purple-gradient">LAUNCH PROTOCOL</span>
            </h2>
            <p className="text-sm md:text-base text-nebula-slate mb-8 leading-relaxed">
              Why buy just a domain when you can configure a premium, responsive WebGL-driven storefront or agency page at the same time? Simply draft your assets inside our customization suite, checkout, and our delivery crew will ship your complete site.
            </p>
            <div className="flex flex-wrap gap-4">
              <CyberButton onClick={() => router.push("/templates")} variant="purple">
                Explore Galleries
              </CyberButton>
              <CyberButton onClick={() => router.push("/studio")} variant="glass">
                Launch Studio Aether
              </CyberButton>
            </div>
          </div>

          <div className="w-full lg:w-1/2 relative flex items-center justify-center min-h-[300px]">
            {/* Holographic orbital display */}
            <div className="relative w-72 h-72 border border-white/5 rounded-full flex items-center justify-center">
              <div className="absolute inset-0 border border-dashed border-electric-cyan/20 rounded-full animate-[spin_30s_linear_infinite]" />
              <div className="absolute w-56 h-56 border border-dashed border-cosmic-purple/30 rounded-full animate-[spin_20s_linear_infinite_reverse]" />
              <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-electric-cyan to-cosmic-purple flex flex-col items-center justify-center shadow-[0_0_50px_rgba(0,242,254,0.3)] animate-pulse">
                <Cpu className="w-10 h-10 text-deep-void animate-spin [animation-duration:12s]" />
                <span className="text-[9px] font-heading font-extrabold uppercase text-deep-void mt-2 tracking-widest">
                  Active core
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Templates Showcase Section */}
      <section className="max-w-7xl mx-auto w-full mb-32">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl md:text-5xl font-heading font-black text-star-white tracking-tight">
              ELITE STYLING SHAPES
            </h2>
            <p className="text-sm text-nebula-slate mt-2 max-w-md">
              Start from industry-tailored designs, built for conversion, typography and 60fps scrolling.
            </p>
          </div>
          <button
            onClick={() => router.push("/templates")}
            className="flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-wider text-electric-cyan hover:text-star-white transition-colors cursor-pointer group"
          >
            All Templates <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {templatesData.map((tpl) => (
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

      {/* Testimonials */}
      <section className="max-w-6xl mx-auto w-full mb-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-black text-star-white tracking-tight uppercase">
            SATELLITE TRANSMISSIONS
          </h2>
          <p className="text-sm text-nebula-slate mt-2">Feedback verified on blockchain registry networks.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              name: "Krypton Labs",
              quote: "The interface is mind-blowing. We configured our website theme and purchased krypton-net.io inside 4 minutes. The setup was delivered flawlessly.",
              rating: 5,
              title: "Chief Tech Architect",
            },
            {
              name: "Nova Fashion",
              quote: "Our luxury brand required heavy design aesthetics. Studio Aether allowed us to draft colors and navigation paths visually. The layout is beautiful.",
              rating: 5,
              title: "Founder & Director",
            },
          ].map((testimonial, idx) => (
            <div key={idx} className="glass-panel p-8 rounded-3xl relative border-white/5">
              <div className="flex gap-1.5 mb-4 text-solar-pink">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-solar-pink" />
                ))}
              </div>
              <p className="text-sm md:text-base italic text-star-white leading-relaxed mb-6">
                "{testimonial.quote}"
              </p>
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-sm font-heading font-bold text-white uppercase tracking-wider">
                    {testimonial.name}
                  </h4>
                  <span className="text-[10px] text-nebula-slate/60">{testimonial.title}</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 font-bold font-mono text-xs text-electric-cyan">
                  {testimonial.name[0]}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
