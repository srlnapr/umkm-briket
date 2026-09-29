"use client";

import React from "react";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import {
  Reveal,
  StaggerReveal,
  StaggerItem,
  AnimatedNumber,
  fadeRight,
} from "./animations";

const easeOut = [0.22, 1, 0.36, 1] as [number, number, number, number];

const metrics = [
  {
    label: "Monthly Output",
    value: 650,
    suffix: "+ MT",
    valueColor: "text-primary",
    sub: "3 Kiln Facilities",
    subColor: "text-outline",
  },
  {
    label: "Ash Purity",
    value: 2.2,
    prefix: "≤ ",
    suffix: "%",
    valueColor: "text-on-surface",
    sub: "100% White Ash",
    subColor: "text-secondary",
    dot: true,
  },
  {
    label: "Fixed Carbon",
    value: 82,
    prefix: "> ",
    suffix: "%",
    valueColor: "text-on-surface",
    sub: "Zero Fillers",
    subColor: "text-outline",
  },
  {
    label: "Calorific Energy",
    value: 7500,
    prefix: "> ",
    valueColor: "text-primary-container",
    sub: "Kcal/kg High Density",
    subColor: "text-outline",
  },
];

const trustItems = [
  { icon: "verified", color: "text-secondary", text: "SUCOFINDO Verified Assay" },
  { icon: "task_alt", color: "text-secondary", text: "SGS Laboratory Inspected" },
  { icon: "format_image_left", color: "text-primary", text: "MSDS & SHT Maritime Cleared" },
  { icon: "description", color: "text-tertiary", text: "ROA & COA Issued Per Container" },
  { icon: "eco", color: "text-secondary", text: "V-Legal Ministry of Forestry Registered" },
];

// Hero left column stagger container
const heroContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

// Child fade-up variant (inline, typed)
const childFadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
};

