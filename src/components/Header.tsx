"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart } from "lucide-react";
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-apple-black/85 backdrop-blur-md border-b border-white/5"
    >
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Minimalist Apple Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="font-sans font-bold text-sm tracking-tight text-apple-text">
            Aether Domains
          </span>
        </Link>

        {/* Flat Top Navigation Menu */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.name}
                href={link.path}
                className={`text-[11px] font-sans font-medium tracking-wide transition-colors duration-300 ${
                  isActive ? "text-apple-text" : "text-apple-gray hover:text-apple-text"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Actions Deck */}
        <div className="flex items-center gap-6">
          {/* Cart Icon with count */}
          <Link
            href="/cart"
            className="text-apple-gray hover:text-apple-text transition-all relative cursor-pointer"
          >
            <ShoppingCart className="w-4 h-4" />
            {cartItems.length > 0 && (
              <span className="absolute -top-1.5 -right-2 w-3.5 h-3.5 bg-apple-text text-apple-black text-[8px] font-bold rounded-full flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </Link>

          {/* Minimal CTA button */}
          <Link
            href="/studio"
            className="bg-transparent hover:bg-white/5 border border-white/10 hover:border-white/20 text-apple-text text-[10px] font-sans font-medium tracking-wide px-3.5 py-1.5 rounded-lg transition-all"
          >
            Launch Design
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
