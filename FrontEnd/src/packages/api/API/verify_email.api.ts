import { AxiosInstance } from "axios";
import { ApiResponse } from "../../types/api.types";

export const useVerifyEmailApi = (apiBase: AxiosInstance) => {
  return {
    Verify_email: async (code: string): Promise<ApiResponse<any[]>> => {
      return await apiBase.post<any, ApiResponse<any[]>>(
        "/users/verify-email",
        {
          verification_code: code,
        }
      );
    },
    getOTPtime: async (): Promise<ApiResponse<any[]>> => {
      return await apiBase.post<any, ApiResponse<any[]>>(
        "/users/getOTPtime",
        {}
      );
    },
  };
};
