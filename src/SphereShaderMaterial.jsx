import React from 'react'
import { shaderMaterial } from '@react-three/drei'
import { extend } from '@react-three/fiber'
import * as THREE from 'three'

const vertexShader = /* glsl */ `
  precision mediump float;

  uniform float u_time;
  uniform vec2 u_mouse;

  varying vec3 vWorldPos;
  varying vec3 vNormal;

  void main() {
    vNormal = normalize(normal);
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vWorldPos = worldPosition.xyz;

    // Onde autour de la souris
    float distMouse = distance(worldPosition.xy, u_mouse * 2.0);
    float amplitude = 0.3;
    float displacement = amplitude * exp(-5.0 * distMouse * distMouse);
    displacement += 0.03 * sin(u_time * 2.0 + worldPosition.y * 5.0);

    vec3 newPosition = position + normal * displacement;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`

const fragmentShader = /* glsl */ `
  precision mediump float;

  uniform float u_time;
  uniform bool u_hasEnvMap;
  uniform sampler2D u_envMap;

  varying vec3 vWorldPos;
  varying vec3 vNormal;

  void main() {
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(cameraPosition - vWorldPos);

    // Réfraction simplifiée
    float ior = 1.33; // indice ~ eau
    vec3 refractionDir = refract(-viewDir, normal, 1.0 / ior);

    // Si pas d'envMap, fallback
    if (!u_hasEnvMap) {
      gl_FragColor = vec4(0.8, 0.9, 1.0, 0.6);
      return;
    }

    // Approx. sampling sphérique de la map
    float u = 0.5 + atan(refractionDir.z, refractionDir.x) / (2.0 * 3.14159);
    float v = 0.5 - asin(refractionDir.y) / 3.14159;
    vec3 envColor = texture2D(u_envMap, vec2(u, v)).rgb;

    // Fresnel
    float fresnel = pow(1.0 - dot(viewDir, normal), 3.0);
    vec3 baseColor = mix(envColor, vec3(0.7, 0.85, 1.0), 0.2);

    // Mix refraction + highlight
    vec3 finalColor = mix(baseColor, vec3(1.0), fresnel * 0.2);

    // Transparence
    gl_FragColor = vec4(finalColor, 0.6);
  }
`

const SphereMaterial = shaderMaterial(
  {
    u_time: 0,
    u_mouse: new THREE.Vector2(0, 0),
    u_envMap: null,
    u_hasEnvMap: false
  },
  vertexShader,
  fragmentShader
)

extend({ SphereMaterial })

export default function SphereShaderMaterial(props) {
  return (
    <sphereMaterial
      attach="material"
      transparent
      depthWrite={false}
      {...props}
    />
  )
}
