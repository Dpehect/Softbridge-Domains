export type CustomSectionType = "Hero" | "Features" | "Testimonials" | "Pricing" | "FAQ" | "Contact" | "Gallery" | "Blog";

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
  };
  styles: {
    backgroundColor?: string;
    textColor?: string;
    padding?: string;
    alignment?: "left" | "center" | "right";
  };
}

export interface CustomPage {
  id: string;
  title: string;
  sections: CustomSection[];
}
