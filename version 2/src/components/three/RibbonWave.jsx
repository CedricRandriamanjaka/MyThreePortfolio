import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RibbonShaderMaterial } from "./RibbonShaderMaterial";
import {
  useColorModeValue
} from "@/components/ui/color-mode"

export function RibbonWave() {
  const meshRef = useRef();
  const color1 = useColorModeValue("#ff0077", "#FFC108");
  const color2 = useColorModeValue("#0077ff", "#ff0077");

  useFrame((state, delta) => {
    if (meshRef.current?.material?.uniforms) {
      // Incrémentez la valeur de "time" pour animer les déformations et le changement de couleur
      meshRef.current.material.uniforms.time.value += delta;
    }
  });

  return (
    <mesh ref={meshRef} position={[-5, 10, 0]}>
      {/* Une géométrie plane large avec beaucoup de subdivisions pour une déformation fluide */}
      <planeGeometry args={[50, 10, 200, 20]} />
      <RibbonShaderMaterial 
          color1={color1}
          color2={color2}
        />
    </mesh>
  );
}
