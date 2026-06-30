"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import { CyberButton } from "./CyberButton";
import { motion } from "framer-motion";

interface DomainSearchBarProps {
  onSearch: (query: string) => void;
  initialValue?: string;
  placeholder?: string;
}

export function DomainSearchBar({
  onSearch,
  initialValue = "",
  placeholder = "Search for your next premium domain..."
}: DomainSearchBarProps) {
  const [query, setQuery] = useState(initialValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto relative group">
      {/* Dynamic flowing neon backing blur */}
      <div className="absolute -inset-1.5 bg-gradient-to-r from-electric-cyan via-cosmic-purple to-solar-pink rounded-2xl blur-md opacity-25 group-hover:opacity-40 transition duration-500" />
      
      <div className="relative glass-panel rounded-2xl p-1.5 flex items-center gap-2">
        <div className="flex-1 flex items-center pl-4">
          <Search className="w-5 h-5 text-nebula-slate/60 mr-3 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="w-full bg-transparent border-none outline-none text-star-white placeholder:text-nebula-slate/50 text-base md:text-lg py-3"
          />
        </div>
        <CyberButton
          type="submit"
          variant="cyan"
          className="shrink-0"
        >
          Explore
        </CyberButton>
      </div>
    </form>
  );
}
