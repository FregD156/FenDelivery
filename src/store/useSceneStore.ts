import { create } from "zustand";

export type ActiveSection =
  | "hero"
  | "trust"
  | "services"
  | "process"
  | "estimator"
  | "projects"
  | "why-us"
  | "testimonials"
  | "faq"
  | "contact";

export interface EstimatorPrefill {
  categories: string[];
  quantity: number;
  condition: string;
  district: string;
  pickupWindow: string;
  estimatedRangeText?: string;
}

interface SceneState {
  scrollProgress: number;
  activeSection: ActiveSection;
  hoveredServiceKey: string | null;
  isSceneReady: boolean;
  estimatorPrefill: EstimatorPrefill | null;
  setScrollProgress: (progress: number) => void;
  setActiveSection: (section: ActiveSection) => void;
  setHoveredServiceKey: (key: string | null) => void;
  setSceneReady: (ready: boolean) => void;
  setEstimatorPrefill: (prefill: EstimatorPrefill | null) => void;
}

export const useSceneStore = create<SceneState>((set) => ({
  scrollProgress: 0,
  activeSection: "hero",
  hoveredServiceKey: null,
  isSceneReady: false,
  estimatorPrefill: null,
  setScrollProgress: (scrollProgress) => set({ scrollProgress }),
  setActiveSection: (activeSection) => set({ activeSection }),
  setHoveredServiceKey: (hoveredServiceKey) => set({ hoveredServiceKey }),
  setSceneReady: (isSceneReady) => set({ isSceneReady }),
  setEstimatorPrefill: (estimatorPrefill) => set({ estimatorPrefill }),
}));
