import { useState, useEffect } from 'react';

// Tailwind breakpoints
const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
} as const;

type Breakpoint = keyof typeof BREAKPOINTS;

export function useBreakpoint() {
  const [currentBreakpoint, setCurrentBreakpoint] = useState<Breakpoint | null>(null);
  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      setWindowWidth(width);

      if (width >= BREAKPOINTS['2xl']) {
        setCurrentBreakpoint('2xl');
      } else if (width >= BREAKPOINTS.xl) {
        setCurrentBreakpoint('xl');
      } else if (width >= BREAKPOINTS.lg) {
        setCurrentBreakpoint('lg');
      } else if (width >= BREAKPOINTS.md) {
        setCurrentBreakpoint('md');
      } else if (width >= BREAKPOINTS.sm) {
        setCurrentBreakpoint('sm');
      } else {
        setCurrentBreakpoint(null); // Mobile
      }
    };

    // Set initial value
    updateBreakpoint();

    // Listen for resize events
    window.addEventListener('resize', updateBreakpoint);
    
    return () => {
      window.removeEventListener('resize', updateBreakpoint);
    };
  }, []);

  const isMobile = currentBreakpoint === null;
  const isTablet = currentBreakpoint === 'sm' || currentBreakpoint === 'md';
  const isDesktop = currentBreakpoint === 'lg' || currentBreakpoint === 'xl' || currentBreakpoint === '2xl';

  return {
    currentBreakpoint,
    windowWidth,
    isMobile,
    isTablet,
    isDesktop,
    isSmUp: currentBreakpoint !== null,
    isMdUp: currentBreakpoint && BREAKPOINTS[currentBreakpoint] >= BREAKPOINTS.md,
    isLgUp: currentBreakpoint && BREAKPOINTS[currentBreakpoint] >= BREAKPOINTS.lg,
    isXlUp: currentBreakpoint && BREAKPOINTS[currentBreakpoint] >= BREAKPOINTS.xl,
    is2XlUp: currentBreakpoint === '2xl',
  };
}

// Hook simples para mobile (mantém compatibilidade)
export function useIsMobile() {
  const { isMobile } = useBreakpoint();
  return isMobile;
}