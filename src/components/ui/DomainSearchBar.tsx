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
  placeholder = "Search for your new digital orbit name..."
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
        "w-full max-w-2xl transition-all duration-500 border rounded-full p-2 flex items-center gap-2",
        isFocused 
          ? "border-creative-teal/30 bg-white shadow-[0_12px_40px_rgba(15,23,42,0.06)] scale-[1.01]" 
          : "border-playful-dark/5 bg-white/60 backdrop-blur-md shadow-[0_4px_20px_rgba(15,23,42,0.02)]"
      )}
    >
      <div className="flex-1 flex items-center pl-4">
        <Search className={cn(
          "w-5 h-5 mr-3 shrink-0 transition-colors duration-500",
          isFocused ? "text-creative-teal" : "text-muted-slate/40"
        )} />
        <input
          type="text"
          value={query}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent border-none outline-none text-playful-dark placeholder:text-muted-slate/40 text-sm md:text-base py-3"
        />
      </div>
      
      <CyberButton
        type="submit"
        variant="teal"
        size="md"
        className="shrink-0"
      >
        Search
      </CyberButton>
    </form>
  );
}
