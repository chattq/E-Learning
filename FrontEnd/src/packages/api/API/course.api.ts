import { AxiosInstance } from "axios";
import { ApiResponse, BlogResponse } from "../../types/api.types";

export const useCoursesApi = (apiBase: AxiosInstance) => {
  return {
    Coursess_Create: async (
      data: any
    ): Promise<ApiResponse<BlogResponse[]>> => {
      return await apiBase.post<any, ApiResponse<BlogResponse[]>>(
        "/course/create",
        {
          strJson: JSON.stringify(data),
        }
      );
    },
  };
};
