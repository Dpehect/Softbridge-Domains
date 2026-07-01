"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Eye, Search, ShieldCheck } from "lucide-react";
import { CyberButton } from "./ui/CyberButton";
import ProductDetailModal from "./ProductDetailModal";
import PreviewModal, { PreviewConfig, PreviewPage } from "./PreviewModal";

type ProductCategory =
  | "SaaS"
  | "Portfolio"
  | "E-Commerce"
  | "Domain"
  | "Agency"
  | "Blog"
  | "Dashboard"
  | "Landing Page"
  | "Startup"
  | "Corporate"
  | "Personal Brand"
  | "Education"
  | "Healthcare";

type Product = {
  id: string;
  title: string;
  location: string; // Used as category TLD
  description: string;
  img: string;
  price: string;
  category: ProductCategory;
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
  },
  {
    id: "prism-studio",
    title: "PRISM.STUDIO",
    location: "Agency System",
    description: "Buy Price: $1,800 | Setup: $249 | Traffic: 2,200 PV/mo. Creative agency layout with services, proof, and lead capture.",
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80",
    price: "$1,800",
    category: "Agency"
  },
  {
    id: "daily-index",
    title: "DAILY.INDEX",
    location: "Editorial Blog",
    description: "Buy Price: $3,200 | Setup: $119 | Traffic: 6,700 PV/mo. Editorial publishing system with categories and newsletter capture.",
    img: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=600&q=80",
    price: "$3,200",
    category: "Blog"
  },
  {
    id: "metric-app",
    title: "METRIC.APP",
    location: "Dashboard Console",
    description: "Buy Price: $6,400 | Setup: $249 | Traffic: 5,900 PV/mo. Operational dashboard shell with metrics, reports, and team access.",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
    price: "$6,400",
    category: "Dashboard"
  },
  {
    id: "launch-page",
    title: "LAUNCH.PAGE",
    location: "Campaign Landing",
    description: "Buy Price: $1,200 | Setup: $69 | Traffic: 3,400 PV/mo. Focused one-page launch system for waitlists, offers, and campaigns.",
    img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80",
    price: "$1,200",
    category: "Landing Page"
  },
  {
    id: "seed-ai",
    title: "SEED.AI",
    location: "Startup Launch",
    description: "Buy Price: $7,900 | Setup: $249 | Traffic: 8,200 PV/mo. Startup website bundle with product story, pricing, and investor proof.",
    img: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=600&q=80",
    price: "$7,900",
    category: "Startup"
  },
  {
    id: "nexusgroup",
    title: "NEXUSGROUP.COM",
    location: "Corporate Presence",
    description: "Buy Price: $24,000 | Setup: $349 | Traffic: 42,000 PV/mo. Corporate website system with solutions, resources, and contact routing.",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80",
    price: "$24,000",
    category: "Corporate"
  },
  {
    id: "aura-me",
    title: "AURA.ME",
    location: "Personal Brand",
    description: "Buy Price: $2,100 | Setup: $199 | Traffic: 2,900 PV/mo. Personal brand website for founders, consultants, and creators.",
    img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80",
    price: "$2,100",
    category: "Personal Brand"
  },
  {
    id: "learnhub-io",
    title: "LEARNHUB.IO",
    location: "Education Platform",
    description: "Buy Price: $5,600 | Setup: $199 | Traffic: 7,100 PV/mo. Course and academy website with programs, pricing, and enrollment flows.",
    img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80",
    price: "$5,600",
    category: "Education"
  },
  {
    id: "caregrid",
    title: "CAREGRID.COM",
    location: "Healthcare Practice",
    description: "Buy Price: $8,800 | Setup: $249 | Traffic: 9,400 PV/mo. Healthcare website with service pages, provider profiles, and request forms.",
    img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&q=80",
    price: "$8,800",
    category: "Healthcare"
  }
];

