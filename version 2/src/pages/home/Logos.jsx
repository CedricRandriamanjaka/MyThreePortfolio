// Logos.jsx
import React from "react";

export const FrontEndLogo = (props) => (
  <svg
    width="50"
    height="50"
    viewBox="0 0 64 64"
    fill="none"
    {...props}
  >
    {/* Représente un écran d’ordinateur */}
    <rect
      x="8"
      y="12"
      width="48"
      height="32"
      rx="4"
      stroke="currentColor"
      strokeWidth="4"
      fill="none"
    />
    <rect x="28" y="44" width="8" height="4" fill="currentColor" />
    <rect x="26" y="48" width="12" height="4" fill="currentColor" />
  </svg>
);

export const BackEndLogo = (props) => (
  <svg
    width="50"
    height="50"
    viewBox="0 0 64 64"
    fill="none"
    {...props}
  >
    {/* Représente des serveurs empilés */}
    <rect
      x="8"
      y="12"
      width="48"
      height="16"
      rx="2"
      stroke="currentColor"
      strokeWidth="4"
      fill="none"
    />
    <rect
      x="8"
      y="36"
      width="48"
      height="16"
      rx="2"
      stroke="currentColor"
      strokeWidth="4"
      fill="none"
    />
    <circle cx="20" cy="20" r="2" fill="currentColor" />
    <circle cx="20" cy="44" r="2" fill="currentColor" />
  </svg>
);

export const ToolsLogo = (props) => (
  <svg
    width="50"
    height="50"
    viewBox="0 0 64 64"
    fill="none"
    {...props}
  >
    {/* Représente un engrenage simplifié */}
    <circle
      cx="32"
      cy="32"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
      fill="none"
    />
    <path
      d="M32 4V12"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
    />
    <path
      d="M32 52V60"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
    />
    <path
      d="M4 32H12"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
    />
    <path
      d="M52 32H60"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
    />
    <path
      d="M11.31 11.31l5.66 5.66"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
    />
    <path
      d="M46.03 46.03l5.66 5.66"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
    />
    <path
      d="M11.31 52.69l5.66-5.66"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
    />
    <path
      d="M46.03 17.97l5.66-5.66"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
    />
  </svg>
);
