import React from 'react';
import { Button, ButtonProps } from './button';
import { cn } from './utils';

interface ResponsiveButtonProps extends Omit<ButtonProps, 'size'> {
  size?: {
    mobile?: 'sm' | 'default' | 'lg';
    tablet?: 'sm' | 'default' | 'lg';
    desktop?: 'sm' | 'default' | 'lg';
  };
  width?: {
    mobile?: 'auto' | 'full';
    tablet?: 'auto' | 'full';
    desktop?: 'auto' | 'full';
  };
  responsive?: boolean; // Se true, aplica configurações padrão para responsividade
  children: React.ReactNode;
}

export function ResponsiveButton({
  size,
  width,
  responsive = false,
  className,
  children,
  ...props
}: ResponsiveButtonProps) {
  // Configurações padrão quando responsive=true
  const defaultConfig = responsive ? {
    size: { mobile: 'default' as const, tablet: 'default' as const, desktop: 'default' as const },
    width: { mobile: 'full' as const, tablet: 'auto' as const, desktop: 'auto' as const }
  } : {};

  const finalSize = size || defaultConfig.size;
  const finalWidth = width || defaultConfig.width;

  const responsiveClasses = cn(
    // Size classes
    finalSize?.mobile && `h-${finalSize.mobile === 'sm' ? '9' : finalSize.mobile === 'lg' ? '12' : '10'}`,
    finalSize?.tablet && `md:h-${finalSize.tablet === 'sm' ? '9' : finalSize.tablet === 'lg' ? '12' : '10'}`,
    finalSize?.desktop && `lg:h-${finalSize.desktop === 'sm' ? '9' : finalSize.desktop === 'lg' ? '12' : '10'}`,
    
    // Width classes
    finalWidth?.mobile && (finalWidth.mobile === 'full' ? 'w-full' : 'w-auto'),
    finalWidth?.tablet && (finalWidth.tablet === 'full' ? 'md:w-full' : 'md:w-auto'),
    finalWidth?.desktop && (finalWidth.desktop === 'full' ? 'lg:w-full' : 'lg:w-auto'),
    
    // Touch targets for mobile
    'min-h-[44px] min-w-[44px]',
    
    className
  );

  return (
    <Button
      className={responsiveClasses}
      {...props}
    >
      {children}
    </Button>
  );
}

// Componente para grupo de botões responsivos
interface ResponsiveButtonGroupProps {
  children: React.ReactNode;
  orientation?: {
    mobile?: 'horizontal' | 'vertical';
    tablet?: 'horizontal' | 'vertical';
    desktop?: 'horizontal' | 'vertical';
  };
  gap?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
  className?: string;
}

export function ResponsiveButtonGroup({
  children,
  orientation = { mobile: 'vertical', tablet: 'horizontal' },
  gap = { mobile: 2, tablet: 3, desktop: 4 },
  className
}: ResponsiveButtonGroupProps) {
  const groupClasses = cn(
    'flex',
    
    // Orientation
    orientation.mobile === 'vertical' ? 'flex-col' : 'flex-row',
    orientation.tablet && (orientation.tablet === 'vertical' ? 'md:flex-col' : 'md:flex-row'),
    orientation.desktop && (orientation.desktop === 'vertical' ? 'lg:flex-col' : 'lg:flex-row'),
    
    // Gap
    `gap-${gap.mobile}`,
    gap.tablet && `md:gap-${gap.tablet}`,
    gap.desktop && `lg:gap-${gap.desktop}`,
    
    className
  );

  return (
    <div className={groupClasses}>
      {children}
    </div>
  );
}