"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { siteConfig } from "@/data/site";
import { MOTION, prefersReducedMotion } from "@/components/motion/constants";

const SESSION_KEY = "fen_delivery_intro_seen";

export function LoadingScreen() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    try {
      if (sessionStorage.getItem(SESSION_KEY) === "1") return;
    } catch {
      return;
    }

    const showTimer = window.setTimeout(() => {
      setVisible(true);
    }, 0);

    let frame = 0;
    const start = performance.now();
    const totalDuration = 1150;

    const tick = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min(100, Math.round((elapsed / totalDuration) * 100));
      setProgress(pct);

      if (pct < 100) {
        frame = requestAnimationFrame(tick);
      } else {
        try {
          sessionStorage.setItem(SESSION_KEY, "1");
        } catch {
          // ignore storage errors
        }
        window.setTimeout(() => setVisible(false), 220);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => {
      window.clearTimeout(showTimer);
      cancelAnimationFrame(frame);
    };
  }, []);

  const handleSkip = () => {
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // ignore storage errors
    }
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="status"
          aria-label="Đang tải Fen Delivery"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: MOTION.ease.smooth }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-bg-0"
        >
          {/* Curtain panels */}
          <motion.div
            initial={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.75, ease: MOTION.ease.smooth }}
            className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-bg-0"
          />
          <motion.div
            initial={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.75, ease: MOTION.ease.smooth }}
            className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-bg-0"
          />

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.45, ease: MOTION.ease.smooth }}
            className="relative z-10 flex w-full max-w-xs flex-col items-center px-6 text-center"
          >
            <p className="font-display text-3xl font-semibold tracking-tight text-text-0">
              {siteConfig.brand.name}
            </p>
            <p className="mt-2 text-xs tracking-[0.26em] text-accent uppercase">
              {siteConfig.brand.slogan}
            </p>

            {/* Progress bar */}
            <div className="mt-8 h-px w-full overflow-hidden bg-line">
              <div
                className="h-full bg-accent transition-transform duration-100 ease-out origin-left"
                style={{ transform: `scaleX(${progress / 100})` }}
              />
            </div>

            <div className="mt-3 flex w-full items-center justify-between text-[11px] text-text-2">
              <span>Đang chuẩn bị không gian</span>
              <span className="tabular-nums text-text-1">{progress}%</span>
            </div>

            <button
              type="button"
              onClick={handleSkip}
              className="mt-8 rounded-full border border-line px-4 py-1.5 text-xs text-text-1 transition-colors hover:border-accent/50 hover:text-text-0 cursor-pointer"
            >
              Bỏ qua
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
