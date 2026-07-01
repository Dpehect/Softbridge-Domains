"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { LivePreviewViewport } from "@/components/studio/LivePreviewViewport";
import { ConfigSidebar } from "@/components/studio/ConfigSidebar";
import { StudioLivePreviewModal } from "@/components/studio/StudioLivePreviewModal";
import { useConfiguratorStore } from "@/store/useConfiguratorStore";
import { useCartStore } from "@/store/useCartStore";
import { templatesData } from "@/data/templatesData";
import { CyberButton } from "@/components/ui/CyberButton";
import { ArrowLeft, Eye, ShoppingCart, Sliders } from "lucide-react";
import Link from "next/link";

function StudioContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

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
      loadTemplate(foundTemplate.id, foundTemplate.name, foundTemplate.defaultPages, foundTemplate.theme);
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
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-4 relative z-10 flex-1">
      {/* Top Controls bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 border-b border-black/5 pb-2.5">
        <div className="flex items-center gap-3">
          <Link
            href="/templates"
            className="p-2.5 bg-black/[0.04] hover:bg-black/[0.07] text-star-white hover:text-electric-cyan rounded-full border border-black/5 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <span className="text-[9px] text-nebula-slate uppercase tracking-wider font-extrabold flex items-center gap-1.5">
              <Sliders className="w-3 h-3 text-electric-cyan" /> Customizable Orbit Module
            </span>
            <h1 className="text-xl md:text-2xl font-heading font-bold text-star-white">
              STUDIO: <span className="text-electric-cyan">{config.templateName || "Loading..."}</span>
            </h1>
          </div>
        </div>

        {/* Deploy & Cart Action */}
        <div className="flex items-center gap-2.5 w-full md:w-auto">
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
            onClick={() => setIsPreviewOpen(true)}
            variant="glass"
            className="gap-2 w-full md:w-auto"
          >
            <Eye className="w-4 h-4" />
            Live Preview
          </CyberButton>
          <CyberButton
            onClick={handleDeployToCart}
            variant="teal"
            className="gap-2 w-full md:w-auto"
          >
            <ShoppingCart className="w-4 h-4" />
            Integrate & Add to Cart
          </CyberButton>
        </div>
      </div>

      {/* Editor Split Layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch min-h-[440px]">
        {/* Left Canlı Önizleme Viewport */}
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col justify-stretch">
          <LivePreviewViewport />
        </div>

        {/* Right Kontrol Paneli Sidebar */}
        <div className="lg:col-span-5 xl:col-span-4 flex flex-col">
          <ConfigSidebar />
        </div>
      </div>

      <StudioLivePreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
      />
    </div>
  );
}

export default function StudioPage() {
  return (
    <main className="min-h-screen pt-20 pb-8 px-4 md:px-8 relative overflow-hidden mesh-bg flex flex-col">
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
