// types/member.ts - Member DTOs and Enums

// ==================== ENUMS ====================

export enum ZodiacSign {
  Aries = 'Aries',
  Taurus = 'Taurus',
  Gemini = 'Gemini',
  Cancer = 'Cancer',
  Leo = 'Leo',
  Virgo = 'Virgo',
  Libra = 'Libra',
  Scorpio = 'Scorpio',
  Sagittarius = 'Sagittarius',
  Capricorn = 'Capricorn',
  Aquarius = 'Aquarius',
  Pisces = 'Pisces',
}

export enum ZodiacElement {
  Fire = 'Fire',
  Earth = 'Earth',
  Air = 'Air',
  Water = 'Water',
}

export enum MembershipStatus {
  Active = 'Active',
  Inactive = 'Inactive',
  OnLeave = 'OnLeave',
  Alumni = 'Alumni',
}

export enum MembershipType {
  FullMember = 'FullMember',
  Associate = 'Associate',
  Honorary = 'Honorary',
}

// ==================== REQUEST DTOs ====================

export interface CreateMemberRequest {
  fullName: string;
  email?: string;
  phone?: string;
  dateOfBirth: string; // ISO date string: "2003-12-04"
  zodiacSign?: ZodiacSign;
  zodiacElement?: ZodiacElement;
  
  // JCI Specific
  position?: string;
  departmentId?: number;
  joinDate?: string;
  membershipStatus?: MembershipStatus;
  membershipType?: MembershipType;
  
  // Contact & Personal
  avatarUrl?: string;
  address?: string;
  city?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
  
  // Social Media
  facebookUrl?: string;
  
  // Metadata
  notes?: string;
  tags?: string[];
}

export interface UpdateMemberRequest {
  fullName?: string;
  email?: string;
  phone?: string;
  dateOfBirth?: string;
  zodiacSign?: ZodiacSign;
  zodiacElement?: ZodiacElement;
  
  // JCI Specific
  position?: string;
  departmentId?: number;
  joinDate?: string;
  membershipStatus?: MembershipStatus;
  membershipType?: MembershipType;
  
  // Contact & Personal
  avatarUrl?: string;
  address?: string;
  city?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
  
  // Social Media
  facebookUrl?: string;
  
  // Metadata
  notes?: string;
  tags?: string[];
}

export interface MemberSearchRequest {
  keyword?: string;
  zodiacSign?: ZodiacSign;
  zodiacElement?: ZodiacElement;
  membershipStatus?: MembershipStatus;
  departmentId?: number;
  position?: string;
  
  // Pagination
  page?: number;
  size?: number;
  sortBy?: string;
  sortDirection?: 'ASC' | 'DESC';
}

// ==================== RESPONSE DTOs ====================

export interface MemberResponse {
  id: number;
  memberCode: string;
  fullName: string;
  email?: string;
  phone?: string;
  dateOfBirth: string;
  
  // Zodiac Info
  zodiacSign: string;
  zodiacElement: string;
  zodiacSymbol: string;
  zodiacDateRange: string;
  elementSymbol: string;
  
  // JCI Specific
  position?: string;
  departmentId?: number;
  departmentName?: string;
  departmentCode?: string;
  joinDate: string;
  membershipStatus: string;
  membershipType: string;
  
  // Contact & Personal
  avatarUrl?: string;
  address?: string;
  city?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
  
  // Social Media
  facebookUrl?: string;
  
  // Metadata
  notes?: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
  createdBy: number;
  
  // Computed Fields
  age?: number;
  daysSinceJoined?: number;
  isActive: boolean;
  isBirthdayToday?: boolean;
  daysUntilBirthday?: number;
  
  // Zodiac Insights
  personalityTraits?: string[];
  strengths?: string[];
  elementDescription?: string;
}

export interface MemberSummaryResponse {
  id: number;
  memberCode: string;
  fullName: string;
  email?: string;
  position?: string;
  
  // Zodiac Info
  zodiacSign: string;
  zodiacElement: string;
  zodiacSymbol: string;
  elementSymbol: string;
  
  // Display Info
  avatarUrl?: string;
  membershipStatus: string;
  joinDate: string;
  isActive: boolean;
  
  // Department Info
  departmentId?: number;
  departmentName?: string;
  departmentCode?: string;
  
  // Computed Fields
  age?: number;
  daysSinceJoined?: number;
  isBirthdayToday?: boolean;
  isBirthdayThisWeek?: boolean;
}

// ==================== API RESPONSE WRAPPER ====================

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
}

export interface PageResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}

// ==================== FORM STATE ====================

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface MemberFormData extends CreateMemberRequest {
  // Additional UI state if needed
}

// ==================== HELPER TYPES ====================

export const ZODIAC_SIGN_OPTIONS = Object.values(ZodiacSign);
export const ZODIAC_ELEMENT_OPTIONS = Object.values(ZodiacElement);
export const MEMBERSHIP_STATUS_OPTIONS = Object.values(MembershipStatus);
export const MEMBERSHIP_TYPE_OPTIONS = Object.values(MembershipType);

// Zodiac sign symbols mapping
export const ZODIAC_SYMBOLS: Record<ZodiacSign, string> = {
  [ZodiacSign.Aries]: '♈',
  [ZodiacSign.Taurus]: '♉',
  [ZodiacSign.Gemini]: '♊',
  [ZodiacSign.Cancer]: '♋',
  [ZodiacSign.Leo]: '♌',
  [ZodiacSign.Virgo]: '♍',
  [ZodiacSign.Libra]: '♎',
  [ZodiacSign.Scorpio]: '♏',
  [ZodiacSign.Sagittarius]: '♐',
  [ZodiacSign.Capricorn]: '♑',
  [ZodiacSign.Aquarius]: '♒',
  [ZodiacSign.Pisces]: '♓',
};

// Element symbols mapping
export const ELEMENT_SYMBOLS: Record<ZodiacElement, string> = {
  [ZodiacElement.Fire]: '🔥',
  [ZodiacElement.Earth]: '🌍',
  [ZodiacElement.Air]: '💨',
  [ZodiacElement.Water]: '💧',
};

// Element colors
export const ELEMENT_COLORS: Record<ZodiacElement, string> = {
  [ZodiacElement.Fire]: 'text-red-500',
  [ZodiacElement.Earth]: 'text-green-600',
  [ZodiacElement.Air]: 'text-blue-400',
  [ZodiacElement.Water]: 'text-blue-600',
};