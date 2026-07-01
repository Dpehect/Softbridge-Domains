import { create } from "zustand";

export interface PageSection {
  id: string;
  type: string; // 'hero' | 'features' | 'gallery' | 'contact' | 'about' etc.
  title: string;
  content: {
    heading?: string;
    subheading?: string;
    description?: string;
    buttonText?: string;
    items?: string[];
  };
}

export interface ConfiguredPage {
  id: string;
  title: string;
  path: string;
  sections: PageSection[];
}

export interface WebTemplateConfig {
  templateId: string;
  templateName: string;
  brandName: string;
  slogan: string;
  logo: string; // Base64 or URL
  theme: {
    primary: string;
    secondary: string;
    bg: string;
  };
  typography: {
    headings: string;
    body: string;
  };
  pages: ConfiguredPage[];
  animationProfile: "smooth" | "cyber" | "fluid";
}

interface ConfiguratorState {
  config: WebTemplateConfig;
  previewDevice: "desktop" | "tablet" | "mobile";
  setPreviewDevice: (device: "desktop" | "tablet" | "mobile") => void;
  loadTemplate: (templateId: string, templateName: string, defaultPages: ConfiguredPage[]) => void;
  updateBrandInfo: (brandName: string, slogan: string, logo: string) => void;
  updateThemeColors: (colors: { primary: string; secondary: string; bg: string }) => void;
  updateTypography: (typography: { headings: string; body: string }) => void;
  setPages: (pages: ConfiguredPage[]) => void;
  updateSectionContent: (pageId: string, sectionId: string, content: Partial<PageSection["content"]>) => void;
  setAnimationProfile: (profile: "smooth" | "cyber" | "fluid") => void;
}

const DEFAULT_CONFIG: WebTemplateConfig = {
  templateId: "",
  templateName: "",
  brandName: "Nexus Brand",
  slogan: "The Next Generation Virtual Interface",
  logo: "",
  theme: {
    primary: "#00F2FE",
    secondary: "#7F00FF",
    bg: "#090912",
  },
  typography: {
    headings: "Geist",
    body: "Geist",
  },
  pages: [],
  animationProfile: "smooth",
};

export const useConfiguratorStore = create<ConfiguratorState>((set) => ({
  config: DEFAULT_CONFIG,
  previewDevice: "desktop",
  setPreviewDevice: (device) => set({ previewDevice: device }),
  loadTemplate: (templateId, templateName, defaultPages) =>
    set((state) => ({
      config: {
        ...state.config,
        templateId,
        templateName,
        pages: defaultPages,
      },
    })),
  updateBrandInfo: (brandName, slogan, logo) =>
    set((state) => ({
      config: {
        ...state.config,
        brandName,
        slogan,
        logo,
      },
    })),
  updateThemeColors: (colors) =>
    set((state) => ({
      config: {
        ...state.config,
        theme: colors,
      },
    })),
  updateTypography: (typography) =>
    set((state) => ({
      config: {
        ...state.config,
        typography,
      },
    })),
  setPages: (pages) =>
    set((state) => ({
      config: {
        ...state.config,
        pages,
      },
    })),
  updateSectionContent: (pageId, sectionId, content) =>
    set((state) => {
      const updatedPages = state.config.pages.map((page) => {
        if (page.id !== pageId) return page;
        return {
          ...page,
          sections: page.sections.map((sec) => {
            if (sec.id !== sectionId) return sec;
            return {
              ...sec,
              content: {
                ...sec.content,
                ...content,
              },
            };
          }),
        };
      });
      return {
        config: {
          ...state.config,
          pages: updatedPages,
        },
      };
    }),
  setAnimationProfile: (profile) =>
    set((state) => ({
      config: {
        ...state.config,
        animationProfile: profile,
      },
    })),
}));
