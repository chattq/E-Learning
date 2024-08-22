export const useApiHeaders = () => {
  return {
    baseURL: "",
    headers: buildHeaders(),
  };
};
export const buildHeaders = () => {
  return {
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    "Content-Type": "multipart/form-data",
  };
};
