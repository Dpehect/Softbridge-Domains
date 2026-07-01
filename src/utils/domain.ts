import siteData from "@/data/siteData.json";

export const ALL_TLDS = [".com", ".ai", ".io", ".tech", ".co", ".app", ".dev", ".studio", ".design", ".store", ".xyz"];
export const ALL_CATEGORIES = ["All", "Premium", "Short", "Brandable", "Tech", "Commerce", "Creative"];

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

export const domainCatalog = siteData.domains as DomainListing[];

export function filterDomains(params: {
  query: string;
  tlds: string[];
  categories: string[];
  lengths: string[];
  maxPrice: number;
  availableOnly: boolean;
}): DomainListing[] {
  const { query, tlds, categories, lengths, maxPrice, availableOnly } = params;
  return (siteData.domains as DomainListing[]).filter((domain) => {
    // Query filter
    if (query && !domain.fullDomain.toLowerCase().includes(query.toLowerCase())) return false;
    
    // TLDs filter
    if (tlds.length > 0 && !tlds.includes(domain.tld)) return false;

    // Categories filter
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
