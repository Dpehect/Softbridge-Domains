import { create } from "zustand";
import { WebTemplateConfig } from "./useConfiguratorStore";

export interface CartItem {
  id: string; // Unique timestamp or ID
  domainName: string;
  domainTld: string;
  domainPrice: number;
  websitePackage?: {
    templateId: string;
    templateName: string;
    setupPrice: number;
    config: WebTemplateConfig;
  };
}

interface CartState {
  items: CartItem[];
  hostingSelected: boolean;
  maintenanceSelected: boolean;
  seoSelected: boolean;
  addItem: (item: Omit<CartItem, "id">) => void;
  removeItem: (id: string) => void;
  toggleHosting: () => void;
  toggleMaintenance: () => void;
  toggleSeo: () => void;
  clearCart: () => void;
  getCartTotal: () => {
    oneTimeTotal: number;
    monthlyTotal: number;
  };
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  hostingSelected: false,
  maintenanceSelected: false,
  seoSelected: false,
  addItem: (item) => {
    const id = Date.now().toString();
    set((state) => ({
      items: [...state.items, { ...item, id }],
    }));
  },
  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),
  toggleHosting: () =>
    set((state) => ({ hostingSelected: !state.hostingSelected })),
  toggleMaintenance: () =>
    set((state) => ({ maintenanceSelected: !state.maintenanceSelected })),
  toggleSeo: () =>
    set((state) => ({ seoSelected: !state.seoSelected })),
  clearCart: () =>
    set({ items: [], hostingSelected: false, maintenanceSelected: false, seoSelected: false }),
  getCartTotal: () => {
    const { items, hostingSelected, maintenanceSelected, seoSelected } = get();
    
    let oneTimeTotal = 0;
    let monthlyTotal = 0;

    items.forEach((item) => {
      // Add domain cost
      oneTimeTotal += item.domainPrice;
      // Add template setup cost if bundle is selected
      if (item.websitePackage) {
        oneTimeTotal += item.websitePackage.setupPrice;
      }
    });

    if (seoSelected) {
      oneTimeTotal += 99; // One-time SEO charge
    }

    if (hostingSelected) {
      monthlyTotal += 19; // Monthly hosting
    }

    if (maintenanceSelected) {
      monthlyTotal += 29; // Monthly maintenance
    }

    return { oneTimeTotal, monthlyTotal };
  },
}));
