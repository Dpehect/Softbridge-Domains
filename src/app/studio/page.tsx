"use client";

import React, { Suspense, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { LivePreviewViewport } from "@/components/studio/LivePreviewViewport";
import { ConfigSidebar } from "@/components/studio/ConfigSidebar";
import { useConfiguratorStore } from "@/store/useConfiguratorStore";
import { useCartStore } from "@/store/useCartStore";
import { templatesData } from "@/data/templatesData";
import { CyberButton } from "@/components/ui/CyberButton";
import { ArrowLeft, ShoppingCart, Sliders } from "lucide-react";
import Link from "next/link";

function StudioContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Search parameters for loading templates & bundles
  const templateIdParam = searchParams.get("template");
  const domainName = searchParams.get("domain") || "";
  const domainPrice = Number(searchParams.get("price") || "0");

  const { config, loadTemplate } = useConfiguratorStore();
  const addItem = useCartStore((state) => state.addItem);

  // Load template on mount / params update
  useEffect(() => {
    const activeTemplateId = templateIdParam || config.templateId || "tpl-1";
    const foundTemplate = templatesData.find((t) => t.id === activeTemplateId) || templatesData[0];
    
    if (foundTemplate) {
      loadTemplate(foundTemplate.id, foundTemplate.name, foundTemplate.defaultPages);
    }
  }, [templateIdParam]);

  const handleDeployToCart = () => {
    // Pack configuration and add package to cart
    const foundTemplate = templatesData.find((t) => t.id === config.templateId) || templatesData[0];
    
    addItem({
      domainName: domainName || `${config.brandName.toLowerCase().replace(/[^a-z0-9]/g, "") || "orbit"}.space`,
      domainTld: domainName ? "" : ".space",
      domainPrice: domainPrice || 14.99,
      websitePackage: {
        templateId: config.templateId,
        templateName: config.templateName,
        setupPrice: foundTemplate.price,
        config: config,
      },
    });

    router.push("/cart");
  };

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-6 relative z-10 flex-1">
      {/* Top Controls bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/5 pb-4">
        <div className="flex items-center gap-3">
          <Link
            href="/templates"
            className="p-2.5 bg-white/5 hover:bg-white/10 text-star-white hover:text-electric-cyan rounded-full border border-white/5 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <span className="text-[9px] text-nebula-slate uppercase tracking-wider font-extrabold flex items-center gap-1.5">
              <Sliders className="w-3 h-3 text-electric-cyan" /> Customizable Orbit Module
            </span>
            <h1 className="text-xl md:text-2xl font-heading font-black text-star-white tracking-tight">
              STUDIO: <span className="text-electric-cyan">{config.templateName || "Loading..."}</span>
            </h1>
          </div>
        </div>

        {/* Deploy & Cart Action */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          {domainName && (
            <div className="hidden lg:block text-right">
              <span className="text-[9px] text-nebula-slate/50 block font-semibold uppercase tracking-wider">
                Target Gateway
              </span>
              <span className="text-xs font-mono font-bold text-emerald-400">
                {domainName}
              </span>
            </div>
          )}
          <CyberButton
            onClick={handleDeployToCart}
            variant="purple"
            className="gap-2 w-full md:w-auto"
          >
            <ShoppingCart className="w-4 h-4" />
            Integrate & Add to Cart
          </CyberButton>
        </div>
      </div>

      {/* Editor Split Layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch min-h-[500px]">
        {/* Left Canlı Önizleme Viewport */}
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col justify-stretch">
          <LivePreviewViewport />
        </div>

        {/* Right Kontrol Paneli Sidebar */}
        <div className="lg:col-span-5 xl:col-span-4 flex flex-col">
          <ConfigSidebar />
        </div>
      </div>
    </div>
  );
}

export default function StudioPage() {
  return (
    <main className="min-h-screen pt-32 pb-16 px-4 md:px-8 relative overflow-hidden mesh-bg flex flex-col">
      <Suspense
        fallback={
          <div className="h-64 flex flex-col items-center justify-center">
            <p className="text-xs text-nebula-slate font-heading font-bold uppercase tracking-widest animate-pulse">
              Launching studio decks...
            </p>
          </div>
        }
      >
        <StudioContent />
      </Suspense>
    </main>
  );
}
