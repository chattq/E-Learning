import axios, { AxiosError } from "axios";
import { useFileApi } from "./API/FileApi";
import { useAuthAPI } from "./API/auth.api";
import { useCategoriesApi } from "./API/categories.api";
import { setAccessTokenToLS } from "../../utils/localStorageHandler";
import { notification } from "antd";
import { useAccountBankApi } from "./API/account_bank.api";
import { useBlogsApi } from "./API/blogs.api";

export const createApiBase = () => {
  const accessToken = localStorage.getItem("access_token");
  const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_DOMAIN}`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  api.interceptors.request.use(
    (config) => {
      if (accessToken && config.headers) {
        config.headers.Authorization = `Bearer ${accessToken}`;
        return config;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    function (response) {
      const { url } = response.config;
      const data = response.data;
      const result: any = {
        isSuccess: data.isSuccess,
        message: data.message,
        data: data.data,
      };
      // console.log(39, url);
      if (url === "/users/login" || url === "/users/register") {
        if (data.isSuccess) {
          // console.log(data);
          setAccessTokenToLS(data.data.Access_token);

          localStorage.setItem("profile", JSON.stringify(data.data.InforUse));
        }
        return result;
      } else {
        return result;
      }
    },
    function (error: AxiosError) {
      if (error?.response?.status === 401) {
        // location.href = "/login";
      } else {
        // alert(error.message);
        notification.error({
          message: "Error",
          description: error.message,
        });

        return null;
      }
      return Promise.reject(error);
    }
  );
  return api;
};
export const createClientGateApi = () => {
  const apiBase = createApiBase();

  const useUploadFile = useFileApi(apiBase);
  const authAPI = useAuthAPI(apiBase);
  const categoriesApi = useCategoriesApi(apiBase);
  const accountBankApi = useAccountBankApi(apiBase);
  const blogsApi = useBlogsApi(apiBase);
  return {
    ...accountBankApi,
    ...useUploadFile,
    ...authAPI,
    ...categoriesApi,
    ...blogsApi,
  };
};
export const useConfigAPI = () => {
  return createClientGateApi();
};
