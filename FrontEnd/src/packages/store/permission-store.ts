import { useQuery } from "@tanstack/react-query";
import { createClientGateApi } from "../api/config-api";

export const useGetProfile = () => {
  const api = createClientGateApi();
  const { data: Get_Profile, isLoading } = useQuery({
    queryKey: ["Get_Profile_User"],
    queryFn: async () => {
      const response = await api.Get_Profile_User();
      if (response.isSuccess) {
        return response.data;
      } else {
        console.log(response);
      }
    },
  });
  return Get_Profile;
};
