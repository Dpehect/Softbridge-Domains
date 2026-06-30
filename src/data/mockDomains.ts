export interface DomainListing {
  id: string;
  name: string;
  tld: string;
  fullDomain: string;
  price: number;
  category: "Premium" | "Short" | "Brandable" | "Tech" | "Commerce" | "Creative";
  length: "Short" | "Medium" | "Long";
  available: boolean;
  description: string;
  tags: string[];
  monthlyTraffic?: number;
  mrr?: number;
}

export const domainCatalog: DomainListing[] = [
  // --- Premium / Short ---
  { id: "1",  name: "flux",     tld: ".ai",     fullDomain: "flux.ai",       price: 8499,  category: "Premium",   length: "Short",  available: true,  description: "4-letter AI brand, ultra-memorable and highly brandable for SaaS startups.", tags: ["ai", "short", "premium"], monthlyTraffic: 12000, mrr: 380 },
  { id: "2",  name: "nova",     tld: ".io",     fullDomain: "nova.io",       price: 5200,  category: "Short",     length: "Short",  available: true,  description: "Clean 4-letter domain with .io prestige—ideal for developer tools and SaaS.", tags: ["io", "short", "dev"], monthlyTraffic: 8400, mrr: 220 },
  { id: "3",  name: "arc",      tld: ".com",    fullDomain: "arc.com",       price: 42000, category: "Premium",   length: "Short",  available: true,  description: "Rare 3-letter .com — exceptional brand equity and global recognition.", tags: ["com", "ultra-short", "premium"], monthlyTraffic: 95000 },
  { id: "4",  name: "vex",      tld: ".ai",     fullDomain: "vex.ai",        price: 3900,  category: "Short",     length: "Short",  available: true,  description: "Sharp 3-letter domain for AI ventures, automation tools, or data platforms.", tags: ["ai", "short", "automation"] },
  { id: "5",  name: "zyra",     tld: ".com",    fullDomain: "zyra.com",      price: 7800,  category: "Brandable", length: "Short",  available: true,  description: "Distinctive 4-letter brandable name—unique, catchy and globally available.", tags: ["com", "brandable", "unique"] },
  { id: "6",  name: "koda",     tld: ".io",     fullDomain: "koda.io",       price: 2900,  category: "Brandable", length: "Short",  available: true,  description: "Modern brandable name for code editors, dev platforms or mobile apps.", tags: ["io", "brandable", "dev"] },

  // --- Tech & SaaS ---
  { id: "7",  name: "synapse",  tld: ".ai",     fullDomain: "synapse.ai",    price: 12500, category: "Tech",      length: "Medium", available: true,  description: "Neural-network brand identity perfect for AI infrastructure or data pipelines.", tags: ["ai", "neural", "saas"], monthlyTraffic: 15000, mrr: 480 },
  { id: "8",  name: "vector",   tld: ".io",     fullDomain: "vector.io",     price: 6700,  category: "Tech",      length: "Medium", available: true,  description: "Strong technical name for data science, ML platforms or analytics dashboards.", tags: ["io", "data", "analytics"] },
  { id: "9",  name: "circuit",  tld: ".dev",    fullDomain: "circuit.dev",   price: 3200,  category: "Tech",      length: "Medium", available: true,  description: "Developer-centric brand for DevOps tooling, CI/CD, or hardware startups.", tags: ["dev", "devops", "hardware"] },
  { id: "10", name: "kernel",   tld: ".io",     fullDomain: "kernel.io",     price: 8900,  category: "Tech",      length: "Medium", available: true,  description: "Deep-tech domain for OS-level products, embedded systems or cloud infrastructure.", tags: ["io", "cloud", "infrastructure"], monthlyTraffic: 8400, mrr: 310 },
  { id: "11", name: "tensor",   tld: ".ai",     fullDomain: "tensor.ai",     price: 15000, category: "Premium",   length: "Medium", available: true,  description: "Premium AI domain for ML frameworks, research labs or model serving platforms.", tags: ["ai", "ml", "premium"], monthlyTraffic: 28000 },
  { id: "12", name: "helix",    tld: ".tech",   fullDomain: "helix.tech",    price: 1299,  category: "Tech",      length: "Medium", available: true,  description: "Clean tech brand for biotech, data visualization, or API gateway products.", tags: ["tech", "biotech", "api"] },
  { id: "13", name: "orbital",  tld: ".dev",    fullDomain: "orbital.dev",   price: 2100,  category: "Tech",      length: "Medium", available: true,  description: "Space-inspired developer brand for build systems, CI pipelines or cloud services.", tags: ["dev", "cloud", "cicd"] },
  { id: "14", name: "runtime",  tld: ".io",     fullDomain: "runtime.io",    price: 4500,  category: "Tech",      length: "Medium", available: true,  description: "Clear developer domain for execution environments, interpreters or serverless.", tags: ["io", "dev", "serverless"] },

  // --- Commerce & Business ---
  { id: "15", name: "trove",    tld: ".store",  fullDomain: "trove.store",   price: 990,   category: "Commerce",  length: "Short",  available: true,  description: "Elegant commerce name for curated marketplaces, boutique stores or subscription boxes.", tags: ["store", "marketplace", "ecommerce"] },
  { id: "16", name: "nexus",    tld: ".com",    fullDomain: "nexus.com",     price: 24000, category: "Premium",   length: "Medium", available: true,  description: "Powerful .com brand for B2B SaaS, enterprise platforms or marketplace hubs.", tags: ["com", "b2b", "premium"], monthlyTraffic: 42000, mrr: 1800 },
  { id: "17", name: "escrow",   tld: ".net",    fullDomain: "escrow.net",    price: 9500,  category: "Commerce",  length: "Medium", available: true,  description: "Trust-anchored transactional domain for payment processors or financial platforms.", tags: ["net", "finance", "payments"], monthlyTraffic: 9000, mrr: 380 },
  { id: "18", name: "vault",    tld: ".finance", fullDomain: "vault.finance", price: 3400,  category: "Commerce",  length: "Short",  available: true,  description: "Secure finance brand for wallets, savings products or investment dashboards.", tags: ["finance", "crypto", "security"] },
  { id: "19", name: "cartex",   tld: ".com",    fullDomain: "cartex.com",    price: 5800,  category: "Commerce",  length: "Medium", available: true,  description: "Commerce-first domain for headless checkout systems or logistics platforms.", tags: ["com", "ecommerce", "logistics"] },
  { id: "20", name: "ledger",   tld: ".io",     fullDomain: "ledger.io",     price: 7200,  category: "Commerce",  length: "Medium", available: true,  description: "Financial clarity domain for accounting SaaS, bookkeeping or DeFi products.", tags: ["io", "finance", "saas"] },

  // --- Brandable & Creative ---
  { id: "21", name: "lunara",   tld: ".com",    fullDomain: "lunara.com",    price: 4100,  category: "Brandable", length: "Medium", available: true,  description: "Celestial brandable name—memorable and versatile for wellness, beauty or lifestyle.", tags: ["com", "lifestyle", "wellness"] },
  { id: "22", name: "vivex",    tld: ".io",     fullDomain: "vivex.io",      price: 2300,  category: "Brandable", length: "Short",  available: true,  description: "Punchy brandable name for live streaming, events or creator-economy platforms.", tags: ["io", "live", "creator"] },
  { id: "23", name: "wrendr",   tld: ".com",    fullDomain: "wrendr.com",    price: 3700,  category: "Creative",  length: "Medium", available: true,  description: "Creative naming play for design agencies, visual content tools or marketplaces.", tags: ["com", "design", "creative"] },
  { id: "24", name: "prism",    tld: ".studio", fullDomain: "prism.studio",  price: 1800,  category: "Creative",  length: "Short",  available: true,  description: "Colorful creative studio domain perfect for digital agencies or production houses.", tags: ["studio", "agency", "design"] },
  { id: "25", name: "folio",    tld: ".design", fullDomain: "folio.design",  price: 2400,  category: "Creative",  length: "Short",  available: true,  description: "Portfolio-native domain for visual designers, photographers or illustrators.", tags: ["design", "portfolio", "visual"], monthlyTraffic: 4100, mrr: 120 },
  { id: "26", name: "palette",  tld: ".studio", fullDomain: "palette.studio", price: 1500, category: "Creative",  length: "Medium", available: true,  description: "Artsy domain for color tool SaaS, design systems or creative collaboration apps.", tags: ["studio", "design", "tools"] },
  { id: "27", name: "moova",    tld: ".com",    fullDomain: "moova.com",     price: 6200,  category: "Brandable", length: "Medium", available: true,  description: "Dynamic motion-inspired name for logistics, delivery platforms or animation studios.", tags: ["com", "motion", "logistics"] },
  { id: "28", name: "quell",    tld: ".ai",     fullDomain: "quell.ai",      price: 4800,  category: "Brandable", length: "Short",  available: true,  description: "Calming AI brand for mental wellness apps, noise-reduction tools or focus products.", tags: ["ai", "wellness", "productivity"] },

  // --- Taken domains for realism ---
  { id: "29", name: "google",   tld: ".com",    fullDomain: "google.com",    price: 0,     category: "Premium",   length: "Medium", available: false, description: "Registered — the world's most trafficked search engine domain.", tags: ["com", "taken"] },
  { id: "30", name: "stripe",   tld: ".com",    fullDomain: "stripe.com",    price: 0,     category: "Commerce",  length: "Medium", available: false, description: "Registered — premier global payments infrastructure platform.", tags: ["com", "taken", "payments"], monthlyTraffic: 390000, mrr: 24100 },
  { id: "31", name: "vercel",   tld: ".com",    fullDomain: "vercel.com",    price: 0,     category: "Tech",      length: "Medium", available: false, description: "Registered — fast serverless hosting and edge deployment platform.", tags: ["com", "taken", "hosting"], monthlyTraffic: 180000, mrr: 14200 },
  { id: "32", name: "figma",    tld: ".com",    fullDomain: "figma.com",     price: 0,     category: "Creative",  length: "Short",  available: false, description: "Registered — industry-standard collaborative UI design platform.", tags: ["com", "taken", "design"], monthlyTraffic: 250000, mrr: 18400 },
];

