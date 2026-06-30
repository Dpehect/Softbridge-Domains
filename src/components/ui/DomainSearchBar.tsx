"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import { CyberButton } from "./CyberButton";
import { cn } from "@/utils/cn";

interface DomainSearchBarProps {
  onSearch: (query: string) => void;
  initialValue?: string;
  placeholder?: string;
}

export function DomainSearchBar({
  onSearch,
  initialValue = "",
  placeholder = "Search for your next digital coordinates..."
}: DomainSearchBarProps) {
  const [query, setQuery] = useState(initialValue);
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "w-full max-w-2xl transition-all duration-500 border rounded p-1 flex items-center gap-2",
        isFocused 
          ? "border-electric-teal/30 bg-[#0C0D16] shadow-[0_0_30px_rgba(0,229,216,0.02)]" 
          : "border-white/5 bg-abyss-black/60"
      )}
    >
      <div className="flex-1 flex items-center pl-3">
        <Search className={cn(
          "w-4 h-4 mr-2.5 shrink-0 transition-colors duration-500",
          isFocused ? "text-electric-teal" : "text-muted-text/50"
        )} />
        <input
          type="text"
          value={query}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent border-none outline-none text-star-white placeholder:text-muted-text/45 text-xs md:text-sm py-2.5"
        />
      </div>
      
      <CyberButton
        type="submit"
        variant="teal"
        size="sm"
        className="shrink-0"
      >
        Search
      </CyberButton>
    </form>
  );
}
