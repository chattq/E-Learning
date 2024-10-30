import axios, { AxiosError } from "axios";
import { useFileApi } from "./API/FileApi";
import { useAuthAPI } from "./API/auth.api";
import { useCategoriesApi } from "./API/categories.api";
import { setAccessTokenToLS } from "../../utils/localStorageHandler";
import { notification } from "antd";
import { useAccountBankApi } from "./API/account_bank.api";
import { useBlogsApi } from "./API/blogs.api";
import { useSetAtom } from "jotai";
import { showErrorAtom } from "../ui/Error/error-store";
import { useVerifyEmailApi } from "./API/verify_email.api";

export const createApiBase = () => {
  const accessToken = localStorage.getItem("access_token");
  const setShowError = useSetAtom(showErrorAtom);
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
      setShowError({
        isSuccess: false,
        message: error.message,
        data: {
          message: error.message,
        },
      });
      // return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    function (response) {
      const { url } = response.config;
      const data = response.data;
      const result: any = {
        isSuccess: data.isSuccess,
        message: data.data?.message,
        data: data.data,
      };
      // console.log(39, url);
      if (url === "/users/login" || url === "/users/register") {
        if (data.isSuccess) {
          console.log(data);
          setAccessTokenToLS(data.data.Access_token);

          localStorage.setItem("profile", JSON.stringify(data.data.InforUser));
        }
        return result;
      } else {
        return result;
      }
    },
    function (error: AxiosError) {
      if (error?.response?.status === 401) {
        // location.href = "/login";
        setShowError({
          isSuccess: false,
          message: error.message,
          data: {
            message: error.message,
          },
        });
      } else {
        // alert(error.message);
        notification.error({
          message: "Error",
          description: error.message,
        });
        setShowError({
          isSuccess: false,
          message: error.message,
          data: {
            message: error.message,
          },
        });
        return null;
      }
      setShowError({
        isSuccess: false,
        message: error.message,
        data: {
          message: error.message,
        },
      });
      return null;
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
  const verifyApi = useVerifyEmailApi(apiBase);
  return {
    ...verifyApi,
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
