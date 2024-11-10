import { AxiosInstance } from "axios";
import { ApiResponse, UserProfileResponse } from "../../types/api.types";

export const useUserApi = (apiBase: AxiosInstance) => {
  return {
    Get_Profile_User: async (): Promise<ApiResponse<UserProfileResponse>> => {
      return await apiBase.post<any, ApiResponse<UserProfileResponse>>(
        "/users/me",
        {}
      );
    },
    // Blogs_Create: async (data: any): Promise<ApiResponse<BlogResponse[]>> => {
    //   return await apiBase.post<any, ApiResponse<BlogResponse[]>>(
    //     "/blogs/create",
    //     {
    //       ...data,
    //     }
    //   );
    // },
  };
};
