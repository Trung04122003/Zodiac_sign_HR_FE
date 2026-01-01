import React from 'react';
import clsx from 'clsx';
import { ZodiacSign, ZodiacElement } from '@/types';
import { getZodiacSymbol, getZodiacColors, getElementColors, getElementIcon } from '@/utils/zodiacHelpers';

// ==================== ZODIAC ICON ====================

interface ZodiacIconProps {
  sign: ZodiacSign;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSymbol?: boolean;
  className?: string;
}

export const ZodiacIcon: React.FC<ZodiacIconProps> = ({
  sign,
  size = 'md',
  showSymbol = true,
  className,
}) => {
  const sizes = {
    sm: 'w-6 h-6 text-sm',
    md: 'w-10 h-10 text-lg',
    lg: 'w-14 h-14 text-2xl',
    xl: 'w-20 h-20 text-4xl',
  };

  const symbol = getZodiacSymbol(sign);
  const colors = getZodiacColors(sign);

  return (
    <div
      className={clsx(
        'rounded-full flex items-center justify-center font-bold',
        colors.bg,
        colors.text,
        sizes[size],
        className
      )}
      title={sign}
    >
      {showSymbol ? symbol : sign.substring(0, 2)}
    </div>
  );
};

// ==================== ZODIAC BADGE ====================

interface ZodiacBadgeProps {
  sign: ZodiacSign;
  showSymbol?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const ZodiacBadge: React.FC<ZodiacBadgeProps> = ({
  sign,
  showSymbol = true,
  size = 'md',
  className,
}) => {
  const symbol = getZodiacSymbol(sign);
  const colors = getZodiacColors(sign);

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  };

  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1 rounded-full font-semibold border',
        colors.bg,
        colors.text,
        colors.border,
        sizes[size],
        className
      )}
    >
      {showSymbol && <span>{symbol}</span>}
      <span>{sign}</span>
    </span>
  );
};

// ==================== ELEMENT ICON ====================

interface ElementIconProps {
  element: ZodiacElement;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export const ElementIcon: React.FC<ElementIconProps> = ({
  element,
  size = 'md',
  showLabel = false,
  className,
}) => {
  const icon = getElementIcon(element);
  const colors = getElementColors(element);

  const sizes = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-8 h-8 text-sm',
    lg: 'w-10 h-10 text-base',
  };

  return (
    <div className={clsx('flex items-center gap-2', className)}>
      <div
        className={clsx(
          'rounded-lg flex items-center justify-center',
          colors.bg,
          colors.text,
          sizes[size]
        )}
        title={element}
      >
        <span className="text-xl">{icon}</span>
      </div>
      {showLabel && <span className="font-medium text-gray-700">{element}</span>}
    </div>
  );
};

// ==================== ELEMENT BADGE ====================

interface ElementBadgeProps {
  element: ZodiacElement;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const ElementBadge: React.FC<ElementBadgeProps> = ({
  element,
  size = 'md',
  className,
}) => {
  const icon = getElementIcon(element);
  const colors = getElementColors(element);

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  };

  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 rounded-full font-semibold',
        colors.bg,
        colors.text,
        sizes[size],
        className
      )}
    >
      <span>{icon}</span>
      <span>{element}</span>
    </span>
  );
};

// ==================== COMPATIBILITY SCORE ====================

interface CompatibilityScoreProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export const CompatibilityScore: React.FC<CompatibilityScoreProps> = ({
  score,
  size = 'md',
  showLabel = true,
  className,
}) => {
  const getColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-blue-600 bg-blue-100';
    if (score >= 40) return 'text-yellow-600 bg-yellow-100';
    if (score >= 20) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  const sizes = {
    sm: 'w-12 h-12 text-sm',
    md: 'w-16 h-16 text-lg',
    lg: 'w-20 h-20 text-xl',
  };

  return (
    <div className={clsx('flex flex-col items-center gap-1', className)}>
      <div
        className={clsx(
          'rounded-full flex items-center justify-center font-bold border-4',
          getColor(score),
          sizes[size]
        )}
      >
        {score}%
      </div>
      {showLabel && <span className="text-xs text-gray-600 font-medium">Compatibility</span>}
    </div>
  );
};