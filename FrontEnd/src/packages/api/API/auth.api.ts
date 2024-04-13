import { AxiosInstance } from "axios";
import { ApiResponse, UploadedFile } from "../../types/api.types";

export const useAuthAPI = (apiBase: AxiosInstance) => {
  return {
    login: async (
      email: string,
      password: string
    ): Promise<ApiResponse<UploadedFile>> => {
      return await apiBase.post<File, ApiResponse<any>>("/users/login", {
        email: email,
        password: password,
      });
    },
  };
};
