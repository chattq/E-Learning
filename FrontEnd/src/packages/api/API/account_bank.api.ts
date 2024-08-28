import { AxiosInstance } from "axios";
import { ApiResponse } from "../../types/api.types";

export const useAccountBankApi = (apiBase: AxiosInstance) => {
  return {
    AccountBank_GetListBank: async (): Promise<ApiResponse<any>> => {
      return await apiBase.post<any, ApiResponse<any>>(
        "/AccountBank/GetListBank",
        {}
      );
    },
    AccountBank_Create: async (data: any): Promise<ApiResponse<any>> => {
      return await apiBase.post<any, ApiResponse<any>>("/AccountBank/Create", {
        ...data,
      });
    },
  };
};
