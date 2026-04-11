"use client";

import { useState } from "react";
import ServiceFilterBar from "./ServiceFilterBar";
import ServiceGrid from "./ServiceGrid";
import { ServiceCategory, Service } from "../../types/service";

export default function ServicesContainer({ initialServices }: { initialServices: Service[] }) {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>("all");

  const resultsCount = activeCategory === "all" 
    ? initialServices.length 
    : initialServices.filter(s => s.category === activeCategory).length;

  return (
    <>
      <ServiceFilterBar 
        activeCategory={activeCategory} 
        onFilterChange={setActiveCategory} 
        resultsCount={resultsCount}
      />
      <ServiceGrid 
        services={initialServices} 
        activeCategory={activeCategory} 
      />
    </>
  );
}
