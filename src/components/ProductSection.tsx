"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Search, ShieldCheck } from "lucide-react";
import { CyberButton } from "./ui/CyberButton";
import ProductDetailModal from "./ProductDetailModal";

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
        staggerChildren: 0.08,
      },
    },
  } as const;

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 260, damping: 25 }
    },
  } as const;

  return (
    <section className="max-w-6xl mx-auto w-full mb-36 px-4 md:px-0">
      
      {/* Header section with category filters and search bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-b border-black/5 pb-8">
        <div>
          <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-cosmic-teal font-bold block mb-2">
            REGISTRY PRODUCTS
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-extrabold text-star-white tracking-tight">
            FEATURED LAYOUTS
          </h2>
        </div>

        {/* Search bar inside header */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search layout coordinates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-abyss-panel/50 border border-black/5 text-star-white text-xs font-mono py-3 pl-10 pr-4 rounded focus:outline-none focus:border-cosmic-teal/40 transition-colors placeholder:text-gray-400"
          />
          <Search className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
        </div>
      </div>

      {/* Category Navigation Controls */}
      <div className="flex flex-wrap gap-2.5 mb-10 font-mono text-[9px] uppercase tracking-widest">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2.5 rounded-full border transition-all duration-300 cursor-pointer ${
              selectedCategory === cat
                ? "bg-cosmic-teal text-white border-cosmic-teal font-bold shadow-lg shadow-cosmic-teal/10"
                : "bg-transparent text-muted-steel border-black/5 hover:border-black/20 hover:text-cosmic-teal"
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
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              variants={cardVariants}
              layout
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              onClick={() => setSelectedProduct(product)}
              className="group relative bg-abyss-panel/30 border border-black/5 rounded-xl overflow-hidden hover:border-black/15 transition-all duration-500 cursor-pointer flex flex-col justify-between min-h-[360px] shadow-lg"
            >
              
              {/* Image box */}
              <div className="relative h-44 w-full overflow-hidden">
                <img
                  src={product.img}
                  alt={product.title}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight-void via-midnight-void/20 to-transparent" />
                
                {/* Micro verified registry tag */}
                <div className="absolute top-3 left-3 flex items-center gap-1 bg-black/50 border border-white/10 px-2.5 py-1 rounded text-[8px] tracking-wider text-emerald-400 font-mono">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  VERIFIED
                </div>
              </div>

              {/* Title & metadata content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-cosmic-teal">
                    {product.location}
                  </span>
                  <h3 className="font-display text-xl font-black text-star-white group-hover:text-cosmic-teal transition-colors tracking-tight">
                    {product.title}
                  </h3>
                  <p className="text-[11px] text-muted-steel font-sans leading-relaxed font-light line-clamp-3">
                    {product.description.split(". ").slice(1).join(". ") || product.description}
                  </p>
                </div>

                {/* Card Action Center footer */}
                <div className="flex items-center justify-between border-t border-black/5 pt-4">
                  <div>
                    <span className="text-[8px] text-gray-500 block uppercase font-mono tracking-wider">Buy Price</span>
                    <span className="font-mono text-sm font-black text-sunset-coral">
                      {product.price}
                    </span>
                  </div>
                  <CyberButton variant="teal" size="sm" className="flex items-center gap-1 group/btn font-bold text-[9px] tracking-wider uppercase">
                    Customize
                    <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
                  </CyberButton>
                </div>
              </div>

            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-20 border border-dashed border-black/5 rounded-xl">
          <p className="text-xs text-muted-steel uppercase font-mono tracking-wider">No layout coordinates found</p>
        </div>
      )}

      {/* Overlay Product Detail Dialog */}
      <ProductDetailModal
        isOpen={selectedProduct !== null}
        onClose={() => setSelectedProduct(null)}
        product={selectedProduct}
      />

    </section>
  );
}
