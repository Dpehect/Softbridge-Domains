export interface DomainInfo {
  name: string;
  tld: string;
  available: boolean;
  price: number;
  premium: boolean;
  recommendedTemplateId?: string; // Hint which template matches
}

export const mockDomainsSearch = (query: string): DomainInfo[] => {
  const base = query
    .split(".")[0]
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9-]/g, "");

  if (!base) return [];

  // Generate suggested matches based on TLDs
  const availableTlds = [
    { tld: ".com", price: 14.99, premium: false },
    { tld: ".ai", price: 59.99, premium: true, recommendedTemplateId: "tpl-1" }, // SaaS recommendation
    { tld: ".io", price: 39.99, premium: true, recommendedTemplateId: "tpl-1" }, // SaaS
    { tld: ".store", price: 8.99, premium: false, recommendedTemplateId: "tpl-3" }, // E-commerce
    { tld: ".design", price: 19.99, premium: false, recommendedTemplateId: "tpl-2" }, // Portfolio
    { tld: ".tech", price: 4.99, premium: false },
    { tld: ".xyz", price: 1.99, premium: false },
  ];

  return availableTlds.map((tldInfo) => {
    // Make .com unavailable sometimes to simulate real domain check
    const isAvailable = tldInfo.tld === ".com" ? base.length % 3 !== 0 : true;

    // Premium prices adjustment
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
