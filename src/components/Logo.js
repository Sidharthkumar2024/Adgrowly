import React from "react";

export default function Logo({ size = 44, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`drop-shadow-[0_8px_16px_rgba(229,57,53,0.35)] ${className}`}
    >
      <rect width="48" height="48" rx="13" fill="#E53935" />
      <rect width="48" height="48" rx="13" fill="url(#lg1)" fillOpacity="0.25" />
      <defs>
        <linearGradient id="lg1" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect x="9" y="29" width="5.5" height="10" rx="2" fill="white" fillOpacity="0.45" />
      <rect x="18" y="24" width="5.5" height="15" rx="2" fill="white" fillOpacity="0.65" />
      <rect x="27" y="19" width="5.5" height="20" rx="2" fill="white" fillOpacity="0.85" />
      <path
        d="M10 26 L22 17.5 L27 21 L36 12.5"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M37.2 6.2 L38.1 8.2 L39.6 7.5 L39.3 9.2 L41.2 9.5 L39.9 10.9 L41.5 11.9 L39.7 12.5 L40.2 14.2 L38.4 13.7 L38.1 15.7 L37.2 14.4 L36.3 15.7 L36 13.7 L34.2 14.2 L34.7 12.5 L32.9 11.9 L34.5 10.9 L33.2 9.5 L35.1 9.2 L34.8 7.5 L36.3 8.2 Z"
        fill="white"
      />
    </svg>
  );
}
