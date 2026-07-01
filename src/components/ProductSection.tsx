"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Eye, Search, ShieldCheck } from "lucide-react";
import { CyberButton } from "./ui/CyberButton";
import ProductDetailModal from "./ProductDetailModal";
import PreviewModal, { PreviewConfig } from "./PreviewModal";

type Product = {
  id: string;
  title: string;
  location: string; // Used as category TLD
  description: string;
  img: string;
  price: string;
  category: "SaaS" | "Portfolio" | "E-Commerce" | "Domain";
};

const productsData: Product[] = [
  {
    id: "quantum-ai",
    title: "QUANTUM.AI",
    location: "AI Compiler Node",
    description: "Buy Price: $12,500 | MRR: $480/mo | Traffic: 15,000 PV/mo. Automated neural layout compiler with vector nodes.",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
    price: "$12,500",
    category: "SaaS"
  },
  {
    id: "vortex-io",
    title: "VORTEX.IO",
    location: "DNS Router",
    description: "Buy Price: $8,900 | MRR: $310/mo | Traffic: 8,400 PV/mo. Nameserver router with secure registry propagation gates.",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
    price: "$8,900",
    category: "Domain"
  },
  {
    id: "matrix-space",
    title: "MATRIX.SPACE",
    location: "WebGL Gallery",
    description: "Buy Price: $5,200 | MRR: $120/mo | Traffic: 4,100 PV/mo. Three-dimensional rendering display with custom camera pathways.",
    img: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&q=80",
    price: "$5,200",
    category: "Portfolio"
  },
  {
    id: "figma-collab",
    title: "FIGMA.COM",
    location: "Design Studio Node",
    description: "Buy Price: $450,000 | MRR: $18,400/mo | Traffic: 250,000 PV/mo. Premier design dashboard enabling live team components edits.",
    img: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=1200&q=80",
    price: "$450,000",
    category: "Portfolio"
  },
  {
    id: "escrowspace",
    title: "ESCROWSPACE.NET",
    location: "Transactional Broker",
    description: "Buy Price: $9,500 | MRR: $380/mo | Traffic: 9,000 PV/mo. Secure escrow registry routing system with verification nodes.",
    img: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1920&q=80",
    price: "$9,500",
    category: "Domain"
  },
  {
    id: "vercel-static",
    title: "VERCEL.COM",
    location: "Deploy Node Gateway",
    description: "Buy Price: $380,000 | MRR: $14,200/mo | Traffic: 180,000 PV/mo. Ultra fast page speed compilation with serverless edge handlers.",
    img: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=600&q=80",
    price: "$380,000",
    category: "SaaS"
  },
  {
    id: "stripe-api",
    title: "STRIPE.COM",
    location: "Payment Engine API",
    description: "Buy Price: $520,000 | MRR: $24,100/mo | Traffic: 390,000 PV/mo. Universal currency gateways with direct billing modules.",
    img: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=600&q=80",
    price: "$520,000",
    category: "E-Commerce"
  },
  {
    id: "canva-layout",
    title: "CANVA.COM",
    location: "Vector Assembler",
    description: "Buy Price: $290,000 | MRR: $9,800/mo | Traffic: 140,000 PV/mo. Drag-and-drop workspace layout rendering graphic assets.",
    img: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=600&q=80",
    price: "$290,000",
    category: "E-Commerce"
  }
];

