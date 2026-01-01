import axiosInstance, { handleApiResponse } from '../axios.config';
import {
  ApiResponse,
  Member,
  MemberSummaryResponse,
  CreateMemberRequest,
  UpdateMemberRequest,
  MemberSearchRequest,
  Page,
  ZodiacSign,
  ZodiacElement,
} from '@/types';

const memberService = {
  /**
   * Create new member
   */
  createMember: async (data: CreateMemberRequest): Promise<Member> => {
    const response = await axiosInstance.post<ApiResponse<Member>>('/members', data);
    return handleApiResponse(response);
  },

  /**
   * Get member by ID
   */
  getMemberById: async (id: number): Promise<Member> => {
    const response = await axiosInstance.get<ApiResponse<Member>>(`/members/${id}`);
    return handleApiResponse(response);
  },

  /**
   * Get member by member code
   */
  getMemberByCode: async (memberCode: string): Promise<Member> => {
    const response = await axiosInstance.get<ApiResponse<Member>>(`/members/code/${memberCode}`);
    return handleApiResponse(response);
  },

  /**
   * Get all members (paginated)
   */
  getAllMembers: async (
    page: number = 0,
    size: number = 20,
    sortBy: string = 'createdAt',
    sortDirection: 'ASC' | 'DESC' = 'DESC'
  ): Promise<Page<MemberSummaryResponse>> => {
    const response = await axiosInstance.get<ApiResponse<Page<MemberSummaryResponse>>>(
      '/members',
      {
        params: { page, size, sortBy, sortDirection },
      }
    );
    return handleApiResponse(response);
  },

  /**
   * Search members with filters
   */
  searchMembers: async (searchRequest: MemberSearchRequest): Promise<Page<MemberSummaryResponse>> => {
    const response = await axiosInstance.post<ApiResponse<Page<MemberSummaryResponse>>>(
      '/members/search',
      searchRequest
    );
    return handleApiResponse(response);
  },

  /**
   * Update member
   */
  updateMember: async (id: number, data: UpdateMemberRequest): Promise<Member> => {
    const response = await axiosInstance.put<ApiResponse<Member>>(`/members/${id}`, data);
    return handleApiResponse(response);
  },

  /**
   * Delete member (soft delete)
   */
  deleteMember: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/members/${id}`);
  },

  /**
   * Permanently delete member
   */
  permanentlyDeleteMember: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/members/${id}/permanent`);
  },

  /**
   * Get active members only
   */
  getActiveMembers: async (): Promise<MemberSummaryResponse[]> => {
    const response = await axiosInstance.get<ApiResponse<MemberSummaryResponse[]>>(
      '/members/active'
    );
    return handleApiResponse(response);
  },

  /**
   * Get members by zodiac sign
   */
  getMembersByZodiacSign: async (sign: ZodiacSign): Promise<MemberSummaryResponse[]> => {
    const response = await axiosInstance.get<ApiResponse<MemberSummaryResponse[]>>(
      `/members/zodiac/${sign}`
    );
    return handleApiResponse(response);
  },

  /**
   * Get members by zodiac element
   */
  getMembersByElement: async (element: ZodiacElement): Promise<MemberSummaryResponse[]> => {
    const response = await axiosInstance.get<ApiResponse<MemberSummaryResponse[]>>(
      `/members/element/${element}`
    );
    return handleApiResponse(response);
  },

  /**
   * Get members by department
   */
  getMembersByDepartment: async (departmentId: number): Promise<MemberSummaryResponse[]> => {
    const response = await axiosInstance.get<ApiResponse<MemberSummaryResponse[]>>(
      `/members/department/${departmentId}`
    );
    return handleApiResponse(response);
  },

  /**
   * Get member statistics
   */
  getMemberStats: async (): Promise<{ totalMembers: number; activeMembers: number }> => {
    const response = await axiosInstance.get<
      ApiResponse<{ totalMembers: number; activeMembers: number }>
    >('/members/stats');
    return handleApiResponse(response);
  },

  /**
 * Upload member avatar
 */
  uploadAvatar: async (memberId: number, file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await axiosInstance.post<ApiResponse<{ avatarUrl: string }>>(
      `/members/${memberId}/avatar`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    const result = handleApiResponse<{ avatarUrl: string }>(response);
    return result.avatarUrl;
  },
};

export default memberService;