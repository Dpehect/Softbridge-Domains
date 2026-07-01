"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Eye, Search, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { CyberButton } from "./ui/CyberButton";
import ProductDetailModal from "./ProductDetailModal";
import PreviewModal, { PreviewConfig } from "./PreviewModal";
import { CustomPage, CustomSectionType } from "@/types/builder";

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

type ProductSeed = {
  name: string;
  domain: string;
  price: number;
  mrr: number;
  traffic: number;
  note: string;
};

type ProductGroup = {
  category: ProductCategory;
  location: string;
  img: string;
  items: ProductSeed[];
};

const formatMoney = (value: number) => `$${value.toLocaleString("en-US")}`;

const slugifyProduct = (value: string) =>
  value.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const productGroups: ProductGroup[] = [
  {
    category: "SaaS",
    location: "Local SaaS Domain",
    img: "/images/cat_saas.jpg",
    items: [
      { name: "Cedar Desk", domain: "cedardesk.app", price: 268, mrr: 120, traffic: 2400, note: "Scheduling and job tracking name for small service shops." },
      { name: "Millhouse Scheduler", domain: "millhousescheduler.com", price: 289, mrr: 90, traffic: 1600, note: "Appointment software brand with a practical neighborhood feel." },
      { name: "Pineview Ledger", domain: "pineviewledger.com", price: 422, mrr: 105, traffic: 1900, note: "Simple finance and invoice platform name for local teams." },
      { name: "Oak County Forms", domain: "oakcountyforms.com", price: 298, mrr: 70, traffic: 1300, note: "Form builder identity suited to contractors and small offices." },
      { name: "Riverbend Reports", domain: "riverbendreports.com", price: 412, mrr: 135, traffic: 3100, note: "Reporting dashboard brand for regional operations." },
    ],
  },
  {
    category: "Portfolio",
    location: "Maker Portfolio Domain",
    img: "/images/cat_portfolio.jpg",
    items: [
      { name: "Elm Street Studio", domain: "elmstreetstudio.com", price: 354, mrr: 60, traffic: 1500, note: "Warm portfolio identity for a local designer or craft studio." },
      { name: "Willow Frame Co.", domain: "willowframe.co", price: 156, mrr: 45, traffic: 980, note: "Photography and visual work name with a small-town tone." },
      { name: "Red Porch Works", domain: "redporchworks.com", price: 124, mrr: 40, traffic: 860, note: "Personal work showcase for makers, writers, or builders." },
      { name: "Stone Alley Maker", domain: "stonealleymaker.com", price: 382, mrr: 55, traffic: 1250, note: "Handmade, design, and case-study friendly brand." },
      { name: "Creekside Folio", domain: "creeksidefolio.com", price: 170, mrr: 35, traffic: 740, note: "Short portfolio domain for independent creative work." },
    ],
  },
  {
    category: "E-Commerce",
    location: "Shopfront Domain",
    img: "/images/cat_ecommerce.jpg",
    items: [
      { name: "Maple Grove Bakery", domain: "maplegrovebakery.com", price: 345, mrr: 145, traffic: 4200, note: "Local bakery storefront with catalog and pickup potential." },
      { name: "Willow Creek Market", domain: "willowcreekmarket.com", price: 118, mrr: 160, traffic: 5100, note: "General store brand for groceries, gifts, and local goods." },
      { name: "Red Barn Collective", domain: "redbarncollective.store", price: 485, mrr: 85, traffic: 2100, note: "Handmade market identity with a regional craft feel." },
      { name: "Riverbend Supply", domain: "riverbendsupply.com", price: 484, mrr: 115, traffic: 3400, note: "Hardware, outdoor, or farm supply storefront name." },
      { name: "Cloverfield Books", domain: "cloverfieldbooks.com", price: 458, mrr: 75, traffic: 1800, note: "Bookshop and subscription storefront with a friendly tone." },
    ],
  },
  {
    category: "Domain",
    location: "Local Domain Bundle",
    img: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1920&q=80",
    items: [
      { name: "Oakridge Diner", domain: "oakridgediner.com", price: 465, mrr: 95, traffic: 2600, note: "Classic diner domain with immediate local business fit." },
      { name: "Cedar Hollow Cafe", domain: "cedarhollowcafe.com", price: 271, mrr: 80, traffic: 2200, note: "Cafe and bakery name that feels established but approachable." },
      { name: "Pineview Station", domain: "pineviewstation.com", price: 495, mrr: 110, traffic: 3000, note: "Flexible name for a depot, market, or neighborhood service hub." },
      { name: "Stonebridge Print Co.", domain: "stonebridgeprintco.com", price: 350, mrr: 65, traffic: 1400, note: "Print shop and local studio domain with clear service intent." },
      { name: "Maple Lane Repair", domain: "maplelanerepair.com", price: 135, mrr: 35, traffic: 620, note: "Small repair business name ready for a practical website." },
    ],
  },
  {
    category: "Agency",
    location: "Neighborhood Agency Domain",
    img: "/images/cat_agency.jpg",
    items: [
      { name: "North Fork Signs", domain: "northforksigns.com", price: 53, mrr: 70, traffic: 1250, note: "Signage and local marketing agency name with service clarity." },
      { name: "Main Street Media", domain: "mainstreetmedia.co", price: 203, mrr: 100, traffic: 2300, note: "Friendly media studio brand for small business campaigns." },
      { name: "Railtown Design", domain: "railtowndesign.com", price: 394, mrr: 80, traffic: 1500, note: "Design agency name with a modest regional voice." },
      { name: "Cloverfield Creative", domain: "cloverfieldcreative.com", price: 477, mrr: 90, traffic: 1800, note: "Creative studio identity for local brand and web work." },
      { name: "Maple Lane Agency", domain: "maplelaneagency.com", price: 425, mrr: 65, traffic: 980, note: "Approachable agency name for service packages and retainers." },
    ],
  },
  {
    category: "Blog",
    location: "Editorial Domain",
    img: "/images/cat_blog.jpg",
    items: [
      { name: "Porchlight Journal", domain: "porchlightjournal.com", price: 472, mrr: 45, traffic: 1800, note: "Local essay and community writing brand." },
      { name: "Riverbend Review", domain: "riverbendreview.com", price: 374, mrr: 60, traffic: 2400, note: "Town newsletter or local review site identity." },
      { name: "Cedar Hollow Notes", domain: "cedarhollownotes.com", price: 64, mrr: 35, traffic: 920, note: "Small editorial brand for personal or community publishing." },
      { name: "Westfield Dispatch", domain: "westfielddispatch.com", price: 251, mrr: 75, traffic: 3100, note: "Regional blog or small newspaper name." },
      { name: "Little Acre Letter", domain: "littleacreletter.com", price: 380, mrr: 30, traffic: 700, note: "Newsletter-first name for lifestyle and local updates." },
    ],
  },
  {
    category: "Dashboard",
    location: "Operations Dashboard Domain",
    img: "/images/cat_dashboard.jpg",
    items: [
      { name: "Pineview Station", domain: "pineviewstation.app", price: 54, mrr: 115, traffic: 2700, note: "Operational dashboard name for schedules and location status." },
      { name: "Mill Creek Ledger", domain: "millcreekledger.com", price: 214, mrr: 105, traffic: 2400, note: "Simple reporting and accounting dashboard brand." },
      { name: "Ashford Board", domain: "ashfordboard.com", price: 418, mrr: 65, traffic: 1100, note: "Internal board name for teams, jobs, and office tasks." },
      { name: "Harbor Shift", domain: "harborshift.app", price: 100, mrr: 80, traffic: 1650, note: "Shift planning identity for cafes, shops, and crews." },
      { name: "Brookside Ops", domain: "brooksideops.com", price: 166, mrr: 95, traffic: 2050, note: "Operations dashboard brand with a grounded local tone." },
    ],
  },
  {
    category: "Landing Page",
    location: "One Page Launch Domain",
    img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80",
    items: [
      { name: "Oakridge Supper Club", domain: "oakridgesupperclub.com", price: 189, mrr: 25, traffic: 620, note: "Simple one-page launch for a local restaurant or event." },
      { name: "Cedar Hollow Roast", domain: "cedarhollowroast.com", price: 364, mrr: 20, traffic: 540, note: "Coffee popup or small batch product landing page." },
      { name: "Maple Grove Cakes", domain: "maplegrovecakes.com", price: 489, mrr: 30, traffic: 760, note: "Focused landing page for orders, menus, and calls." },
      { name: "Red Barn Weekend", domain: "redbarnweekend.com", price: 308, mrr: 18, traffic: 430, note: "Event and seasonal campaign name with local charm." },
      { name: "Willow Creek Opening", domain: "willowcreekopening.com", price: 500, mrr: 15, traffic: 360, note: "Grand opening landing page for a neighborhood shop." },
    ],
  },
  {
    category: "Startup",
    location: "Small Team Startup Domain",
    img: "/images/cat_startup.jpg",
    items: [
      { name: "Barnlight Labs", domain: "barnlightlabs.com", price: 454, mrr: 120, traffic: 2600, note: "Small product team name with a quiet workshop feel." },
      { name: "Ridgepost Tools", domain: "ridgeposttools.com", price: 112, mrr: 90, traffic: 1800, note: "Useful software and utility brand for early teams." },
      { name: "Hollow Creek Works", domain: "hollowcreekworks.com", price: 120, mrr: 75, traffic: 1250, note: "Startup name that feels practical and handmade." },
      { name: "Lantern Lane Apps", domain: "lanternlaneapps.com", price: 371, mrr: 65, traffic: 1050, note: "Friendly app studio identity for a modest launch." },
      { name: "Stone Mill Systems", domain: "stonemillsystems.com", price: 139, mrr: 140, traffic: 3100, note: "Small systems company name with durable appeal." },
    ],
  },
  {
    category: "Corporate",
    location: "Regional Business Domain",
    img: "/images/cat_corporate.jpg",
    items: [
      { name: "Brookstone Works", domain: "brookstoneworks.com", price: 480, mrr: 140, traffic: 3600, note: "Regional services company with a steady, local profile." },
      { name: "Cedar & Main Co.", domain: "cedarandmain.com", price: 406, mrr: 150, traffic: 4200, note: "Professional but approachable company identity." },
      { name: "Harbor Plain Group", domain: "harborplaingroup.com", price: 108, mrr: 115, traffic: 2400, note: "Small holding or services group name for local markets." },
      { name: "Oak County Services", domain: "oakcountyservices.com", price: 285, mrr: 95, traffic: 1900, note: "Clear domain for a practical regional services firm." },
      { name: "Redfield Office", domain: "redfieldoffice.com", price: 389, mrr: 70, traffic: 1300, note: "Office services or consultancy name with a modest footprint." },
    ],
  },
  {
    category: "Personal Brand",
    location: "Founder Website Domain",
    img: "/images/cat_personal.jpg",
    items: [
      { name: "Ella Reed Studio", domain: "ellareedstudio.com", price: 87, mrr: 40, traffic: 900, note: "Personal studio name for consulting, writing, or design." },
      { name: "Mason Hale Works", domain: "masonhaleworks.com", price: 387, mrr: 32, traffic: 650, note: "Approachable founder site identity." },
      { name: "Clara Finch Notes", domain: "clarafinchnotes.com", price: 295, mrr: 28, traffic: 540, note: "Personal writing and newsletter domain." },
      { name: "Jonah Brooks Co.", domain: "jonahbrooksco.com", price: 332, mrr: 38, traffic: 760, note: "Independent consultant brand with local feel." },
      { name: "Nora Lane Studio", domain: "noralane.studio", price: 216, mrr: 50, traffic: 980, note: "Premium but small-scale personal brand domain." },
    ],
  },
  {
    category: "Education",
    location: "Learning Website Domain",
    img: "/images/cat_education.jpg",
    items: [
      { name: "Pine Hill School", domain: "pinehillschool.com", price: 231, mrr: 90, traffic: 2100, note: "Local school or program website name." },
      { name: "Maple Grove Tutors", domain: "maplegrovetutors.com", price: 240, mrr: 65, traffic: 1350, note: "Tutoring center domain with direct community appeal." },
      { name: "Cedar Creek Academy", domain: "cedarcreekacademy.com", price: 137, mrr: 110, traffic: 2800, note: "Education brand for courses, cohorts, or workshops." },
      { name: "Little Lantern Learning", domain: "littlelanternlearning.com", price: 197, mrr: 55, traffic: 980, note: "Friendly name for children, workshops, or tutoring." },
      { name: "Oakridge Workshops", domain: "oakridgeworkshops.com", price: 249, mrr: 45, traffic: 840, note: "Community learning and workshop domain." },
    ],
  },
  {
    category: "Healthcare",
    location: "Local Care Domain",
    img: "/images/cat_healthcare.jpg",
    items: [
      { name: "Willow Creek Clinic", domain: "willowcreekclinic.com", price: 99, mrr: 140, traffic: 3600, note: "Primary care website name with a calm local tone." },
      { name: "Cedar Hollow Care", domain: "cedarhollowcare.com", price: 209, mrr: 100, traffic: 2300, note: "Healthcare and wellness brand with neighborhood trust." },
      { name: "Maple Street Wellness", domain: "maplestreetwellness.com", price: 180, mrr: 90, traffic: 1900, note: "Wellness practice domain for local providers." },
      { name: "Oakridge Family Health", domain: "oakridgefamilyhealth.com", price: 96, mrr: 120, traffic: 3100, note: "Family clinic identity with clear service positioning." },
      { name: "Riverbend Therapy", domain: "riverbendtherapy.com", price: 300, mrr: 75, traffic: 1500, note: "Therapy practice name with warm regional character." },
    ],
  },
];

