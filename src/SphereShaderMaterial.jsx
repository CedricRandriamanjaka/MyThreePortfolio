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

    // Calcul d'une déformation en fonction de la position de la souris
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

    // Indice de réfraction (type eau/verre)
    float ior = 1.33;
    vec3 refractionDir = refract(-viewDir, normal, 1.0 / ior);

    // Si pas de map d'environnement, on renvoie simplement un bleu clair
    if (!u_hasEnvMap) {
      gl_FragColor = vec4(0.8, 0.9, 1.0, 0.6);
      return;
    }

    // Transformation du vecteur de réfraction en coordonnées UV
    float u = 0.5 + atan(refractionDir.z, refractionDir.x) / (2.0 * 3.14159);
    float v = 0.5 - asin(refractionDir.y) / 3.14159;
    vec3 envColor = texture2D(u_envMap, vec2(u, v)).rgb;

    // Calcul d’un effet Fresnel basique
    float fresnel = pow(1.0 - dot(viewDir, normal), 3.0);

    // Couleur de base, qu’on peut blender avec la couleur de l’environnement
    vec3 baseColor = mix(envColor, vec3(0.7, 0.85, 1.0), 0.2);
    vec3 finalColor = mix(baseColor, vec3(1.0), fresnel * 0.2);

    gl_FragColor = vec4(finalColor, 0.6);
  }
`

// On crée le ShaderMaterial avec drei
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

// On l’enregistre pour pouvoir l’utiliser comme <sphereMaterial />
extend({ SphereMaterial })

export function SphereShaderMaterial(props) {
  return (
    <sphereMaterial
      attach="material"
      transparent
      depthWrite={false}
      {...props}
    />
  )
}
