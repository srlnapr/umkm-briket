"use client";

import React from "react";
import { motion } from "framer-motion";
import { Reveal, StaggerReveal, StaggerItem, fadeLeft, fadeRight } from "./animations";

export default function PackagingOEM() {
  const packItems = [
    {
      icon: "all_inbox",
      iconColor: "text-primary",
      title: "1kg Inner Boxes + Airtight Sealed Polyethylene Wrap",
      desc: "Full-color duplex 250–350 gsm board with matte/gloss lamination, foil stamping, and embossed logos.",
    },
    {
      icon: "pallet",
      iconColor: "text-secondary",
      title: "10kg / 20kg Heavy-Duty Corrugated Master Cartons",
      desc: "Double-wall export craft boxes with heavy strapping for ocean freight container stacking up to 7 tiers high.",
    },
    {
      icon: "palette",
      iconColor: "text-tertiary",
      title: "Free In-House Packaging Design Support",
      desc: "Our packaging graphics team formats your typography, multi-language regulatory statements, and compliance symbols at zero cost.",
    },
  ];

  return (
    <section className="w-full bg-surface-container-lowest py-space-2xl" id="packaging-oem">
      <div className="max-w-[1440px] mx-auto px-gutter-lg">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg items-center">
          {/* Left Column */}
          <Reveal className="lg:col-span-6 flex flex-col gap-space-md" variant="fadeLeft">
            <span className="font-label-tech-sm text-label-tech-sm text-primary uppercase tracking-wider">
              Private Label &amp; Custom Packaging
            </span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface">
              Turnkey OEM Solutions for Global Retail &amp; Lounge Brands
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              We manufacture under your proprietary brand identity. We provide complete
              design support, custom die-cut box layouts, barcodes/EAN printing, and
              certified packaging materials that preserve factory moisture levels under
              humid sea transit.
            </p>
            <StaggerReveal className="space-y-space-sm pt-space-xs" stagger={0.1}>
              {packItems.map((item) => (
                <StaggerItem key={item.icon} variant="fadeLeft">
                  <motion.div
                    className="p-space-md bg-surface-container rounded-lg flex items-start gap-space-md border border-outline-variant/20"
                    whileHover={{ x: 4, borderColor: "rgba(249,115,22,0.35)", transition: { duration: 0.2 } }}
                  >
                    <motion.span
                      className={`material-symbols-outlined ${item.iconColor} text-[24px] shrink-0 mt-0.5`}
                      whileHover={{ scale: 1.2, rotate: -8, transition: { duration: 0.2 } }}
                    >
                      {item.icon}
                    </motion.span>
                    <div>
                      <span className="font-headline-sm text-headline-sm text-base text-on-surface block">
                        {item.title}
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        {item.desc}
                      </span>
                    </div>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerReveal>
          </Reveal>

          {/* Right Column: MOQ Cards */}
          <Reveal className="lg:col-span-6" variant="fadeRight">
            <div className="bg-surface-container p-space-xl rounded-2xl flex flex-col gap-space-lg border border-outline-variant/30">
              <div className="flex items-center justify-between pb-space-sm border-b border-outline-variant/30">
                <h3 className="font-headline-md text-headline-md text-on-surface">
                  Standard Minimum Order Volumes (MOQ)
                </h3>
                <span className="px-space-md py-1 rounded bg-surface-container-high text-primary font-label-tech-sm text-label-tech-sm border border-primary/20">
                  Export Container Ready
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                {[
                  { label: "20ft Standard FCL", icon: "directions_boat", iconColor: "text-primary", metric: "18 – 20 Metric Tons", sub: "Approx. 18,000 x 1kg boxes or bulk master cartons." },
                  { label: "40ft High Cube (HC)", icon: "directions_boat", iconColor: "text-secondary", metric: "26 – 28 Metric Tons", sub: "Maximized payload per container for optimized ocean freight cost." },
                ].map((c) => (
                  <motion.div
                    key={c.label}
                    className="p-space-md bg-surface-container-low rounded-xl flex flex-col justify-between border border-outline-variant/20"
                    whileHover={{ y: -4, borderColor: "rgba(249,115,22,0.4)", transition: { duration: 0.2 } }}
                  >
                    <div className="flex items-center justify-between mb-space-sm">
                      <span className="font-label-tech-lg text-label-tech-lg text-on-surface">{c.label}</span>
                      <motion.span
                        className={`material-symbols-outlined ${c.iconColor} text-[20px]`}
                        animate={{ x: [0, 3, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: Math.random() }}
                      >
                        {c.icon}
                      </motion.span>
                    </div>
                    <span className="font-metric-tabular text-metric-tabular text-on-surface block">{c.metric}</span>
                    <span className="font-body-sm text-body-sm text-outline mt-1">{c.sub}</span>
                  </motion.div>
                ))}
              </div>

              {/* Sample Box Banner */}
              <motion.div
                className="p-space-md bg-surface-container-high rounded-xl flex items-center justify-between flex-wrap gap-space-sm border border-outline-variant/30"
                whileHover={{ borderColor: "rgba(249,115,22,0.4)", transition: { duration: 0.2 } }}
              >
                <div className="flex items-center gap-space-sm">
                  <motion.span
                    className="material-symbols-outlined text-primary text-[24px]"
                    animate={{ rotateY: [0, 360] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  >
                    mark_email_read
                  </motion.span>
                  <div className="flex flex-col">
                    <span className="font-headline-sm text-headline-sm text-sm text-on-surface">
                      Complimentary Sample Box (1-2 kg)
                    </span>
                    <span className="font-body-sm text-body-sm text-outline">
                      Shipped internationally via DHL / FedEx Express (Buyer pays freight)
                    </span>
                  </div>
                </div>
                <motion.a
                  href="#rfq-inquiry"
                  className="px-space-md py-1.5 rounded bg-primary-container text-on-surface font-label-tech-sm text-label-tech-sm font-bold shrink-0"
                  whileHover={{ scale: 1.05, boxShadow: "0 8px 20px -4px rgba(249,115,22,0.4)" }}
                  whileTap={{ scale: 0.96 }}
                >
                  Request Sample
                </motion.a>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
