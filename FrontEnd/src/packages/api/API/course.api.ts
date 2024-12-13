import { AxiosInstance } from "axios";
import { ApiResponse } from "../../types/api.types";

export const useCoursesApi = (apiBase: AxiosInstance) => {
  return {
    Course_GetAll: async (): Promise<ApiResponse<any[]>> => {
      return await apiBase.post<any, ApiResponse<any[]>>(
        "/course/GetListCourse",
        {}
      );
    },

    Course_Detail: async (id: any): Promise<ApiResponse<any>> => {
      return await apiBase.post<any, ApiResponse<any[]>>(
        "/course/GetCourseByCode",
        { CourseCode: id },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    },
    Course_CheckPurchasedCourse: async (id: any): Promise<ApiResponse<any>> => {
      return await apiBase.post<any, ApiResponse<any[]>>(
        "/course/CheckPurchasedCourse",
        { CourseCode: id }
      );
    },

    Coursess_Create: async (data: any): Promise<ApiResponse<any[]>> => {
      return await apiBase.post<any, ApiResponse<any[]>>("/course/create", {
        strJson: JSON.stringify(data),
      });
    },
  };
};
