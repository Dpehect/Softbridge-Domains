import type { ConfiguredPage, PageSection } from "@/store/useConfiguratorStore";

export interface TemplateInfo {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  features: string[];
  description: string;
  theme: {
    primary: string;
    secondary: string;
    bg: string;
  };
  defaultPages: ConfiguredPage[];
}

type TemplateSeed = {
  id?: string;
  name: string;
  price: number;
};

type TemplateGroup = {
  category: string;
  pages: string[];
  image: string;
  description: string;
  features: string[];
  templates: TemplateSeed[];
};

const themes = [
  { primary: "#E85D3B", secondary: "#D94F2E", bg: "#FDF0E6" },
  { primary: "#315C7C", secondary: "#7096A5", bg: "#F3F7F8" },
  { primary: "#0F9F6E", secondary: "#0B6B52", bg: "#F0F8F2" },
  { primary: "#2F3437", secondary: "#8C6A55", bg: "#F7F3EC" },
  { primary: "#B84D57", secondary: "#D28A6D", bg: "#FFF1EC" },
  { primary: "#687A3F", secondary: "#A58A55", bg: "#F7F5EA" },
];

const templateGroups: TemplateGroup[] = [
  {
    category: "SaaS",
    pages: ["Home", "Features", "Pricing", "Contact"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=900",
    description: "Small business software site with clear product value, practical pricing, and a grounded neighborhood tone.",
    features: ["Product Tour", "Plan Cards", "Customer Notes", "Contact Flow"],
    templates: [
      { id: "tpl-1", name: "Cedar Desk", price: 149 },
      { name: "Millhouse Scheduler", price: 179 },
      { name: "Pineview Ledger", price: 199 },
      { name: "Oak County Forms", price: 229 },
      { name: "Riverbend Reports", price: 249 },
      { name: "Barn Door Booking", price: 299 },
    ],
  },
  {
    category: "Portfolio",
    pages: ["Home", "Work", "About", "Contact"],
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=900",
    description: "Personal portfolio template for local makers, independent studios, and quiet creative practices.",
    features: ["Project Grid", "Maker Bio", "Services", "Inquiry Form"],
    templates: [
      { id: "tpl-2", name: "Elm Street Studio", price: 89 },
      { name: "Willow Frame Co.", price: 99 },
      { name: "Red Porch Works", price: 119 },
      { name: "Stone Alley Maker", price: 129 },
      { name: "Creekside Folio", price: 139 },
      { name: "Finch & Field Studio", price: 149 },
    ],
  },
  {
    category: "E-Commerce",
    pages: ["Home", "Shop", "Product", "Reviews", "Contact"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=900",
    description: "Local storefront template for bakeries, markets, bookshops, and small retail teams.",
    features: ["Product Grid", "Pickup CTA", "Review Cards", "Store Contact"],
    templates: [
      { id: "tpl-3", name: "Maple Grove Bakery", price: 249 },
      { name: "Willow Creek Market", price: 279 },
      { name: "Red Barn Collective", price: 299 },
      { name: "Riverbend Supply", price: 329 },
      { name: "Cloverfield Books", price: 349 },
      { name: "Cedar Hollow Pantry", price: 399 },
    ],
  },
  {
    category: "Agency",
    pages: ["Home", "Services", "Work", "Pricing", "Contact"],
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=900",
    description: "Service-led agency site for print shops, sign makers, neighborhood studios, and local media teams.",
    features: ["Service Deck", "Process Timeline", "Proof Cards", "Lead Form"],
    templates: [
      { name: "Stonebridge Print Co.", price: 199 },
      { name: "North Fork Signs", price: 219 },
      { name: "Main Street Media", price: 249 },
      { name: "Cloverfield Creative", price: 279 },
      { name: "Railtown Design", price: 299 },
      { name: "Maple Lane Agency", price: 349 },
    ],
  },
  {
    category: "Blog",
    pages: ["Home", "Articles", "Categories", "About", "Contact"],
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=900",
    description: "Readable publishing template for community notes, local reviews, newsletters, and personal essays.",
    features: ["Featured Article", "Topic Hubs", "Author Page", "Newsletter"],
    templates: [
      { name: "Cloverfield Books", price: 79 },
      { name: "Porchlight Journal", price: 89 },
      { name: "Riverbend Review", price: 99 },
      { name: "Cedar Hollow Notes", price: 119 },
      { name: "Westfield Dispatch", price: 139 },
      { name: "Little Acre Letter", price: 149 },
    ],
  },
  {
    category: "Dashboard",
    pages: ["Home", "Overview", "Reports", "Team", "Contact"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=900",
    description: "Compact operations dashboard for shifts, small teams, sales reports, and local office workflows.",
    features: ["KPI Cards", "Report Tables", "Activity Feed", "Team Access"],
    templates: [
      { name: "Pineview Station", price: 199 },
      { name: "Mill Creek Ledger", price: 229 },
      { name: "Ashford Board", price: 249 },
      { name: "Harbor Shift", price: 279 },
      { name: "Brookside Ops", price: 329 },
      { name: "Timberline Desk", price: 399 },
    ],
  },
  {
    category: "Landing Page",
    pages: ["Home"],
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=900",
    description: "Focused one-page launch template for openings, seasonal campaigns, local events, and small offers.",
    features: ["Offer Hero", "Benefits", "FAQ", "Signup Form"],
    templates: [
      { name: "Oakridge Diner", price: 49 },
      { name: "Cedar Hollow Cafe", price: 59 },
      { name: "Maple Grove Cakes", price: 69 },
      { name: "Pineview Station", price: 79 },
      { name: "Willow Creek Opening", price: 89 },
      { name: "Red Barn Weekend", price: 99 },
    ],
  },
  {
    category: "Startup",
    pages: ["Home", "Product", "Pricing", "About", "Contact"],
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=900",
    description: "Underdog startup template for small teams building practical tools, local products, and quiet software.",
    features: ["Product Story", "Roadmap", "Traction Notes", "Founder CTA"],
    templates: [
      { name: "Barnlight Labs", price: 199 },
      { name: "Ridgepost Tools", price: 229 },
      { name: "Hollow Creek Works", price: 249 },
      { name: "Maple Yard Supply", price: 279 },
      { name: "Lantern Lane Apps", price: 329 },
      { name: "Stone Mill Systems", price: 349 },
    ],
  },
  {
    category: "Corporate",
    pages: ["Home", "Company", "Solutions", "Resources", "Contact"],
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=900",
    description: "Regional business website for established local services, modest groups, and community-facing companies.",
    features: ["Company Story", "Solutions", "Resource Grid", "Contact Routing"],
    templates: [
      { name: "Brookstone Works", price: 199 },
      { name: "Cedar & Main Co.", price: 249 },
      { name: "Harbor Plain Group", price: 299 },
      { name: "Oak County Services", price: 349 },
      { name: "Redfield Office", price: 399 },
      { name: "Willow Ridge Partners", price: 449 },
    ],
  },
  {
    category: "Personal Brand",
    pages: ["Home", "About", "Speaking", "Writing", "Contact"],
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=900",
    description: "Personal brand template for local consultants, speakers, writers, and independent operators.",
    features: ["Personal Hero", "Writing Grid", "Offer Cards", "Booking CTA"],
    templates: [
      { name: "Ella Reed Studio", price: 149 },
      { name: "Mason Hale Works", price: 179 },
      { name: "Clara Finch Notes", price: 199 },
      { name: "Jonah Brooks Co.", price: 229 },
      { name: "Nora Lane Studio", price: 249 },
      { name: "Wren Parker Pages", price: 299 },
    ],
  },
  {
    category: "Education",
    pages: ["Home", "Courses", "About", "Pricing", "Contact"],
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=900",
    description: "Education website for tutors, workshops, small academies, learning centers, and community classes.",
    features: ["Course Cards", "Instructor Bio", "Curriculum Blocks", "Enroll CTA"],
    templates: [
      { name: "Pine Hill School", price: 149 },
      { name: "Maple Grove Tutors", price: 179 },
      { name: "Cedar Creek Academy", price: 199 },
      { name: "Little Lantern Learning", price: 229 },
      { name: "Oakridge Workshops", price: 249 },
      { name: "Brookside Lessons", price: 299 },
    ],
  },
  {
    category: "Healthcare",
    pages: ["Home", "Services", "Team", "Resources", "Contact"],
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=900",
    description: "Calm healthcare template for neighborhood clinics, therapy practices, wellness rooms, and local providers.",
    features: ["Service Cards", "Provider Profiles", "Patient FAQ", "Request Form"],
    templates: [
      { name: "Willow Creek Clinic", price: 199 },
      { name: "Cedar Hollow Care", price: 229 },
      { name: "Maple Street Wellness", price: 249 },
      { name: "Oakridge Family Health", price: 279 },
      { name: "Riverbend Therapy", price: 329 },
      { name: "Pineview Dental", price: 349 },
    ],
  },
];

const slugify = (value: string) =>
  value.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

function createSection(pageTitle: string, templateName: string, category: string): PageSection[] {
  const lowerPage = pageTitle.toLowerCase();

  if (lowerPage === "home") {
    return [
      {
        id: "hero",
        type: "hero",
        title: "Hero Banner",
        content: {
          heading: templateName,
          subheading: `A polished ${category.toLowerCase()} website for a real local business with practical sections and clear calls to action.`,
          buttonText: "Start Building",
        },
      },
      {
        id: "features",
        type: "features",
        title: "Core Sections",
        content: {
          heading: "Built for the neighborhood",
          subheading: "Every block is structured to help visitors understand, trust, and act faster.",
          items: ["Clear navigation", "Responsive sections", "Local business CTA"],
        },
      },
      {
        id: "cta",
        type: "cta",
        title: "Call to Action",
        content: {
          heading: "Ready to open the doors?",
          subheading: "Customize the structure in Softbridge Studio and ship a refined site faster.",
          buttonText: "Configure Site",
        },
      },
    ];
  }

  if (["work", "shop", "articles", "resources", "writing", "courses", "product"].includes(lowerPage)) {
    return [
      {
        id: `${slugify(pageTitle)}-gallery`,
        type: "gallery",
        title: pageTitle,
        content: {
          heading: pageTitle,
          items: [`Featured ${pageTitle}`, "Customer proof", "Local offer"],
        },
      },
    ];
  }

  if (["pricing", "plans"].includes(lowerPage)) {
    return [
      {
        id: "pricing",
        type: "features",
        title: "Pricing",
        content: {
          heading: "Simple pricing",
          subheading: "Plan cards and comparison sections are ready to adapt.",
          items: ["Starter", "Local", "Full Site"],
        },
      },
    ];
  }

  if (lowerPage === "contact") {
    return [
      {
        id: "contact-form",
        type: "contact",
        title: "Contact Form",
        content: {
          heading: "Start the conversation",
          description: "Collect qualified requests with a compact, polished contact form.",
          buttonText: "Send Request",
        },
      },
    ];
  }

  return [
    {
      id: slugify(pageTitle),
      type: "details",
      title: pageTitle,
      content: {
        heading: pageTitle,
        description: `${pageTitle} page content for ${templateName}, tailored to the ${category.toLowerCase()} category.`,
      },
    },
  ];
}

function createDefaultPages(category: string, templateName: string, pages: string[]): ConfiguredPage[] {
  return pages.map((pageTitle, index) => {
    const id = slugify(pageTitle);

    return {
      id,
      title: pageTitle,
      path: index === 0 ? "/" : `/${id}`,
      sections: createSection(pageTitle, templateName, category),
    };
  });
}

export const templateCategories = templateGroups.map((group) => group.category);

export const templatesData: TemplateInfo[] = templateGroups.flatMap((group) =>
  group.templates.map((template, index) => ({
    id: template.id || `tpl-${slugify(group.category)}-${index + 1}`,
    name: template.name,
    category: group.category,
    price: template.price,
    image: group.image,
    features: group.features,
    description: group.description,
    theme: themes[index % themes.length],
    defaultPages: createDefaultPages(group.category, template.name, group.pages),
  }))
);
