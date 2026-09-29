"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Reveal, StaggerReveal, StaggerItem } from "./animations";

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterJoined, setNewsletterJoined] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) setNewsletterJoined(true);
  };

  return (
    <footer className="w-full bg-surface-container-lowest text-on-surface-variant pt-space-2xl pb-space-xl border-t border-outline-variant/30">
      <div className="max-w-[1440px] mx-auto px-gutter-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-gutter-lg pb-space-2xl">
          {/* Brand */}
          <Reveal className="lg:col-span-4 flex flex-col gap-space-md" variant="fadeUp">
            <div className="flex items-center gap-space-sm">
              <div className="relative h-8 w-8 flex items-center justify-center bg-primary-container/20 rounded-lg p-1 border border-primary-container/40">
                <Image
                  alt="Nusantara Ember Export Logo"
                  className="h-7 w-auto object-contain"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIMj1vrtiVSG-4_2YC6FBxXmbZpx5DIhingFzNAoMz5DM1oGvNxQmpLSjT81rF75dJm7az4fQJwkHBUJZMCHbG7qI1uZwf0gurt5MS5cKCE70Hlqtfl7D_DIcC3oAASBwoESC1J_KfeTNoAn1ECxG59T2LdBYKymR2G5ClqSAkxN8G185cM93b9k8lixJ7V4glU24bVe2HS2ugTJFIHYp1RtRTqmEwpVCtcPGAtemSfFUTJjhK37ar"
                  width={32} height={32} unoptimized
                />
              </div>
              <span className="font-headline-sm text-headline-sm text-on-surface">PT Nusantara Ember Indonesia</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant max-w-sm">
              Premier industrial-scale manufacturer and licensed global exporter of
              laboratory-grade 100% coconut shell briquettes and sustainably-harvested
              Indonesian hardwood charcoal. Supplying FCL consignments across 42+ sovereign ports.
            </p>
            <div className="flex flex-wrap gap-space-xs pt-space-xs">
              {[
                { icon: "verified", color: "text-secondary", label: "KEMENDAG Registered Exporter" },
                { icon: "science", color: "text-tertiary", label: "SUCOFINDO Verified Assay" },
              ].map((b) => (
                <motion.div
                  key={b.label}
                  className="inline-flex items-center gap-space-xs bg-surface-container px-space-sm py-1 rounded-lg text-on-surface font-label-tech-sm text-label-tech-sm border border-outline-variant/30"
                  whileHover={{ y: -2, borderColor: "rgba(249,115,22,0.4)", transition: { duration: 0.18 } }}
                >
                  <span className={`material-symbols-outlined ${b.color} text-[16px]`}>{b.icon}</span>
                  <span>{b.label}</span>
                </motion.div>
              ))}
            </div>
          </Reveal>

          {/* Procurement Grades nav */}
          <Reveal className="lg:col-span-3 flex flex-col gap-space-sm" variant="fadeUp" delay={0.07}>
            <span className="font-headline-sm text-headline-sm text-on-surface uppercase tracking-wider">Procurement Grades</span>
            <nav className="flex flex-col gap-space-xs">
              {[
                { label: "Hookah & Shisha Cubes (25x25, 26x26)", href: "#technical-specifications" },
                { label: "BBQ Hexagonal Sawdust Briquettes", href: "#technical-specifications" },
                { label: "Natural Hardwood Lump (Halaban & Tamarind)", href: "#technical-specifications" },
                { label: "Activated Carbon Precursor Raw Charcoal", href: "#technical-specifications" },
                { label: "FCL Container Estimator & Packaging", href: "#fcl-calculator" },
              ].map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  className="font-body-sm text-body-sm text-on-surface-variant"
                  whileHover={{ x: 4, color: "#e3e2e6", transition: { duration: 0.15 } }}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
          </Reveal>

          {/* Export Hubs */}
          <Reveal className="lg:col-span-2 flex flex-col gap-space-sm" variant="fadeUp" delay={0.14}>
            <span className="font-headline-sm text-headline-sm text-on-surface uppercase tracking-wider">Export Hubs</span>
            <div className="flex flex-col gap-space-md font-body-sm text-body-sm">
              <div className="flex flex-col gap-1">
                <span className="text-on-surface font-headline-sm text-headline-sm text-sm">Commercial HQ</span>
                <span className="text-on-surface-variant">Cyber 2 Tower, Level 28<br />HR Rasuna Said, Jakarta Selatan 12950</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-on-surface font-headline-sm text-headline-sm text-sm">Primary Kiln &amp; Factory</span>
                <span className="text-on-surface-variant">Kawasan Industri Kendal (KIK), Central Java<br />Discharge: Port of Tanjung Emas (Semarang)</span>
              </div>
            </div>
          </Reveal>

          {/* Commodity Newsletter */}
          <Reveal className="lg:col-span-3 flex flex-col gap-space-md" variant="fadeUp" delay={0.21}>
            <span className="font-headline-sm text-headline-sm text-on-surface uppercase tracking-wider">Commodity Price Index</span>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Subscribe to bi-weekly FOB Indonesia ocean freight updates, container stuffing schedules, and bulk raw material yield indices.
            </p>
            <div className="flex flex-col gap-space-xs">
              {newsletterJoined ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-2.5 rounded-lg bg-surface-container text-secondary font-label-tech-sm flex items-center gap-1.5 border border-secondary/30"
                >
                  <span className="material-symbols-outlined text-[18px]">check_circle</span>
                  <span>Subscribed to trade bulletins!</span>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleNewsletterSubmit}
                  className="flex items-center rounded-lg bg-surface-container px-space-sm py-space-xs border border-outline-variant/30 focus-within:border-primary-container/50 transition-colors"
                >
                  <input
                    className="w-full bg-transparent font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none"
                    placeholder="buyer@global-distributor.com"
                    type="email" required
                    value={newsletterEmail} onChange={(e) => setNewsletterEmail(e.target.value)}
                  />
                  <motion.button
                    type="submit"
                    className="px-space-md py-1.5 rounded-lg bg-primary-container text-on-surface font-label-tech-lg text-label-tech-lg font-bold shrink-0 cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    Join
                  </motion.button>
                </form>
              )}
              <span className="font-label-tech-sm text-label-tech-sm text-outline">
                Direct dispatch to verified commodity procurement desks only.
              </span>
            </div>
          </Reveal>
        </div>

        {/* Bottom Bar */}
        <Reveal variant="fadeUp" delay={0.1}>
          <div className="pt-space-lg border-t border-outline-variant/30 flex flex-col md:flex-row items-center justify-between gap-space-md text-on-surface-variant font-label-tech-sm text-label-tech-sm">
            <div className="flex flex-wrap items-center gap-space-md">
              <span>© 2025 PT Nusantara Ember Indonesia. All rights reserved.</span>
              <span>Incoterms® 2020 Compliant (FOB / CIF / CFR)</span>
            </div>
            <div className="flex items-center gap-space-lg">
              {["Terms of Ocean Freight & Trade", "Data Privacy", "Self-Heating Maritime Declarations"].map((l) => (
                <motion.a
                  key={l} href="#"
                  className="text-on-surface-variant"
                  whileHover={{ color: "#e3e2e6", transition: { duration: 0.15 } }}
                >
                  {l}
                </motion.a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