export default function HeroSection() {
  return (
    <section className="relative w-full bg-surface-container-lowest overflow-hidden py-space-2xl">
      {/* Background Ambient Glows */}
      <div className="absolute inset-0 bg-gradient-to-r from-surface-container-lowest via-surface-container-lowest/80 to-transparent z-10 pointer-events-none" />
      <motion.div
        className="absolute -top-32 -left-32 w-96 h-96 bg-primary-container/15 rounded-full blur-[120px] pointer-events-none"
        animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 right-10 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[140px] pointer-events-none"
        animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <div className="max-w-[1440px] mx-auto px-gutter-lg relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg items-center">
          {/* Hero Content Left */}
          <motion.div
            className="lg:col-span-7 flex flex-col gap-space-lg"
            initial="hidden"
            animate="visible"
            variants={heroContainer}
          >
            {/* Badge */}
            <motion.div
              variants={childFadeUp}
              className="inline-flex items-center gap-space-xs px-space-md py-1.5 rounded-full bg-surface-container w-fit border border-outline-variant/30"
            >
              <span className="material-symbols-outlined text-secondary text-[18px]">verified</span>
              <span className="font-label-tech-sm text-label-tech-sm text-on-surface uppercase tracking-wider">
                Direct Verified Manufacturer • Central Java &amp; North Sulawesi
              </span>
            </motion.div>

            {/* H1 */}
            <motion.h1
              variants={childFadeUp}
              className="font-headline-lg text-headline-lg lg:font-display-hero lg:text-display-hero text-on-surface tracking-tight leading-tight"
            >
              Premium 100% Coconut Shell{" "}
              <motion.span
                className="text-primary-container"
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                Charcoal Briquettes
              </motion.span>{" "}
              from Indonesia
            </motion.h1>

            {/* Paragraph */}
            <motion.p
              variants={childFadeUp}
              className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl"
            >
              Export-grade charcoal manufactured for luxury shisha lounges, premium BBQ
              chains, and industrial importers. Guaranteed &lt;2.5% white ash, zero
              chemicals, burning time 2.5+ hours. Shipped worldwide from Tanjung Perak &amp;
              Tanjung Priok.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={childFadeUp}
              className="flex flex-wrap items-center gap-space-md pt-space-xs"
            >
              <motion.a
                href="#rfq-inquiry"
                className="inline-flex items-center gap-space-xs px-space-xl py-space-md rounded-lg bg-primary-container text-on-surface font-headline-sm text-headline-sm text-base font-bold shadow-xl"
                whileHover={{ scale: 1.04, boxShadow: "0 20px 40px -8px rgba(249,115,22,0.45)" }}
                whileTap={{ scale: 0.97 }}
              >
                <span>Request Export Quote &amp; Sample</span>
                <motion.span
                  className="material-symbols-outlined text-[20px]"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  arrow_forward
                </motion.span>
              </motion.a>
              <motion.a
                href="#technical-specifications"
                className="inline-flex items-center gap-space-xs px-space-lg py-space-md rounded-lg bg-surface-container-high text-on-surface font-label-tech-lg text-label-tech-lg"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="material-symbols-outlined text-tertiary text-[20px]">download</span>
                <span>Download Full Spec Sheet (.PDF)</span>
              </motion.a>
            </motion.div>

            {/* Tabular Trust Metrics Grid */}
            <motion.div
              variants={childFadeUp}
              className="grid grid-cols-2 sm:grid-cols-4 gap-space-sm pt-space-md"
            >
              {metrics.map((m, i) => (
                <motion.div
                  key={m.label}
                  className="p-space-md bg-surface-container rounded-lg border border-outline-variant/20 flex flex-col"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.1, duration: 0.5, ease: easeOut }}
                  whileHover={{ y: -3, borderColor: "rgba(249,115,22,0.5)", transition: { duration: 0.2 } }}
                >
                  <span className="font-label-tech-sm text-label-tech-sm text-on-surface-variant uppercase">
                    {m.label}
                  </span>
                  <span className={`font-metric-tabular text-metric-tabular ${m.valueColor}`}>
                    {m.prefix ?? ""}
                    <AnimatedNumber target={m.value} suffix={m.suffix ?? ""} duration={1.6} />
                  </span>
                  <span className={`font-body-sm text-body-sm ${m.subColor} flex items-center gap-1 mt-0.5`}>
                    {m.dot && <span className="w-2 h-2 rounded-full bg-secondary inline-block" />}
                    {m.sub}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Hero Visual Right */}
          <motion.div
            className="lg:col-span-5 relative"
            variants={fadeRight}
            initial="hidden"
            animate="visible"
          >
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-2xl bg-surface-container border border-outline-variant/30">
              <motion.div
                className="w-full h-full"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6, ease: easeOut }}
              >
                <Image
                  alt="Glowing high-density coconut shell charcoal cubes with embers and sparks"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAa59vk1qxWreQIBGr8AbG0Jy4vBF_DySc-jHacz4qBKFcdWa3hcNm5lkDbhg7KaRIDYonrPeL8xnOeU7Ms54dAQ9v0QUYx86-6fnmPT5gDevfUx6RTbTQJ3H6wFfjL_wD7WgOUTq9m6YpG2OctH1dcWin1wPGJBSBIzDDNLJ2QANvURy1UzNphJFq9nfBQ4gO8YlLr922ZmAyq5WW9iJiTY0sb-UOQUfdxT43OTGXHhBXGPJqxNhsI"
                  width={700}
                  height={700}
                  priority
                  unoptimized
                />
              </motion.div>

              {/* Inspection Badge */}
              <motion.div
                className="absolute bottom-4 left-4 right-4 bg-surface-container-lowest/90 backdrop-blur-md p-space-md rounded-xl flex items-center justify-between border border-outline-variant/40"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.5, ease: easeOut }}
              >
                <div className="flex items-center gap-space-sm">
                  <motion.span
                    className="w-3 h-3 rounded-full bg-secondary"
                    animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <div className="flex flex-col">
                    <span className="font-label-tech-lg text-label-tech-lg text-on-surface">
                      Factory Direct Inspection
                    </span>
                    <span className="font-label-tech-sm text-label-tech-sm text-outline">
                      Lot #NE-2025-081 • Port of Semarang Ready
                    </span>
                  </div>
                </div>
                <span className="px-space-sm py-1 bg-surface-container-highest rounded font-label-tech-sm text-label-tech-sm text-primary font-bold border border-primary/20">
                  GRADE AAA
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Trust Strip */}
      <Reveal className="w-full bg-surface-container-low mt-space-2xl py-space-md border-y border-outline-variant/20">
        <div className="max-w-[1440px] mx-auto px-gutter-lg flex flex-wrap items-center justify-between gap-space-md">
          <span className="font-label-tech-sm text-label-tech-sm uppercase text-outline">
            Audited Regulatory Credentials:
          </span>
          <StaggerReveal
            className="flex flex-wrap items-center gap-space-lg font-label-tech-sm text-label-tech-sm text-on-surface-variant"
            stagger={0.07}
          >
            {trustItems.map((t) => (
              <StaggerItem key={t.text} variant="fadeUp">
                <div className="flex items-center gap-1.5">
                  <span className={`material-symbols-outlined ${t.color} text-[16px]`}>{t.icon}</span>
                  <span>{t.text}</span>
                </div>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
      </Reveal>
    </section>
  );
}
