import React, { useEffect, useRef, useState } from 'react';

interface LazySectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
  /** Optional approximate height to avoid layout shift before content loads */
  minHeight?: number;
}

export const LazySection: React.FC<LazySectionProps> = ({ id, className, children, minHeight }) => {
  const [isVisible, setIsVisible] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // If IntersectionObserver is not supported, render immediately
    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const node = rootRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '200px 0px',
        threshold: 0.1,
      },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      id={id}
      ref={rootRef}
      className={className}
      aria-busy={!isVisible}
      style={minHeight ? { minHeight } : undefined}
    >
      {isVisible ? children : null}
    </section>
  );
};

