"use client";

import React from "react";
import { motion } from "framer-motion";
import { Reveal, StaggerReveal, StaggerItem } from "./animations";

const regions = [
  {
    region: "Middle East & GCC",
    leadTime: "14-18 Days",
    ports: "Jebel Ali, Dammam, Jeddah",
    desc: "High-frequency weekly feeder routes from Port of Semarang and Tanjung Perak to UAE, Saudi Arabia, Kuwait, Bahrain & Qatar.",
    compliance: "SABER & GCC Customs Cleared",
  },
  {
    region: "Europe & UK",
    leadTime: "24-28 Days",
    ports: "Rotterdam, Hamburg, Piraeus",
    desc: "Continuous FCL container volume directly discharging to Netherlands, Germany, Greece, France, and UK regional distribution hubs.",
    compliance: "EU REACH & Forestry V-Legal Compliant",
  },
  {
    region: "North America",
    leadTime: "20-25 Days",
    ports: "Los Angeles, Long Beach, New York",
    desc: "Direct transpacific vessel routing equipped with temperature-monitoring dry containers for US West & East Coast.",
    compliance: "US Customs & EPA Self-Heating Clearance",
  },
  {
    region: "Asia-Pacific & Australia",
    leadTime: "8-14 Days",
    ports: "Sydney, Melbourne, Tokyo, Busan",
    desc: "Rapid direct short-haul transit lanes connecting Port of Jakarta and Bitung to major Australian and East Asian logistics gates.",
    compliance: "Australian DAFF Biosecurity Compliant",
  },
];

const documents = [
  "Original Ocean Bill of Lading (B/L)",
  "Certificate of Origin (COO Form AK/E/A)",
  "Commercial Invoice & Detailed Packing List",
  "Certified Material Safety Data Sheet (MSDS)",
  "Self-Heating Test (SHT) Maritime Certificate",
  "Third-party Survey Assay (Sucofindo / Carsurin)",
  "Container Vanning & Fumigation Certificate",
];

export default function GlobalShipping() {
  return (
    <section className="w-full bg-surface py-space-2xl" id="global-shipping">
      <div className="max-w-[1440px] mx-auto px-gutter-lg">
        {/* Header */}
        <Reveal variant="fadeUp" className="mb-space-2xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
            <div className="flex flex-col gap-space-xs max-w-2xl">
              <span className="font-label-tech-sm text-label-tech-sm text-primary uppercase tracking-wider">
                Ocean Logistics Architecture
              </span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface">
                Exporting to 42+ Ports Across 5 Continents
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Direct sailings from primary Indonesian container terminals with full
                maritime dangerous goods / self-heating compliance certification (SHT Code).
              </p>
            </div>
            <motion.div
              className="flex items-center gap-space-sm font-label-tech-sm text-label-tech-sm text-secondary"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <motion.span
                className="material-symbols-outlined text-[18px]"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                anchor
              </motion.span>
              <span>FOB, CIF, CFR, DDP Incoterms® 2020</span>
            </motion.div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg">
          {/* Logistics Ports Grid */}
          <StaggerReveal className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-space-md" stagger={0.1}>
            {regions.map((r) => (
              <StaggerItem key={r.region} variant="scaleIn">
                <motion.div
                  className="p-space-lg bg-surface-container rounded-xl border border-outline-variant/30 flex flex-col justify-between h-full"
                  whileHover={{
                    y: -5,
                    borderColor: "rgba(249,115,22,0.5)",
                    boxShadow: "0 12px 32px -4px rgba(0,0,0,0.4)",
                    transition: { duration: 0.22 },
                  }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-space-xs">
                      <span className="font-label-tech-sm text-label-tech-sm text-primary uppercase">{r.region}</span>
                      <span className="font-label-tech-sm text-label-tech-sm text-outline">
                        Lead Time: {r.leadTime}
                      </span>
                    </div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface">{r.ports}</h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">{r.desc}</p>
                  </div>
                  <div className="pt-space-md flex items-center gap-space-xs text-xs font-label-tech-sm text-label-tech-sm text-secondary">
                    <motion.span
                      className="material-symbols-outlined text-[14px]"
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      check_circle
                    </motion.span>
                    <span>{r.compliance}</span>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerReveal>

          {/* Documentation Checklist Card */}
          <Reveal className="lg:col-span-4" variant="fadeRight">
            <div className="bg-surface-container-high p-space-lg rounded-xl border border-outline-variant/30 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center gap-space-xs text-primary mb-space-sm">
                  <span className="material-symbols-outlined text-[20px]">folder_special</span>
                  <span className="font-label-tech-sm text-label-tech-sm uppercase">Complete Export Dossier</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-space-sm">
                  Standard Documents Included With Every Consignment:
                </h3>
                <StaggerReveal className="space-y-space-xs font-body-sm text-body-sm text-on-surface-variant" stagger={0.07} delayChildren={0.2}>
                  {documents.map((doc, idx) => (
                    <StaggerItem key={idx} variant="fadeLeft">
                      <motion.div
                        className="flex items-center gap-2"
                        whileHover={{ x: 4, color: "#e3e2e6", transition: { duration: 0.15 } }}
                      >
                        <span className="material-symbols-outlined text-secondary text-[16px]">check</span>
                        {doc}
                      </motion.div>
                    </StaggerItem>
                  ))}
                </StaggerReveal>
              </div>
              <div className="pt-space-md border-t border-outline-variant/20 mt-space-md">
                <span className="font-label-tech-sm text-label-tech-sm text-outline">
                  Custom clearance questions? Consult directly with our in-house shipping desk.
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
