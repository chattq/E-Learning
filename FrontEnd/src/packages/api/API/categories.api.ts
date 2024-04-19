import { AxiosInstance } from "axios";
import { ApiResponse, CategoryResponse } from "../../types/api.types";

export const useCategoriesApi = (apiBase: AxiosInstance) => {
  return {
    Categories_GetAllActive: async (): Promise<
      ApiResponse<CategoryResponse[]>
    > => {
      return await apiBase.post<any, ApiResponse<CategoryResponse[]>>(
        "/AdCategories/getAllActive",
        {}
      );
    },
    Categories_Create: async (
      data: any
    ): Promise<ApiResponse<CategoryResponse[]>> => {
      return await apiBase.post<any, ApiResponse<CategoryResponse[]>>(
        "/AdCategories/create",
        {
          strJson: JSON.stringify(data),
        }
      );
    },
  };
};
