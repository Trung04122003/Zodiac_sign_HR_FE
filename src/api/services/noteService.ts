import axiosInstance, { handleApiResponse } from "../axios.config";


export const noteService = {
  getAllNotes: async () => {
    const response = await axiosInstance.get('/notes');
    return handleApiResponse(response);
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createNote: async (data: any) => {
    const response = await axiosInstance.post('/notes', data);
    return handleApiResponse(response);
  },
};