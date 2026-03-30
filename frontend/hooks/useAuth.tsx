"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoginDto } from "@/types/auth";
import { loginUser } from "@/services/authService";

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginDto) => loginUser(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
}