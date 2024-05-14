import { AxiosInstance } from "axios";
import { ApiResponse, UploadedFile } from "../../types/api.types";

export const useAuthAPI = (apiBase: AxiosInstance) => {
  return {
    login: async (
      email: string,
      password: string
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<any, ApiResponse<any>>("/users/login", {
        email: email,
        password: password,
      });
    },
  };
};
