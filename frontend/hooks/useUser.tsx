import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getMe, getUserById } from "@/services/userService";

export function useUserById(id: string | null | undefined) {
    return useQuery({
        queryKey: ['user', id],
        queryFn: () => {
            if (typeof id !== 'string') {
                throw new Error("ID is required for fetching");
            }
            return getUserById(id);
        },
        enabled: typeof id === 'string',
    });
}

export function useMe() {
    return useQuery({
        queryKey: ["me"],
        queryFn: getMe,
        retry: false,
    });
}