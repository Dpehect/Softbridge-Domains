export interface Template {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  features: string[];
}

export interface DomainResult {
  name: string;
  tld: string;
  available: boolean;
  price: number;
  premium?: boolean;
}

export const templates: Template[] = [
  {
    id: "tpl-1",
    name: "Maple Grove Bakery",
    category: "E-commerce",
    price: 199,
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800",
    features: ["Shopping Cart", "Payment Gateway", "Inventory Management"]
  },
  {
    id: "tpl-2",
    name: "Elm Street Studio",
    category: "Portfolio",
    price: 99,
    image: "https://images.unsplash.com/photo-1513530534585-c7b1394c6d51?auto=format&fit=crop&q=80&w=800",
    features: ["Gallery", "Contact Form", "Blog"]
  },
  {
    id: "tpl-3",
    name: "Oakridge Diner",
    category: "Restaurant",
    price: 149,
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800",
    features: ["Menu System", "Reservations", "Delivery Integration"]
  },
  {
    id: "tpl-4",
    name: "Stonebridge Print Co.",
    category: "Consulting",
    price: 129,
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
    features: ["Booking System", "Client Portal", "Testimonials"]
  }
];

export const searchMockDomains = (query: string): DomainResult[] => {
  const base = query.split('.')[0].toLowerCase().replace(/[^a-z0-9-]/g, '');
  if (!base) return [];

  return [
    { name: base, tld: ".com", available: true, price: 12.99, premium: true },
    { name: base, tld: ".io", available: true, price: 39.99 },
    { name: base, tld: ".co", available: false, price: 0 },
    { name: base, tld: ".store", available: true, price: 1.99 },
    { name: base, tld: ".tech", available: true, price: 4.99 }
  ];
};
