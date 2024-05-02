import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../utils/axios";

export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: ["current-user"],
    queryFn: () => {
      return axiosInstance.get(
        `${process.env.REACT_APP_BACKEND_URL}/auth/get-current-user`
      );
    },
  });
};
