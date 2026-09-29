"use client";

import React from "react";
import { motion } from "framer-motion";
import { Reveal, StaggerReveal, StaggerItem } from "./animations";

export default function ProductSpecs() {
  return (
    <section
      className="w-full bg-surface-container-lowest py-space-2xl"
      id="technical-specifications"
    >
      <div className="max-w-[1440px] mx-auto px-gutter-lg">
        {/* Header */}
        <Reveal variant="fadeUp" className="mb-space-2xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
            <div className="flex flex-col gap-space-xs max-w-2xl">
              <span className="font-label-tech-sm text-label-tech-sm text-primary uppercase tracking-wider">
                Export Procurement Matrix
              </span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface">
                Laboratory-Graded Product Classifications
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Calibrated for international shisha distributor networks, hospitality
                catering, and heavy chemical activated carbon preprocessing.
              </p>
            </div>
            <div className="flex items-center gap-space-xs">
              <span className="font-label-tech-sm text-label-tech-sm text-outline uppercase">Standard:</span>
              <span className="px-space-sm py-1 rounded bg-surface-container font-label-tech-sm text-label-tech-sm text-on-surface border border-outline-variant/30">
                ASTM D3172-13 compliant
              </span>
            </div>
          </div>
        </Reveal>

        {/* 3 Flagship Products Bento */}
        <StaggerReveal className="grid grid-cols-1 lg:grid-cols-3 gap-gutter-lg mb-space-2xl" stagger={0.12}>
          {/* Grade A */}
          <StaggerItem variant="fadeUp">
            <motion.div
              className="bg-surface-container rounded-2xl p-space-xl flex flex-col justify-between border border-outline-variant/30 h-full"
              whileHover={{ y: -6, borderColor: "rgba(249,115,22,0.6)", boxShadow: "0 20px 40px -8px rgba(0,0,0,0.4)", transition: { duration: 0.25 } }}
            >
              <div>
                <div className="flex items-center justify-between mb-space-md">
                  <span className="px-space-md py-1 rounded-full bg-primary-container/20 text-primary-container font-label-tech-sm text-label-tech-sm font-bold border border-primary-container/30">
                    GRADE A - SHISHA
                  </span>
                  <span className="font-label-tech-sm text-label-tech-sm text-outline">MOQ: 1x20ft FCL</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface">Platinum Coconut Cube</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-xs mb-space-md">
                  Engineered specifically for premium hookah &amp; shisha lounges. Zero sulfur,
                  odorless, and yields snow-white residue.
                </p>
                <div className="space-y-space-xs text-sm">
                  {[
                    { label: "Available Cuts", value: "25x25x25mm / 26x26x26mm / 22mm", color: "text-on-surface" },
                    { label: "Ash Content", value: "< 2.0% (Clean White)", color: "text-secondary" },
                    { label: "Calorific Energy", value: "7,600 kcal/kg", color: "text-primary" },
                    { label: "Burning Duration", value: "150+ minutes", color: "text-on-surface" },
                  ].map((row) => (
                    <div key={row.label} className="flex justify-between py-1 bg-surface-container-high px-space-sm rounded">
                      <span className="text-on-surface-variant">{row.label}</span>
                      <span className={`font-headline-sm text-headline-sm text-sm ${row.color}`}>{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <motion.a
                className="mt-space-lg w-full text-center py-2.5 rounded bg-surface-container-highest font-label-tech-lg text-label-tech-lg text-on-surface block"
                href="#rfq-inquiry"
                whileHover={{ backgroundColor: "rgb(249,115,22)", color: "#fff" }}
                transition={{ duration: 0.2 }}
              >
                Inquire Shisha Grade
              </motion.a>
            </motion.div>
          </StaggerItem>

          {/* Grade B */}
          <StaggerItem variant="fadeUp">
            <motion.div
              className="bg-surface-container rounded-2xl p-space-xl flex flex-col justify-between border border-outline-variant/30 h-full"
              whileHover={{ y: -6, borderColor: "rgba(185,200,222,0.6)", boxShadow: "0 20px 40px -8px rgba(0,0,0,0.4)", transition: { duration: 0.25 } }}
            >
              <div>
                <div className="flex items-center justify-between mb-space-md">
                  <span className="px-space-md py-1 rounded-full bg-tertiary-container/30 text-tertiary font-label-tech-sm text-label-tech-sm font-bold border border-tertiary/30">
                    GRADE B - BBQ &amp; GRILL
                  </span>
                  <span className="font-label-tech-sm text-label-tech-sm text-outline">MOQ: 1x20ft FCL</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface">Hexagonal &amp; Pillow Briquettes</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-xs mb-space-md">
                  Heavyweight high-density extrusion with inner airflow channel. Steady
                  high-temperature sustained radiation for commercial steakhouses.
                </p>
                <div className="space-y-space-xs text-sm">
                  {[
                    { label: "Available Cuts", value: "Hex 50x100mm, 50x150mm / Pillow", color: "text-on-surface" },
                    { label: "Ash Content", value: "3.5% – 5.5% (Light Grey)", color: "text-on-surface" },
                    { label: "Calorific Energy", value: "7,200 kcal/kg", color: "text-primary" },
                    { label: "Burning Duration", value: "4.0 – 5.5 hours steady", color: "text-on-surface" },
                  ].map((row) => (
                    <div key={row.label} className="flex justify-between py-1 bg-surface-container-high px-space-sm rounded">
                      <span className="text-on-surface-variant">{row.label}</span>
                      <span className={`font-headline-sm text-headline-sm text-sm ${row.color}`}>{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <motion.a
                className="mt-space-lg w-full text-center py-2.5 rounded bg-surface-container-highest font-label-tech-lg text-label-tech-lg text-on-surface block"
                href="#rfq-inquiry"
                whileHover={{ backgroundColor: "rgb(249,115,22)", color: "#fff" }}
                transition={{ duration: 0.2 }}
              >
                Inquire BBQ Grade
              </motion.a>
            </motion.div>
          </StaggerItem>

          {/* Grade C */}
          <StaggerItem variant="fadeUp">
            <motion.div
              className="bg-surface-container rounded-2xl p-space-xl flex flex-col justify-between border border-outline-variant/30 h-full"
              whileHover={{ y: -6, borderColor: "rgba(121,219,141,0.6)", boxShadow: "0 20px 40px -8px rgba(0,0,0,0.4)", transition: { duration: 0.25 } }}
            >
              <div>
                <div className="flex items-center justify-between mb-space-md">
                  <span className="px-space-md py-1 rounded-full bg-secondary-container/30 text-secondary font-label-tech-sm text-label-tech-sm font-bold border border-secondary/30">
                    GRADE C - INDUSTRIAL
                  </span>
                  <span className="font-label-tech-sm text-label-tech-sm text-outline">MOQ: 1x40ft HC</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface">Granular Carbon Precursor</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-xs mb-space-md">
                  Natural coconut shell crushed charcoal for water filtration, gold recovery
                  metallurgy, and air purification production.
                </p>
                <div className="space-y-space-xs text-sm">
                  {[
                    { label: "Granulation Sizes", value: "Mesh 3x6, 4x8, 8x30, Raw Crushed", color: "text-on-surface" },
                    { label: "Fixed Carbon", value: "> 78%", color: "text-on-surface" },
                    { label: "Moisture Content", value: "< 8.0%", color: "text-on-surface" },
                    { label: "Packing Method", value: "500kg Jumbo Bag / 25kg PP", color: "text-on-surface" },
                  ].map((row) => (
                    <div key={row.label} className="flex justify-between py-1 bg-surface-container-high px-space-sm rounded">
                      <span className="text-on-surface-variant">{row.label}</span>
                      <span className={`font-headline-sm text-headline-sm text-sm ${row.color}`}>{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <motion.a
                className="mt-space-lg w-full text-center py-2.5 rounded bg-surface-container-highest font-label-tech-lg text-label-tech-lg text-on-surface block"
                href="#rfq-inquiry"
                whileHover={{ backgroundColor: "rgb(249,115,22)", color: "#fff" }}
                transition={{ duration: 0.2 }}
              >
                Inquire Industrial Bulk
              </motion.a>
            </motion.div>
          </StaggerItem>
        </StaggerReveal>

        {/* COA Comparison Table */}
        <Reveal variant="fadeUp">
          <div className="bg-surface-container rounded-2xl overflow-hidden p-space-lg border border-outline-variant/30">
            <div className="flex items-center justify-between pb-space-md mb-space-md flex-wrap gap-2 border-b border-outline-variant/30">
              <div className="flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-primary text-[24px]">science</span>
                <span className="font-headline-sm text-headline-sm text-on-surface">
                  Official Certificate of Analysis (COA) Technical Matrix
                </span>
              </div>
              <span className="font-label-tech-sm text-label-tech-sm text-outline">Verified by Sucofindo Indonesia</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left font-body-sm text-body-sm text-on-surface min-w-[700px]">
                <thead>
                  <tr className="bg-surface-container-high text-on-surface font-label-tech-sm text-label-tech-sm uppercase">
                    <th className="py-space-sm px-space-md">Laboratory Metric</th>
                    <th className="py-space-sm px-space-md">Test Protocol</th>
                    <th className="py-space-sm px-space-md">Grade A (Hookah Shisha)</th>
                    <th className="py-space-sm px-space-md">Grade B (BBQ Hexagonal)</th>
                    <th className="py-space-sm px-space-md">Grade C (Industrial Lump)</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { metric: "Ash Content", protocol: "ASTM D3174", a: "≤ 2.0%", aColor: "text-secondary font-bold font-metric-tabular", b: "≤ 5.0%", c: "≤ 4.0%" },
                    { metric: "Ash Color", protocol: "Visual Spectrometry", a: "100% White Ash", b: "Light Natural Grey", c: "Natural Grey", bg: "bg-surface-container-low" },
                    { metric: "Moisture Content", protocol: "ASTM D3173", a: "≤ 4.5%", b: "≤ 6.0%", c: "≤ 8.0%" },
                    { metric: "Fixed Carbon", protocol: "ASTM D3172", a: "> 82.5%", aColor: "text-primary font-bold font-metric-tabular", b: "> 75.0%", c: "> 78.0%", bg: "bg-surface-container-low" },
                    { metric: "Gross Calorific Value", protocol: "ASTM D5865", a: "> 7,600 kcal/kg", aColor: "text-primary-container font-bold font-metric-tabular", b: "> 7,200 kcal/kg", c: "> 7,100 kcal/kg" },
                    { metric: "Drop Strength Test (1.0m)", protocol: "ISO 616", a: "> 3 Drops (0% Fracture)", aColor: "text-secondary", b: "> 3 Drops (0% Fracture)", bColor: "text-secondary", c: "N/A (Granular)", cColor: "text-outline", bg: "bg-surface-container-low" },
                    { metric: "Sparks & Odor Level", protocol: "Organoleptic / Ignition", a: "Zero Sparks / Odorless", aColor: "text-secondary", b: "Zero Sparks / Odorless", bColor: "text-secondary", c: "Minimal" },
                  ].map((row, i) => (
                    <motion.tr
                      key={row.metric}
                      className={`${row.bg ?? "bg-surface-container"} transition-colors cursor-default`}
                      whileHover={{ backgroundColor: "rgba(52,53,56,0.8)" }}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06 }}
                    >
                      <td className="py-space-sm px-space-md font-semibold text-on-surface">{row.metric}</td>
                      <td className="py-space-sm px-space-md text-outline">{row.protocol}</td>
                      <td className={`py-space-sm px-space-md ${row.aColor ?? "font-metric-tabular"}`}>{row.a}</td>
                      <td className={`py-space-sm px-space-md ${row.bColor ?? "font-metric-tabular"}`}>{row.b}</td>
                      <td className={`py-space-sm px-space-md ${row.cColor ?? "font-metric-tabular"}`}>{row.c}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
