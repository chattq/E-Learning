import { AxiosInstance } from "axios";
import { ApiResponse } from "../../types/api.types";

export const useCategoriesApi = (apiBase: AxiosInstance) => {
  return {
    Categories_GetAllActive: async (): Promise<ApiResponse<string>> => {
      return await apiBase.post<any, ApiResponse<string>>(
        "/MstDealer/ExportTemplate",
        {}
      );
    },
  };
};