// TLD options for filtering
export const ALL_TLDS = [".com", ".io", ".ai", ".net", ".dev", ".tech", ".store", ".design", ".studio", ".finance"];

// Category options
export const ALL_CATEGORIES: DomainListing["category"][] = ["Premium", "Short", "Brandable", "Tech", "Commerce", "Creative"];

// Search and filter function
export function filterDomains(params: {
  query?: string;
  tlds?: string[];
  categories?: DomainListing["category"][];
  lengths?: DomainListing["length"][];
  maxPrice?: number;
  availableOnly?: boolean;
}): DomainListing[] {
  const { query = "", tlds = [], categories = [], lengths = [], maxPrice = Infinity, availableOnly = false } = params;

  return domainCatalog.filter((domain) => {
    // Text search
    if (query) {
      const q = query.toLowerCase().trim();
      const matchesName = domain.name.includes(q) || domain.fullDomain.includes(q);
      const matchesTags = domain.tags.some((t) => t.includes(q));
      const matchesDesc = domain.description.toLowerCase().includes(q);
      if (!matchesName && !matchesTags && !matchesDesc) return false;
    }

    // TLD filter
    if (tlds.length > 0 && !tlds.includes(domain.tld)) return false;

    // Category filter
    if (categories.length > 0 && !categories.includes(domain.category)) return false;

    // Length filter
    if (lengths.length > 0 && !lengths.includes(domain.length)) return false;

    // Price filter (only for available domains)
    if (domain.available && domain.price > maxPrice) return false;

    // Availability filter
    if (availableOnly && !domain.available) return false;

    return true;
  });
}

