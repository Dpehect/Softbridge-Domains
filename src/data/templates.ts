import { CustomPage } from "@/types/builder";

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

export const TEMPLATES: Template[] = [
  {
    "id": "tpl-1",
    "name": "MetricsOS",
    "category": "SaaS",
    "type": "Template",
    "description": "Premium SaaS template with carefully crafted distinct layouts.",
    "price": 99,
    "features": [
      "Framer Motion",
      "Dark Mode",
      "Analytics",
      "Pricing Table",
      "Testimonial Section"
    ],
    "pages": 1,
    "previewImage": "/templates/saas.webp",
    "isPopular": true,
    "difficultyLevel": "Intermediate",
    "defaultPages": [
      {
        "id": "home",
        "title": "Home",
        "sections": [
          {
            "id": "sec-1-1",
            "type": "Hero",
            "content": {
              "heading": "MetricsOS",
              "description": "Advanced tools for modern teams.",
              "buttonText": "Start Free Trial"
            },
            "styles": {
              "alignment": "center",
              "padding": "py-32"
            }
          },
          {
            "id": "sec-1-2",
            "type": "Features",
            "content": {
              "heading": "Core Capabilities",
              "items": [
                "Analytics",
                "Automation",
                "Security"
              ]
            },
            "styles": {
              "layout": "3-col",
              "padding": "py-24"
            }
          },
          {
            "id": "sec-1-3",
            "type": "Testimonials",
            "content": {
              "heading": "Loved by teams",
              "items": [
                "Incredible tool.",
                "Saved us hours.",
                "Best ROI."
              ]
            },
            "styles": {
              "layout": "3-col",
              "backgroundColor": "#f9fafb"
            }
          },
          {
            "id": "sec-1-4",
            "type": "Pricing",
            "content": {
              "heading": "Simple Pricing",
              "buttonText": "Get Started"
            },
            "styles": {
              "layout": "3-col"
            }
          }
        ]
      }
    ]
  },
  {
    "id": "tpl-2",
    "name": "FlowState",
    "category": "SaaS",
    "type": "Template",
    "description": "Premium SaaS template with carefully crafted distinct layouts.",
    "price": 119,
    "features": [
      "Framer Motion",
      "Dark Mode",
      "Analytics",
      "Pricing Table",
      "Testimonial Section"
    ],
    "pages": 1,
    "previewImage": "/templates/saas.webp",
    "isPopular": false,
    "difficultyLevel": "Advanced",
    "defaultPages": [
      {
        "id": "home",
        "title": "Home",
        "sections": [
          {
            "id": "sec-2-1",
            "type": "Hero",
            "content": {
              "heading": "FlowState",
              "description": "Advanced tools for modern teams.",
              "buttonText": "Start Free Trial"
            },
            "styles": {
              "alignment": "left",
              "padding": "py-32"
            }
          },
          {
            "id": "sec-2-2",
            "type": "Features",
            "content": {
              "heading": "Core Capabilities",
              "items": [
                "Analytics",
                "Automation",
                "Security"
              ]
            },
            "styles": {
              "layout": "2-col",
              "padding": "py-24"
            }
          },
          {
            "id": "sec-2-3",
            "type": "Testimonials",
            "content": {
              "heading": "Loved by teams",
              "items": [
                "Incredible tool.",
                "Saved us hours.",
                "Best ROI."
              ]
            },
            "styles": {
              "layout": "3-col",
              "backgroundColor": "#f9fafb"
            }
          },
          {
            "id": "sec-2-4",
            "type": "Pricing",
            "content": {
              "heading": "Simple Pricing",
              "buttonText": "Get Started"
            },
            "styles": {
              "layout": "2-col"
            }
          }
        ]
      }
    ]
  },
  {
    "id": "tpl-3",
    "name": "SyncCore",
    "category": "SaaS",
    "type": "Template",
    "description": "Premium SaaS template with carefully crafted distinct layouts.",
    "price": 139,
    "features": [
      "Framer Motion",
      "Dark Mode",
      "Analytics",
      "Pricing Table",
      "Testimonial Section"
    ],
    "pages": 1,
    "previewImage": "/templates/saas.webp",
    "isPopular": false,
    "difficultyLevel": "Intermediate",
    "defaultPages": [
      {
        "id": "home",
        "title": "Home",
        "sections": [
          {
            "id": "sec-3-1",
            "type": "Hero",
            "content": {
              "heading": "SyncCore",
              "description": "Advanced tools for modern teams.",
              "buttonText": "Start Free Trial"
            },
            "styles": {
              "alignment": "center",
              "padding": "py-32"
            }
          },
          {
            "id": "sec-3-2",
            "type": "Features",
            "content": {
              "heading": "Core Capabilities",
              "items": [
                "Analytics",
                "Automation",
                "Security"
              ]
            },
            "styles": {
              "layout": "3-col",
              "padding": "py-24"
            }
          },
          {
            "id": "sec-3-3",
            "type": "Testimonials",
            "content": {
              "heading": "Loved by teams",
              "items": [
                "Incredible tool.",
                "Saved us hours.",
                "Best ROI."
              ]
            },
            "styles": {
              "layout": "3-col",
              "backgroundColor": "#f9fafb"
            }
          },
          {
            "id": "sec-3-4",
            "type": "Pricing",
            "content": {
              "heading": "Simple Pricing",
              "buttonText": "Get Started"
            },
            "styles": {
              "layout": "2-col"
            }
          }
        ]
      }
    ]
  },
  {
    "id": "tpl-4",
    "name": "PulseData",
    "category": "SaaS",
    "type": "Template",
    "description": "Premium SaaS template with carefully crafted distinct layouts.",
    "price": 159,
    "features": [
      "Framer Motion",
      "Dark Mode",
      "Analytics",
      "Pricing Table",
      "Testimonial Section"
    ],
    "pages": 1,
    "previewImage": "/templates/saas.webp",
    "isPopular": false,
    "difficultyLevel": "Advanced",
    "defaultPages": [
      {
        "id": "home",
        "title": "Home",
        "sections": [
          {
            "id": "sec-4-1",
            "type": "Hero",
            "content": {
              "heading": "PulseData",
              "description": "Advanced tools for modern teams.",
              "buttonText": "Start Free Trial"
            },
            "styles": {
              "alignment": "left",
              "padding": "py-32"
            }
          },
          {
            "id": "sec-4-2",
            "type": "Features",
            "content": {
              "heading": "Core Capabilities",
              "items": [
                "Analytics",
                "Automation",
                "Security"
              ]
            },
            "styles": {
              "layout": "2-col",
              "padding": "py-24"
            }
          },
          {
            "id": "sec-4-3",
            "type": "Testimonials",
            "content": {
              "heading": "Loved by teams",
              "items": [
                "Incredible tool.",
                "Saved us hours.",
                "Best ROI."
              ]
            },
            "styles": {
              "layout": "3-col",
              "backgroundColor": "#f9fafb"
            }
          },
          {
            "id": "sec-4-4",
            "type": "Pricing",
            "content": {
              "heading": "Simple Pricing",
              "buttonText": "Get Started"
            },
            "styles": {
              "layout": "3-col"
            }
          }
        ]
      }
    ]
  },
  {
    "id": "tpl-5",
    "name": "Nexus CRM",
    "category": "SaaS",
    "type": "Template",
    "description": "Premium SaaS template with carefully crafted distinct layouts.",
    "price": 179,
    "features": [
      "Framer Motion",
      "Dark Mode",
      "Analytics",
      "Pricing Table",
      "Testimonial Section"
    ],
    "pages": 1,
    "previewImage": "/templates/saas.webp",
    "isPopular": false,
    "difficultyLevel": "Intermediate",
    "defaultPages": [
      {
        "id": "home",
        "title": "Home",
        "sections": [
          {
            "id": "sec-5-1",
            "type": "Hero",
            "content": {
              "heading": "Nexus CRM",
              "description": "Advanced tools for modern teams.",
              "buttonText": "Start Free Trial"
            },
            "styles": {
              "alignment": "center",
              "padding": "py-32"
            }
          },
          {
            "id": "sec-5-2",
            "type": "Features",
            "content": {
              "heading": "Core Capabilities",
              "items": [
                "Analytics",
                "Automation",
                "Security"
              ]
            },
            "styles": {
              "layout": "3-col",
              "padding": "py-24"
            }
          },
          {
            "id": "sec-5-3",
            "type": "Testimonials",
            "content": {
              "heading": "Loved by teams",
              "items": [
                "Incredible tool.",
                "Saved us hours.",
                "Best ROI."
              ]
            },
            "styles": {
              "layout": "3-col",
              "backgroundColor": "#f9fafb"
            }
          },
          {
            "id": "sec-5-4",
            "type": "Pricing",
            "content": {
              "heading": "Simple Pricing",
              "buttonText": "Get Started"
            },
            "styles": {
              "layout": "2-col"
            }
          }
        ]
      }
    ]
  },
  {
    "id": "tpl-6",
    "name": "Aura AI",
    "category": "SaaS",
    "type": "Template",
    "description": "Premium SaaS template with carefully crafted distinct layouts.",
    "price": 199,
    "features": [
      "Framer Motion",
      "Dark Mode",
      "Analytics",
      "Pricing Table",
      "Testimonial Section"
    ],
    "pages": 1,
    "previewImage": "/templates/saas.webp",
    "isPopular": false,
    "difficultyLevel": "Advanced",
    "defaultPages": [
      {
        "id": "home",
        "title": "Home",
        "sections": [
          {
            "id": "sec-6-1",
            "type": "Hero",
            "content": {
              "heading": "Aura AI",
              "description": "Advanced tools for modern teams.",
              "buttonText": "Start Free Trial"
            },
            "styles": {
              "alignment": "left",
              "padding": "py-32"
            }
          },
          {
            "id": "sec-6-2",
            "type": "Features",
            "content": {
              "heading": "Core Capabilities",
              "items": [
                "Analytics",
                "Automation",
                "Security"
              ]
            },
            "styles": {
              "layout": "2-col",
              "padding": "py-24"
            }
          },
          {
            "id": "sec-6-3",
            "type": "Testimonials",
            "content": {
              "heading": "Loved by teams",
              "items": [
                "Incredible tool.",
                "Saved us hours.",
                "Best ROI."
              ]
            },
            "styles": {
              "layout": "3-col",
              "backgroundColor": "#f9fafb"
            }
          },
          {
            "id": "sec-6-4",
            "type": "Pricing",
            "content": {
              "heading": "Simple Pricing",
              "buttonText": "Get Started"
            },
            "styles": {
              "layout": "2-col"
            }
          }
        ]
      }
    ]
  },
  {
    "id": "tpl-7",
    "name": "Loom & Thread",
    "category": "E-Commerce",
    "type": "Template",
    "description": "Premium E-Commerce template with carefully crafted distinct layouts.",
    "price": 99,
    "features": [
      "Newsletter",
      "Testimonial Section",
      "Analytics"
    ],
    "pages": 1,
    "previewImage": "/templates/e-commerce.webp",
    "isPopular": true,
    "difficultyLevel": "Intermediate",
    "defaultPages": [
      {
        "id": "home",
        "title": "Home",
        "sections": [
          {
            "id": "sec-7-1",
            "type": "Slider",
            "content": {
              "heading": "",
              "sliderItems": [
                {
                  "title": "Summer Collection",
                  "image": ""
                },
                {
                  "title": "New Arrivals",
                  "image": ""
                }
              ]
            },
            "styles": {
              "padding": "py-16"
            }
          },
          {
            "id": "sec-7-2",
            "type": "Features",
            "content": {
              "heading": "Why Choose Us",
              "items": [
                "Free Shipping",
                "Quality Guarantee",
                "24/7 Support"
              ]
            },
            "styles": {
              "layout": "4-col",
              "padding": "py-16"
            }
          },
          {
            "id": "sec-7-3",
            "type": "Gallery",
            "content": {
              "heading": "Featured Products"
            },
            "styles": {
              "layout": "3-col"
            }
          }
        ]
      }
    ]
  },
  {
    "id": "tpl-8",
    "name": "Urban Edge",
    "category": "E-Commerce",
    "type": "Template",
    "description": "Premium E-Commerce template with carefully crafted distinct layouts.",
    "price": 119,
    "features": [
      "Newsletter",
      "Testimonial Section",
      "Analytics"
    ],
    "pages": 1,
    "previewImage": "/templates/e-commerce.webp",
    "isPopular": false,
    "difficultyLevel": "Advanced",
    "defaultPages": [
      {
        "id": "home",
        "title": "Home",
        "sections": [
          {
            "id": "sec-8-1",
            "type": "Slider",
            "content": {
              "heading": "",
              "sliderItems": [
                {
                  "title": "Summer Collection",
                  "image": ""
                },
                {
                  "title": "New Arrivals",
                  "image": ""
                }
              ]
            },
            "styles": {
              "padding": "py-16"
            }
          },
          {
            "id": "sec-8-2",
            "type": "Features",
            "content": {
              "heading": "Why Choose Us",
              "items": [
                "Free Shipping",
                "Quality Guarantee",
                "24/7 Support"
              ]
            },
            "styles": {
              "layout": "4-col",
              "padding": "py-16"
            }
          },
          {
            "id": "sec-8-3",
            "type": "Gallery",
            "content": {
              "heading": "Featured Products"
            },
            "styles": {
              "layout": "3-col"
            }
          }
        ]
      }
    ]
  },
  {
    "id": "tpl-9",
    "name": "Aesthetic Goods",
    "category": "E-Commerce",
    "type": "Template",
    "description": "Premium E-Commerce template with carefully crafted distinct layouts.",
    "price": 139,
    "features": [
      "Newsletter",
      "Testimonial Section",
      "Analytics"
    ],
    "pages": 1,
    "previewImage": "/templates/e-commerce.webp",
    "isPopular": false,
    "difficultyLevel": "Intermediate",
    "defaultPages": [
      {
        "id": "home",
        "title": "Home",
        "sections": [
          {
            "id": "sec-9-1",
            "type": "Slider",
            "content": {
              "heading": "",
              "sliderItems": [
                {
                  "title": "Summer Collection",
                  "image": ""
                },
                {
                  "title": "New Arrivals",
                  "image": ""
                }
              ]
            },
            "styles": {
              "padding": "py-16"
            }
          },
          {
            "id": "sec-9-2",
            "type": "Features",
            "content": {
              "heading": "Why Choose Us",
              "items": [
                "Free Shipping",
                "Quality Guarantee",
                "24/7 Support"
              ]
            },
            "styles": {
              "layout": "4-col",
              "padding": "py-16"
            }
          },
          {
            "id": "sec-9-3",
            "type": "Gallery",
            "content": {
              "heading": "Featured Products"
            },
            "styles": {
              "layout": "3-col"
            }
          }
        ]
      }
    ]
  },
  {
    "id": "tpl-10",
    "name": "Prime Retail",
    "category": "E-Commerce",
    "type": "Template",
    "description": "Premium E-Commerce template with carefully crafted distinct layouts.",
    "price": 159,
    "features": [
      "Newsletter",
      "Testimonial Section",
      "Analytics"
    ],
    "pages": 1,
    "previewImage": "/templates/e-commerce.webp",
    "isPopular": false,
    "difficultyLevel": "Advanced",
    "defaultPages": [
      {
        "id": "home",
        "title": "Home",
        "sections": [
          {
            "id": "sec-10-1",
            "type": "Slider",
            "content": {
              "heading": "",
              "sliderItems": [
                {
                  "title": "Summer Collection",
                  "image": ""
                },
                {
                  "title": "New Arrivals",
                  "image": ""
                }
              ]
            },
            "styles": {
              "padding": "py-16"
            }
          },
          {
            "id": "sec-10-2",
            "type": "Features",
            "content": {
              "heading": "Why Choose Us",
              "items": [
                "Free Shipping",
                "Quality Guarantee",
                "24/7 Support"
              ]
            },
            "styles": {
              "layout": "4-col",
              "padding": "py-16"
            }
          },
          {
            "id": "sec-10-3",
            "type": "Gallery",
            "content": {
              "heading": "Featured Products"
            },
            "styles": {
              "layout": "3-col"
            }
          }
        ]
      }
    ]
  },
  {
    "id": "tpl-11",
    "name": "Nova Store",
    "category": "E-Commerce",
    "type": "Template",
    "description": "Premium E-Commerce template with carefully crafted distinct layouts.",
    "price": 179,
    "features": [
      "Newsletter",
      "Testimonial Section",
      "Analytics"
    ],
    "pages": 1,
    "previewImage": "/templates/e-commerce.webp",
    "isPopular": false,
    "difficultyLevel": "Intermediate",
    "defaultPages": [
      {
        "id": "home",
        "title": "Home",
        "sections": [
          {
            "id": "sec-11-1",
            "type": "Slider",
            "content": {
              "heading": "",
              "sliderItems": [
                {
                  "title": "Summer Collection",
                  "image": ""
                },
                {
                  "title": "New Arrivals",
                  "image": ""
                }
              ]
            },
            "styles": {
              "padding": "py-16"
            }
          },
          {
            "id": "sec-11-2",
            "type": "Features",
            "content": {
              "heading": "Why Choose Us",
              "items": [
                "Free Shipping",
                "Quality Guarantee",
                "24/7 Support"
              ]
            },
            "styles": {
              "layout": "4-col",
              "padding": "py-16"
            }
          },
          {
            "id": "sec-11-3",
            "type": "Gallery",
            "content": {
              "heading": "Featured Products"
            },
            "styles": {
              "layout": "3-col"
            }
          }
        ]
      }
    ]
  },
  {
    "id": "tpl-12",
    "name": "Essential Co",
    "category": "E-Commerce",
    "type": "Template",
    "description": "Premium E-Commerce template with carefully crafted distinct layouts.",
    "price": 199,
    "features": [
      "Newsletter",
      "Testimonial Section",
      "Analytics"
    ],
    "pages": 1,
    "previewImage": "/templates/e-commerce.webp",
    "isPopular": false,
    "difficultyLevel": "Advanced",
    "defaultPages": [
      {
        "id": "home",
        "title": "Home",
        "sections": [
          {
            "id": "sec-12-1",
            "type": "Slider",
            "content": {
              "heading": "",
              "sliderItems": [
                {
                  "title": "Summer Collection",
                  "image": ""
                },
                {
                  "title": "New Arrivals",
                  "image": ""
                }
              ]
            },
            "styles": {
              "padding": "py-16"
            }
          },
          {
            "id": "sec-12-2",
            "type": "Features",
            "content": {
              "heading": "Why Choose Us",
              "items": [
                "Free Shipping",
                "Quality Guarantee",
                "24/7 Support"
              ]
            },
            "styles": {
              "layout": "4-col",
              "padding": "py-16"
            }
          },
          {
            "id": "sec-12-3",
            "type": "Gallery",
            "content": {
              "heading": "Featured Products"
            },
            "styles": {
              "layout": "3-col"
            }
          }
        ]
      }
    ]
  },
  {
    "id": "tpl-13",
    "name": "Studio Minimal",
    "category": "Portfolio",
    "type": "Template",
    "description": "Premium Portfolio template with carefully crafted distinct layouts.",
    "price": 99,
    "features": [
      "WebGL",
      "3D Elements",
      "Contact Form"
    ],
    "pages": 1,
    "previewImage": "/templates/portfolio.webp",
    "isPopular": true,
    "difficultyLevel": "Intermediate",
    "defaultPages": [
      {
        "id": "home",
        "title": "Home",
        "sections": [
          {
            "id": "sec-13-1",
            "type": "Hero",
            "content": {
              "heading": "I am a Creator.",
              "description": "Explore my latest works below."
            },
            "styles": {
              "alignment": "left",
              "padding": "py-32"
            }
          },
          {
            "id": "sec-13-2",
            "type": "Gallery",
            "content": {
              "heading": "Selected Works"
            },
            "styles": {
              "layout": "2-col"
            }
          },
          {
            "id": "sec-13-3",
            "type": "Contact",
            "content": {
              "heading": "Get in touch"
            },
            "styles": {
              "alignment": "center"
            }
          }
        ]
      }
    ]
  },
  {
    "id": "tpl-14",
    "name": "Arthouse",
    "category": "Portfolio",
    "type": "Template",
    "description": "Premium Portfolio template with carefully crafted distinct layouts.",
    "price": 119,
    "features": [
      "WebGL",
      "3D Elements",
      "Contact Form"
    ],
    "pages": 1,
    "previewImage": "/templates/portfolio.webp",
    "isPopular": false,
    "difficultyLevel": "Advanced",
    "defaultPages": [
      {
        "id": "home",
        "title": "Home",
        "sections": [
          {
            "id": "sec-14-1",
            "type": "Hero",
            "content": {
              "heading": "I am a Creator.",
              "description": "Explore my latest works below."
            },
            "styles": {
              "alignment": "left",
              "padding": "py-32"
            }
          },
          {
            "id": "sec-14-2",
            "type": "Gallery",
            "content": {
              "heading": "Selected Works"
            },
            "styles": {
              "layout": "3-col"
            }
          },
          {
            "id": "sec-14-3",
            "type": "Contact",
            "content": {
              "heading": "Get in touch"
            },
            "styles": {
              "alignment": "center"
            }
          }
        ]
      }
    ]
  },
  {
    "id": "tpl-15",
    "name": "Creative Space",
    "category": "Portfolio",
    "type": "Template",
    "description": "Premium Portfolio template with carefully crafted distinct layouts.",
    "price": 139,
    "features": [
      "WebGL",
      "3D Elements",
      "Contact Form"
    ],
    "pages": 1,
    "previewImage": "/templates/portfolio.webp",
    "isPopular": false,
    "difficultyLevel": "Intermediate",
    "defaultPages": [
      {
        "id": "home",
        "title": "Home",
        "sections": [
          {
            "id": "sec-15-1",
            "type": "Hero",
            "content": {
              "heading": "I am a Creator.",
              "description": "Explore my latest works below."
            },
            "styles": {
              "alignment": "left",
              "padding": "py-32"
            }
          },
          {
            "id": "sec-15-2",
            "type": "Gallery",
            "content": {
              "heading": "Selected Works"
            },
            "styles": {
              "layout": "2-col"
            }
          },
          {
            "id": "sec-15-3",
            "type": "Contact",
            "content": {
              "heading": "Get in touch"
            },
            "styles": {
              "alignment": "center"
            }
          }
        ]
      }
    ]
  },
  {
    "id": "tpl-16",
    "name": "Lens & Light",
    "category": "Portfolio",
    "type": "Template",
    "description": "Premium Portfolio template with carefully crafted distinct layouts.",
    "price": 159,
    "features": [
      "WebGL",
      "3D Elements",
      "Contact Form"
    ],
    "pages": 1,
    "previewImage": "/templates/portfolio.webp",
    "isPopular": false,
    "difficultyLevel": "Advanced",
    "defaultPages": [
      {
        "id": "home",
        "title": "Home",
        "sections": [
          {
            "id": "sec-16-1",
            "type": "Hero",
            "content": {
              "heading": "I am a Creator.",
              "description": "Explore my latest works below."
            },
            "styles": {
              "alignment": "left",
              "padding": "py-32"
            }
          },
          {
            "id": "sec-16-2",
            "type": "Gallery",
            "content": {
              "heading": "Selected Works"
            },
            "styles": {
              "layout": "3-col"
            }
          },
          {
            "id": "sec-16-3",
            "type": "Contact",
            "content": {
              "heading": "Get in touch"
            },
            "styles": {
              "alignment": "center"
            }
          }
        ]
      }
    ]
  },
  {
    "id": "tpl-17",
    "name": "Elevate Design",
    "category": "Portfolio",
    "type": "Template",
    "description": "Premium Portfolio template with carefully crafted distinct layouts.",
    "price": 179,
    "features": [
      "WebGL",
      "3D Elements",
      "Contact Form"
    ],
    "pages": 1,
    "previewImage": "/templates/portfolio.webp",
    "isPopular": false,
    "difficultyLevel": "Intermediate",
    "defaultPages": [
      {
        "id": "home",
        "title": "Home",
        "sections": [
          {
            "id": "sec-17-1",
            "type": "Hero",
            "content": {
              "heading": "I am a Creator.",
              "description": "Explore my latest works below."
            },
            "styles": {
              "alignment": "left",
              "padding": "py-32"
            }
          },
          {
            "id": "sec-17-2",
            "type": "Gallery",
            "content": {
              "heading": "Selected Works"
            },
            "styles": {
              "layout": "2-col"
            }
          },
          {
            "id": "sec-17-3",
            "type": "Contact",
            "content": {
              "heading": "Get in touch"
            },
            "styles": {
              "alignment": "center"
            }
          }
        ]
      }
    ]
  },
  {
    "id": "tpl-18",
    "name": "Folio.pro",
    "category": "Portfolio",
    "type": "Template",
    "description": "Premium Portfolio template with carefully crafted distinct layouts.",
    "price": 199,
    "features": [
      "WebGL",
      "3D Elements",
      "Contact Form"
    ],
    "pages": 1,
    "previewImage": "/templates/portfolio.webp",
    "isPopular": false,
    "difficultyLevel": "Advanced",
    "defaultPages": [
      {
        "id": "home",
        "title": "Home",
        "sections": [
          {
            "id": "sec-18-1",
            "type": "Hero",
            "content": {
              "heading": "I am a Creator.",
              "description": "Explore my latest works below."
            },
            "styles": {
              "alignment": "left",
              "padding": "py-32"
            }
          },
          {
            "id": "sec-18-2",
            "type": "Gallery",
            "content": {
              "heading": "Selected Works"
            },
            "styles": {
              "layout": "3-col"
            }
          },
          {
            "id": "sec-18-3",
            "type": "Contact",
            "content": {
              "heading": "Get in touch"
            },
            "styles": {
              "alignment": "center"
            }
          }
        ]
      }
    ]
  },
  {
    "id": "tpl-19",
    "name": "Apex Strategy",
    "category": "Agency",
    "type": "Template",
    "description": "Premium Agency template with carefully crafted distinct layouts.",
    "price": 99,
    "features": [
      "Contact Form",
      "Newsletter"
    ],
    "pages": 1,
    "previewImage": "/templates/agency.webp",
    "isPopular": true,
    "difficultyLevel": "Intermediate",
    "defaultPages": [
      {
        "id": "home",
        "title": "Home",
        "sections": [
          {
            "id": "sec-19-1",
            "type": "Hero",
            "content": {
              "heading": "Apex Strategy",
              "description": "Professional services for enterprise."
            },
            "styles": {
              "alignment": "center",
              "padding": "py-24"
            }
          },
          {
            "id": "sec-19-2",
            "type": "Features",
            "content": {
              "heading": "Our Services"
            },
            "styles": {
              "layout": "3-col"
            }
          },
          {
            "id": "sec-19-3",
            "type": "FAQ",
            "content": {
              "heading": "Common Questions"
            },
            "styles": {
              "alignment": "left"
            }
          }
        ]
      }
    ]
  },
  {
    "id": "tpl-20",
    "name": "Vanguard Digital",
    "category": "Agency",
    "type": "Template",
    "description": "Premium Agency template with carefully crafted distinct layouts.",
    "price": 119,
    "features": [
      "Contact Form",
      "Newsletter"
    ],
    "pages": 1,
    "previewImage": "/templates/agency.webp",
    "isPopular": false,
    "difficultyLevel": "Advanced",
    "defaultPages": [
      {
        "id": "home",
        "title": "Home",
        "sections": [
          {
            "id": "sec-20-1",
            "type": "Hero",
            "content": {
              "heading": "Vanguard Digital",
              "description": "Professional services for enterprise."
            },
            "styles": {
              "alignment": "center",
              "padding": "py-24"
            }
          },
          {
            "id": "sec-20-2",
            "type": "Features",
            "content": {
              "heading": "Our Services"
            },
            "styles": {
              "layout": "3-col"
            }
          },
          {
            "id": "sec-20-3",
            "type": "FAQ",
            "content": {
              "heading": "Common Questions"
            },
            "styles": {
              "alignment": "left"
            }
          }
        ]
      }
    ]
  },
  {
    "id": "tpl-21",
    "name": "Summit PR",
    "category": "Agency",
    "type": "Template",
    "description": "Premium Agency template with carefully crafted distinct layouts.",
    "price": 139,
    "features": [
      "Contact Form",
      "Newsletter"
    ],
    "pages": 1,
    "previewImage": "/templates/agency.webp",
    "isPopular": false,
    "difficultyLevel": "Intermediate",
    "defaultPages": [
      {
        "id": "home",
        "title": "Home",
        "sections": [
          {
            "id": "sec-21-1",
            "type": "Hero",
            "content": {
              "heading": "Summit PR",
              "description": "Professional services for enterprise."
            },
            "styles": {
              "alignment": "center",
              "padding": "py-24"
            }
          },
          {
            "id": "sec-21-2",
            "type": "Features",
            "content": {
              "heading": "Our Services"
            },
            "styles": {
              "layout": "3-col"
            }
          },
          {
            "id": "sec-21-3",
            "type": "FAQ",
            "content": {
              "heading": "Common Questions"
            },
            "styles": {
              "alignment": "left"
            }
          }
        ]
      }
    ]
  },
  {
    "id": "tpl-22",
    "name": "Nexus Consulting",
    "category": "Agency",
    "type": "Template",
    "description": "Premium Agency template with carefully crafted distinct layouts.",
    "price": 159,
    "features": [
      "Contact Form",
      "Newsletter"
    ],
    "pages": 1,
    "previewImage": "/templates/agency.webp",
    "isPopular": false,
    "difficultyLevel": "Advanced",
    "defaultPages": [
      {
        "id": "home",
        "title": "Home",
        "sections": [
          {
            "id": "sec-22-1",
            "type": "Hero",
            "content": {
              "heading": "Nexus Consulting",
              "description": "Professional services for enterprise."
            },
            "styles": {
              "alignment": "center",
              "padding": "py-24"
            }
          },
          {
            "id": "sec-22-2",
            "type": "Features",
            "content": {
              "heading": "Our Services"
            },
            "styles": {
              "layout": "3-col"
            }
          },
          {
            "id": "sec-22-3",
            "type": "FAQ",
            "content": {
              "heading": "Common Questions"
            },
            "styles": {
              "alignment": "left"
            }
          }
        ]
      }
    ]
  },
  {
    "id": "tpl-23",
    "name": "Pinnacle Media",
    "category": "Agency",
    "type": "Template",
    "description": "Premium Agency template with carefully crafted distinct layouts.",
    "price": 179,
    "features": [
      "Contact Form",
      "Newsletter"
    ],
    "pages": 1,
    "previewImage": "/templates/agency.webp",
    "isPopular": false,
    "difficultyLevel": "Intermediate",
    "defaultPages": [
      {
        "id": "home",
        "title": "Home",
        "sections": [
          {
            "id": "sec-23-1",
            "type": "Hero",
            "content": {
              "heading": "Pinnacle Media",
              "description": "Professional services for enterprise."
            },
            "styles": {
              "alignment": "center",
              "padding": "py-24"
            }
          },
          {
            "id": "sec-23-2",
            "type": "Features",
            "content": {
              "heading": "Our Services"
            },
            "styles": {
              "layout": "3-col"
            }
          },
          {
            "id": "sec-23-3",
            "type": "FAQ",
            "content": {
              "heading": "Common Questions"
            },
            "styles": {
              "alignment": "left"
            }
          }
        ]
      }
    ]
  },
  {
    "id": "tpl-24",
    "name": "Horizon Partners",
    "category": "Agency",
    "type": "Template",
    "description": "Premium Agency template with carefully crafted distinct layouts.",
    "price": 199,
    "features": [
      "Contact Form",
      "Newsletter"
    ],
    "pages": 1,
    "previewImage": "/templates/agency.webp",
    "isPopular": false,
    "difficultyLevel": "Advanced",
    "defaultPages": [
      {
        "id": "home",
        "title": "Home",
        "sections": [
          {
            "id": "sec-24-1",
            "type": "Hero",
            "content": {
              "heading": "Horizon Partners",
              "description": "Professional services for enterprise."
            },
            "styles": {
              "alignment": "center",
              "padding": "py-24"
            }
          },
          {
            "id": "sec-24-2",
            "type": "Features",
            "content": {
              "heading": "Our Services"
            },
            "styles": {
              "layout": "3-col"
            }
          },
          {
            "id": "sec-24-3",
            "type": "FAQ",
            "content": {
              "heading": "Common Questions"
            },
            "styles": {
              "alignment": "left"
            }
          }
        ]
      }
    ]
  },
  {
    "id": "tpl-25",
    "name": "LaunchPad",
    "category": "Landing Page",
    "type": "Template",
    "description": "Premium Landing Page template with carefully crafted distinct layouts.",
    "price": 99,
    "features": [
      "Contact Form",
      "Newsletter"
    ],
    "pages": 1,
    "previewImage": "/templates/landing-page.webp",
    "isPopular": true,
    "difficultyLevel": "Intermediate",
    "defaultPages": [
      {
        "id": "home",
        "title": "Home",
        "sections": [
          {
            "id": "sec-25-1",
            "type": "Hero",
            "content": {
              "heading": "LaunchPad",
              "description": "Professional services for enterprise."
            },
            "styles": {
              "alignment": "center",
              "padding": "py-24"
            }
          },
          {
            "id": "sec-25-2",
            "type": "Features",
            "content": {
              "heading": "Our Services"
            },
            "styles": {
              "layout": "3-col"
            }
          },
          {
            "id": "sec-25-3",
            "type": "FAQ",
            "content": {
              "heading": "Common Questions"
            },
            "styles": {
              "alignment": "left"
            }
          }
        ]
      }
    ]
  },
  {
    "id": "tpl-26",
    "name": "ConvertNow",
    "category": "Landing Page",
    "type": "Template",
    "description": "Premium Landing Page template with carefully crafted distinct layouts.",
    "price": 119,
    "features": [
      "Contact Form",
      "Newsletter"
    ],
    "pages": 1,
    "previewImage": "/templates/landing-page.webp",
    "isPopular": false,
    "difficultyLevel": "Advanced",
    "defaultPages": [
      {
        "id": "home",
        "title": "Home",
        "sections": [
          {
            "id": "sec-26-1",
            "type": "Hero",
            "content": {
              "heading": "ConvertNow",
              "description": "Professional services for enterprise."
            },
            "styles": {
              "alignment": "center",
              "padding": "py-24"
            }
          },
          {
            "id": "sec-26-2",
            "type": "Features",
            "content": {
              "heading": "Our Services"
            },
            "styles": {
              "layout": "3-col"
            }
          },
          {
            "id": "sec-26-3",
            "type": "FAQ",
            "content": {
              "heading": "Common Questions"
            },
            "styles": {
              "alignment": "left"
            }
          }
        ]
      }
    ]
  },
  {
    "id": "tpl-27",
    "name": "Optimum Beta",
    "category": "Landing Page",
    "type": "Template",
    "description": "Premium Landing Page template with carefully crafted distinct layouts.",
    "price": 139,
    "features": [
      "Contact Form",
      "Newsletter"
    ],
    "pages": 1,
    "previewImage": "/templates/landing-page.webp",
    "isPopular": false,
    "difficultyLevel": "Intermediate",
    "defaultPages": [
      {
        "id": "home",
        "title": "Home",
        "sections": [
          {
            "id": "sec-27-1",
            "type": "Hero",
            "content": {
              "heading": "Optimum Beta",
              "description": "Professional services for enterprise."
            },
            "styles": {
              "alignment": "center",
              "padding": "py-24"
            }
          },
          {
            "id": "sec-27-2",
            "type": "Features",
            "content": {
              "heading": "Our Services"
            },
            "styles": {
              "layout": "3-col"
            }
          },
          {
            "id": "sec-27-3",
            "type": "FAQ",
            "content": {
              "heading": "Common Questions"
            },
            "styles": {
              "alignment": "left"
            }
          }
        ]
      }
    ]
  },
  {
    "id": "tpl-28",
    "name": "QuickStart",
    "category": "Landing Page",
    "type": "Template",
    "description": "Premium Landing Page template with carefully crafted distinct layouts.",
    "price": 159,
    "features": [
      "Contact Form",
      "Newsletter"
    ],
    "pages": 1,
    "previewImage": "/templates/landing-page.webp",
    "isPopular": false,
    "difficultyLevel": "Advanced",
    "defaultPages": [
      {
        "id": "home",
        "title": "Home",
        "sections": [
          {
            "id": "sec-28-1",
            "type": "Hero",
            "content": {
              "heading": "QuickStart",
              "description": "Professional services for enterprise."
            },
            "styles": {
              "alignment": "center",
              "padding": "py-24"
            }
          },
          {
            "id": "sec-28-2",
            "type": "Features",
            "content": {
              "heading": "Our Services"
            },
            "styles": {
              "layout": "3-col"
            }
          },
          {
            "id": "sec-28-3",
            "type": "FAQ",
            "content": {
              "heading": "Common Questions"
            },
            "styles": {
              "alignment": "left"
            }
          }
        ]
      }
    ]
  },
  {
    "id": "tpl-29",
    "name": "Early Access",
    "category": "Landing Page",
    "type": "Template",
    "description": "Premium Landing Page template with carefully crafted distinct layouts.",
    "price": 179,
    "features": [
      "Contact Form",
      "Newsletter"
    ],
    "pages": 1,
    "previewImage": "/templates/landing-page.webp",
    "isPopular": false,
    "difficultyLevel": "Intermediate",
    "defaultPages": [
      {
        "id": "home",
        "title": "Home",
        "sections": [
          {
            "id": "sec-29-1",
            "type": "Hero",
            "content": {
              "heading": "Early Access",
              "description": "Professional services for enterprise."
            },
            "styles": {
              "alignment": "center",
              "padding": "py-24"
            }
          },
          {
            "id": "sec-29-2",
            "type": "Features",
            "content": {
              "heading": "Our Services"
            },
            "styles": {
              "layout": "3-col"
            }
          },
          {
            "id": "sec-29-3",
            "type": "FAQ",
            "content": {
              "heading": "Common Questions"
            },
            "styles": {
              "alignment": "left"
            }
          }
        ]
      }
    ]
  },
  {
    "id": "tpl-30",
    "name": "Promo OS",
    "category": "Landing Page",
    "type": "Template",
    "description": "Premium Landing Page template with carefully crafted distinct layouts.",
    "price": 199,
    "features": [
      "Contact Form",
      "Newsletter"
    ],
    "pages": 1,
    "previewImage": "/templates/landing-page.webp",
    "isPopular": false,
    "difficultyLevel": "Advanced",
    "defaultPages": [
      {
        "id": "home",
        "title": "Home",
        "sections": [
          {
            "id": "sec-30-1",
            "type": "Hero",
            "content": {
              "heading": "Promo OS",
              "description": "Professional services for enterprise."
            },
            "styles": {
              "alignment": "center",
              "padding": "py-24"
            }
          },
          {
            "id": "sec-30-2",
            "type": "Features",
            "content": {
              "heading": "Our Services"
            },
            "styles": {
              "layout": "3-col"
            }
          },
          {
            "id": "sec-30-3",
            "type": "FAQ",
            "content": {
              "heading": "Common Questions"
            },
            "styles": {
              "alignment": "left"
            }
          }
        ]
      }
    ]
  },
  {
    "id": "tpl-31",
    "name": "The Daily Post",
    "category": "Blog",
    "type": "Template",
    "description": "Premium Blog template with carefully crafted distinct layouts.",
    "price": 99,
    "features": [
      "Contact Form",
      "Newsletter"
    ],
    "pages": 1,
    "previewImage": "/templates/blog.webp",
    "isPopular": true,
    "difficultyLevel": "Intermediate",
    "defaultPages": [
      {
        "id": "home",
        "title": "Home",
        "sections": [
          {
            "id": "sec-31-1",
            "type": "Hero",
            "content": {
              "heading": "The Daily Post",
              "description": "Professional services for enterprise."
            },
            "styles": {
              "alignment": "center",
              "padding": "py-24"
            }
          },
          {
            "id": "sec-31-2",
            "type": "Features",
            "content": {
              "heading": "Our Services"
            },
            "styles": {
              "layout": "3-col"
            }
          },
          {
            "id": "sec-31-3",
            "type": "FAQ",
            "content": {
              "heading": "Common Questions"
            },
            "styles": {
              "alignment": "left"
            }
          }
        ]
      }
    ]
  },
  {
    "id": "tpl-32",
    "name": "Tech Insights",
    "category": "Blog",
    "type": "Template",
    "description": "Premium Blog template with carefully crafted distinct layouts.",
    "price": 119,
    "features": [
      "Contact Form",
      "Newsletter"
    ],
    "pages": 1,
    "previewImage": "/templates/blog.webp",
    "isPopular": false,
    "difficultyLevel": "Advanced",
    "defaultPages": [
      {
        "id": "home",
        "title": "Home",
        "sections": [
          {
            "id": "sec-32-1",
            "type": "Hero",
            "content": {
              "heading": "Tech Insights",
              "description": "Professional services for enterprise."
            },
            "styles": {
              "alignment": "center",
              "padding": "py-24"
            }
          },
          {
            "id": "sec-32-2",
            "type": "Features",
            "content": {
              "heading": "Our Services"
            },
            "styles": {
              "layout": "3-col"
            }
          },
          {
            "id": "sec-32-3",
            "type": "FAQ",
            "content": {
              "heading": "Common Questions"
            },
            "styles": {
              "alignment": "left"
            }
          }
        ]
      }
    ]
  },
  {
    "id": "tpl-33",
    "name": "Culture Vulture",
    "category": "Blog",
    "type": "Template",
    "description": "Premium Blog template with carefully crafted distinct layouts.",
    "price": 139,
    "features": [
      "Contact Form",
      "Newsletter"
    ],
    "pages": 1,
    "previewImage": "/templates/blog.webp",
    "isPopular": false,
    "difficultyLevel": "Intermediate",
    "defaultPages": [
      {
        "id": "home",
        "title": "Home",
        "sections": [
          {
            "id": "sec-33-1",
            "type": "Hero",
            "content": {
              "heading": "Culture Vulture",
              "description": "Professional services for enterprise."
            },
            "styles": {
              "alignment": "center",
              "padding": "py-24"
            }
          },
          {
            "id": "sec-33-2",
            "type": "Features",
            "content": {
              "heading": "Our Services"
            },
            "styles": {
              "layout": "3-col"
            }
          },
          {
            "id": "sec-33-3",
            "type": "FAQ",
            "content": {
              "heading": "Common Questions"
            },
            "styles": {
              "alignment": "left"
            }
          }
        ]
      }
    ]
  },
  {
    "id": "tpl-34",
    "name": "Wanderlust",
    "category": "Blog",
    "type": "Template",
    "description": "Premium Blog template with carefully crafted distinct layouts.",
    "price": 159,
    "features": [
      "Contact Form",
      "Newsletter"
    ],
    "pages": 1,
    "previewImage": "/templates/blog.webp",
    "isPopular": false,
    "difficultyLevel": "Advanced",
    "defaultPages": [
      {
        "id": "home",
        "title": "Home",
        "sections": [
          {
            "id": "sec-34-1",
            "type": "Hero",
            "content": {
              "heading": "Wanderlust",
              "description": "Professional services for enterprise."
            },
            "styles": {
              "alignment": "center",
              "padding": "py-24"
            }
          },
          {
            "id": "sec-34-2",
            "type": "Features",
            "content": {
              "heading": "Our Services"
            },
            "styles": {
              "layout": "3-col"
            }
          },
          {
            "id": "sec-34-3",
            "type": "FAQ",
            "content": {
              "heading": "Common Questions"
            },
            "styles": {
              "alignment": "left"
            }
          }
        ]
      }
    ]
  },
  {
    "id": "tpl-35",
    "name": "Foodie Journal",
    "category": "Blog",
    "type": "Template",
    "description": "Premium Blog template with carefully crafted distinct layouts.",
    "price": 179,
    "features": [
      "Contact Form",
      "Newsletter"
    ],
    "pages": 1,
    "previewImage": "/templates/blog.webp",
    "isPopular": false,
    "difficultyLevel": "Intermediate",
    "defaultPages": [
      {
        "id": "home",
        "title": "Home",
        "sections": [
          {
            "id": "sec-35-1",
            "type": "Hero",
            "content": {
              "heading": "Foodie Journal",
              "description": "Professional services for enterprise."
            },
            "styles": {
              "alignment": "center",
              "padding": "py-24"
            }
          },
          {
            "id": "sec-35-2",
            "type": "Features",
            "content": {
              "heading": "Our Services"
            },
            "styles": {
              "layout": "3-col"
            }
          },
          {
            "id": "sec-35-3",
            "type": "FAQ",
            "content": {
              "heading": "Common Questions"
            },
            "styles": {
              "alignment": "left"
            }
          }
        ]
      }
    ]
  },
  {
    "id": "tpl-36",
    "name": "Design Weekly",
    "category": "Blog",
    "type": "Template",
    "description": "Premium Blog template with carefully crafted distinct layouts.",
    "price": 199,
    "features": [
      "Contact Form",
      "Newsletter"
    ],
    "pages": 1,
    "previewImage": "/templates/blog.webp",
    "isPopular": false,
    "difficultyLevel": "Advanced",
    "defaultPages": [
      {
        "id": "home",
        "title": "Home",
        "sections": [
          {
            "id": "sec-36-1",
            "type": "Hero",
            "content": {
              "heading": "Design Weekly",
              "description": "Professional services for enterprise."
            },
            "styles": {
              "alignment": "center",
              "padding": "py-24"
            }
          },
          {
            "id": "sec-36-2",
            "type": "Features",
            "content": {
              "heading": "Our Services"
            },
            "styles": {
              "layout": "3-col"
            }
          },
          {
            "id": "sec-36-3",
            "type": "FAQ",
            "content": {
              "heading": "Common Questions"
            },
            "styles": {
              "alignment": "left"
            }
          }
        ]
      }
    ]
  },
  {
    "id": "tpl-37",
    "name": "AdminPro",
    "category": "Dashboard",
    "type": "Template",
    "description": "Premium Dashboard template with carefully crafted distinct layouts.",
    "price": 99,
    "features": [
      "Contact Form",
      "Newsletter"
    ],
    "pages": 1,
    "previewImage": "/templates/dashboard.webp",
    "isPopular": true,
    "difficultyLevel": "Intermediate",
    "defaultPages": [
      {
        "id": "home",
        "title": "Home",
        "sections": [
          {
            "id": "sec-37-1",
            "type": "Hero",
            "content": {
              "heading": "AdminPro",
              "description": "Professional services for enterprise."
            },
            "styles": {
              "alignment": "center",
              "padding": "py-24"
            }
          },
          {
            "id": "sec-37-2",
            "type": "Features",
            "content": {
              "heading": "Our Services"
            },
            "styles": {
              "layout": "3-col"
            }
          },
          {
            "id": "sec-37-3",
            "type": "FAQ",
            "content": {
              "heading": "Common Questions"
            },
            "styles": {
              "alignment": "left"
            }
          }
        ]
      }
    ]
  },
  {
    "id": "tpl-38",
    "name": "DataView",
    "category": "Dashboard",
    "type": "Template",
    "description": "Premium Dashboard template with carefully crafted distinct layouts.",
    "price": 119,
    "features": [
      "Contact Form",
      "Newsletter"
    ],
    "pages": 1,
    "previewImage": "/templates/dashboard.webp",
    "isPopular": false,
    "difficultyLevel": "Advanced",
    "defaultPages": [
      {
        "id": "home",
        "title": "Home",
        "sections": [
          {
            "id": "sec-38-1",
            "type": "Hero",
            "content": {
              "heading": "DataView",
              "description": "Professional services for enterprise."
            },
            "styles": {
              "alignment": "center",
              "padding": "py-24"
            }
          },
          {
            "id": "sec-38-2",
            "type": "Features",
            "content": {
              "heading": "Our Services"
            },
            "styles": {
              "layout": "3-col"
            }
          },
          {
            "id": "sec-38-3",
            "type": "FAQ",
            "content": {
              "heading": "Common Questions"
            },
            "styles": {
              "alignment": "left"
            }
          }
        ]
      }
    ]
  },
  {
    "id": "tpl-39",
    "name": "Systematic",
    "category": "Dashboard",
    "type": "Template",
    "description": "Premium Dashboard template with carefully crafted distinct layouts.",
    "price": 139,
    "features": [
      "Contact Form",
      "Newsletter"
    ],
    "pages": 1,
    "previewImage": "/templates/dashboard.webp",
    "isPopular": false,
    "difficultyLevel": "Intermediate",
    "defaultPages": [
      {
        "id": "home",
        "title": "Home",
        "sections": [
          {
            "id": "sec-39-1",
            "type": "Hero",
            "content": {
              "heading": "Systematic",
              "description": "Professional services for enterprise."
            },
            "styles": {
              "alignment": "center",
              "padding": "py-24"
            }
          },
          {
            "id": "sec-39-2",
            "type": "Features",
            "content": {
              "heading": "Our Services"
            },
            "styles": {
              "layout": "3-col"
            }
          },
          {
            "id": "sec-39-3",
            "type": "FAQ",
            "content": {
              "heading": "Common Questions"
            },
            "styles": {
              "alignment": "left"
            }
          }
        ]
      }
    ]
  },
  {
    "id": "tpl-40",
    "name": "ControlCenter",
    "category": "Dashboard",
    "type": "Template",
    "description": "Premium Dashboard template with carefully crafted distinct layouts.",
    "price": 159,
    "features": [
      "Contact Form",
      "Newsletter"
    ],
    "pages": 1,
    "previewImage": "/templates/dashboard.webp",
    "isPopular": false,
    "difficultyLevel": "Advanced",
    "defaultPages": [
      {
        "id": "home",
        "title": "Home",
        "sections": [
          {
            "id": "sec-40-1",
            "type": "Hero",
            "content": {
              "heading": "ControlCenter",
              "description": "Professional services for enterprise."
            },
            "styles": {
              "alignment": "center",
              "padding": "py-24"
            }
          },
          {
            "id": "sec-40-2",
            "type": "Features",
            "content": {
              "heading": "Our Services"
            },
            "styles": {
              "layout": "3-col"
            }
          },
          {
            "id": "sec-40-3",
            "type": "FAQ",
            "content": {
              "heading": "Common Questions"
            },
            "styles": {
              "alignment": "left"
            }
          }
        ]
      }
    ]
  },
  {
    "id": "tpl-41",
    "name": "Overview OS",
    "category": "Dashboard",
    "type": "Template",
    "description": "Premium Dashboard template with carefully crafted distinct layouts.",
    "price": 179,
    "features": [
      "Contact Form",
      "Newsletter"
    ],
    "pages": 1,
    "previewImage": "/templates/dashboard.webp",
    "isPopular": false,
    "difficultyLevel": "Intermediate",
    "defaultPages": [
      {
        "id": "home",
        "title": "Home",
        "sections": [
          {
            "id": "sec-41-1",
            "type": "Hero",
            "content": {
              "heading": "Overview OS",
              "description": "Professional services for enterprise."
            },
            "styles": {
              "alignment": "center",
              "padding": "py-24"
            }
          },
          {
            "id": "sec-41-2",
            "type": "Features",
            "content": {
              "heading": "Our Services"
            },
            "styles": {
              "layout": "3-col"
            }
          },
          {
            "id": "sec-41-3",
            "type": "FAQ",
            "content": {
              "heading": "Common Questions"
            },
            "styles": {
              "alignment": "left"
            }
          }
        ]
      }
    ]
  },
  {
    "id": "tpl-42",
    "name": "Metrics Hub",
    "category": "Dashboard",
    "type": "Template",
    "description": "Premium Dashboard template with carefully crafted distinct layouts.",
    "price": 199,
    "features": [
      "Contact Form",
      "Newsletter"
    ],
    "pages": 1,
    "previewImage": "/templates/dashboard.webp",
    "isPopular": false,
    "difficultyLevel": "Advanced",
    "defaultPages": [
      {
        "id": "home",
        "title": "Home",
        "sections": [
          {
            "id": "sec-42-1",
            "type": "Hero",
            "content": {
              "heading": "Metrics Hub",
              "description": "Professional services for enterprise."
            },
            "styles": {
              "alignment": "center",
              "padding": "py-24"
            }
          },
          {
            "id": "sec-42-2",
            "type": "Features",
            "content": {
              "heading": "Our Services"
            },
            "styles": {
              "layout": "3-col"
            }
          },
          {
            "id": "sec-42-3",
            "type": "FAQ",
            "content": {
              "heading": "Common Questions"
            },
            "styles": {
              "alignment": "left"
            }
          }
        ]
      }
    ]
  },
  {
    "id": "tpl-43",
    "name": "Global Holdings",
    "category": "Corporate",
    "type": "Template",
    "description": "Premium Corporate template with carefully crafted distinct layouts.",
    "price": 99,
    "features": [
      "Contact Form",
      "Newsletter"
    ],
    "pages": 1,
    "previewImage": "/templates/corporate.webp",
    "isPopular": true,
    "difficultyLevel": "Intermediate",
    "defaultPages": [
      {
        "id": "home",
        "title": "Home",
        "sections": [
          {
            "id": "sec-43-1",
            "type": "Hero",
            "content": {
              "heading": "Global Holdings",
              "description": "Professional services for enterprise."
            },
            "styles": {
              "alignment": "center",
              "padding": "py-24"
            }
          },
          {
            "id": "sec-43-2",
            "type": "Features",
            "content": {
              "heading": "Our Services"
            },
            "styles": {
              "layout": "3-col"
            }
          },
          {
            "id": "sec-43-3",
            "type": "FAQ",
            "content": {
              "heading": "Common Questions"
            },
            "styles": {
              "alignment": "left"
            }
          }
        ]
      }
    ]
  },
  {
    "id": "tpl-44",
    "name": "Enterprise Sol",
    "category": "Corporate",
    "type": "Template",
    "description": "Premium Corporate template with carefully crafted distinct layouts.",
    "price": 119,
    "features": [
      "Contact Form",
      "Newsletter"
    ],
    "pages": 1,
    "previewImage": "/templates/corporate.webp",
    "isPopular": false,
    "difficultyLevel": "Advanced",
    "defaultPages": [
      {
        "id": "home",
        "title": "Home",
        "sections": [
          {
            "id": "sec-44-1",
            "type": "Hero",
            "content": {
              "heading": "Enterprise Sol",
              "description": "Professional services for enterprise."
            },
            "styles": {
              "alignment": "center",
              "padding": "py-24"
            }
          },
          {
            "id": "sec-44-2",
            "type": "Features",
            "content": {
              "heading": "Our Services"
            },
            "styles": {
              "layout": "3-col"
            }
          },
          {
            "id": "sec-44-3",
            "type": "FAQ",
            "content": {
              "heading": "Common Questions"
            },
            "styles": {
              "alignment": "left"
            }
          }
        ]
      }
    ]
  },
  {
    "id": "tpl-45",
    "name": "Corporate Synergies",
    "category": "Corporate",
    "type": "Template",
    "description": "Premium Corporate template with carefully crafted distinct layouts.",
    "price": 139,
    "features": [
      "Contact Form",
      "Newsletter"
    ],
    "pages": 1,
    "previewImage": "/templates/corporate.webp",
    "isPopular": false,
    "difficultyLevel": "Intermediate",
    "defaultPages": [
      {
        "id": "home",
        "title": "Home",
        "sections": [
          {
            "id": "sec-45-1",
            "type": "Hero",
            "content": {
              "heading": "Corporate Synergies",
              "description": "Professional services for enterprise."
            },
            "styles": {
              "alignment": "center",
              "padding": "py-24"
            }
          },
          {
            "id": "sec-45-2",
            "type": "Features",
            "content": {
              "heading": "Our Services"
            },
            "styles": {
              "layout": "3-col"
            }
          },
          {
            "id": "sec-45-3",
            "type": "FAQ",
            "content": {
              "heading": "Common Questions"
            },
            "styles": {
              "alignment": "left"
            }
          }
        ]
      }
    ]
  },
  {
    "id": "tpl-46",
    "name": "Standard Trust",
    "category": "Corporate",
    "type": "Template",
    "description": "Premium Corporate template with carefully crafted distinct layouts.",
    "price": 159,
    "features": [
      "Contact Form",
      "Newsletter"
    ],
    "pages": 1,
    "previewImage": "/templates/corporate.webp",
    "isPopular": false,
    "difficultyLevel": "Advanced",
    "defaultPages": [
      {
        "id": "home",
        "title": "Home",
        "sections": [
          {
            "id": "sec-46-1",
            "type": "Hero",
            "content": {
              "heading": "Standard Trust",
              "description": "Professional services for enterprise."
            },
            "styles": {
              "alignment": "center",
              "padding": "py-24"
            }
          },
          {
            "id": "sec-46-2",
            "type": "Features",
            "content": {
              "heading": "Our Services"
            },
            "styles": {
              "layout": "3-col"
            }
          },
          {
            "id": "sec-46-3",
            "type": "FAQ",
            "content": {
              "heading": "Common Questions"
            },
            "styles": {
              "alignment": "left"
            }
          }
        ]
      }
    ]
  },
  {
    "id": "tpl-47",
    "name": "Apex Capital",
    "category": "Corporate",
    "type": "Template",
    "description": "Premium Corporate template with carefully crafted distinct layouts.",
    "price": 179,
    "features": [
      "Contact Form",
      "Newsletter"
    ],
    "pages": 1,
    "previewImage": "/templates/corporate.webp",
    "isPopular": false,
    "difficultyLevel": "Intermediate",
    "defaultPages": [
      {
        "id": "home",
        "title": "Home",
        "sections": [
          {
            "id": "sec-47-1",
            "type": "Hero",
            "content": {
              "heading": "Apex Capital",
              "description": "Professional services for enterprise."
            },
            "styles": {
              "alignment": "center",
              "padding": "py-24"
            }
          },
          {
            "id": "sec-47-2",
            "type": "Features",
            "content": {
              "heading": "Our Services"
            },
            "styles": {
              "layout": "3-col"
            }
          },
          {
            "id": "sec-47-3",
            "type": "FAQ",
            "content": {
              "heading": "Common Questions"
            },
            "styles": {
              "alignment": "left"
            }
          }
        ]
      }
    ]
  },
  {
    "id": "tpl-48",
    "name": "United Services",
    "category": "Corporate",
    "type": "Template",
    "description": "Premium Corporate template with carefully crafted distinct layouts.",
    "price": 199,
    "features": [
      "Contact Form",
      "Newsletter"
    ],
    "pages": 1,
    "previewImage": "/templates/corporate.webp",
    "isPopular": false,
    "difficultyLevel": "Advanced",
    "defaultPages": [
      {
        "id": "home",
        "title": "Home",
        "sections": [
          {
            "id": "sec-48-1",
            "type": "Hero",
            "content": {
              "heading": "United Services",
              "description": "Professional services for enterprise."
            },
            "styles": {
              "alignment": "center",
              "padding": "py-24"
            }
          },
          {
            "id": "sec-48-2",
            "type": "Features",
            "content": {
              "heading": "Our Services"
            },
            "styles": {
              "layout": "3-col"
            }
          },
          {
            "id": "sec-48-3",
            "type": "FAQ",
            "content": {
              "heading": "Common Questions"
            },
            "styles": {
              "alignment": "left"
            }
          }
        ]
      }
    ]
  }
];
