"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface NavItem {
  label: string;
  href: string;
  icon?: string;
  badge?: string;
}

const navLinks: NavItem[] = [
  { label: "Products", href: "#technical-specifications" },
  { label: "Factory", href: "#factory-capacity" },
  { label: "Why Us", href: "#why-us" },
  { label: "Packaging", href: "#packaging-oem" },
  { label: "Shipping", href: "#global-shipping" },
  { label: "Calculator", href: "#fcl-calculator", icon: "calculate" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top Utility Bar - Hidden on mobile, ultra-compact on desktop */}
      <div
        className={`hidden md:block transition-all duration-300 bg-surface-container-lowest/95 border-b border-outline-variant/15 text-xs text-on-surface-variant ${
          isScrolled ? "h-0 py-0 opacity-0 overflow-hidden" : "py-1.5 opacity-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-secondary font-medium">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              Direct Factory Exporter
            </span>
            <span className="text-outline/40">|</span>
            <span className="text-on-surface-variant/80 text-[11px]">
              MSDS &amp; SMM Certified • 100% Coconut Shell
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <a
              href="mailto:sales@nusantaraember.com"
              className="hover:text-primary transition-colors flex items-center gap-1 text-on-surface-variant/90"
            >
              <span className="material-symbols-outlined text-[13px] text-tertiary">mail</span>
              <span>sales@nusantaraember.com</span>
            </a>
            <span className="text-outline/40">|</span>
            <a
              href="https://wa.me/628112427262"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors flex items-center gap-1 font-semibold text-on-surface"
            >
              <span className="material-symbols-outlined text-[13px] text-primary">call</span>
              <span>+62 811-CHARCOAL</span>
            </a>
            <span className="text-outline/40">|</span>
            <Link
              href="/admin/login"
              className="hover:text-primary transition-colors flex items-center gap-1 font-semibold text-primary"
              title="Portal Admin"
            >
              <span className="material-symbols-outlined text-[14px]">lock</span>
              <span>Admin</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Glassmorphic Navigation Bar */}
      <div
        className={`transition-all duration-300 ${
          isScrolled
            ? "bg-surface-container-lowest/90 backdrop-blur-xl border-b border-outline-variant/30 shadow-[0_8px_30px_rgba(0,0,0,0.5)] py-2.5"
            : "bg-surface-container-lowest/80 backdrop-blur-md border-b border-outline-variant/20 py-3.5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <Link
            href="/"
            onClick={handleLinkClick}
            className="flex items-center gap-2.5 sm:gap-3 group shrink-0"
          >
            <div className="relative h-9 w-9 sm:h-10 sm:w-10 flex items-center justify-center bg-primary-container/15 rounded-xl p-1.5 border border-primary-container/30 group-hover:border-primary/60 transition-colors">
              <Image
                alt="Nusantara Ember Export Logo"
                className="h-full w-auto object-contain"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIMj1vrtiVSG-4_2YC6FBxXmbZpx5DIhingFzNAoMz5DM1oGvNxQmpLSjT81rF75dJm7az4fQJwkHBUJZMCHbG7qI1uZwf0gurt5MS5cKCE70Hlqtfl7D_DIcC3oAASBwoESC1J_KfeTNoAn1ECxG59T2LdBYKymR2G5ClqSAkxN8G185cM93b9k8lixJ7V4glU24bVe2HS2ugTJFIHYp1RtRTqmEwpVCtcPGAtemSfFUTJjhK37ar"
                width={40}
                height={40}
                unoptimized
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm sm:text-base tracking-tight text-on-surface group-hover:text-primary transition-colors leading-tight">
                Nusantara Ember
              </span>
              <span className="text-[10px] tracking-wider uppercase text-primary font-medium">
                Charcoal Exporter
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links (Clean, spaced, concise) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 rounded-lg text-xs xl:text-sm font-medium text-on-surface-variant hover:text-on-surface hover:bg-surface-container/60 transition-all flex items-center gap-1.5"
              >
                {link.icon && (
                  <span className="material-symbols-outlined text-[16px] text-primary">
                    {link.icon}
                  </span>
                )}
                <span>{link.label}</span>
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Spec Sheet Download - visible on xl */}
            <a
              href="#technical-specifications"
              className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-medium border border-outline-variant/30 transition-all"
            >
              <span className="material-symbols-outlined text-[16px] text-tertiary">download</span>
              <span>Spec Sheet</span>
            </a>

            {/* Request Quote Primary CTA */}
            <motion.a
              href="#rfq-inquiry"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-primary-container to-amber-600 text-on-surface text-xs sm:text-sm font-bold shadow-md shadow-primary-container/20 hover:shadow-primary-container/40 border border-primary/30 transition-all"
            >
              <span>Request Quote</span>
              <span className="material-symbols-outlined text-[16px] sm:text-[18px]">
                arrow_forward
              </span>
            </motion.a>

            {/* Hamburger Button for Mobile & Tablet (< lg) */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface border border-outline-variant/30 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
              aria-label="Toggle navigation menu"
            >
              <motion.span
                key={String(mobileMenuOpen)}
                initial={{ rotate: -45, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 45, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="material-symbols-outlined text-[22px] block"
              >
                {mobileMenuOpen ? "close" : "menu"}
              </motion.span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Full Dropdown Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 top-[60px] bg-black/60 backdrop-blur-sm lg:hidden z-40"
            />

            {/* Drawer Content */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative z-50 lg:hidden bg-surface-container-low border-b border-outline-variant/40 shadow-2xl overflow-y-auto max-h-[calc(100vh-80px)] px-4 py-5"
            >
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={handleLinkClick}
                    className="flex items-center justify-between p-3 rounded-xl text-sm font-medium text-on-surface hover:text-primary hover:bg-surface-container transition-all"
                  >
                    <div className="flex items-center gap-2.5">
                      {link.icon ? (
                        <span className="material-symbols-outlined text-[18px] text-primary">
                          {link.icon}
                        </span>
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-outline/40" />
                      )}
                      <span>{link.label}</span>
                    </div>
                    <span className="material-symbols-outlined text-[18px] text-outline">
                      chevron_right
                    </span>
                  </a>
                ))}
              </div>

              {/* Mobile Quick Action Buttons & Info */}
              <div className="mt-4 pt-4 border-t border-outline-variant/25 flex flex-col gap-2.5">
                <a
                  href="#technical-specifications"
                  onClick={handleLinkClick}
                  className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-surface-container text-on-surface text-xs font-semibold hover:bg-surface-container-high transition-colors border border-outline-variant/30"
                >
                  <span className="material-symbols-outlined text-[18px] text-tertiary">download</span>
                  <span>Download Lab Spec Sheet (PDF)</span>
                </a>

                <a
                  href="#rfq-inquiry"
                  onClick={handleLinkClick}
                  className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-primary text-on-primary text-xs font-bold shadow-lg shadow-primary/20 hover:bg-primary-fixed transition-colors"
                >
                  <span>Request Export Quotation (FCL)</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </a>

                <div className="mt-2 p-3 rounded-xl bg-surface-container/40 border border-outline-variant/15 flex items-center justify-between text-[11px] text-on-surface-variant">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-secondary" />
                    <span>Direct Export Desk</span>
                  </div>
                  <a
                    href="https://wa.me/628112427262"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary font-semibold hover:underline"
                  >
                    +62 811-CHARCOAL
                  </a>
                </div>

                <Link
                  href="/admin/login"
                  onClick={handleLinkClick}
                  className="flex items-center justify-center gap-2 w-full py-2 px-4 rounded-xl bg-surface-container/60 hover:bg-surface-container text-on-surface text-xs font-semibold border border-outline-variant/30 transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px] text-primary">admin_panel_settings</span>
                  <span>Portal Admin (Kelola Produk)</span>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
