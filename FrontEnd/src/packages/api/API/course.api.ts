import { AxiosInstance } from "axios";
import { ApiResponse, BlogResponse } from "../../types/api.types";

export const useCoursesApi = (apiBase: AxiosInstance) => {
  return {
    Coursess_Create: async (data: any): Promise<ApiResponse<any[]>> => {
      return await apiBase.post<any, ApiResponse<any[]>>("/course/create", {
        strJson: JSON.stringify(data),
      });
    },
  };
};
