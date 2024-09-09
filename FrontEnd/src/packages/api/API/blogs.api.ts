import { AxiosInstance } from "axios";
import { ApiResponse, BlogResponse } from "../../types/api.types";

export const useBlogsApi = (apiBase: AxiosInstance) => {
  return {
    Blogs_GetAll: async (): Promise<ApiResponse<BlogResponse[]>> => {
      return await apiBase.get<any, ApiResponse<BlogResponse[]>>(
        "/blogs/getall",
        {}
      );
    },
    Blogs_Create: async (data: any): Promise<ApiResponse<BlogResponse[]>> => {
      return await apiBase.post<any, ApiResponse<BlogResponse[]>>(
        "/blogs/create",
        {
          ...data,
        }
      );
    },
  };
};
