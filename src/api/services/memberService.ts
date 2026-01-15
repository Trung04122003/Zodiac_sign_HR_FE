// services/memberService.ts - Member API Service

import axios from 'axios';
import {
  CreateMemberRequest,
  UpdateMemberRequest,
  MemberSearchRequest,
  MemberResponse,
  MemberSummaryResponse,
  ApiResponse,
  PageResponse,
  ZodiacSign,
  ZodiacElement,
} from '@/types/member';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

// Create axios instance with base config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ==================== MEMBER CRUD ====================

/**
 * Create a new member
 */
export const createMember = async (
  data: CreateMemberRequest
): Promise<ApiResponse<MemberResponse>> => {
  const response = await api.post<ApiResponse<MemberResponse>>('/members', data);
  return response.data;
};

/**
 * Get member by ID
 */
export const getMemberById = async (id: number): Promise<ApiResponse<MemberResponse>> => {
  const response = await api.get<ApiResponse<MemberResponse>>(`/members/${id}`);
  return response.data;
};

/**
 * Get member by member code
 */
export const getMemberByCode = async (memberCode: string): Promise<ApiResponse<MemberResponse>> => {
  const response = await api.get<ApiResponse<MemberResponse>>(`/members/code/${memberCode}`);
  return response.data;
};

/**
 * Get all members (paginated)
 */
export const getAllMembers = async (
  page = 0,
  size = 20,
  sortBy = 'createdAt',
  sortDirection: 'ASC' | 'DESC' = 'DESC'
): Promise<ApiResponse<PageResponse<MemberSummaryResponse>>> => {
  const response = await api.get<ApiResponse<PageResponse<MemberSummaryResponse>>>('/members', {
    params: { page, size, sortBy, sortDirection },
  });
  return response.data;
};

/**
 * Search and filter members
 */
export const searchMembers = async (
  searchRequest: MemberSearchRequest
): Promise<ApiResponse<PageResponse<MemberSummaryResponse>>> => {
  const response = await api.post<ApiResponse<PageResponse<MemberSummaryResponse>>>(
    '/members/search',
    searchRequest
  );
  return response.data;
};

/**
 * Update member
 */
export const updateMember = async (
  id: number,
  data: UpdateMemberRequest
): Promise<ApiResponse<MemberResponse>> => {
  const response = await api.put<ApiResponse<MemberResponse>>(`/members/${id}`, data);
  return response.data;
};

/**
 * Delete member (soft delete)
 */
export const deleteMember = async (id: number): Promise<ApiResponse<void>> => {
  const response = await api.delete<ApiResponse<void>>(`/members/${id}`);
  return response.data;
};

/**
 * Permanently delete member
 */
export const permanentlyDeleteMember = async (id: number): Promise<ApiResponse<void>> => {
  const response = await api.delete<ApiResponse<void>>(`/members/${id}/permanent`);
  return response.data;
};

// ==================== FILTERED QUERIES ====================

/**
 * Get active members only
 */
export const getActiveMembers = async (): Promise<ApiResponse<MemberSummaryResponse[]>> => {
  const response = await api.get<ApiResponse<MemberSummaryResponse[]>>('/members/active');
  return response.data;
};

/**
 * Get members by zodiac sign
 */
export const getMembersByZodiacSign = async (
  sign: ZodiacSign
): Promise<ApiResponse<MemberSummaryResponse[]>> => {
  const response = await api.get<ApiResponse<MemberSummaryResponse[]>>(`/members/zodiac/${sign}`);
  return response.data;
};

/**
 * Get members by zodiac element
 */
export const getMembersByZodiacElement = async (
  element: ZodiacElement
): Promise<ApiResponse<MemberSummaryResponse[]>> => {
  const response = await api.get<ApiResponse<MemberSummaryResponse[]>>(
    `/members/element/${element}`
  );
  return response.data;
};

/**
 * Get members by department
 */
export const getMembersByDepartment = async (
  departmentId: number
): Promise<ApiResponse<MemberSummaryResponse[]>> => {
  const response = await api.get<ApiResponse<MemberSummaryResponse[]>>(
    `/members/department/${departmentId}`
  );
  return response.data;
};

// ==================== STATISTICS ====================

/**
 * Get member statistics
 */
export const getMemberStats = async (): Promise<
  ApiResponse<{
    totalMembers: number;
    activeMembers: number;
  }>
> => {
  const response = await api.get('/members/stats');
  return response.data;
};

// ==================== ZODIAC CALCULATION HELPER ====================

/**
 * Calculate zodiac sign from date of birth
 * Client-side calculation for real-time feedback
 */
export const calculateZodiacFromDate = (dateOfBirth: string): {
  sign: ZodiacSign;
  element: ZodiacElement;
  symbol: string;
} | null => {
  if (!dateOfBirth) return null;

  const date = new Date(dateOfBirth);
  const month = date.getMonth() + 1; // 1-12
  const day = date.getDate();

  let sign: ZodiacSign;

  // Zodiac sign calculation logic
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) sign = ZodiacSign.Aries;
  else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) sign = ZodiacSign.Taurus;
  else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) sign = ZodiacSign.Gemini;
  else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) sign = ZodiacSign.Cancer;
  else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) sign = ZodiacSign.Leo;
  else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) sign = ZodiacSign.Virgo;
  else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) sign = ZodiacSign.Libra;
  else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) sign = ZodiacSign.Scorpio;
  else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) sign = ZodiacSign.Sagittarius;
  else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) sign = ZodiacSign.Capricorn;
  else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) sign = ZodiacSign.Aquarius;
  else sign = ZodiacSign.Pisces;

  // Calculate element
  const element = getElementFromSign(sign);

  // Get symbol
  const symbols: Record<ZodiacSign, string> = {
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

  return {
    sign,
    element,
    symbol: symbols[sign],
  };
};

/**
 * Get element from zodiac sign
 */
const getElementFromSign = (sign: ZodiacSign): ZodiacElement => {
  const fireSign = [ZodiacSign.Aries, ZodiacSign.Leo, ZodiacSign.Sagittarius];
  const earthSigns = [ZodiacSign.Taurus, ZodiacSign.Virgo, ZodiacSign.Capricorn];
  const airSigns = [ZodiacSign.Gemini, ZodiacSign.Libra, ZodiacSign.Aquarius];
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const waterSigns = [ZodiacSign.Cancer, ZodiacSign.Scorpio, ZodiacSign.Pisces];

  if (fireSign.includes(sign)) return ZodiacElement.Fire;
  if (earthSigns.includes(sign)) return ZodiacElement.Earth;
  if (airSigns.includes(sign)) return ZodiacElement.Air;
  return ZodiacElement.Water;
};

export default {
  createMember,
  getMemberById,
  getMemberByCode,
  getAllMembers,
  searchMembers,
  updateMember,
  deleteMember,
  permanentlyDeleteMember,
  getActiveMembers,
  getMembersByZodiacSign,
  getMembersByZodiacElement,
  getMembersByDepartment,
  getMemberStats,
  calculateZodiacFromDate,
};