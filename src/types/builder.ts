export type CustomSectionType = "Hero" | "Features" | "Testimonials" | "Pricing" | "FAQ" | "Contact" | "Gallery" | "Blog" | "Slider" | "Custom";

export interface CustomSection {
  id: string;
  type: CustomSectionType;
  content: {
    heading?: string;
    subheading?: string;
    description?: string;
    buttonText?: string;
    buttonLink?: string;
    image?: string;
    items?: string[];
    sliderItems?: { image: string; title: string; subtitle?: string }[];
  };
  styles: {
    backgroundColor?: string;
    textColor?: string;
    padding?: string;
    alignment?: "left" | "center" | "right";
    layout?: "1-col" | "2-col" | "3-col" | "4-col";
  };
}

export interface Template {
  id: string;
  name: string;
  category: "SaaS" | "E-Commerce" | "Portfolio" | "Agency" | "Landing Page" | "Blog" | "Dashboard" | "Corporate";
  type: "Template" | "Custom";
  description: string;
  price: number;
  features: string[];
  pages: number;
  previewImage: string;
  isPopular: boolean;
  difficultyLevel: "Beginner" | "Intermediate" | "Advanced";
  defaultPages?: CustomPage[];
}

export interface CustomPage {
  id: string;
  title: string;
  sections: CustomSection[];
}
