"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface AtmosphericDustProps {
  count?: number;
}

function seededRandom(seed: number): number {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

export function AtmosphericDust({ count = 140 }: AtmosphericDustProps) {
  const pointsRef = useRef<THREE.Points | null>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (seededRandom(i * 3 + 1) - 0.5) * 14;
      positions[i * 3 + 1] = (seededRandom(i * 3 + 2) - 0.5) * 8;
      positions[i * 3 + 2] = (seededRandom(i * 3 + 3) - 0.5) * 10 - 1;
    }

    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [count]);

  const material = useMemo(
    () =>
      new THREE.PointsMaterial({
        color: "#c8b28a",
        size: 0.032,
        transparent: true,
        opacity: 0.45,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    []
  );

  useEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.018;
    pointsRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.25) * 0.12;
  });

  return <points ref={pointsRef} geometry={geometry} material={material} />;
}
