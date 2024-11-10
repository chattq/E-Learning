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
    User_register: async (
      email: string,
      password: string,
      confirmPassword: string,
      name: string,
      user_role: string
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<any, ApiResponse<any>>("/users/register", {
        email: email,
        password: password,
        confirm_password: confirmPassword,
        name: name,
        role: user_role,
      });
    },
  };
};
