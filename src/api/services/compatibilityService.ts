import axiosInstance, { handleApiResponse } from '../axios.config';
import { ZodiacSign } from '@/types';

export const compatibilityService = {
  getCompatibilityBySign: async (sign1: ZodiacSign, sign2: ZodiacSign) => {
    const response = await axiosInstance.get(`/compatibility/signs`, {
      params: { sign1, sign2 },
    });
    return handleApiResponse(response);
  },
};