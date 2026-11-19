"use client";

import { useEffect, useState } from "react";
import { prefersReducedMotion } from "@/components/motion/constants";

export interface WebGLCapabilities {
  checked: boolean;
  supported: boolean;
  reducedMotion: boolean;
  isMobile: boolean;
}

function detectWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2", { failIfMajorPerformanceCaveat: false }) ||
      canvas.getContext("webgl", { failIfMajorPerformanceCaveat: false });
    return Boolean(gl);
  } catch {
    return false;
  }
}

export function useWebGLSupport(): WebGLCapabilities {
  const [caps, setCaps] = useState<WebGLCapabilities>({
    checked: false,
    supported: false,
    reducedMotion: false,
    isMobile: false,
  });

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setCaps({
        checked: true,
        supported: detectWebGL(),
        reducedMotion: prefersReducedMotion(),
        isMobile: window.innerWidth < 768,
      });
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  return caps;
}
