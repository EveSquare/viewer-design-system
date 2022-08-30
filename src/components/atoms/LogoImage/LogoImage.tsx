import React from "react";

interface Props {
  width?: number;
  height?: number;
}

export const LogoImage: React.FC<Props> = ({ width, height }) => {
  const w = width || 212;
  const h = height || 100;
  return (
    <div>
      <svg width={w} height={h} viewBox="0 0 212 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_i_101_3)">
          <rect width="212" height="100" rx="50" fill="#FAFAFA" />
        </g>
        <rect x="19" y="10" width="185" height="80" rx="40" fill="#202020" />
        <circle cx="80" cy="50" r="14" fill="#FAFAFA" />
        <circle cx="169" cy="49" r="13" fill="#FAFAFA" />
        <defs>
          <filter id="filter0_i_101_3" x="0" y="0" width="212" height="100" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
            <feOffset />
            <feGaussianBlur stdDeviation="4.5" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
            <feBlend mode="normal" in2="shape" result="effect1_innerShadow_101_3" />
          </filter>
        </defs>
      </svg>
    </div>
  );
}

LogoImage.displayName = "LOGOIMAGE";