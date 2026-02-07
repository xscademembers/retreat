import React from 'react';
import { useInView } from '../hooks/useInView';

type AnimationType = 'fade-up' | 'fade-in' | 'fade-left' | 'fade-right' | 'scale-up';

interface AnimateOnScrollProps {
  children: React.ReactNode;
  animation?: AnimationType;
  delay?: number;
  className?: string;
}

export const AnimateOnScroll: React.FC<AnimateOnScrollProps> = ({
  children,
  animation = 'fade-up',
  delay = 0,
  className = '',
}) => {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`animate-on-scroll animate-${animation} ${isInView ? 'is-visible' : ''} ${className}`.trim()}
      style={{ transitionDelay: `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </div>
  );
};
