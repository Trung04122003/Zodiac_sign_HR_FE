import axiosInstance, { handleApiResponse } from '../axios.config';

export const birthdayService = {
  getBirthdaysToday: async () => {
    const response = await axiosInstance.get('/birthdays/today');
    return handleApiResponse(response);
  },

  getUpcomingBirthdays: async (days: number = 30) => {
    const response = await axiosInstance.get('/birthdays/upcoming', { params: { daysAhead: days } });
    return handleApiResponse(response);
  },
};