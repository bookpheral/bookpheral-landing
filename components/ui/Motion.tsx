"use client";

import { LazyMotion, MotionConfig, type Variants } from "motion/react";
import * as m from "motion/react-m";
import type { ReactNode } from "react";

/** Shared easing — mirrors --ease-out-quint in globals.css. */
export const EASE_OUT_QUINT = [0.22, 1, 0.36, 1] as const;

const loadFeatures = () => import("./motion-features").then((mod) => mod.default);

/**
 * `m` components from "motion/react-m" ship without animation features; the
 * DOM feature set is fetched lazily after hydration so it stays out of the
 * first-load bundle. Honours the OS "reduce motion" setting: transform
 * animations are skipped, opacity fades remain.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user" transition={{ duration: 0.6, ease: EASE_OUT_QUINT }}>
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Vertical travel in px. Kept small so reveals stay calm on phones too. */
  y?: number;
  as?: "div" | "section" | "li" | "article" | "header";
};

/**
 * Fades + slides content in once when it scrolls into view.
 * Use below the fold only — above-the-fold content should paint immediately.
 */
export function Reveal({ children, className, delay = 0, y = 12, as = "div" }: RevealProps) {
  const Component = m[as];
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -40px 0px" }}
      transition={{ duration: 0.6, ease: EASE_OUT_QUINT, delay }}
    >
      {children}
    </Component>
  );
}

const groupVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

type RevealGroupProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "ul" | "ol";
};

/** Staggers its <RevealItem> children as the group enters the viewport. */
export function RevealGroup({ children, className, as = "div" }: RevealGroupProps) {
  const Component = m[as];
  return (
    <Component
      className={className}
      variants={groupVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1, margin: "0px 0px -40px 0px" }}
    >
      {children}
    </Component>
  );
}

type RevealItemProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
};

export function RevealItem({ children, className, as = "div" }: RevealItemProps) {
  const Component = m[as];
  return (
    <Component
      className={className}
      variants={{
        hidden: { opacity: 0, y: 12 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT_QUINT } },
      }}
    >
      {children}
    </Component>
  );
}
