"use client";

import React from "react";
import { motion } from "framer-motion";
import { Reveal, StaggerReveal, StaggerItem } from "./animations";

const features = [
  {
    icon: "eco",
    iconColor: "text-secondary",
    iconBg: "bg-secondary-container/20",
    title: "100% Organic & Chemical-Free",
    desc: "Compacted strictly with 100% natural Indonesian coconut shell and ≤3% food-grade food starch tapioca. Completely non-toxic for enclosed shisha lounges.",
  },
  {
    icon: "clean_hands",
    iconColor: "text-on-surface",
    iconBg: "bg-surface-container-high",
    title: "Ultra-Low White Ash (< 2.2%)",
    desc: "Leaves behind a fine, pure white powder without black carbon dirt or heavy sand residue, keeping hookah bowls and BBQ grill beds spotless.",
  },
  {
    icon: "mode_heat",
    iconColor: "text-primary-container",
    iconBg: "bg-primary-container/20",
    title: "7,500+ Kcal/kg Sustained Heat",
    desc: "Engineered under 150-ton hydraulic compaction pressure, delivering an extended glowing thermal endurance exceeding 150 continuous minutes.",
  },
  {
    icon: "air",
    iconColor: "text-tertiary",
    iconBg: "bg-tertiary-container/20",
    title: "Odorless & Smokeless Ignition",
    desc: "Does not contaminate luxury shisha tobacco flavor profiles or impart unpleasant chemical odors onto dry-aged meats.",
  },
  {
    icon: "biotech",
    iconColor: "text-primary",
    iconBg: "bg-surface-container-high",
    title: "Rigorous Batch Laboratory Testing",
    desc: "Every shipment is tested in our in-house lab for moisture, drop resistance (1.0m concrete drop test), and sulfur levels before stuffing into containers.",
  },
  {
    icon: "price_check",
    iconColor: "text-secondary",
    iconBg: "bg-surface-container-high",
    title: "Competitive FOB & CIF Direct Contracts",
    desc: "Secure stable, annual fixed-price pricing without volatile seasonal spikes through our direct farmer network across 12,000 hectares.",
  },
];

export default function WhyUs() {
  return (
    <section className="w-full bg-surface py-space-2xl" id="why-us">
      <div className="max-w-[1440px] mx-auto px-gutter-lg">
        <Reveal variant="fadeUp" className="text-center max-w-3xl mx-auto mb-space-2xl">
          <span className="font-label-tech-sm text-label-tech-sm text-primary uppercase tracking-wider">
            Enterprise Procurement Criteria
          </span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface mt-space-xs">
            Engineered to Exceed Overseas Port &amp; Consumer Standards
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-space-xs">
            Our export briquettes are manufactured with food-grade binding, zero synthetic
            additives, and verified self-heating stability for international oceanic transit.
          </p>
        </Reveal>

        <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter-lg" stagger={0.09}>
          {features.map((f) => (
            <StaggerItem key={f.title} variant="fadeUp">
              <motion.div
                className="p-space-lg bg-surface-container rounded-xl border border-outline-variant/30 flex flex-col gap-space-sm h-full"
                whileHover={{
                  y: -6,
                  borderColor: "rgba(249,115,22,0.45)",
                  boxShadow: "0 16px_40px_-8px rgba(0,0,0,0.35)",
                  transition: { duration: 0.22 },
                }}
              >
                <motion.div
                  className={`w-12 h-12 rounded-lg ${f.iconBg} flex items-center justify-center ${f.iconColor}`}
                  whileHover={{ scale: 1.15, rotate: 5, transition: { duration: 0.2 } }}
                >
                  <span className="material-symbols-outlined text-[28px]">{f.icon}</span>
                </motion.div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">{f.title}</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">{f.desc}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}
