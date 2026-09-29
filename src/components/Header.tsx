"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Products & Specs", href: "#technical-specifications" },
  { label: "Factory & Capacity", href: "#factory-capacity" },
  { label: "Why Us", href: "#why-us" },
  { label: "Packaging & OEM", href: "#packaging-oem" },
  { label: "Global Shipping", href: "#global-shipping" },
  { label: "RFQ Portal", href: "#rfq-inquiry" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_12px_32px_-4px_rgba(0,0,0,0.60)]">
      {/* Top Banner Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-surface-container-low px-gutter-lg py-space-xs border-b border-outline-variant/20"
      >
        <div className="max-w-[1440px] mx-auto flex items-center justify-between font-label-tech-sm text-label-tech-sm">
          <div className="flex items-center gap-space-lg">
            <div className="flex items-center gap-space-xs text-on-surface-variant">
              <span className="material-symbols-outlined text-secondary text-[16px]">verified</span>
              <span>MSDS &amp; SMM Certified Factory Direct</span>
            </div>
            <div className="hidden md:flex items-center gap-space-xs text-on-surface-variant">
              <span className="material-symbols-outlined text-primary text-[16px]">call</span>
              <span>Direct Export Hotline: <strong className="text-on-surface">+62 811-CHARCOAL</strong></span>
            </div>
            <div className="hidden lg:flex items-center gap-space-xs text-on-surface-variant">
              <span className="material-symbols-outlined text-tertiary text-[16px]">mail</span>
              <span>sales@nusantaraember.com</span>
            </div>
          </div>
          <div className="flex items-center gap-space-md">
            <div className="flex items-center gap-space-xs bg-surface-container px-space-sm py-0.5 rounded-lg text-on-surface-variant">
              <span className="material-symbols-outlined text-[14px]">language</span>
              <span className="font-label-tech-sm text-label-tech-sm text-on-surface">EN</span>
              <span className="text-outline">|</span>
              <span className="font-label-tech-sm text-label-tech-sm text-on-surface">USD ($)</span>
              <span className="text-outline">|</span>
              <span className="font-label-tech-sm text-label-tech-sm text-on-surface">Metric Ton (MT)</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary font-bold">
              <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Navigation Bar */}
      <div className="h-20 max-w-[1440px] mx-auto px-gutter-lg flex items-center justify-between gap-space-lg">
        {/* Brand Logo */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link href="/" className="flex items-center gap-space-md shrink-0 group">
            <div className="relative h-9 w-9 flex items-center justify-center bg-primary-container/20 rounded-lg p-1 border border-primary-container/40">
              <Image
                alt="Nusantara Ember Export Logo"
                className="h-8 w-auto object-contain"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIMj1vrtiVSG-4_2YC6FBxXmbZpx5DIhingFzNAoMz5DM1oGvNxQmpLSjT81rF75dJm7az4fQJwkHBUJZMCHbG7qI1uZwf0gurt5MS5cKCE70Hlqtfl7D_DIcC3oAASBwoESC1J_KfeTNoAn1ECxG59T2LdBYKymR2G5ClqSAkxN8G185cM93b9k8lixJ7V4glU24bVe2HS2ugTJFIHYp1RtRTqmEwpVCtcPGAtemSfFUTJjhK37ar"
                width={36}
                height={36}
                unoptimized
              />
            </div>
            <div className="flex flex-col">
              <span className="font-headline-sm text-headline-sm tracking-tight text-on-surface leading-tight group-hover:text-primary transition-colors">
                Nusantara Ember
              </span>
              <span className="font-label-tech-sm text-label-tech-sm tracking-wider uppercase text-primary">
                Indonesian Charcoal Exporter
              </span>
            </div>
          </Link>
        </motion.div>

        {/* Desktop Nav */}
        <motion.nav
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="hidden xl:flex items-center gap-space-lg"
        >
          {navLinks.map((link, i) => (
            <motion.a
              key={link.href}
              href={link.href}
              className="font-label-tech-lg text-label-tech-lg text-on-surface-variant hover:text-on-surface transition-colors"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + i * 0.05 }}
              whileHover={{ scale: 1.05 }}
            >
              {link.label}
            </motion.a>
          ))}
          <motion.a
            href="#fcl-calculator"
            className="font-label-tech-lg text-label-tech-lg text-primary hover:text-primary-container transition-colors flex items-center gap-1 font-semibold"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            whileHover={{ scale: 1.05 }}
          >
            <span className="material-symbols-outlined text-[18px]">calculate</span>
            <span>Container Calculator</span>
          </motion.a>
        </motion.nav>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-space-sm shrink-0"
        >
          <a
            className="hidden sm:inline-flex items-center gap-space-xs px-space-md py-space-sm rounded-lg bg-surface-container-high text-on-surface font-label-tech-lg text-label-tech-lg hover:bg-surface-container-highest transition-colors"
            href="#technical-specifications"
          >
            <span className="material-symbols-outlined text-[18px] text-tertiary">download</span>
            <span>Spec Sheet</span>
          </a>
          <motion.a
            href="#rfq-inquiry"
            className="inline-flex items-center gap-space-xs px-space-lg py-space-sm rounded-lg bg-primary-container text-on-surface font-headline-sm text-headline-sm text-base font-bold shadow-[0_0_0_1px_#F97316,0_8px_24px_-4px_rgba(249,115,22,0.25)] transition-all"
            whileHover={{ scale: 1.04, boxShadow: "0 0 0 2px #F97316, 0 12px_32px_-4px_rgba(249,115,22,0.4)" }}
            whileTap={{ scale: 0.97 }}
          >
            <span>Request Quote</span>
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </motion.a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors"
            aria-label="Toggle navigation menu"
          >
            <motion.span
              key={String(mobileMenuOpen)}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="material-symbols-outlined text-[24px] block"
            >
              {mobileMenuOpen ? "close" : "menu"}
            </motion.span>
          </button>
        </motion.div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="xl:hidden overflow-hidden bg-surface-container-low border-b border-outline-variant/40 px-gutter-lg"
          >
            <div className="py-space-md flex flex-col gap-space-sm">
              {[...navLinks, { label: "Container Calculator", href: "#fcl-calculator" }].map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="py-2 text-on-surface font-label-tech-lg hover:text-primary transition-colors flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
