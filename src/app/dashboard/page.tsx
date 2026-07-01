"use client";

import React, { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { NeonBadge } from "@/components/ui/NeonBadge";
import {
  Activity,
  Download,
  ShieldAlert,
  Globe,
  Radio,
  Sliders,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface OrbitProject {
  id: string;
  domain: string;
  status: "Active" | "Provisioning" | "Configuring";
  templateName: string;
  visitors: string;
  dnsRecords: { type: string; host: string; points: string }[];
  configJson: Record<string, unknown>;
  whoisLocked: boolean;
}

const INITIAL_PROJECTS: OrbitProject[] = [
  {
    id: "orb-1",
    domain: "cedardesk.app",
    status: "Active",
    templateName: "Cedar Desk",
    visitors: "2,418",
    whoisLocked: true,
    dnsRecords: [
      { type: "A", host: "@", points: "76.76.21.21" },
      { type: "CNAME", host: "www", points: "cname.vercel-dns.com" },
      { type: "TXT", host: "_verification", points: "cedar-dns-lock-491" },
    ],
    configJson: {
      brandName: "Cedar Desk",
      theme: { primary: "#E85D3B", secondary: "#D94F2E", bg: "#FDF0E6" },
      pages: ["Home", "Features", "Contact"],
    },
  },
  {
    id: "orb-2",
    domain: "elmstreetstudio.com",
    status: "Active",
    templateName: "Elm Street Studio",
    visitors: "1,126",
    whoisLocked: true,
    dnsRecords: [
      { type: "A", host: "@", points: "76.76.21.21" },
      { type: "CNAME", host: "www", points: "cname.vercel-dns.com" },
    ],
    configJson: {
      brandName: "Elm Street Studio",
      theme: { primary: "#B84D57", secondary: "#D28A6D", bg: "#FFF1EC" },
      pages: ["Work", "About"],
    },
  },
];

function DashboardContent() {
  const searchParams = useSearchParams();
  const showOrderTracking = searchParams.get("ordered") === "true";

  const [projects, setProjects] = useState<OrbitProject[]>(INITIAL_PROJECTS);
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(null);

  // Download Config JSON utility
  const handleDownloadConfig = (project: OrbitProject) => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(project.configJson, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${project.domain}_config.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const toggleWhoisLock = (id: string) => {
    setProjects(
      projects.map((p) => {
        if (p.id !== id) return p;
        return { ...p, whoisLocked: !p.whoisLocked };
      })
    );
  };

  const toggleExpand = (id: string) => {
    setExpandedProjectId(expandedProjectId === id ? null : id);
  };

  // Pipeline state indicators for new orders
  const pipelineSteps = [
    { title: "Invoice Confirmed", status: "complete", desc: "Payment authorized via Cedar secure gateway." },
    { title: "Configuration Extracted", status: "complete", desc: "Styling properties and JSON files generated." },
    { title: "Content Infusion", status: "active", desc: "Injecting brand assets and custom sitemap sections." },
    { title: "Gateway Deployment", status: "pending", desc: "Deploying code structure to target DNS name." },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-5 relative z-10">
      {/* Top Banner Dashboard header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 border-b border-white/5 pb-4">
        <div>
          <span className="text-[10px] text-electric-cyan font-heading font-extrabold uppercase tracking-widest bg-electric-cyan/15 px-3.5 py-1 rounded-full border border-electric-cyan/25">
            Operational Control Deck
          </span>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-star-white mt-2">
            YOUR DIGITAL <span className="text-neon-gradient">PLANETS</span>
          </h1>
          <p className="text-xs md:text-sm text-nebula-slate mt-1">
            Manage virtual nodes, configure DNS records, and track template deployment schedules.
          </p>
        </div>

        <div className="flex items-center gap-5 bg-white/5 border border-white/5 px-4 py-3 rounded-2xl">
          <div className="text-center">
            <span className="text-[9px] text-nebula-slate/50 block font-semibold uppercase">Orbits</span>
            <span className="text-xl font-bold font-heading text-white">{projects.length}</span>
          </div>
          <div className="h-6 w-[1px] bg-white/10" />
          <div className="text-center">
            <span className="text-[9px] text-nebula-slate/50 block font-semibold uppercase">System Status</span>
            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 mt-0.5">
              <Activity className="w-3.5 h-3.5 animate-pulse" /> All Systems Nominal
            </span>
          </div>
        </div>
      </div>

      {/* Dynamic Pipeline Order Tracking panel */}
      {showOrderTracking && (
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-4 md:p-5 rounded-2xl border-electric-cyan/30 bg-electric-cyan/5 space-y-4"
        >
          <div className="flex items-center gap-2">
            <Radio className="w-5 h-5 text-electric-cyan animate-ping" />
            <h3 className="text-sm font-heading font-extrabold text-star-white uppercase tracking-wider">
              Active Deployment Tracker (Live Sync)
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
            {pipelineSteps.map((step, idx) => (
              <div key={idx} className="relative space-y-2">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold font-mono border ${
                      step.status === "complete"
                        ? "bg-emerald-500/20 border-emerald-400 text-emerald-400"
                        : step.status === "active"
                        ? "bg-electric-cyan/20 border-electric-cyan text-electric-cyan animate-pulse"
                        : "bg-white/5 border-white/10 text-nebula-slate/50"
                    }`}
                  >
                    {idx + 1}
                  </div>
                  <span
                    className={`text-xs font-bold uppercase tracking-wider ${
                      step.status === "complete"
                        ? "text-emerald-400"
                        : step.status === "active"
                        ? "text-electric-cyan"
                        : "text-nebula-slate/60"
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
                <p className="text-[10px] text-nebula-slate/80 leading-relaxed pl-8">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Orbits List */}
      <div className="space-y-4">
        <h2 className="text-base font-heading font-black text-star-white uppercase tracking-wider">
          Registered Web Nodes
        </h2>

        <div className="space-y-3">
          {projects.map((project) => {
            const isExpanded = expandedProjectId === project.id;
            return (
              <div
                key={project.id}
                className={`glass-panel rounded-2xl overflow-hidden border-white/5 transition-all duration-300 ${
                  isExpanded ? "border-white/15 shadow-[0_10px_30px_rgba(0,0,0,0.6)]" : "hover:border-white/10"
                }`}
              >
                {/* Expandable top summary card */}
                <div
                  onClick={() => toggleExpand(project.id)}
                  className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer select-none bg-black/10"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-white/5 text-electric-cyan border border-white/5">
                      <Globe className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold font-display tracking-tight text-white">
                          {project.domain}
                        </span>
                        <NeonBadge variant="success">{project.status}</NeonBadge>
                      </div>
                      <span className="text-[10px] text-nebula-slate/60 block mt-1">
                        Template Linkage: {project.templateName}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 justify-between md:justify-end">
                    <div className="text-left md:text-right">
                      <span className="text-[9px] text-nebula-slate/50 block font-semibold uppercase">
                        30d Traffic
                      </span>
                      <span className="text-sm font-bold text-white font-mono">
                        {project.visitors}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownloadConfig(project);
                        }}
                        className="p-2.5 bg-white/5 hover:bg-white/15 text-star-white hover:text-electric-cyan border border-white/5 rounded-xl transition-all cursor-pointer"
                        title="Download Configuration JSON"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="p-2.5 bg-white/5 text-nebula-slate rounded-xl cursor-pointer">
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Extended Details pane on Expand */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-white/5 bg-black/20 overflow-hidden"
                    >
                      <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-5">
                        {/* DNS Records Table */}
                        <div className="space-y-4">
                          <h4 className="text-xs font-heading font-extrabold text-star-white uppercase tracking-wider flex items-center gap-1.5">
                            <Sliders className="w-3.5 h-3.5 text-electric-cyan" /> DNS Nameservers config
                          </h4>
                          <div className="border border-white/5 rounded-xl overflow-hidden text-xs">
                            <table className="w-full text-left border-collapse">
                              <thead>
                                <tr className="bg-white/5 text-nebula-slate font-bold">
                                  <th className="p-3 border-b border-white/5">Type</th>
                                  <th className="p-3 border-b border-white/5">Host</th>
                                  <th className="p-3 border-b border-white/5">Points To</th>
                                </tr>
                              </thead>
                              <tbody>
                                {project.dnsRecords.map((dns, dIdx) => (
                                  <tr key={dIdx} className="hover:bg-white/5 text-nebula-slate/90">
                                    <td className="p-3 border-b border-white/5 font-mono text-[10px] text-electric-cyan font-bold">
                                      {dns.type}
                                    </td>
                                    <td className="p-3 border-b border-white/5 font-mono text-[10px]">
                                      {dns.host}
                                    </td>
                                    <td className="p-3 border-b border-white/5 font-mono text-[10px] truncate max-w-[150px]">
                                      {dns.points}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>

                        {/* WHOIS Security lock panel */}
                        <div className="space-y-4">
                          <h4 className="text-xs font-heading font-extrabold text-star-white uppercase tracking-wider flex items-center gap-1.5">
                            <ShieldAlert className="w-3.5 h-3.5 text-solar-pink" /> Security Protocol Nodes
                          </h4>

                          <div className="bg-white/5 border border-white/5 rounded-xl p-5 space-y-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <span className="text-xs font-bold text-white block">
                                  Registry WHOIS Lock
                                </span>
                                <span className="text-[10px] text-nebula-slate/60 leading-relaxed block max-w-[200px] mt-0.5">
                                  Encrypt and mask your physical name/address registry details.
                                </span>
                              </div>
                              <input
                                type="checkbox"
                                checked={project.whoisLocked}
                                onChange={() => toggleWhoisLock(project.id)}
                                className="w-4 h-4 rounded bg-white/5 border border-white/10 text-electric-cyan cursor-pointer"
                              />
                            </div>

                            <div className="h-[1px] bg-white/5" />

                            <div className="flex justify-between items-center text-xs">
                              <span className="text-nebula-slate">DNS Security (DNSSEC):</span>
                              <NeonBadge variant="success">Armed</NeonBadge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <main className="min-h-screen pt-24 pb-12 px-4 md:px-8 relative overflow-hidden mesh-bg">
      <Suspense
        fallback={
          <div className="h-64 flex flex-col items-center justify-center">
            <p className="text-xs text-nebula-slate font-heading font-bold uppercase tracking-widest animate-pulse">
              Syncing operational deck...
            </p>
          </div>
        }
      >
        <DashboardContent />
      </Suspense>
    </main>
  );
}
