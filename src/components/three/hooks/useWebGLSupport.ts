"use client";

import { useEffect, useState } from "react";
import { prefersReducedMotion } from "@/components/motion/constants";

export type QualityTier = "high" | "medium" | "low";

export interface WebGLCapabilities {
  checked: boolean;
  supported: boolean;
  reducedMotion: boolean;
  isMobile: boolean;
  tier: QualityTier;
  saveData: boolean;
}

interface NavigatorExtended extends Navigator {
  deviceMemory?: number;
  connection?: {
    saveData?: boolean;
  };
}

function detectWebGLSupport(): { supported: boolean; isSoftwareRenderer: boolean } {
  try {
    const canvas = document.createElement("canvas");
    const gl =
      (canvas.getContext("webgl2", { failIfMajorPerformanceCaveat: false }) as
        | WebGL2RenderingContext
        | null) ||
      (canvas.getContext("webgl", { failIfMajorPerformanceCaveat: false }) as
        | WebGLRenderingContext
        | null);

    if (!gl) return { supported: false, isSoftwareRenderer: false };

    const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
    const renderer = debugInfo
      ? String(gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) ?? "").toLowerCase()
      : "";
    const isSoftwareRenderer =
      renderer.includes("swiftshader") ||
      renderer.includes("llvmpipe") ||
      renderer.includes("software");

    return { supported: true, isSoftwareRenderer };
  } catch {
    return { supported: false, isSoftwareRenderer: false };
  }
}

export function useWebGLSupport(): WebGLCapabilities {
  const [caps, setCaps] = useState<WebGLCapabilities>({
    checked: false,
    supported: false,
    reducedMotion: false,
    isMobile: false,
    tier: "medium",
    saveData: false,
  });

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const nav = navigator as NavigatorExtended;
      const isMobile = window.innerWidth < 768;
      const cores = nav.hardwareConcurrency ?? 4;
      const memory = nav.deviceMemory ?? 4;
      const saveData = Boolean(nav.connection?.saveData);
      const { supported, isSoftwareRenderer } = detectWebGLSupport();

      let tier: QualityTier = "high";
      if (isSoftwareRenderer || saveData || cores <= 2 || memory <= 2) {
        tier = "low";
      } else if (isMobile || cores <= 4 || memory <= 4) {
        tier = "medium";
      }

      setCaps({
        checked: true,
        supported: supported && !isSoftwareRenderer && !saveData,
        reducedMotion: prefersReducedMotion(),
        isMobile,
        tier,
        saveData,
      });
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  return caps;
}
