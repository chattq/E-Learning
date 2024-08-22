import { AxiosInstance } from "axios";
import { ApiResponse, UploadedFile } from "../../types/api.types";

export const useFileApi = (apiBase: AxiosInstance) => {
  return {
    File_Upload: async (file: File): Promise<ApiResponse<UploadedFile>> => {
      // file is the file you want to upload
      const form = new FormData();
      form.append("file", file);
      return await apiBase.post<File, ApiResponse<any>>(
        "/medias/upload-images",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },
  };
};
