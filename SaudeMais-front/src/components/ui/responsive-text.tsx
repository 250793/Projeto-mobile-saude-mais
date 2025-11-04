import React from 'react';
import { cn } from './utils';

interface ResponsiveTextProps {
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  size?: {
    mobile?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl';
    tablet?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl';
    desktop?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl';
  };
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  color?: 'foreground' | 'muted' | 'primary' | 'secondary' | 'destructive';
  align?: {
    mobile?: 'left' | 'center' | 'right';
    tablet?: 'left' | 'center' | 'right';
    desktop?: 'left' | 'center' | 'right';
  };
  className?: string;
}

export function ResponsiveText({
  children,
  as: Component = 'p',
  size,
  weight,
  color = 'foreground',
  align,
  className
}: ResponsiveTextProps) {
  const textClasses = cn(
    // Base styles
    'leading-relaxed',
    
    // Size
    size?.mobile && `text-${size.mobile}`,
    size?.tablet && `md:text-${size.tablet}`,
    size?.desktop && `lg:text-${size.desktop}`,
    
    // Weight
    weight && `font-${weight}`,
    
    // Color
    color === 'foreground' && 'text-foreground',
    color === 'muted' && 'text-muted-foreground',
    color === 'primary' && 'text-primary',
    color === 'secondary' && 'text-secondary-foreground',
    color === 'destructive' && 'text-destructive',
    
    // Alignment
    align?.mobile && `text-${align.mobile}`,
    align?.tablet && `md:text-${align.tablet}`,
    align?.desktop && `lg:text-${align.desktop}`,
    
    className
  );

  return (
    <Component className={textClasses}>
      {children}
    </Component>
  );
}

// Componentes pré-configurados para uso comum
export function ResponsiveTitle({
  children,
  level = 1,
  className
}: {
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4;
  className?: string;
}) {
  const configs = {
    1: {
      as: 'h1' as const,
      size: { mobile: 'xl' as const, tablet: '2xl' as const, desktop: '3xl' as const },
      weight: 'bold' as const
    },
    2: {
      as: 'h2' as const,
      size: { mobile: 'lg' as const, tablet: 'xl' as const, desktop: '2xl' as const },
      weight: 'semibold' as const
    },
    3: {
      as: 'h3' as const,
      size: { mobile: 'base' as const, tablet: 'lg' as const, desktop: 'xl' as const },
      weight: 'semibold' as const
    },
    4: {
      as: 'h4' as const,
      size: { mobile: 'sm' as const, tablet: 'base' as const, desktop: 'lg' as const },
      weight: 'medium' as const
    }
  };

  const config = configs[level];

  return (
    <ResponsiveText
      as={config.as}
      size={config.size}
      weight={config.weight}
      className={className}
    >
      {children}
    </ResponsiveText>
  );
}

export function ResponsiveSubtitle({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <ResponsiveText
      as="p"
      size={{ mobile: 'sm', tablet: 'base' }}
      color="muted"
      className={className}
    >
      {children}
    </ResponsiveText>
  );
}