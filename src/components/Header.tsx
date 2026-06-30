"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Layout, Layers } from "lucide-react";
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
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 p-4"
    >
      <div className="max-w-6xl mx-auto bg-midnight-void/75 border border-black/5 rounded px-6 py-3.5 flex items-center justify-between backdrop-blur-md">
        
        {/* Minimalist Premium Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-5 h-5 rounded border border-black/10 flex items-center justify-center bg-black/[0.02] group-hover:border-cosmic-teal/40 transition-colors">
            <Layers className="w-3 h-3 text-cosmic-teal" />
          </div>
          <span className="font-display font-black text-sm uppercase tracking-[0.18em] text-star-white">
            AETHER<span className="text-cosmic-teal font-light">//</span>DOMAINS
          </span>
        </Link>

        {/* Clean Static Navigation Menu */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.name}
                href={link.path}
                className={`relative px-4 py-1.5 rounded text-[10px] font-heading font-extrabold uppercase tracking-widest transition-colors duration-300 ${
                  isActive ? "text-midnight-void" : "text-muted-steel hover:text-cosmic-teal"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-nav-indicator"
                    className="absolute inset-0 bg-star-white rounded -z-10 shadow-[0_4px_12px_rgba(0,0,0,0.05)]"
                    transition={{ type: "spring", stiffness: 450, damping: 28 }}
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
            className="p-2.5 bg-black/[0.01] hover:bg-black/[0.04] text-star-white hover:text-cosmic-teal border border-black/5 rounded transition-all relative cursor-pointer"
          >
            <ShoppingCart className="w-4 h-4" />
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-sunset-coral text-midnight-void text-[8px] font-black font-mono rounded flex items-center justify-center shadow-[0_0_10px_rgba(255,107,53,0.3)]">
                {cartItems.length}
              </span>
            )}
          </Link>

          {/* Minimalist outline CTA */}
          <Link
            href="/studio"
            className="flex items-center gap-1.5 bg-transparent border border-black/10 text-star-white hover:border-cosmic-teal/50 hover:text-cosmic-teal px-4 py-2 rounded text-[10px] font-heading font-bold uppercase tracking-widest transition-all"
          >
            <Layout className="w-3 h-3 text-cosmic-teal" />
            Studio
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
export default Header;
