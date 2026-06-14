import React from "react";

export default function Logo({ size = 40, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect x="5" y="29" width="7" height="12" rx="2" fill="#101820" />
      <rect x="17" y="22" width="7" height="19" rx="2" fill="#101820" />
      <rect x="29" y="15" width="7" height="26" rx="2" fill="#101820" />
      <path
        d="M8 23.5L19.2 14L26.8 18.5L39.5 6"
        stroke="#E53935"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M31.5 6H39.5V14"
        stroke="#E53935"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="8.5" cy="23.5" r="2.5" fill="#E53935" />
    </svg>
  );
}
