"use client";

import { motion } from "framer-motion";

const swatches = [
  { name: "Deep Teal", hex: "#0E7C7B", color: "#0E7C7B" },
  { name: "Teal Bright", hex: "#12A5A3", color: "#12A5A3" },
  { name: "Coral Care", hex: "#FF6B5B", color: "#FF6B5B" },
  { name: "Amber Alert", hex: "#FFC24B", color: "#FFC24B" },
  { name: "Cream Canvas", hex: "#FAF6EF", color: "#FAF6EF", isLight: true },
  { name: "Ink Night", hex: "#14212B", color: "#14212B" },
];

export function ThemePaletteSection() {
  return (
    <section id="theme" className="border-t border-line dark:border-line-dark bg-white/50 dark:bg-white/[0.02]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl"
        >
          <span className="badge badge-teal">01 — Theme & Design Tokens</span>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight mt-4 text-foreground">
            The “Calm Clinic” palette
          </h2>
          <p className="mt-3 text-ink-soft dark:text-cream-soft">
            Deep teal for trust, warm coral for care, cream & ink for calm contrast.
            Unique, human and dignified — deliberately steering away from generic cold hospital blue.
          </p>
        </motion.div>

        {/* Swatches Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3.5 mt-10">
          {swatches.map((sw, i) => (
            <motion.div
              key={sw.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="swatch"
              style={{ "--sw": sw.color } as any}
            >
              <span
                className="swatch-chip border border-black/5 dark:border-white/10"
                style={{ backgroundColor: sw.color }}
              />
              <b className="text-xs font-semibold text-foreground truncate">
                {sw.name}
              </b>
              <code className="text-[11px] text-ink-soft dark:text-cream-soft mt-0.5">
                {sw.hex}
              </code>
            </motion.div>
          ))}
        </div>

        {/* Typography & Motion Explanation */}
        <div className="mt-8 grid sm:grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-5 rounded-2xl bg-white dark:bg-card border border-line dark:border-line-dark shadow-soft"
          >
            <p className="font-semibold text-sm mb-1 text-foreground">
              Harmonious Typography
            </p>
            <p className="text-ink-soft dark:text-cream-soft text-xs sm:text-sm leading-relaxed">
              <span className="font-display text-lg font-medium text-foreground">
                Fraunces
              </span>{" "}
              for editorial, warm headings +{" "}
              <b className="font-semibold text-foreground">Inter</b> for high-density, legible clinical tables and UI metrics.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="p-5 rounded-2xl bg-white dark:bg-card border border-line dark:border-line-dark shadow-soft"
          >
            <p className="font-semibold text-sm mb-1 text-foreground">
              Organic Motion Language
            </p>
            <p className="text-ink-soft dark:text-cream-soft text-xs sm:text-sm leading-relaxed">
              Gentle physics springs, subtle 3D card tilts, magnetic cursor attraction and smooth reveals.
              Nothing bounces excessively — it is designed for a professional hospital environment.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
