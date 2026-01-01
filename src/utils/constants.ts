import { ZodiacSign, ZodiacElement } from '@/types';

// ==================== ZODIAC CONSTANTS ====================

export const ZODIAC_SIGNS = [
  'Aries',
  'Taurus',
  'Gemini',
  'Cancer',
  'Leo',
  'Virgo',
  'Libra',
  'Scorpio',
  'Sagittarius',
  'Capricorn',
  'Aquarius',
  'Pisces',
] as const;

export const ZODIAC_ELEMENTS = ['Fire', 'Earth', 'Air', 'Water'] as const;

// Zodiac Symbols (Unicode)
export const ZODIAC_SYMBOLS: Record<ZodiacSign, string> = {
  Aries: '♈',
  Taurus: '♉',
  Gemini: '♊',
  Cancer: '♋',
  Leo: '♌',
  Virgo: '♍',
  Libra: '♎',
  Scorpio: '♏',
  Sagittarius: '♐',
  Capricorn: '♑',
  Aquarius: '♒',
  Pisces: '♓',
};

// Zodiac Colors (Tailwind classes)
export const ZODIAC_COLORS: Record<ZodiacSign, { bg: string; text: string; border: string }> = {
  Aries: { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-300' },
  Taurus: { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-300' },
  Gemini: { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-300' },
  Cancer: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-300' },
  Leo: { bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-300' },
  Virgo: { bg: 'bg-teal-100', text: 'text-teal-700', border: 'border-teal-300' },
  Libra: { bg: 'bg-pink-100', text: 'text-pink-700', border: 'border-pink-300' },
  Scorpio: { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-300' },
  Sagittarius: {
    bg: 'bg-sagittarius-100',
    text: 'text-sagittarius-700',
    border: 'border-sagittarius-300',
  },
  Capricorn: { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-300' },
  Aquarius: { bg: 'bg-cyan-100', text: 'text-cyan-700', border: 'border-cyan-300' },
  Pisces: { bg: 'bg-indigo-100', text: 'text-indigo-700', border: 'border-indigo-300' },
};

// Element Colors
export const ELEMENT_COLORS: Record<ZodiacElement, { bg: string; text: string; icon: string }> = {
  Fire: { bg: 'bg-fire', text: 'text-white', icon: '🔥' },
  Earth: { bg: 'bg-earth', text: 'text-white', icon: '🌍' },
  Air: { bg: 'bg-air', text: 'text-white', icon: '💨' },
  Water: { bg: 'bg-water', text: 'text-white', icon: '💧' },
};

// Zodiac to Element mapping
export const ZODIAC_TO_ELEMENT: Record<ZodiacSign, ZodiacElement> = {
  Aries: ZodiacElement.Fire,
  Leo: ZodiacElement.Fire,
  Sagittarius: ZodiacElement.Fire,
  Taurus: ZodiacElement.Earth,
  Virgo: ZodiacElement.Earth,
  Capricorn: ZodiacElement.Earth,
  Gemini: ZodiacElement.Air,
  Libra: ZodiacElement.Air,
  Aquarius: ZodiacElement.Air,
  Cancer: ZodiacElement.Water,
  Scorpio: ZodiacElement.Water,
  Pisces: ZodiacElement.Water,
};

// ==================== MEMBERSHIP ====================

export const MEMBERSHIP_STATUS = {
  Active: { label: 'Active', color: 'green', icon: '✓' },
  Inactive: { label: 'Inactive', color: 'gray', icon: '○' },
  OnLeave: { label: 'On Leave', color: 'yellow', icon: '⏸' },
  Alumni: { label: 'Alumni', color: 'blue', icon: '🎓' },
} as const;

export const MEMBERSHIP_TYPE = {
  FullMember: { label: 'Full Member', icon: '⭐' },
  Associate: { label: 'Associate', icon: '🌟' },
  Honorary: { label: 'Honorary', icon: '👑' },
} as const;

// ==================== TEAM ====================

export const TEAM_STATUS = {
  Planning: { label: 'Planning', color: 'gray', icon: '📋' },
  Active: { label: 'Active', color: 'green', icon: '✓' },
  OnHold: { label: 'On Hold', color: 'yellow', icon: '⏸' },
  Completed: { label: 'Completed', color: 'blue', icon: '✅' },
  Cancelled: { label: 'Cancelled', color: 'red', icon: '✗' },
} as const;

export const TEAM_TYPE = {
  Project: { label: 'Project Team', icon: '🎯' },
  Department: { label: 'Department', icon: '🏢' },
  WorkingGroup: { label: 'Working Group', icon: '👥' },
  Committee: { label: 'Committee', icon: '📊' },
} as const;

// ==================== COMPATIBILITY ====================

export const COMPATIBILITY_LEVELS = {
  Excellent: { label: 'Excellent', color: 'green', emoji: '💚', min: 80 },
  Good: { label: 'Good', color: 'blue', emoji: '💙', min: 60 },
  Moderate: { label: 'Moderate', color: 'yellow', emoji: '💛', min: 40 },
  Challenging: { label: 'Challenging', color: 'orange', emoji: '🧡', min: 20 },
  Difficult: { label: 'Difficult', color: 'red', emoji: '❤️', min: 0 },
} as const;

// ==================== APP CONFIG ====================

export const APP_CONFIG = {
  name: 'Zodiac HR Management',
  organization: 'JCI Danang Junior Club',
  motto: 'Aim High, Lead with Optimism!',
  primarySign: 'Sagittarius',
  version: '1.0.0',
} as const;

// ==================== DATE FORMATS ====================

export const DATE_FORMATS = {
  display: 'dd/MM/yyyy',
  api: 'yyyy-MM-dd',
  full: 'dd MMMM yyyy',
  short: 'dd/MM/yy',
} as const;

// ==================== PAGINATION ====================

export const PAGINATION_DEFAULTS = {
  pageSize: 20,
  pageSizeOptions: [10, 20, 50, 100],
} as const;

// ==================== LOCAL STORAGE KEYS ====================

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER: 'user',
  THEME: 'theme',
  SIDEBAR_COLLAPSED: 'sidebar_collapsed',
} as const;