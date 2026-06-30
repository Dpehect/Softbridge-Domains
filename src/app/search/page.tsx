"use client";

import React from "react";
import DomainSearch from "@/components/DomainSearch";

export default function SearchPage() {
  return (
    <main className="min-h-screen pt-28 pb-24 px-4 md:px-8 bg-midnight-void">
      <div className="max-w-6xl mx-auto">
        <DomainSearch />
      </div>
    </main>
  );
}