export default function ProductSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [previewProduct, setPreviewProduct] = useState<Product | null>(null);

  const categories = ["All", "SaaS", "Portfolio", "E-Commerce", "Domain"];

  // Filter logic
  const filteredProducts = productsData.filter((product) => {
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Framer Motion Grid Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  } as const;

  const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 180, damping: 22, mass: 0.8 }
    },
  } as const;

  const previewConfig: PreviewConfig | null = previewProduct
    ? {
        typeId: previewProduct.id,
        typeName: `${previewProduct.category} Launch`,
        brandName: previewProduct.title,
        heroText:
          previewProduct.category === "Domain"
            ? `Launch ${previewProduct.title} with a premium brand system`
            : previewProduct.description.split(". ")[1] || previewProduct.title,
        sections:
          previewProduct.category === "E-Commerce"
            ? ["Collections", "Featured Products", "Reviews", "Checkout"]
            : previewProduct.category === "Portfolio"
              ? ["Work", "Services", "Case Studies", "Contact"]
              : previewProduct.category === "Domain"
                ? ["Brand Story", "Traffic Signals", "Transfer Flow", "Escrow"]
                : ["Features", "Analytics", "Pricing", "Integrations"],
        themePrimary: "#E85D3B",
        themeSecondary: "#D94F2E",
        themeBg: "#FDF0E6",
        themeText: "#5C2E1F",
        layout: previewProduct.category === "Portfolio" ? "minimal" : "modern",
        extras: previewProduct.category === "SaaS" ? ["analytics"] : previewProduct.category === "Portfolio" ? ["3d"] : [],
        image: previewProduct.img,
      }
    : null;

  return (
    <section className="max-w-6xl mx-auto w-full mb-12 px-4 md:px-0">
      
      {/* Header section with category filters and search bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-5 gap-3 border-b border-black/5 pb-4">
        <div>
          <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-cosmic-teal font-semibold block mb-1">
            REGISTRY PRODUCTS
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-star-white">
            Featured Layouts
          </h2>
        </div>

        {/* Search bar inside header */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            placeholder="Search layouts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-abyss-panel/50 border border-black/5 text-star-white text-xs font-mono py-2 pl-9 pr-4 rounded-xl focus:outline-none focus:border-cosmic-teal/40 transition-colors duration-350 placeholder:text-muted-steel/50"
          />
          <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-muted-steel/50" />
        </div>
      </div>

      {/* Category Navigation Controls */}
      <div className="flex flex-wrap gap-2 mb-4 text-[9px] uppercase tracking-wider">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-xl border transition-all duration-350 cursor-pointer font-semibold ${
              selectedCategory === cat
                ? "bg-cosmic-teal text-white border-cosmic-teal shadow-sm shadow-cosmic-teal/10"
                : "bg-transparent text-muted-steel border-black/8 hover:border-black/20 hover:text-cosmic-teal"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5"
      >
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              variants={cardVariants}
              layout
              exit={{ opacity: 0, scale: 0.88, y: 12, transition: { duration: 0.35, ease: [0.4, 0, 1, 1] } }}
              onClick={() => setSelectedProduct(product)}
              className="group relative bg-abyss-panel/30 border border-black/5 rounded-2xl overflow-hidden hover:border-black/15 transition-all duration-400 cursor-pointer flex flex-col justify-between min-h-[318px] shadow-sm hover:shadow-md"
            >
              
              {/* Image box */}
              <div className="relative h-36 w-full overflow-hidden">
                <img
                  src={product.img}
                  alt={product.title}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight-void via-midnight-void/20 to-transparent" />
                
                {/* Micro verified registry tag */}
                <div className="absolute top-3 left-3 flex items-center gap-1 bg-black/50 border border-white/10 px-2.5 py-1 rounded-lg text-[8px] tracking-wider text-emerald-400 font-mono">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  VERIFIED
                </div>
              </div>

              {/* Title & metadata content */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-cosmic-teal">
                    {product.location}
                  </span>
                  <h3 className="font-display text-lg font-bold text-star-white group-hover:text-cosmic-teal transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-[11px] text-muted-steel font-sans leading-relaxed font-normal line-clamp-3">
                    {product.description.split(". ").slice(1).join(". ") || product.description}
                  </p>
                </div>

                {/* Card Action Center footer */}
                <div className="flex items-center justify-between border-t border-black/5 pt-3 gap-2">
                  <div>
                    <span className="text-[8px] text-gray-500 block uppercase font-mono tracking-wider">Buy Price</span>
                    <span className="font-mono text-sm font-black text-sunset-coral">
                      {product.price}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={(event) => {
                        event.stopPropagation();
                        setPreviewProduct(product);
                      }}
                      className="h-8 w-8 rounded-xl border border-black/8 bg-black/[0.03] text-cosmic-teal hover:border-cosmic-teal/30 hover:bg-cosmic-teal/10 transition-all flex items-center justify-center cursor-pointer"
                      title="Live Preview"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <CyberButton variant="teal" size="sm" className="flex items-center gap-1 group/btn font-bold text-[9px] uppercase">
                      Customize
                      <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
                    </CyberButton>
                  </div>
                </div>
              </div>

            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-14 border border-dashed border-black/8 rounded-2xl">
          <p className="text-xs text-muted-steel uppercase font-mono tracking-wider">No layout coordinates found</p>
        </div>
      )}

      {/* Overlay Product Detail Dialog */}
      <ProductDetailModal
        isOpen={selectedProduct !== null}
        onClose={() => setSelectedProduct(null)}
        product={selectedProduct}
      />

      {previewConfig && (
        <PreviewModal
          isOpen={previewProduct !== null}
          onClose={() => setPreviewProduct(null)}
          config={previewConfig}
        />
      )}

    </section>
  );
}
