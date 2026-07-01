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
  // --- Local premium names ---
  { id: "1",  name: "oakridge-diner",       tld: ".com",    fullDomain: "oakridgediner.com",       price: 2250, category: "Premium",   length: "Medium", available: true,  description: "Classic diner domain with immediate local business fit.", tags: ["restaurant", "local", "diner"], monthlyTraffic: 2600, mrr: 95 },
  { id: "2",  name: "cedar-hollow-cafe",    tld: ".com",    fullDomain: "cedarhollowcafe.com",     price: 2100, category: "Premium",   length: "Long",   available: true,  description: "Cafe and bakery name that feels established but approachable.", tags: ["cafe", "bakery", "local"], monthlyTraffic: 2200, mrr: 80 },
  { id: "3",  name: "maple-grove-bakery",   tld: ".com",    fullDomain: "maplegrovebakery.com",    price: 2800, category: "Premium",   length: "Long",   available: true,  description: "Bakery storefront domain with a friendly small-town sound.", tags: ["bakery", "storefront", "commerce"], monthlyTraffic: 4200, mrr: 145 },
  { id: "4",  name: "willow-creek-market",  tld: ".com",    fullDomain: "willowcreekmarket.com",   price: 3200, category: "Premium",   length: "Long",   available: true,  description: "General store domain for groceries, gifts, and local goods.", tags: ["market", "commerce", "local"], monthlyTraffic: 5100, mrr: 160 },
  { id: "5",  name: "riverbend-supply",     tld: ".com",    fullDomain: "riverbendsupply.com",     price: 2400, category: "Premium",   length: "Medium", available: true,  description: "Hardware, outdoor, or farm supply name with practical appeal.", tags: ["supply", "hardware", "commerce"], monthlyTraffic: 3400, mrr: 115 },
  { id: "6",  name: "cedar-and-main",       tld: ".com",    fullDomain: "cedarandmain.com",        price: 3400, category: "Premium",   length: "Medium", available: true,  description: "Professional but approachable regional company identity.", tags: ["business", "services", "premium"], monthlyTraffic: 4200, mrr: 150 },

  // --- Shorter local brands ---
  { id: "7",  name: "redbarn",              tld: ".store",  fullDomain: "redbarn.store",           price: 980,  category: "Short",     length: "Short",  available: true,  description: "Short storefront name for a craft market or seasonal shop.", tags: ["store", "market", "short"], monthlyTraffic: 780 },
  { id: "8",  name: "porchlight",           tld: ".co",     fullDomain: "porchlight.co",           price: 1250, category: "Short",     length: "Medium", available: true,  description: "Warm name for a newsletter, cafe, or small studio.", tags: ["brand", "local", "newsletter"], monthlyTraffic: 980, mrr: 35 },
  { id: "9",  name: "pineview",             tld: ".app",    fullDomain: "pineview.app",            price: 1450, category: "Short",     length: "Medium", available: true,  description: "Simple app name for schedules, dashboards, or local operations.", tags: ["app", "dashboard", "local"], monthlyTraffic: 1300, mrr: 55 },
  { id: "10", name: "brookside",            tld: ".co",     fullDomain: "brookside.co",            price: 1550, category: "Short",     length: "Medium", available: true,  description: "Small company name with broad neighborhood appeal.", tags: ["brand", "services", "local"], monthlyTraffic: 1400, mrr: 50 },
  { id: "11", name: "cloverfield",          tld: ".books",  fullDomain: "cloverfield.books",       price: 1150, category: "Short",     length: "Medium", available: true,  description: "Bookshop or publishing name with immediate category fit.", tags: ["books", "blog", "shop"], monthlyTraffic: 1200, mrr: 40 },
  { id: "12", name: "barnlight",            tld: ".dev",    fullDomain: "barnlight.dev",           price: 1350, category: "Short",     length: "Medium", available: true,  description: "Quiet workshop-style name for a small software team.", tags: ["dev", "startup", "tools"], monthlyTraffic: 1050, mrr: 45 },

  // --- Tech and tools with small-team character ---
  { id: "13", name: "cedar-desk",           tld: ".app",    fullDomain: "cedardesk.app",           price: 2400, category: "Tech",      length: "Medium", available: true,  description: "Scheduling and job tracking name for small service shops.", tags: ["saas", "scheduler", "tools"], monthlyTraffic: 2400, mrr: 120 },
  { id: "14", name: "millhouse-scheduler",  tld: ".com",    fullDomain: "millhousescheduler.com",  price: 1800, category: "Tech",      length: "Long",   available: true,  description: "Appointment software brand with a practical neighborhood feel.", tags: ["saas", "appointments", "local"], monthlyTraffic: 1600, mrr: 90 },
  { id: "15", name: "pineview-ledger",      tld: ".com",    fullDomain: "pineviewledger.com",      price: 2100, category: "Tech",      length: "Medium", available: true,  description: "Simple finance and invoice platform name for local teams.", tags: ["ledger", "finance", "saas"], monthlyTraffic: 1900, mrr: 105 },
  { id: "16", name: "riverbend-reports",    tld: ".com",    fullDomain: "riverbendreports.com",    price: 2600, category: "Tech",      length: "Medium", available: true,  description: "Reporting dashboard brand for regional operations.", tags: ["reports", "dashboard", "analytics"], monthlyTraffic: 3100, mrr: 135 },
  { id: "17", name: "harbor-shift",         tld: ".app",    fullDomain: "harborshift.app",         price: 1750, category: "Tech",      length: "Medium", available: true,  description: "Shift planning identity for cafes, shops, and crews.", tags: ["staffing", "schedule", "app"], monthlyTraffic: 1650, mrr: 80 },
  { id: "18", name: "brookside-ops",        tld: ".com",    fullDomain: "brooksideops.com",        price: 1950, category: "Tech",      length: "Medium", available: true,  description: "Operations dashboard brand with a grounded local tone.", tags: ["ops", "dashboard", "team"], monthlyTraffic: 2050, mrr: 95 },

  // --- Commerce and service names ---
  { id: "19", name: "red-barn-collective",  tld: ".store",  fullDomain: "redbarncollective.store", price: 1900, category: "Commerce",  length: "Long",   available: true,  description: "Handmade market identity with a regional craft feel.", tags: ["store", "handmade", "market"], monthlyTraffic: 2100, mrr: 85 },
  { id: "20", name: "cedar-hollow-pantry",  tld: ".store",  fullDomain: "cedarhollowpantry.store", price: 1600, category: "Commerce",  length: "Long",   available: true,  description: "Pantry and specialty food domain for a small local shop.", tags: ["food", "pantry", "store"], monthlyTraffic: 1700, mrr: 70 },
  { id: "21", name: "maple-lane-repair",    tld: ".com",    fullDomain: "maplelanerepair.com",     price: 950,  category: "Commerce",  length: "Medium", available: true,  description: "Small repair business name ready for a practical website.", tags: ["repair", "service", "local"], monthlyTraffic: 620, mrr: 35 },
  { id: "22", name: "stonebridge-print-co", tld: ".com",    fullDomain: "stonebridgeprintco.com",  price: 1850, category: "Commerce",  length: "Long",   available: true,  description: "Print shop and local studio domain with clear service intent.", tags: ["print", "studio", "services"], monthlyTraffic: 1400, mrr: 65 },
  { id: "23", name: "north-fork-signs",     tld: ".com",    fullDomain: "northforksigns.com",      price: 1600, category: "Commerce",  length: "Medium", available: true,  description: "Signage and local marketing name with service clarity.", tags: ["signs", "agency", "local"], monthlyTraffic: 1250, mrr: 70 },
  { id: "24", name: "maple-grove-tutors",   tld: ".com",    fullDomain: "maplegrovetutors.com",    price: 1650, category: "Commerce",  length: "Long",   available: true,  description: "Tutoring center domain with direct community appeal.", tags: ["education", "tutors", "local"], monthlyTraffic: 1350, mrr: 65 },

  // --- Brandable and creative local names ---
  { id: "25", name: "elm-street-studio",    tld: ".com",    fullDomain: "elmstreetstudio.com",     price: 1700, category: "Creative",  length: "Long",   available: true,  description: "Warm portfolio identity for a local designer or craft studio.", tags: ["studio", "portfolio", "creative"], monthlyTraffic: 1500, mrr: 60 },
  { id: "26", name: "willow-frame",         tld: ".co",     fullDomain: "willowframe.co",          price: 1350, category: "Creative",  length: "Medium", available: true,  description: "Photography and visual work name with a small-town tone.", tags: ["photo", "portfolio", "creative"], monthlyTraffic: 980, mrr: 45 },
  { id: "27", name: "red-porch-works",      tld: ".com",    fullDomain: "redporchworks.com",       price: 1200, category: "Creative",  length: "Medium", available: true,  description: "Personal work showcase for makers, writers, or builders.", tags: ["maker", "portfolio", "brand"], monthlyTraffic: 860, mrr: 40 },
  { id: "28", name: "railtown-design",      tld: ".design", fullDomain: "railtown.design",         price: 1750, category: "Creative",  length: "Medium", available: true,  description: "Design agency name with a modest regional voice.", tags: ["design", "agency", "studio"], monthlyTraffic: 1500, mrr: 80 },
  { id: "29", name: "nora-lane-studio",     tld: ".studio", fullDomain: "noralane.studio",         price: 1450, category: "Brandable", length: "Medium", available: true,  description: "Premium but small-scale personal brand domain.", tags: ["personal", "studio", "brand"], monthlyTraffic: 980, mrr: 50 },
  { id: "30", name: "little-lantern",       tld: ".learning", fullDomain: "littlelantern.learning", price: 1400, category: "Brandable", length: "Medium", available: true, description: "Friendly name for children, workshops, or tutoring.", tags: ["learning", "education", "local"], monthlyTraffic: 980, mrr: 55 },

  // --- Taken local examples for realism ---
  { id: "31", name: "main-street-pizza",    tld: ".com",    fullDomain: "mainstreetpizza.com",     price: 0,    category: "Commerce",  length: "Long",   available: false, description: "Registered by an existing neighborhood restaurant.", tags: ["pizza", "taken", "local"], monthlyTraffic: 3200 },
  { id: "32", name: "cedar-creek-clinic",   tld: ".com",    fullDomain: "cedarcreekclinic.com",    price: 0,    category: "Premium",   length: "Long",   available: false, description: "Registered by a local healthcare practice.", tags: ["clinic", "taken", "health"], monthlyTraffic: 2800 },
  { id: "33", name: "oak-county-services",  tld: ".com",    fullDomain: "oakcountyservices.com",   price: 0,    category: "Brandable", length: "Long",   available: false, description: "Registered by a small regional services company.", tags: ["services", "taken", "business"], monthlyTraffic: 1900 },
  { id: "34", name: "pine-hill-school",     tld: ".com",    fullDomain: "pinehillschool.com",      price: 0,    category: "Creative",  length: "Long",   available: false, description: "Registered by a community education program.", tags: ["school", "taken", "education"], monthlyTraffic: 2100 },
];

// TLD options for filtering
export const ALL_TLDS = [".com", ".co", ".app", ".dev", ".store", ".design", ".studio", ".books", ".learning"];

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
