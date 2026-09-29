"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useAnimation, type Variants } from "framer-motion";

// ─── Easing tuples (must be typed as const for TS) ──────────────────────────
const easeOut = [0.22, 1, 0.36, 1] as [number, number, number, number];

// ─── Hook: triggers once when element enters viewport ───────────────────────
export function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: threshold });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [isInView, controls]);

  return { ref, controls };
}

// ─── Shared Variants ────────────────────────────────────────────────────────
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: easeOut },
  },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: easeOut },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.55, ease: easeOut },
  },
};

// stagger container: children animate one by one
export const staggerContainer = (stagger = 0.1, delay = 0): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
      delayChildren: delay,
    },
  },
});

// ─── Reusable Motion Wrappers ────────────────────────────────────────────────

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variant?: "fadeUp" | "fadeIn" | "fadeLeft" | "fadeRight" | "scaleIn";
}

const variantMap: Record<string, Variants> = {
  fadeUp,
  fadeIn,
  fadeLeft,
  fadeRight,
  scaleIn,
};

export function Reveal({
  children,
  className,
  delay = 0,
  variant = "fadeUp",
}: RevealProps) {
  const { ref, controls } = useScrollReveal();
  const base = variantMap[variant];

  const custom: Variants = {
    ...base,
    visible: {
      ...((base.visible as object) ?? {}),
      transition: {
        ...(typeof base.visible === "object" && "transition" in base.visible
          ? (base.visible.transition as object)
          : {}),
        delay,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={custom}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerRevealProps {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
  childVariant?: "fadeUp" | "fadeIn" | "fadeLeft" | "fadeRight" | "scaleIn";
}

export function StaggerReveal({
  children,
  className,
  stagger = 0.1,
  delayChildren = 0,
}: StaggerRevealProps) {
  const { ref, controls } = useScrollReveal();

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={staggerContainer(stagger, delayChildren)}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// child item used inside StaggerReveal
export function StaggerItem({
  children,
  className,
  variant = "fadeUp",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "fadeUp" | "fadeIn" | "fadeLeft" | "fadeRight" | "scaleIn";
}) {
  return (
    <motion.div variants={variantMap[variant]} className={className}>
      {children}
    </motion.div>
  );
}

// ─── Animated Counter ────────────────────────────────────────────────────────
export function AnimatedNumber({
  target,
  suffix = "",
  prefix = "",
  duration = 1.8,
  className,
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}
