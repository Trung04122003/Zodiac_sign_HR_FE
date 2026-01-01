import axiosInstance, { handleApiResponse } from '../axios.config';

export const settingsService = {
  getAllSettings: async () => {
    const response = await axiosInstance.get('/settings');
    return handleApiResponse(response);
  },

  updateSetting: async (key: string, value: string) => {
    const response = await axiosInstance.put(`/settings/${key}`, { value });
    return handleApiResponse(response);
  },
};