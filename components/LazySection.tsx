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
    // If user navigated using a hash (e.g. "/#testimonials"), ensure content is mounted
    // immediately so hash scroll doesn't land on an empty placeholder.
    if (typeof window !== 'undefined' && id) {
      const currentHash = window.location.hash?.slice(1);
      if (currentHash && currentHash === id) {
        setIsVisible(true);
        return;
      }
    }

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
  }, [id]);

  useEffect(() => {
    if (!id) return;
    const onHashChange = () => {
      const currentHash = window.location.hash?.slice(1);
      if (currentHash && currentHash === id) setIsVisible(true);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, [id]);

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

