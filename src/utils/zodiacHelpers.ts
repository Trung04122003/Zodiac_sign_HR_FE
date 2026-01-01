import { ZodiacSign, ZodiacElement } from '@/types';
import { ZODIAC_SYMBOLS, ZODIAC_TO_ELEMENT, ELEMENT_COLORS, ZODIAC_COLORS } from './constants';

/**
 * Get zodiac symbol for a sign
 */
export const getZodiacSymbol = (sign: ZodiacSign): string => {
  return ZODIAC_SYMBOLS[sign] || '';
};

/**
 * Get element for a zodiac sign
 */
export const getZodiacElement = (sign: ZodiacSign): ZodiacElement => {
  return ZODIAC_TO_ELEMENT[sign];
};

/**
 * Get element icon
 */
export const getElementIcon = (element: ZodiacElement): string => {
  return ELEMENT_COLORS[element].icon;
};

/**
 * Get zodiac colors (Tailwind classes)
 */
export const getZodiacColors = (sign: ZodiacSign) => {
  return ZODIAC_COLORS[sign];
};

/**
 * Get element colors
 */
export const getElementColors = (element: ZodiacElement) => {
  return ELEMENT_COLORS[element];
};

/**
 * Calculate zodiac sign from date of birth
 */
export const calculateZodiacSign = (dateOfBirth: Date | string): ZodiacSign => {
  const date = typeof dateOfBirth === 'string' ? new Date(dateOfBirth) : dateOfBirth;
  const month = date.getMonth() + 1; // 1-12
  const day = date.getDate();

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return ZodiacSign.Aries;
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return ZodiacSign.Taurus;
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return ZodiacSign.Gemini;
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return ZodiacSign.Cancer;
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return ZodiacSign.Leo;
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return ZodiacSign.Virgo;
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return ZodiacSign.Libra;
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return ZodiacSign.Scorpio;
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return ZodiacSign.Sagittarius;
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return ZodiacSign.Capricorn;
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return ZodiacSign.Aquarius;
  return ZodiacSign.Pisces; // Feb 19 - Mar 20
};

/**
 * Format zodiac display text
 */
export const formatZodiacDisplay = (sign: ZodiacSign): string => {
  return `${getZodiacSymbol(sign)} ${sign}`;
};

/**
 * Check if two zodiac signs are compatible (simplified)
 */
export const areSignsCompatible = (sign1: ZodiacSign, sign2: ZodiacSign): boolean => {
  const element1 = getZodiacElement(sign1);
  const element2 = getZodiacElement(sign2);

  // Fire + Air = Good
  if (
    (element1 === ZodiacElement.Fire && element2 === ZodiacElement.Air) ||
    (element1 === ZodiacElement.Air && element2 === ZodiacElement.Fire)
  ) {
    return true;
  }

  // Earth + Water = Good
  if (
    (element1 === ZodiacElement.Earth && element2 === ZodiacElement.Water) ||
    (element1 === ZodiacElement.Water && element2 === ZodiacElement.Earth)
  ) {
    return true;
  }

  // Same element = Moderate
  if (element1 === element2) {
    return true;
  }

  return false;
};

/**
 * Get zodiac date range
 */
export const getZodiacDateRange = (sign: ZodiacSign): string => {
  const ranges: Record<ZodiacSign, string> = {
    Aries: 'Mar 21 - Apr 19',
    Taurus: 'Apr 20 - May 20',
    Gemini: 'May 21 - Jun 20',
    Cancer: 'Jun 21 - Jul 22',
    Leo: 'Jul 23 - Aug 22',
    Virgo: 'Aug 23 - Sep 22',
    Libra: 'Sep 23 - Oct 22',
    Scorpio: 'Oct 23 - Nov 21',
    Sagittarius: 'Nov 22 - Dec 21',
    Capricorn: 'Dec 22 - Jan 19',
    Aquarius: 'Jan 20 - Feb 18',
    Pisces: 'Feb 19 - Mar 20',
  };
  return ranges[sign];
};

/**
 * Get zodiac ruling planet
 */
export const getZodiacRulingPlanet = (sign: ZodiacSign): string => {
  const planets: Record<ZodiacSign, string> = {
    Aries: 'Mars',
    Taurus: 'Venus',
    Gemini: 'Mercury',
    Cancer: 'Moon',
    Leo: 'Sun',
    Virgo: 'Mercury',
    Libra: 'Venus',
    Scorpio: 'Pluto',
    Sagittarius: 'Jupiter',
    Capricorn: 'Saturn',
    Aquarius: 'Uranus',
    Pisces: 'Neptune',
  };
  return planets[sign];
};

/**
 * Check if element balance is good
 */
export const isElementBalanced = (distribution: Record<ZodiacElement, number>): boolean => {
  const values = Object.values(distribution);
  const total = values.reduce((sum, val) => sum + val, 0);
  if (total === 0) return true;

  // Check if any element is missing
  const hasMissing = values.some(val => val === 0);
  if (hasMissing) return false;

  // Check if distribution is reasonably balanced (no element > 50%)
  const maxPercentage = Math.max(...values) / total;
  return maxPercentage <= 0.5;
};

/**
 * Get compatibility score color
 */
export const getCompatibilityColor = (score: number): string => {
  if (score >= 80) return 'green';
  if (score >= 60) return 'blue';
  if (score >= 40) return 'yellow';
  if (score >= 20) return 'orange';
  return 'red';
};

/**
 * Format compatibility percentage
 */
export const formatCompatibilityScore = (score: number): string => {
  return `${score.toFixed(1)}%`;
};