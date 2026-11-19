"use client";

import { Bloom, EffectComposer, Noise, Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

interface PostEffectsProps {
  isMobile?: boolean;
}

export function PostEffects({ isMobile = false }: PostEffectsProps) {
  return (
    <EffectComposer multisampling={isMobile ? 0 : 2}>
      <Bloom
        intensity={0.45}
        luminanceThreshold={0.75}
        luminanceSmoothing={0.35}
        mipmapBlur
      />
      <Vignette eskil={false} offset={0.22} darkness={0.72} />
      <Noise opacity={isMobile ? 0.018 : 0.028} blendFunction={BlendFunction.SOFT_LIGHT} />
    </EffectComposer>
  );
}
