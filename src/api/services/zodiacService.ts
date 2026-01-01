import axiosInstance, { handleApiResponse } from '../axios.config';
import { ApiResponse, ZodiacProfile, ZodiacSign } from '@/types';

export const zodiacService = {
  getAllProfiles: async (): Promise<ZodiacProfile[]> => {
    const response = await axiosInstance.get<ApiResponse<ZodiacProfile[]>>('/zodiac/profiles');
    return handleApiResponse(response);
  },

  getProfileBySign: async (sign: ZodiacSign): Promise<ZodiacProfile> => {
    const response = await axiosInstance.get<ApiResponse<ZodiacProfile>>(
      `/zodiac/profiles/${sign}`
    );
    return handleApiResponse(response);
  },
};