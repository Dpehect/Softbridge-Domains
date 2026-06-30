"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Layout, ShieldCheck, Flame } from "lucide-react";
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
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 p-4"
    >
      <div className="max-w-7xl mx-auto glass-panel rounded-full px-6 py-3.5 flex items-center justify-between border-white/5 backdrop-blur-2xl">
        {/* Futuristic Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative w-8 h-8 rounded-full bg-gradient-to-tr from-electric-cyan to-cosmic-purple flex items-center justify-center overflow-hidden">
            {/* Spinning inner glow */}
            <div className="absolute inset-[2px] bg-abyss-black rounded-full z-10" />
            <div className="absolute inset-0 bg-gradient-to-tr from-electric-cyan to-solar-pink animate-[spin_4s_linear_infinite]" />
            <Flame className="w-4 h-4 text-electric-cyan z-20 group-hover:scale-110 transition-transform" />
          </div>
          <span className="font-heading font-black text-xl tracking-tight text-star-white">
            AETHER <span className="text-electric-cyan">DOMAINS</span>
          </span>
        </Link>

        {/* Dynamic Navigation Menu */}
        <nav className="hidden md:flex items-center gap-1.5 bg-white/5 p-1 rounded-full border border-white/5">
          {links.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.name}
                href={link.path}
                className={`relative px-5 py-2 rounded-full text-xs font-heading font-bold uppercase tracking-wider transition-colors duration-300 ${
                  isActive ? "text-deep-void" : "text-nebula-slate hover:text-star-white"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-nav-indicator"
                    className="absolute inset-0 bg-electric-cyan rounded-full -z-10 shadow-[0_0_15px_rgba(0,242,254,0.4)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Actions Deck */}
        <div className="flex items-center gap-3">
          {/* Cart Icon with pulsing count */}
          <Link
            href="/cart"
            className="p-3 bg-white/5 hover:bg-white/10 text-star-white hover:text-electric-cyan border border-white/5 rounded-full transition-all relative cursor-pointer"
          >
            <ShoppingCart className="w-4.5 h-4.5" />
            {cartItems.length > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-5 h-5 bg-solar-pink text-star-white text-[9px] font-black font-heading rounded-full flex items-center justify-center border border-deep-void shadow-[0_0_10px_rgba(255,0,127,0.5)]"
              >
                {cartItems.length}
              </motion.span>
            )}
          </Link>

          {/* Glowing CTA Button */}
          <Link
            href="/studio"
            className="flex items-center gap-2 bg-gradient-to-r from-cosmic-purple to-solar-pink text-star-white px-5 py-2.5 rounded-full text-xs font-heading font-bold uppercase tracking-wider hover:brightness-110 transition-all border border-white/10 hover:shadow-[0_0_15px_rgba(127,0,255,0.4)]"
          >
            <Layout className="w-3.5 h-3.5" />
            Aether Studio
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
