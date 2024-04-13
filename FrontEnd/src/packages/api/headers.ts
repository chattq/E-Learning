export const useApiHeaders = () => {
  return {
    baseURL: "",
    headers: buildHeaders(),
  };
};
export const buildHeaders = () => {
  return {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/x-www-form-urlencoded",
  };
};
