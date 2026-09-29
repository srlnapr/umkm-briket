"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FactoryCapacity from "@/components/FactoryCapacity";
import ProductSpecs from "@/components/ProductSpecs";
import WhyUs from "@/components/WhyUs";
import PackagingOEM from "@/components/PackagingOEM";
import GlobalShipping from "@/components/GlobalShipping";
import FclCalculator, { CalculatorSpec } from "@/components/FclCalculator";
import RfqInquiryForm from "@/components/RfqInquiryForm";
import Footer from "@/components/Footer";

export default function Home() {
  const [activeSpec, setActiveSpec] = useState<CalculatorSpec | null>(null);

  const handleTransferSpec = (spec: CalculatorSpec) => {
    setActiveSpec(spec);
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface">
      <Header />
      <main className="w-full pt-20 bg-surface min-h-[calc(100vh-20rem)]">
        <HeroSection />
        <FactoryCapacity />
        <ProductSpecs />
        <WhyUs />
        <PackagingOEM />
        <GlobalShipping />
        <FclCalculator onTransferSpec={handleTransferSpec} />
        <RfqInquiryForm specData={activeSpec} />
      </main>
      <Footer />
    </div>
  );
}