const productsData: Product[] = productGroups.flatMap((group) =>
  group.items.map((item) => ({
    id: slugifyProduct(`${group.category}-${item.name}`),
    title: item.name,
    location: item.domain,
    description: `Buy Price: ${formatMoney(item.price)} | MRR: $${item.mrr}/mo | Traffic: ${item.traffic.toLocaleString("en-US")} PV/mo. ${item.note}`,
    img: group.img,
    price: formatMoney(item.price),
    category: group.category,
  }))
);

const categoryPreviewSections: Record<ProductCategory, string[]> = {
  SaaS: ["Features", "Analytics", "Pricing", "Integrations"],
  Portfolio: ["Work", "Services", "Case Studies", "Contact"],
  "E-Commerce": ["Collections", "Featured Products", "Reviews", "Checkout"],
  Domain: ["Brand Story", "Traffic Signals", "Transfer Steps", "Launch Plan"],
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

function createProductPreviewPages(product: Product): CustomPage[] {
  const sections = categoryPreviewSections[product.category] || ["Features", "Details"];
  const pageTitles = product.category === "Landing Page" ? ["Home"] : ["Home", "About", "Features", "Pricing", "Contact"];

  return pageTitles.map((title) => {
    const sectionNames = title === "Home" ? sections : title === "Pricing" ? ["Plans", "Comparison", "FAQ"] : title === "Contact" ? ["Contact Form", "Support", "Location"] : sections.slice(0, 3);
    
    return {
      id: title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      title,
      sections: sectionNames.map((s, i) => ({
        id: `sec-${i}`,
        type: (s === "Hero" || s === "Features" || s === "Pricing" || s === "Testimonials" || s === "FAQ" || s === "Contact" || s === "Gallery" || s === "Blog") ? s as CustomSectionType : "Features",
        content: {
          heading: s,
          description: title === "Home" ? (product.description.split(". ")[1] || product.description) : `${s} for ${title} page.`,
        },
        styles: { padding: "py-16", alignment: "center" }
      }))
    };
  });
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
        customPages: createProductPreviewPages(previewProduct),
        pageCountLabel: previewProduct.category === "Landing Page" ? "1 Page" : "Full Site",
        themePrimary: "#E85D3B",
        themeSecondary: "#D94F2E",
        themeBg: "#FDF0E6",
        themeText: "#5C2E1F",
        themeFont: "var(--font-sans)",
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
                <Image
                  src={product.img}
                  alt={product.title}
                  fill
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
