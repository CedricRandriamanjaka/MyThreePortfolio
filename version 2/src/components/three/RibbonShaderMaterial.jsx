// RibbonShaderMaterial.jsx
import React from "react";
import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import * as THREE from "three";

const RibbonShader = shaderMaterial(
  {
    time: 0,
    color1: new THREE.Color(0xff0077), // Valeur par défaut
    color2: new THREE.Color(0x0077ff), // Valeur par défaut
  },
  // Vertex Shader
  `
    uniform float time;
    varying vec2 vUv;
    
    void main() {
      vUv = uv;
      vec3 pos = position;
      
      // Effet de vague : déformation de la géométrie selon x et y
      pos.z += sin(pos.x * 0.5 + time) * 1.0;
      pos.z += sin(pos.y * 2.0 + time * 1.5) * 0.5;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  // Fragment Shader
  `
    uniform float time;
    uniform vec3 color1;
    uniform vec3 color2;
    varying vec2 vUv;
    
    void main() {
      // Mélange dynamique entre deux couleurs en fonction de la coordonnée verticale et du temps
      float mixFactor = vUv.y + 0.5 * sin(time + vUv.x * 10.0);
      vec3 color = mix(color1, color2, mixFactor);
      
      gl_FragColor = vec4(color, 1.0);
    }
  `
);

// On étend le catalogue JSX pour pouvoir utiliser notre shader dans le JSX
extend({ RibbonShader });

// On reçoit color1, color2 depuis les props
export function RibbonShaderMaterial({ color1, color2, ...props }) {
  return (
    <ribbonShader
      attach="material"
      // On met à jour les uniforms de type color (THREE.Color)
      uniforms-color1-value={new THREE.Color(color1)}
      uniforms-color2-value={new THREE.Color(color2)}
      {...props}
    />
  );
}