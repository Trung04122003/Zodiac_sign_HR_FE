import axiosInstance, { handleApiResponse } from '../axios.config';

export const dashboardService = {
  getDashboardOverview: async () => {
    const response = await axiosInstance.get('/dashboard/overview');
    return handleApiResponse(response);
  },

  getZodiacDistribution: async () => {
    const response = await axiosInstance.get('/dashboard/zodiac-distribution');
    return handleApiResponse(response);
  },
};