import * as THREE from "three";

export interface FenMaterialSet {
  darkMetal: THREE.MeshStandardMaterial;
  charcoalFabric: THREE.MeshStandardMaterial;
  darkWood: THREE.MeshStandardMaterial;
  champagneBrass: THREE.MeshStandardMaterial;
  champagneGlow: THREE.MeshStandardMaterial;
  crateMatte: THREE.MeshStandardMaterial;
  truckBody: THREE.MeshStandardMaterial;
  glassTint: THREE.MeshPhysicalMaterial;
  dispose: () => void;
}

export function createFenMaterials(): FenMaterialSet {
  const darkMetal = new THREE.MeshStandardMaterial({
    color: "#222328",
    metalness: 0.82,
    roughness: 0.28,
  });

  const charcoalFabric = new THREE.MeshStandardMaterial({
    color: "#18181b",
    metalness: 0.08,
    roughness: 0.84,
  });

  const darkWood = new THREE.MeshStandardMaterial({
    color: "#2a231e",
    metalness: 0.12,
    roughness: 0.56,
  });

  const champagneBrass = new THREE.MeshStandardMaterial({
    color: "#c8b28a",
    metalness: 0.88,
    roughness: 0.24,
  });

  const champagneGlow = new THREE.MeshStandardMaterial({
    color: "#c8b28a",
    emissive: "#c8b28a",
    emissiveIntensity: 1.35,
    metalness: 0.4,
    roughness: 0.25,
    toneMapped: false,
  });

  const crateMatte = new THREE.MeshStandardMaterial({
    color: "#272420",
    metalness: 0.06,
    roughness: 0.9,
  });

  const truckBody = new THREE.MeshStandardMaterial({
    color: "#1c1d22",
    metalness: 0.65,
    roughness: 0.34,
  });

  const glassTint = new THREE.MeshPhysicalMaterial({
    color: "#111216",
    metalness: 0.15,
    roughness: 0.1,
    transmission: 0.35,
    transparent: true,
    opacity: 0.82,
  });

  return {
    darkMetal,
    charcoalFabric,
    darkWood,
    champagneBrass,
    champagneGlow,
    crateMatte,
    truckBody,
    glassTint,
    dispose: () => {
      darkMetal.dispose();
      charcoalFabric.dispose();
      darkWood.dispose();
      champagneBrass.dispose();
      champagneGlow.dispose();
      crateMatte.dispose();
      truckBody.dispose();
      glassTint.dispose();
    },
  };
}
