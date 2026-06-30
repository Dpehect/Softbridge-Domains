"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Layout, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useCartStore } from "@/store/useCartStore";

export function Header() {
  const pathname = usePathname();
  const cartItems = useCartStore((state) => state.items);

  const links = [
    { name: "Domains", path: "/" },
    { name: "Templates", path: "/templates" },
    { name: "Studio", path: "/studio" },
    { name: "Dashboard", path: "/dashboard" },
  ];

  return (
    <motion.header
      initial={{ y: -15, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 380, damping: 20 }}
      className="fixed top-0 left-0 right-0 z-50 p-4"
    >
      <div className="max-w-6xl mx-auto bg-white/70 border border-playful-dark/5 rounded-full px-6 py-3.5 flex items-center justify-between backdrop-blur-md shadow-[0_8px_30px_rgba(15,23,42,0.02)]">
        {/* Playful Creative Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-6 h-6 rounded-full bg-creative-teal flex items-center justify-center shadow-sm group-hover:rotate-12 transition-transform duration-300">
            <Sparkles className="w-3 h-3 text-white" />
          </div>
          <span className="font-display font-black text-sm uppercase tracking-[0.15em] text-playful-dark">
            SOFTBRIDGE<span className="text-creative-magenta font-light">//</span>DOMAINS
          </span>
        </Link>

        {/* Pill Nav Items */}
        <nav className="hidden md:flex items-center gap-1.5 bg-playful-dark/5 p-1 rounded-full border border-playful-dark/5">
          {links.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.name}
                href={link.path}
                className={`relative px-5 py-2 rounded-full text-xs font-heading font-extrabold uppercase tracking-widest transition-colors duration-300 ${
                  isActive ? "text-white" : "text-muted-slate hover:text-playful-dark"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-nav-indicator"
                    className="absolute inset-0 bg-playful-dark rounded-full -z-10 shadow-[0_4px_12px_rgba(15,23,42,0.15)]"
                    transition={{ type: "spring", stiffness: 450, damping: 22 }}
                  />
                )}
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Actions Deck */}
        <div className="flex items-center gap-3">
          {/* Cart Icon with count */}
          <Link
            href="/cart"
            className="p-2.5 bg-playful-dark/5 hover:bg-playful-dark/10 text-playful-dark border border-playful-dark/5 rounded-full transition-all relative cursor-pointer"
          >
            <ShoppingCart className="w-4 h-4" />
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4.5 h-4.5 bg-creative-magenta text-white text-[8px] font-black font-mono rounded-full flex items-center justify-center border border-white">
                {cartItems.length}
              </span>
            )}
          </Link>

          {/* Pill Outline CTA */}
          <Link
            href="/studio"
            className="flex items-center gap-1.5 bg-playful-dark hover:bg-white text-white hover:text-playful-dark border border-playful-dark px-5 py-2.5 rounded-full text-xs font-heading font-bold uppercase tracking-widest transition-all shadow-sm"
          >
            <Layout className="w-3.5 h-3.5" />
            Studio
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
