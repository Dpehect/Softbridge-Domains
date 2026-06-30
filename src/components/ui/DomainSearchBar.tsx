"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import { CyberButton } from "./CyberButton";
import { cn } from "@/utils/cn";

interface DomainSearchBarProps {
  onSearch: (query: string) => void;
  initialValue?: string;
  placeholder?: string;
  value?: string;
  onChange?: (val: string) => void;
}

export function DomainSearchBar({
  onSearch,
  initialValue = "",
  placeholder = "Search for your next digital coordinate name...",
  value,
  onChange
}: DomainSearchBarProps) {
  const [internalQuery, setInternalQuery] = useState(initialValue);
  const query = value !== undefined ? value : internalQuery;
  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (onChange) {
      onChange(val);
    } else {
      setInternalQuery(val);
    }
  };

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
        "w-full max-w-2xl transition-all duration-300 border rounded-full p-1.5 flex items-center gap-2",
        isFocused 
          ? "border-white/20 bg-[#12141C]" 
          : "border-white/5 bg-[#161922]/80 backdrop-blur-md"
      )}
    >
      <div className="flex-1 flex items-center pl-4">
        <Search className="w-5 h-5 mr-3 shrink-0 text-apple-gray" />
        <input
          type="text"
          value={query}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="w-full bg-transparent border-none outline-none text-apple-text placeholder:text-apple-gray/50 text-sm md:text-base py-3"
        />
      </div>
      
      <CyberButton
        type="submit"
        variant="primary"
        size="md"
        className="shrink-0"
      >
        Search
      </CyberButton>
    </form>
  );
}
