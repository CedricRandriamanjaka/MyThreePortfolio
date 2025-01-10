import React from 'react'
import { shaderMaterial } from '@react-three/drei'
import { extend } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * ==========================
 *        VERTEX SHADER
 * ==========================
 * Ce shader gère principalement le déplacement (les "plis") 
 * de la surface en fonction de la position de la souris et du temps.
 */
const vertexShader = `
precision mediump float;

  uniform float u_time;
  uniform vec2  u_mouse;

  // Position initiale du vertex (position) et normales
  varying vec3 vPosition;
  varying vec3 vNormal;

  // On peut passer des coordonnées UV au fragment shader si nécessaire
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vPosition = position;
    vNormal = normal;

    // Distance par rapport à la souris (on va considérer la souris comme un "point" sur la sphère)
    // Approche simplifiée : on projette la position du vertex en "screen space" 
    // ou on fait un calcul plus artistique.
    
    // Pour un effet plus "artistique", nous allons simplement utiliser la direction (x,y) 
    // comme s’il s’agissait d’une onde.
    float distMouse = distance(vec2(position.x, position.y), u_mouse);

    // Calcul d’une "force" de déplacement en fonction de la distance à la souris
    // plus la distance est petite, plus le déplacement est grand
    float amplitude = 0.2;  // amplitude globale des plis
    float displacement = amplitude * exp(-5.0 * distMouse * distMouse);

    // On ajoute aussi un léger mouvement sinusoïdal en fonction du temps
    displacement += 0.03 * sin(u_time * 2.0 + position.y * 5.0);

    // Calcul de la position finale du vertex
    vec3 newPosition = position + normal * displacement;

    // Transformation finale (Projection)
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`;

/**
 * ==========================
 *       FRAGMENT SHADER
 * ==========================
 * Gère l’aspect coloré, les dégradés dynamiques 
 * et les éventuelles "bandes" animées.
 */
const fragmentShader = `
  precision mediump float;

  uniform float u_time;
  
  // On récupère certaines variables du vertex shader
  varying vec3 vPosition;
  varying vec3 vNormal;
  varying vec2 vUv;

  void main() {
    // Normale normalisée pour jouer avec la lumière et l’orientation
    vec3 normal = normalize(vNormal);

    // Couleur de base : mélange d’orange/rose/violet en fonction de la position ou du temps
    // On va utiliser un gradient temporel simple combiné à la position du vertex
    float t = u_time * 0.2;
    
    // Dégradé cyclique basé sur sin/cos
    float r = 0.5 + 0.5 * sin(t + vPosition.y * 2.0);
    float g = 0.5 + 0.5 * sin(t + vPosition.x * 3.0);
    float b = 0.5 + 0.5 * cos(t + vPosition.z * 3.0);
    
    // On peut ajouter des "bandes" pour un effet un peu plus dynamique
    float stripe = 0.5 + 0.5 * sin(vPosition.y * 10.0 + t*5.0);
    
    // Mix entre la couleur de base et une teinte plus lumineuse pour la bande
    vec3 baseColor = vec3(r, g, b);
    vec3 stripeColor = vec3(1.0, 0.5, 0.8); // un rose/orange lumineux
    vec3 color = mix(baseColor, stripeColor, stripe * 0.3); // 0.3 = intensité des bandes

    // On peut ajouter un léger effet de "lumière" artificielle en tenant compte de la normale
    // pour amplifier la sensation organique
    float light = dot(normal, vec3(0.0, 0.0, 1.0)) * 0.2; 
    color += light;

    gl_FragColor = vec4(color, 1.0);
  }
`;

/**
 * Création d’un matériau personnalisé avec Drei
 * On déclare nos uniforms : u_time, u_mouse, ...
 */
const SphereMaterial = shaderMaterial(
  {
    u_time: 0,
    u_mouse: new THREE.Vector2(0, 0),
  },
  vertexShader,
  fragmentShader
);

// On doit ensuite appeler `extend` pour rendre ce matériau disponible en tant que JSX <sphereMaterial ... />
extend({ SphereMaterial });

/**
 * Composant React qui encapsule notre matériau personnalisé.
 * On peut ajuster certaines props si besoin.
 */
export default function SphereShaderMaterial(props) {
  return <sphereMaterial attach="material" {...props} />
}
