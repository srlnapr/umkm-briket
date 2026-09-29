"use client";

import React from "react";
import { motion } from "framer-motion";
import { Reveal, StaggerReveal, StaggerItem, fadeLeft } from "./animations";

const steps = [
  { num: "01", title: "Shell Sorting", desc: "Aged coconut only" },
  { num: "02", title: "Carbonization", desc: "Smokeless retort" },
  { num: "03", title: "Fine Milling", desc: "Magnetic de-stoning" },
  { num: "04", title: "Tapioca Bind", desc: "Food-grade binder" },
  { num: "05", title: "Extrusion", desc: "High-ton hydraulic" },
  { num: "06", title: "72h Drying", desc: "Moisture < 5%" },
  { num: "07", title: "QC Testing", desc: "Drop & ash assay" },
  { num: "08", title: "Shrink Pack", desc: "Moisture barrier" },
];

const statCards = [
  {
    icon: "factory",
    iconColor: "text-primary-container",
    label: "3 Plants",
    metric: "3 Facilities",
    desc: "Central Java, East Java & Bitung (Sulawesi) dedicated solely to export briquette manufacturing.",
    hoverBorder: "hover:border-primary-container/40",
  },
  {
    icon: "local_fire_department",
    iconColor: "text-primary",
    label: "Controlled Heat",
    metric: "45 Industrial Kilns",
    desc: "Closed-retort automated carbonization ovens ensuring homogenous charring and 0% uncarbonized wood.",
    hoverBorder: "hover:border-primary/40",
  },
  {
    icon: "inventory_2",
    iconColor: "text-secondary",
    label: "Monthly Volume",
    metric: "650 – 1,000 MT",
    desc: "Guaranteed container stuffing capacity ready for multi-year corporate delivery commitments.",
    hoverBorder: "hover:border-secondary/40",
  },
  {
    icon: "handshake",
    iconColor: "text-tertiary",
    label: "Pricing Model",
    metric: "Factory Direct FOB",
    desc: "Zero intermediary traders or brokers. Direct trade contracts protected by Indonesian chamber jurisdiction.",
    hoverBorder: "hover:border-tertiary/40",
  },
];

export default function FactoryCapacity() {
  return (
    <section className="w-full bg-surface py-space-2xl" id="factory-capacity">
      <div className="max-w-[1440px] mx-auto px-gutter-lg">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg mb-space-2xl">
          {/* Left Column */}
          <Reveal className="lg:col-span-5 flex flex-col gap-space-md" variant="fadeLeft">
            <div className="inline-flex items-center gap-space-xs text-primary font-label-tech-sm text-label-tech-sm tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-primary-container"></span>
              Operational Infrastructure
            </div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface">
              Integrated Indonesian Kilns &amp; Massive High-Density Stamping
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              PT Nusantara Ember operates vertically integrated manufacturing facilities
              spanning Central Java (Kendal Industrial Park) and coastal coconut plantations
              in North Sulawesi. By managing the carbonization chain from aged raw coconut
              shell to packaging lines, we eliminate moisture spikes and volatile contaminants.
            </p>
            <div className="flex flex-wrap items-center gap-space-sm pt-space-xs">
              <span className="px-space-md py-1.5 rounded bg-surface-container-high text-on-surface font-label-tech-sm text-label-tech-sm border border-outline-variant/30">
                NIB: 9120008471203
              </span>
              <span className="px-space-md py-1.5 rounded bg-surface-container-high text-secondary font-label-tech-sm text-label-tech-sm border border-secondary/30">
                Export Registry: ID-EXP-ID0094
              </span>
            </div>
          </Reveal>

          {/* Right Column: Stat Cards with stagger */}
          <StaggerReveal className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-space-md" stagger={0.1} delayChildren={0.1}>
            {statCards.map((s) => (
              <StaggerItem key={s.icon}>
                <motion.div
                  className={`p-space-lg bg-surface-container rounded-xl border border-outline-variant/20 flex flex-col justify-between h-full ${s.hoverBorder} transition-colors`}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                >
                  <div className="flex items-center justify-between">
                    <span className={`material-symbols-outlined ${s.iconColor} text-[32px]`}>{s.icon}</span>
                    <span className="font-label-tech-sm text-label-tech-sm text-outline">{s.label}</span>
                  </div>
                  <div className="pt-space-lg">
                    <span className="font-metric-tabular text-metric-tabular text-on-surface block">{s.metric}</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">{s.desc}</span>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>

        {/* Factory Process Flow */}
        <Reveal variant="fadeUp">
          <div className="bg-surface-container-low p-space-xl rounded-2xl border border-outline-variant/30">
            <div className="flex items-center justify-between mb-space-lg flex-wrap gap-space-sm">
              <div>
                <span className="font-label-tech-sm text-label-tech-sm text-primary uppercase">Manufacturing Integrity</span>
                <h3 className="font-headline-md text-headline-md text-on-surface">Precision 8-Stage Production Flow</h3>
              </div>
              <span className="px-space-md py-1 rounded bg-surface-container-high text-on-surface-variant font-label-tech-sm text-label-tech-sm border border-outline-variant/40">
                ISO 9001:2015 Protocol
              </span>
            </div>

            <StaggerReveal className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-space-sm" stagger={0.06}>
              {steps.map((s, i) => (
                <StaggerItem key={s.num} variant="scaleIn">
                  <motion.div
                    className="p-space-sm bg-surface-container rounded-lg flex flex-col border border-outline-variant/10 hover:border-primary-container/50 transition-colors cursor-default h-full"
                    whileHover={{ y: -3, scale: 1.04, transition: { duration: 0.18 } }}
                  >
                    <span className="font-label-tech-sm text-label-tech-sm text-primary">{s.num}</span>
                    <span className="font-headline-sm text-headline-sm text-sm text-on-surface mt-1">{s.title}</span>
                    <span className="font-body-sm text-body-sm text-outline text-xs mt-1">{s.desc}</span>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerReveal>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
