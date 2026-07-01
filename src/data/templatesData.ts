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

type TemplateSeed = Omit<TemplateInfo, "id" | "category" | "defaultPages"> & {
  id?: string;
};

type TemplateGroup = {
  category: string;
  pages: string[];
  templates: TemplateSeed[];
};

const sharedImages = {
  saas: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=900",
  portfolio: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=900",
  ecommerce: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=900",
  agency: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=900",
  blog: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=900",
  dashboard: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=900",
  landing: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=900",
  startup: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=900",
  corporate: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=900",
  personal: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=900",
  education: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=900",
  healthcare: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=900",
};

const templateGroups: TemplateGroup[] = [
  {
    category: "SaaS",
    pages: ["Home", "Features", "Pricing", "Contact"],
    templates: [
      {
        id: "tpl-1",
        name: "Aether SaaS",
        price: 199,
        image: sharedImages.saas,
        features: ["Analytics Hero", "Feature Comparison", "Pricing Cards", "Contact Hub"],
        description: "Premium product site for developer tools, AI products, and B2B SaaS launches.",
        theme: { primary: "#E85D3B", secondary: "#D94F2E", bg: "#FDF0E6" },
      },
      {
        name: "Signal Stack",
        price: 149,
        image: sharedImages.saas,
        features: ["Product Bento", "Integration Grid", "Trust Strip", "Demo CTA"],
        description: "Compact SaaS layout for early-stage tools that need a crisp conversion path.",
        theme: { primary: "#315C7C", secondary: "#7096A5", bg: "#F3F7F8" },
      },
      {
        name: "Orbit Suite",
        price: 249,
        image: sharedImages.saas,
        features: ["Use Case Pages", "Customer Stories", "Plan Matrix", "FAQ System"],
        description: "Multi-page SaaS build with detailed product education and commercial proof.",
        theme: { primary: "#0F9F6E", secondary: "#0B6B52", bg: "#F0F8F2" },
      },
      {
        name: "Atlas Cloud",
        price: 299,
        image: sharedImages.saas,
        features: ["Enterprise Hero", "Security Section", "Case Study Cards", "Sales CTA"],
        description: "Enterprise-ready SaaS template with stronger trust, security, and sales surfaces.",
        theme: { primary: "#2F3437", secondary: "#8C6A55", bg: "#F7F3EC" },
      },
    ],
  },
  {
    category: "Portfolio",
    pages: ["Home", "Work", "About", "Contact"],
    templates: [
      {
        id: "tpl-2",
        name: "Nova Portfolio",
        price: 99,
        image: sharedImages.portfolio,
        features: ["Case Study Grid", "Service List", "Bio Page", "Contact Form"],
        description: "Ultra-clean visual interface tailored for designers, builders, and creative leads.",
        theme: { primary: "#B84D57", secondary: "#D28A6D", bg: "#FFF1EC" },
      },
      {
        name: "Quiet Craft",
        price: 79,
        image: sharedImages.portfolio,
        features: ["Minimal Hero", "Project Index", "About Story", "Inquiry CTA"],
        description: "Calm portfolio system with refined typography and focused project presentation.",
        theme: { primary: "#2F3437", secondary: "#8C6A55", bg: "#F7F3EC" },
      },
      {
        name: "Studio Folio",
        price: 129,
        image: sharedImages.portfolio,
        features: ["Editorial Work Page", "Process Blocks", "Client Logos", "Newsletter"],
        description: "Portfolio for independent studios that need storytelling and client confidence.",
        theme: { primary: "#687A3F", secondary: "#A58A55", bg: "#F7F5EA" },
      },
      {
        name: "Creator Pro",
        price: 149,
        image: sharedImages.portfolio,
        features: ["Media Gallery", "Offer Cards", "Testimonials", "Booking CTA"],
        description: "Personal showcase with service packaging and conversion-focused contact areas.",
        theme: { primary: "#315C7C", secondary: "#7096A5", bg: "#F3F7F8" },
      },
    ],
  },
  {
    category: "E-Commerce",
    pages: ["Home", "Shop", "Product", "Reviews", "Contact"],
    templates: [
      {
        id: "tpl-3",
        name: "Quantum Commerce",
        price: 249,
        image: sharedImages.ecommerce,
        features: ["Product Grid", "Cart Summary", "Review Cards", "Checkout CTA"],
        description: "Storefront for lean commerce brands that need premium product discovery.",
        theme: { primary: "#E85D3B", secondary: "#D94F2E", bg: "#FDF0E6" },
      },
      {
        name: "Market Bloom",
        price: 299,
        image: sharedImages.ecommerce,
        features: ["Collection Pages", "Best Sellers", "Promo Banner", "Newsletter Offer"],
        description: "Warm, polished commerce layout for boutiques and curated marketplaces.",
        theme: { primary: "#0F9F6E", secondary: "#0B6B52", bg: "#F0F8F2" },
      },
      {
        name: "Cartline Pro",
        price: 349,
        image: sharedImages.ecommerce,
        features: ["Product Filters", "Variant Cards", "Shipping Details", "Upsell Blocks"],
        description: "Full e-commerce build for growing brands with larger catalogs and filter needs.",
        theme: { primary: "#315C7C", secondary: "#7096A5", bg: "#F3F7F8" },
      },
      {
        name: "Maison Store",
        price: 399,
        image: sharedImages.ecommerce,
        features: ["Luxury Catalog", "Lookbook Page", "Gift Cards", "Support Flow"],
        description: "High-end storefront with product storytelling and polished purchase confidence.",
        theme: { primary: "#2F3437", secondary: "#8C6A55", bg: "#F7F3EC" },
      },
    ],
  },
  {
    category: "Agency",
    pages: ["Home", "Services", "Work", "Pricing", "Contact"],
    templates: [
      {
        name: "Northstar Agency",
        price: 199,
        image: sharedImages.agency,
        features: ["Service Deck", "Process Timeline", "Results Cards", "Lead Form"],
        description: "Modern agency site for strategy, design, and development teams.",
        theme: { primary: "#315C7C", secondary: "#7096A5", bg: "#F3F7F8" },
      },
      {
        name: "Studio Relay",
        price: 249,
        image: sharedImages.agency,
        features: ["Case Study Pages", "Team Profiles", "Package Cards", "Booking CTA"],
        description: "Multi-page agency template built around proof, offers, and fast inquiry.",
        theme: { primary: "#E85D3B", secondary: "#D94F2E", bg: "#FDF0E6" },
      },
      {
        name: "Bold Bureau",
        price: 299,
        image: sharedImages.agency,
        features: ["Editorial Hero", "Client Logos", "Capabilities Grid", "Proposal CTA"],
        description: "Confident agency presentation for brand, content, and campaign teams.",
        theme: { primary: "#B84D57", secondary: "#D28A6D", bg: "#FFF1EC" },
      },
      {
        name: "Operator Studio",
        price: 349,
        image: sharedImages.agency,
        features: ["Retainer Pricing", "Workflow Modules", "Metrics Proof", "Contact Routing"],
        description: "Operational agency system for productized services and recurring retainers.",
        theme: { primary: "#2F3437", secondary: "#8C6A55", bg: "#F7F3EC" },
      },
    ],
  },
  {
    category: "Blog",
    pages: ["Home", "Articles", "Categories", "About", "Contact"],
    templates: [
      {
        name: "Editorial Desk",
        price: 89,
        image: sharedImages.blog,
        features: ["Featured Story", "Article Cards", "Category Index", "Newsletter"],
        description: "Readable blog system with strong typography and compact content rhythm.",
        theme: { primary: "#2F3437", secondary: "#8C6A55", bg: "#F7F3EC" },
      },
      {
        name: "Insight Journal",
        price: 119,
        image: sharedImages.blog,
        features: ["Author Page", "Topic Hubs", "Related Posts", "Subscribe CTA"],
        description: "Professional editorial template for founders, researchers, and analysts.",
        theme: { primary: "#687A3F", secondary: "#A58A55", bg: "#F7F5EA" },
      },
      {
        name: "Signal Notes",
        price: 149,
        image: sharedImages.blog,
        features: ["Longform Layout", "Reading Progress", "Series Pages", "Email Capture"],
        description: "Premium writing system for thought leadership and serialized publishing.",
        theme: { primary: "#315C7C", secondary: "#7096A5", bg: "#F3F7F8" },
      },
      {
        name: "Creator Letter",
        price: 99,
        image: sharedImages.blog,
        features: ["Newsletter Hero", "Archive Grid", "Sponsor Slot", "Bio Strip"],
        description: "Newsletter-first blog for creators and personal media brands.",
        theme: { primary: "#B84D57", secondary: "#D28A6D", bg: "#FFF1EC" },
      },
    ],
  },
  {
    category: "Dashboard",
    pages: ["Home", "Overview", "Reports", "Team", "Contact"],
    templates: [
      {
        name: "Metric OS",
        price: 199,
        image: sharedImages.dashboard,
        features: ["KPI Cards", "Report Tables", "Activity Feed", "Team Access"],
        description: "Admin-style dashboard interface for products, services, and internal tools.",
        theme: { primary: "#315C7C", secondary: "#7096A5", bg: "#F3F7F8" },
      },
      {
        name: "Ops Console",
        price: 249,
        image: sharedImages.dashboard,
        features: ["Dense Panels", "Status Lists", "Chart Grid", "User Roles"],
        description: "Operational dashboard with compact data density and clear navigation.",
        theme: { primary: "#2F3437", secondary: "#8C6A55", bg: "#F7F3EC" },
      },
      {
        name: "Finance Board",
        price: 299,
        image: sharedImages.dashboard,
        features: ["Revenue Widgets", "Forecast Table", "Invoice Cards", "Audit Trail"],
        description: "Dashboard shell for finance, reporting, and executive visibility.",
        theme: { primary: "#0F9F6E", secondary: "#0B6B52", bg: "#F0F8F2" },
      },
      {
        name: "Growth Command",
        price: 399,
        image: sharedImages.dashboard,
        features: ["Funnel Metrics", "Campaign Rows", "Experiment Cards", "Alert Center"],
        description: "Growth analytics dashboard with multi-page views and team workflows.",
        theme: { primary: "#E85D3B", secondary: "#D94F2E", bg: "#FDF0E6" },
      },
    ],
  },
  {
    category: "Landing Page",
    pages: ["Home"],
    templates: [
      {
        name: "Launch Lite",
        price: 49,
        image: sharedImages.landing,
        features: ["Hero Offer", "Benefit Grid", "FAQ", "Signup Form"],
        description: "Simple landing page for early validation, lead capture, and waitlists.",
        theme: { primary: "#E85D3B", secondary: "#D94F2E", bg: "#FDF0E6" },
      },
      {
        name: "Offer Page",
        price: 69,
        image: sharedImages.landing,
        features: ["Proof Strip", "Feature Stack", "Guarantee Block", "CTA Footer"],
        description: "Conversion-focused landing page for a single product, offer, or service.",
        theme: { primary: "#315C7C", secondary: "#7096A5", bg: "#F3F7F8" },
      },
      {
        name: "Waitlist Pro",
        price: 79,
        image: sharedImages.landing,
        features: ["Email Capture", "Social Proof", "Roadmap", "Referral CTA"],
        description: "Tight pre-launch page with product positioning and audience capture.",
        theme: { primary: "#0F9F6E", secondary: "#0B6B52", bg: "#F0F8F2" },
      },
      {
        name: "Campaign Focus",
        price: 99,
        image: sharedImages.landing,
        features: ["Campaign Hero", "Comparison Block", "Testimonials", "Purchase CTA"],
        description: "Premium single-page campaign layout for paid traffic and launches.",
        theme: { primary: "#B84D57", secondary: "#D28A6D", bg: "#FFF1EC" },
      },
    ],
  },
  {
    category: "Startup",
    pages: ["Home", "Product", "Pricing", "About", "Contact"],
    templates: [
      {
        name: "Seed Stage",
        price: 199,
        image: sharedImages.startup,
        features: ["Vision Hero", "Product Blocks", "Investor CTA", "Team Page"],
        description: "Startup site for early teams that need clarity, traction, and credibility.",
        theme: { primary: "#E85D3B", secondary: "#D94F2E", bg: "#FDF0E6" },
      },
      {
        name: "Venture Kit",
        price: 249,
        image: sharedImages.startup,
        features: ["Market Story", "Roadmap", "Traction Metrics", "Contact Funnel"],
        description: "Multi-page startup system with product education and proof of momentum.",
        theme: { primary: "#315C7C", secondary: "#7096A5", bg: "#F3F7F8" },
      },
      {
        name: "Founder Launch",
        price: 299,
        image: sharedImages.startup,
        features: ["Founder Note", "Product Demo", "Pricing Preview", "Press Strip"],
        description: "Founder-led website for product launches, fundraising, and customer growth.",
        theme: { primary: "#2F3437", secondary: "#8C6A55", bg: "#F7F3EC" },
      },
      {
        name: "Scale Room",
        price: 349,
        image: sharedImages.startup,
        features: ["Solution Pages", "Case Studies", "Hiring CTA", "Enterprise Form"],
        description: "Startup template for teams moving from launch to repeatable growth.",
        theme: { primary: "#0F9F6E", secondary: "#0B6B52", bg: "#F0F8F2" },
      },
    ],
  },
  {
    category: "Corporate",
    pages: ["Home", "Company", "Solutions", "Resources", "Contact"],
    templates: [
      {
        name: "Corporate Prime",
        price: 249,
        image: sharedImages.corporate,
        features: ["Company Overview", "Solution Pages", "Resource Grid", "Lead Routing"],
        description: "Professional corporate site with sober hierarchy and conversion surfaces.",
        theme: { primary: "#2F3437", secondary: "#8C6A55", bg: "#F7F3EC" },
      },
      {
        name: "Enterprise Trust",
        price: 299,
        image: sharedImages.corporate,
        features: ["Trust Center", "Executive Page", "Case Studies", "Contact Flow"],
        description: "Enterprise-facing build with credibility, governance, and solution depth.",
        theme: { primary: "#315C7C", secondary: "#7096A5", bg: "#F3F7F8" },
      },
      {
        name: "Boardroom",
        price: 349,
        image: sharedImages.corporate,
        features: ["Investor Section", "Reports", "Team Profiles", "Office Locations"],
        description: "Corporate presence for service firms, holdings, and institutional brands.",
        theme: { primary: "#687A3F", secondary: "#A58A55", bg: "#F7F5EA" },
      },
      {
        name: "Global Group",
        price: 449,
        image: sharedImages.corporate,
        features: ["Multi-page Sitemap", "Resource Library", "Region Cards", "Compliance CTA"],
        description: "Full corporate website with broad navigation and premium content modules.",
        theme: { primary: "#B84D57", secondary: "#D28A6D", bg: "#FFF1EC" },
      },
    ],
  },
  {
    category: "Personal Brand",
    pages: ["Home", "About", "Speaking", "Writing", "Contact"],
    templates: [
      {
        name: "Authority Page",
        price: 149,
        image: sharedImages.personal,
        features: ["Personal Hero", "Media Logos", "Writing Grid", "Booking CTA"],
        description: "Personal brand website for consultants, speakers, and visible founders.",
        theme: { primary: "#E85D3B", secondary: "#D94F2E", bg: "#FDF0E6" },
      },
      {
        name: "Founder Voice",
        price: 199,
        image: sharedImages.personal,
        features: ["Founder Story", "Newsletter", "Speaking Page", "Offer Cards"],
        description: "Warm professional site built around expertise, writing, and conversion.",
        theme: { primary: "#2F3437", secondary: "#8C6A55", bg: "#F7F3EC" },
      },
      {
        name: "Expert Signal",
        price: 249,
        image: sharedImages.personal,
        features: ["Proof Cards", "Podcast Section", "Course CTA", "Contact Form"],
        description: "Premium personal brand system for experts with content and products.",
        theme: { primary: "#315C7C", secondary: "#7096A5", bg: "#F3F7F8" },
      },
      {
        name: "Creator Studio",
        price: 299,
        image: sharedImages.personal,
        features: ["Creator Hub", "Sponsorship Page", "Digital Products", "Newsletter Flow"],
        description: "Full personal brand template for creators monetizing content and trust.",
        theme: { primary: "#B84D57", secondary: "#D28A6D", bg: "#FFF1EC" },
      },
    ],
  },
  {
    category: "Education",
    pages: ["Home", "Courses", "About", "Pricing", "Contact"],
    templates: [
      {
        name: "Course Launch",
        price: 149,
        image: sharedImages.education,
        features: ["Course Cards", "Instructor Bio", "Curriculum Blocks", "Enroll CTA"],
        description: "Education template for launching courses, workshops, and cohort programs.",
        theme: { primary: "#315C7C", secondary: "#7096A5", bg: "#F3F7F8" },
      },
      {
        name: "Academy Suite",
        price: 199,
        image: sharedImages.education,
        features: ["Program Pages", "Student Stories", "FAQ", "Application Form"],
        description: "Multi-page education site for academies, bootcamps, and training brands.",
        theme: { primary: "#0F9F6E", secondary: "#0B6B52", bg: "#F0F8F2" },
      },
      {
        name: "Learning Hub",
        price: 249,
        image: sharedImages.education,
        features: ["Resource Library", "Lesson Preview", "Pricing Table", "Newsletter"],
        description: "Content-rich learning site with resources, plans, and lead capture.",
        theme: { primary: "#687A3F", secondary: "#A58A55", bg: "#F7F5EA" },
      },
      {
        name: "Campus Pro",
        price: 299,
        image: sharedImages.education,
        features: ["Admissions Page", "Faculty Cards", "Events", "Contact Routing"],
        description: "Institutional education website for schools, programs, and training centers.",
        theme: { primary: "#2F3437", secondary: "#8C6A55", bg: "#F7F3EC" },
      },
    ],
  },
  {
    category: "Healthcare",
    pages: ["Home", "Services", "Team", "Resources", "Contact"],
    templates: [
      {
        name: "Care Practice",
        price: 199,
        image: sharedImages.healthcare,
        features: ["Service Cards", "Provider Profiles", "Booking CTA", "Patient FAQ"],
        description: "Calm healthcare site for clinics, wellness providers, and specialists.",
        theme: { primary: "#0F9F6E", secondary: "#0B6B52", bg: "#F0F8F2" },
      },
      {
        name: "Clinic Modern",
        price: 249,
        image: sharedImages.healthcare,
        features: ["Appointment Flow", "Location Cards", "Insurance Info", "Contact Form"],
        description: "Professional clinic template with clear services and patient pathways.",
        theme: { primary: "#315C7C", secondary: "#7096A5", bg: "#F3F7F8" },
      },
      {
        name: "Wellness Studio",
        price: 299,
        image: sharedImages.healthcare,
        features: ["Program Pages", "Testimonials", "Resource Hub", "Newsletter"],
        description: "Warm healthcare and wellness site for programs, coaches, and providers.",
        theme: { primary: "#B84D57", secondary: "#D28A6D", bg: "#FFF1EC" },
      },
      {
        name: "Health Network",
        price: 349,
        image: sharedImages.healthcare,
        features: ["Multi-location Pages", "Team Directory", "Resource Library", "Request Form"],
        description: "Full healthcare website for networks, practices, and care organizations.",
        theme: { primary: "#2F3437", secondary: "#8C6A55", bg: "#F7F3EC" },
      },
    ],
  },
];

const slugify = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

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
          subheading: `A polished ${category.toLowerCase()} website with responsive sections and premium interaction details.`,
          buttonText: "Start Building",
        },
      },
      {
        id: "features",
        type: "features",
        title: "Core Sections",
        content: {
          heading: "Built for clarity",
          subheading: "Every block is structured to help visitors understand, trust, and act faster.",
          items: ["Fast navigation", "Responsive components", "Conversion-ready CTA"],
        },
      },
      {
        id: "cta",
        type: "cta",
        title: "Call to Action",
        content: {
          heading: "Ready to launch?",
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
          items: [`Featured ${pageTitle}`, "Customer proof", "Conversion module"],
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
          items: ["Starter", "Growth", "Scale"],
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
    ...template,
    id: template.id || `tpl-${slugify(group.category)}-${index + 1}`,
    category: group.category,
    defaultPages: createDefaultPages(group.category, template.name, group.pages),
  }))
);
