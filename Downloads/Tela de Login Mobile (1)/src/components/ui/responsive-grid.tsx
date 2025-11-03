import React from 'react';
import { cn } from './utils';

interface ResponsiveGridProps {
  children: React.ReactNode;
  cols?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
    wide?: number;
  };
  gap?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
  className?: string;
}

export function ResponsiveGrid({ 
  children, 
  cols = { mobile: 1, tablet: 2, desktop: 3, wide: 4 },
  gap = { mobile: 4, tablet: 6, desktop: 8 },
  className 
}: ResponsiveGridProps) {
  const gridClasses = cn(
    'grid',
    // Columns
    `grid-cols-${cols.mobile || 1}`,
    cols.tablet && `md:grid-cols-${cols.tablet}`,
    cols.desktop && `lg:grid-cols-${cols.desktop}`,
    cols.wide && `xl:grid-cols-${cols.wide}`,
    // Gap
    `gap-${gap.mobile || 4}`,
    gap.tablet && `md:gap-${gap.tablet}`,
    gap.desktop && `lg:gap-${gap.desktop}`,
    className
  );

  return (
    <div className={gridClasses}>
      {children}
    </div>
  );
}

interface ResponsiveContainerProps {
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padding?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
  className?: string;
}

export function ResponsiveContainer({ 
  children, 
  maxWidth = 'lg',
  padding = { mobile: 4, tablet: 6, desktop: 8 },
  className 
}: ResponsiveContainerProps) {
  const containerClasses = cn(
    'mx-auto w-full',
    // Max width
    maxWidth !== 'full' && `max-w-${maxWidth === 'sm' ? 'sm' : maxWidth === 'md' ? 'md' : maxWidth === 'lg' ? '4xl' : maxWidth === 'xl' ? '6xl' : '7xl'}`,
    // Padding
    `p-${padding.mobile || 4}`,
    padding.tablet && `md:p-${padding.tablet}`,
    padding.desktop && `lg:p-${padding.desktop}`,
    className
  );

  return (
    <div className={containerClasses}>
      {children}
    </div>
  );
}

interface ResponsiveStackProps {
  children: React.ReactNode;
  direction?: {
    mobile?: 'row' | 'col';
    tablet?: 'row' | 'col';
    desktop?: 'row' | 'col';
  };
  gap?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
  align?: {
    mobile?: 'start' | 'center' | 'end' | 'stretch';
    tablet?: 'start' | 'center' | 'end' | 'stretch';
    desktop?: 'start' | 'center' | 'end' | 'stretch';
  };
  justify?: {
    mobile?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
    tablet?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
    desktop?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  };
  className?: string;
}

export function ResponsiveStack({ 
  children, 
  direction = { mobile: 'col', tablet: 'row' },
  gap = { mobile: 3, tablet: 4, desktop: 6 },
  align,
  justify,
  className 
}: ResponsiveStackProps) {
  const stackClasses = cn(
    'flex',
    // Direction
    `flex-${direction.mobile || 'col'}`,
    direction.tablet && `md:flex-${direction.tablet}`,
    direction.desktop && `lg:flex-${direction.desktop}`,
    // Gap
    `gap-${gap.mobile || 3}`,
    gap.tablet && `md:gap-${gap.tablet}`,
    gap.desktop && `lg:gap-${gap.desktop}`,
    // Align
    align?.mobile && `items-${align.mobile}`,
    align?.tablet && `md:items-${align.tablet}`,
    align?.desktop && `lg:items-${align.desktop}`,
    // Justify
    justify?.mobile && `justify-${justify.mobile}`,
    justify?.tablet && `md:justify-${justify.tablet}`,
    justify?.desktop && `lg:justify-${justify.desktop}`,
    className
  );

  return (
    <div className={stackClasses}>
      {children}
    </div>
  );
}