// Legacy search (keep for backward compat with old search page)
export interface DomainInfo {
  name: string;
  tld: string;
  available: boolean;
  price: number;
  premium: boolean;
  recommendedTemplateId?: string;
}

export const mockDomainsSearch = (query: string): DomainInfo[] => {
  const base = query.split(".")[0].toLowerCase().trim().replace(/[^a-z0-9-]/g, "");
  if (!base) return [];

  const availableTlds = [
    { tld: ".com", price: 14.99, premium: false },
    { tld: ".ai", price: 59.99, premium: true, recommendedTemplateId: "tpl-1" },
    { tld: ".io", price: 39.99, premium: true, recommendedTemplateId: "tpl-1" },
    { tld: ".store", price: 8.99, premium: false, recommendedTemplateId: "tpl-3" },
    { tld: ".design", price: 19.99, premium: false, recommendedTemplateId: "tpl-2" },
    { tld: ".tech", price: 4.99, premium: false },
    { tld: ".xyz", price: 1.99, premium: false },
  ];

  return availableTlds.map((tldInfo) => {
    const isAvailable = tldInfo.tld === ".com" ? base.length % 3 !== 0 : true;
    let finalPrice = tldInfo.price;
    let isPremium = tldInfo.premium;
    if (base.length <= 4 && isAvailable) {
      finalPrice = Math.round(tldInfo.price * 8.5) + 0.99;
      isPremium = true;
    }
    return {
      name: base,
      tld: tldInfo.tld,
      available: isAvailable,
      price: isAvailable ? finalPrice : 0,
      premium: isPremium,
      recommendedTemplateId: tldInfo.recommendedTemplateId,
    };
  });
};