const categoryPreviewSections: Record<ProductCategory, string[]> = {
  SaaS: ["Features", "Analytics", "Pricing", "Integrations"],
  Portfolio: ["Work", "Services", "Case Studies", "Contact"],
  "E-Commerce": ["Collections", "Featured Products", "Reviews", "Checkout"],
  Domain: ["Brand Story", "Traffic Signals", "Transfer Flow", "Escrow"],
  Agency: ["Services", "Process", "Results", "Book a Call"],
  Blog: ["Featured Articles", "Categories", "Author", "Newsletter"],
  Dashboard: ["Metrics", "Reports", "Activity", "Team Access"],
  "Landing Page": ["Benefits", "Social Proof", "FAQ", "Signup"],
  Startup: ["Product", "Traction", "Pricing", "Team"],
  Corporate: ["Company", "Solutions", "Resources", "Contact"],
  "Personal Brand": ["About", "Speaking", "Writing", "Contact"],
  Education: ["Courses", "Curriculum", "Student Stories", "Enroll"],
  Healthcare: ["Services", "Providers", "Patient FAQ", "Appointments"],
};

function createProductPreviewPages(product: Product): PreviewPage[] {
  const sections = categoryPreviewSections[product.category];
  const pageTitles = product.category === "Landing Page" ? ["Home"] : ["Home", "About", "Features", "Pricing", "Contact"];

  return pageTitles.map((title) => ({
    id: title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    title,
    description:
      title === "Home"
        ? product.description.split(". ")[1] || product.description
        : `${title} page generated for the ${product.category.toLowerCase()} preview.`,
    sections: title === "Home" ? sections : title === "Pricing" ? ["Plans", "Comparison", "FAQ"] : title === "Contact" ? ["Contact Form", "Support", "Location"] : sections.slice(0, 3),
  }));
}

export default function ProductSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [previewProduct, setPreviewProduct] = useState<Product | null>(null);

  const categories = ["All", ...Array.from(new Set(productsData.map((product) => product.category)))];

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
        sections: categoryPreviewSections[previewProduct.category],
        pages: createProductPreviewPages(previewProduct),
        pageCountLabel: previewProduct.category === "Landing Page" ? "1 Page" : "Full Site",
        themePrimary: "#E85D3B",
        themeSecondary: "#D94F2E",
        themeBg: "#FDF0E6",
        themeText: "#5C2E1F",
        layout: previewProduct.category === "Portfolio" ? "minimal" : previewProduct.category === "Dashboard" ? "dashboard" : "modern",
        extras:
          previewProduct.category === "SaaS"
            ? ["analytics", "pricing"]
            : previewProduct.category === "Portfolio"
              ? ["3d", "contact"]
              : previewProduct.category === "E-Commerce"
                ? ["analytics", "pricing"]
                : ["contact"],
        image: previewProduct.img,
      }
    : null;

  return (
    <section className="max-w-6xl mx-auto w-full mb-10 px-4 md:px-0">
      
      {/* Header section with category filters and search bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-4 gap-3 border-b border-black/5 pb-3">
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
      <div className="flex flex-wrap gap-2 mb-3 text-[9px] uppercase tracking-wider">
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
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3"
      >
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              variants={cardVariants}
              layout
              exit={{ opacity: 0, scale: 0.88, y: 12, transition: { duration: 0.35, ease: [0.4, 0, 1, 1] } }}
              onClick={() => setSelectedProduct(product)}
              className="group relative bg-abyss-panel/30 border border-black/5 rounded-2xl overflow-hidden hover:border-black/15 transition-all duration-400 cursor-pointer flex flex-col justify-between min-h-[300px] shadow-sm hover:shadow-md"
            >
              
              {/* Image box */}
              <div className="relative h-32 w-full overflow-hidden">
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
              <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2.5">
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
                <div className="flex items-center justify-between border-t border-black/5 pt-2.5 gap-2">
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
