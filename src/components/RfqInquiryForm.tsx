"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal, StaggerReveal, StaggerItem } from "./animations";
import { CalculatorSpec } from "./FclCalculator";

interface RfqInquiryFormProps {
  specData?: CalculatorSpec | null;
}

export default function RfqInquiryForm({ specData }: RfqInquiryFormProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [destination, setDestination] = useState("");
  const [productGrade, setProductGrade] = useState("shisha-cube-25");
  const [volume, setVolume] = useState("20ft");
  const [packaging, setPackaging] = useState("1kg-oem");
  const [incoterm, setIncoterm] = useState("CIF");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isHighlighted, setIsHighlighted] = useState(false);

  useEffect(() => {
    if (!specData) return;
    setDestination(specData.portName);
    setVolume(specData.containerSize);
    setIncoterm(specData.incoterm);
    if (specData.productGrade === "grade-a") setProductGrade("shisha-cube-25");
    else if (specData.productGrade === "grade-b") setProductGrade("bbq-hex");
    else if (specData.productGrade === "grade-c") setProductGrade("industrial-carbon");
    if (specData.packagingType === "1kg-oem") setPackaging("1kg-oem");
    else if (specData.packagingType === "10kg-bulk") setPackaging("10kg-master");
    else if (specData.packagingType === "20kg-sack") setPackaging("20kg-sack");
    setNotes(
      `[Calculated Specs] Port: ${specData.portName} | Container: ${
        specData.containerSize === "20ft" ? "20ft FCL (~19.5 MT)" : "40ft HC (~27 MT)"
      } | Stowage: ${
        specData.stowage === "floor" ? "Floor Loaded (100%)" : "ISPM-15 Pallets"
      } | Incoterm: ${specData.incoterm} | Est. Total: $${specData.grandTotal.toLocaleString()} USD. Please provide formal commercial proforma invoice.`
    );
    setIsHighlighted(true);
    const t = setTimeout(() => setIsHighlighted(false), 2500);
    document.getElementById("rfq-inquiry")?.scrollIntoView({ behavior: "smooth" });
    return () => clearTimeout(t);
  }, [specData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="w-full bg-surface py-space-2xl" id="rfq-inquiry">
      <div className="max-w-[1440px] mx-auto px-gutter-lg">
        <motion.div
          className={`bg-surface-container rounded-2xl overflow-hidden shadow-2xl p-space-xl lg:p-space-2xl border transition-colors duration-500 ${
            isHighlighted ? "border-primary-container" : "border-outline-variant/30"
          }`}
          animate={isHighlighted ? { boxShadow: "0 0 0 4px rgba(249,115,22,0.25), 0 0 60px rgba(249,115,22,0.15)" } : { boxShadow: "0 20px 50px -10px rgba(0,0,0,0.5)" }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg">
            {/* Left Context */}
            <Reveal className="lg:col-span-5 flex flex-col justify-between" variant="fadeLeft">
              <div className="flex flex-col gap-space-md">
                <div className="inline-flex items-center gap-space-xs text-primary font-label-tech-sm text-label-tech-sm uppercase tracking-wider">
                  <motion.span
                    className="w-2 h-2 rounded-full bg-primary-container"
                    animate={{ scale: [1, 1.6, 1] }}
                    transition={{ duration: 1.8, repeat: Infinity }}
                  />
                  Official Export RFQ Portal
                </div>
                <h2 className="font-headline-lg text-headline-lg text-on-surface">
                  Request Factory Price Quote &amp; 1-2kg Sample Kit
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Direct submission goes straight to our International Trade Desk. Receive
                  verified FOB/CIF freight breakdown, laboratory COA, and current raw shell
                  index pricing within 12 business hours.
                </p>
                <StaggerReveal className="space-y-space-xs pt-space-sm" stagger={0.1}>
                  {[
                    { icon: "chat", color: "text-secondary", label: "Instant WhatsApp Desk", value: "+62 811-234-EMBER", badge: "Online Now", badgeColor: "text-secondary", badgeBg: "bg-surface-container" },
                    { icon: "mail", color: "text-tertiary", label: "Commercial Tender Email", value: "export@nusantaraember.com", badge: "< 12h SLA", badgeColor: "text-outline", badgeBg: "bg-surface-container" },
                  ].map((c) => (
                    <StaggerItem key={c.label}>
                      <motion.div
                        className="p-space-md bg-surface-container-low rounded-lg flex items-center justify-between border border-outline-variant/20"
                        whileHover={{ x: 4, borderColor: "rgba(249,115,22,0.35)", transition: { duration: 0.18 } }}
                      >
                        <div className="flex items-center gap-space-sm">
                          <span className={`material-symbols-outlined ${c.color} text-[24px]`}>{c.icon}</span>
                          <div className="flex flex-col">
                            <span className="font-label-tech-sm text-label-tech-sm text-outline">{c.label}</span>
                            <span className="font-headline-sm text-headline-sm text-sm text-on-surface">{c.value}</span>
                          </div>
                        </div>
                        <span className={`px-space-sm py-1 rounded ${c.badgeBg} ${c.badgeColor} font-label-tech-sm text-label-tech-sm border border-outline/20`}>
                          {c.badge}
                        </span>
                      </motion.div>
                    </StaggerItem>
                  ))}
                </StaggerReveal>
              </div>
              <div className="pt-space-xl border-t border-outline-variant/20 mt-space-lg">
                <span className="font-label-tech-sm text-label-tech-sm text-outline">
                  PT Nusantara Ember Indonesia strictly protects buyer privacy and signs commercial NDAs upon request.
                </span>
              </div>
            </Reveal>

            {/* Right Form */}
            <Reveal className="lg:col-span-7" variant="fadeRight" delay={0.1}>
              <div className="bg-surface-container-low p-space-xl rounded-xl border border-outline-variant/30 h-full">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.85 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className="py-12 px-6 flex flex-col items-center justify-center text-center gap-4 h-full"
                    >
                      <motion.div
                        className="w-16 h-16 rounded-full bg-secondary/20 text-secondary flex items-center justify-center"
                        initial={{ scale: 0, rotate: -30 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.1 }}
                      >
                        <span className="material-symbols-outlined text-[36px]">check_circle</span>
                      </motion.div>
                      <motion.h3
                        className="font-headline-md text-headline-md text-on-surface"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25 }}
                      >
                        Inquiry Recorded Successfully!
                      </motion.h3>
                      <motion.p
                        className="font-body-md text-body-md text-on-surface-variant max-w-md"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.35 }}
                      >
                        Thank you, {fullName || "valued partner"}. Our Indonesian export
                        director will email your formal FOB/CIF proforma estimate to{" "}
                        <strong className="text-on-surface">{email}</strong> within 12
                        business hours.
                      </motion.p>
                      <motion.button
                        type="button"
                        onClick={() => setSubmitted(false)}
                        className="mt-4 px-6 py-2.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-tech-sm transition-colors cursor-pointer"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.45 }}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        Submit Another Request
                      </motion.button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      className="space-y-space-md"
                      onSubmit={handleSubmit}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                        <div className="flex flex-col gap-1">
                          <label className="font-label-tech-sm text-label-tech-sm text-on-surface-variant">Full Name &amp; Title *</label>
                          <input
                            className="w-full bg-surface px-space-md py-2.5 rounded text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-1 focus:ring-primary-container border border-outline-variant/40 transition-all"
                            placeholder="e.g. Tariq Al-Mansoor (Procurement Dir.)"
                            required type="text"
                            value={fullName} onChange={(e) => setFullName(e.target.value)}
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="font-label-tech-sm text-label-tech-sm text-on-surface-variant">Company Name &amp; Corporate Email *</label>
                          <input
                            className="w-full bg-surface px-space-md py-2.5 rounded text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-1 focus:ring-primary-container border border-outline-variant/40 transition-all"
                            placeholder="buyer@distributor-group.com"
                            required type="email"
                            value={email} onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                        <div className="flex flex-col gap-1">
                          <label className="font-label-tech-sm text-label-tech-sm text-on-surface-variant">Destination Country &amp; Port *</label>
                          <input
                            className="w-full bg-surface px-space-md py-2.5 rounded text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-1 focus:ring-primary-container border border-outline-variant/40 transition-all"
                            placeholder="e.g. Jebel Ali, UAE or Rotterdam, NL"
                            required type="text"
                            value={destination} onChange={(e) => setDestination(e.target.value)}
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="font-label-tech-sm text-label-tech-sm text-on-surface-variant">Product Grade Needed *</label>
                          <select className="w-full bg-surface px-space-md py-2.5 rounded text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-1 focus:ring-primary-container border border-outline-variant/40 transition-all cursor-pointer" value={productGrade} onChange={(e) => setProductGrade(e.target.value)}>
                            <option value="shisha-cube-25">Shisha Cubes 25x25x25mm (Grade A)</option>
                            <option value="shisha-cube-26">Shisha Cubes 26x26x26mm (Grade A)</option>
                            <option value="shisha-cube-22">Shisha Cubes 22x22x22mm (Grade A)</option>
                            <option value="bbq-hex">BBQ Hexagonal Sawdust 50x150mm (Grade B)</option>
                            <option value="bbq-pillow">BBQ Pillow Shaped Briquettes (Grade B)</option>
                            <option value="industrial-carbon">Industrial Bulk Crushed / Granular (Grade C)</option>
                            <option value="sample-kit">Request Free 1-2kg Sample Test Kit</option>
                          </select>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md">
                        <div className="flex flex-col gap-1">
                          <label className="font-label-tech-sm text-label-tech-sm text-on-surface-variant">Target Volume *</label>
                          <select className="w-full bg-surface px-space-md py-2.5 rounded text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-1 focus:ring-primary-container border border-outline-variant/40 transition-all cursor-pointer" value={volume} onChange={(e) => setVolume(e.target.value)}>
                            <option value="20ft">1x 20ft FCL (~18-20 MT)</option>
                            <option value="40hc">1x 40ft HC FCL (~26-28 MT)</option>
                            <option value="multi-fcl">2 - 5 Containers (FCL)</option>
                            <option value="annual">Annual Long-Term Contract (Monthly)</option>
                            <option value="sample">1-2kg Express Sample Box Only</option>
                          </select>
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="font-label-tech-sm text-label-tech-sm text-on-surface-variant">Packaging Preference</label>
                          <select className="w-full bg-surface px-space-md py-2.5 rounded text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-1 focus:ring-primary-container border border-outline-variant/40 transition-all cursor-pointer" value={packaging} onChange={(e) => setPackaging(e.target.value)}>
                            <option value="1kg-oem">Custom OEM 1kg Inner + Master Box</option>
                            <option value="10kg-master">Plain White / Craft 10kg Master Box</option>
                            <option value="20kg-sack">20kg Heavy-Duty Export Sack</option>
                            <option value="jumbo">500kg Industrial Jumbo Bags</option>
                            <option value="undecided">Undecided / Request Factory Packaging</option>
                          </select>
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="font-label-tech-sm text-label-tech-sm text-on-surface-variant">Preferred Incoterm</label>
                          <select className="w-full bg-surface px-space-md py-2.5 rounded text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-1 focus:ring-primary-container border border-outline-variant/40 transition-all cursor-pointer" value={incoterm} onChange={(e) => setIncoterm(e.target.value)}>
                            <option value="CIF">CIF (Destination Discharge Port)</option>
                            <option value="FOB">FOB (Semarang / Surabaya / Jakarta)</option>
                            <option value="CFR">CFR (Cost &amp; Freight)</option>
                          </select>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="font-label-tech-sm text-label-tech-sm text-on-surface-variant">Special Specifications or Custom Requirements</label>
                        <textarea
                          className="w-full bg-surface px-space-md py-2 rounded text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-1 focus:ring-primary-container border border-outline-variant/40 transition-all"
                          placeholder="Provide any target ash percentage, custom carton dimensions, stamping logo requirements, or target delivery timeframe..."
                          rows={3} value={notes} onChange={(e) => setNotes(e.target.value)}
                        />
                      </div>
                      <motion.button
                        className="w-full py-space-md rounded-lg bg-primary-container text-on-surface font-headline-sm text-headline-sm text-base font-bold shadow-xl flex items-center justify-center gap-space-xs cursor-pointer"
                        type="submit"
                        whileHover={{ scale: 1.02, boxShadow: "0 12px 30px -6px rgba(249,115,22,0.5)" }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span>Submit Export Inquiry &amp; Calculate Freight</span>
                        <motion.span
                          className="material-symbols-outlined text-[20px]"
                          animate={{ x: [0, 4, 0] }}
                          transition={{ duration: 1.2, repeat: Infinity }}
                        >
                          send
                        </motion.span>
                      </motion.button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
