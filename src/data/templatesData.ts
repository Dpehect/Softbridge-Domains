import { ConfiguredPage } from "@/store/useConfiguratorStore";

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

export const templatesData: TemplateInfo[] = [
  {
    id: "tpl-1",
    name: "Aether SaaS",
    category: "SaaS",
    price: 199,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    features: ["Interactive Analytics", "Neon Grid Hero", "Feature Comparison", "Contact Hub"],
    description: "Cyberpunk aesthetic designed specifically for developer tools and futuristic tech startups.",
    theme: {
      primary: "#00F2FE",
      secondary: "#7F00FF",
      bg: "#05050A",
    },
    defaultPages: [
      {
        id: "home",
        title: "Home",
        path: "/",
        sections: [
          {
            id: "hero",
            type: "hero",
            title: "Hero Banner",
            content: {
              heading: "Operate in the Digital Stratosphere",
              subheading: "Unleash decentralized cloud power for your development pipelines.",
              buttonText: "Initiate Orbit",
            },
          },
          {
            id: "features",
            type: "features",
            title: "Core Features",
            content: {
              heading: "Engineered for Speed",
              subheading: "Optimized pipelines running on absolute zero latency grids.",
              items: [
                "Zero-Latency Deployment",
                "Self-Healing Server Infrastructure",
                "Advanced Quantum Cryptography",
              ],
            },
          },
          {
            id: "cta",
            type: "cta",
            title: "Call to Action",
            content: {
              heading: "Ready to Ascend?",
              subheading: "Join 15,000+ developers engineering the future.",
              buttonText: "Deploy Free Orbit",
            },
          },
        ],
      },
      {
        id: "features-page",
        title: "Features",
        path: "/features",
        sections: [
          {
            id: "details",
            type: "details",
            title: "Feature Deep Dive",
            content: {
              heading: "Technological Superiority",
              description: "Our infrastructure operates globally using cold-plasma servers and optic-wave data transfers.",
            },
          },
        ],
      },
      {
        id: "contact",
        title: "Contact",
        path: "/contact",
        sections: [
          {
            id: "contact-form",
            type: "contact",
            title: "Secure Terminal",
            content: {
              heading: "Establish Contact",
              description: "Open a secure websocket channel to our control deck.",
              buttonText: "Send Vector",
            },
          },
        ],
      },
    ],
  },
  {
    id: "tpl-2",
    name: "Nova Portfolio",
    category: "Portfolio",
    price: 99,
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800",
    features: ["Smooth Horizontal Scroll", "Interactive Projects Grid", "3D Art Showcases", "Dynamic Contact Form"],
    description: "Ultra-clean visual interface tailored for designers, artists, and senior creative directors.",
    theme: {
      primary: "#FF007F",
      secondary: "#7F00FF",
      bg: "#030307",
    },
    defaultPages: [
      {
        id: "home",
        title: "Showcase",
        path: "/",
        sections: [
          {
            id: "hero",
            type: "hero",
            title: "Hero Header",
            content: {
              heading: "Aesthetic Engineer & Designer",
              subheading: "Crafting digital experiences at the intersection of geometry and light.",
              buttonText: "View Manifest",
            },
          },
          {
            id: "portfolio",
            type: "gallery",
            title: "Selected Works",
            content: {
              heading: "Archived Work",
              items: ["Project Apex - 2025", "Vortex Brand Identity", "Aether UI Toolkit"],
            },
          },
        ],
      },
      {
        id: "about",
        title: "Bio",
        path: "/about",
        sections: [
          {
            id: "bio",
            type: "about",
            title: "Biography",
            content: {
              heading: "Behind the Pixels",
              description: "I am a visual creator utilizing generative AI, WebGL, and next-generation frameworks to create emotional digital connections.",
            },
          },
        ],
      },
    ],
  },
  {
    id: "tpl-3",
    name: "Quantum E-Commerce",
    category: "E-Commerce",
    price: 249,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    features: ["Cyberpunk Product Grid", "Floating Glass Cart Summary", "Interactive Billing Interface", "Order Tracker"],
    description: "Heavy neon borders and futuristic card components to launch a highly unique clothing or tech accessory brand.",
    theme: {
      primary: "#00F2FE",
      secondary: "#FF007F",
      bg: "#07070F",
    },
    defaultPages: [
      {
        id: "home",
        title: "Terminal",
        path: "/",
        sections: [
          {
            id: "hero",
            type: "hero",
            title: "Store Hero",
            content: {
              heading: "Acquire Futuristic Gears",
              subheading: "Cybernetic enhancements, clothing modules, and optical gear available for safe transport.",
              buttonText: "Browse Cargo",
            },
          },
          {
            id: "products",
            type: "gallery",
            title: "Cargo Inventory",
            content: {
              heading: "Active Modules",
              items: ["Chroma Shield Vest", "Apex Visual Goggles", "Grid Runner Boots"],
            },
          },
        ],
      },
    ],
  },
];
