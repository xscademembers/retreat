import React from 'react';

interface LogoProps {
  className?: string;
  /** Icon size: 'navbar' (32px) or 'footer' (24px) */
  size?: 'navbar' | 'footer';
  /** 'light' = white tree (dark backgrounds), 'dark' = black tree (light backgrounds) */
  variant?: 'light' | 'dark';
}

const sizeMap = { navbar: 32, footer: 24 };

/** Tree silhouette logo – image with white or dark variant. */
export const Logo: React.FC<LogoProps> = ({ className = '', size = 'navbar', variant = 'light' }) => {
  const px = sizeMap[size];
  const isWhite = variant === 'light';
  return (
    <img
      src="/logo-tree.png"
      alt=""
      width={px}
      height={px}
      className={`object-contain ${className}`.trim()}
      style={{
        filter: isWhite ? 'brightness(0) invert(1)' : 'none',
      }}
      aria-hidden="true"
    />
  );
};
