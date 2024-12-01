import { AxiosInstance } from "axios";
import { ApiResponse } from "../../types/api.types";

export const useUserCoursesApi = (apiBase: AxiosInstance) => {
  return {
    User_Course_GetAll: async (): Promise<ApiResponse<any[]>> => {
      return await apiBase.post<any, ApiResponse<any[]>>(
        "/user-course/get-list-user-course",
        {}
      );
    },

    User_Courses_Create: async (data: any): Promise<ApiResponse<any[]>> => {
      return await apiBase.post<any, ApiResponse<any[]>>(
        "/user-course/create",
        {
          ...data,
        }
      );
    },
  };
};
