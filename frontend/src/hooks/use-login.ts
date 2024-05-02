import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../utils/axios";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { username: string; password: string }) => {
      return axiosInstance.post(
        `${process.env.REACT_APP_BACKEND_URL}/auth/login`,
        data
      );
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["current-user"],
      });
      navigate(`/chat`);
    },
  });
};
