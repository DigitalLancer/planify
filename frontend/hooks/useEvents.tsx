import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getEvents, getEventById, getEventsByUserId, createEvent, deleteEvent, updateEvent } from '@/services/eventService'
import { CreateEventDto } from "@/types/event";

export const useEvents = () => {
  return useQuery({
    queryKey: ['events'],
    queryFn: getEvents
  })
}

export const useEventById = (id: number | null | undefined) => {
  return useQuery({
    queryKey: ['event', id],
    queryFn: () => {
      if (typeof id !== 'number') {
        throw new Error("ID is required for fetching");
      }
      return getEventById(id);
    },
    enabled: typeof id === 'number',
  });
};

export const useEventsByUserId = (id?: string, options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: ["events", "user", id],
    queryFn: () => getEventsByUserId(id!),
    enabled: options?.enabled ?? !!id,
  });
};

export const useAddEvent = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] })
    }
  })
}

export const useUpdateEvent = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: CreateEventDto; }) => updateEvent(id, data),
    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['events'] }),
        queryClient.invalidateQueries({ queryKey: ['event', variables.id] }),
      ])
    }
  })
}

export const useDeleteEvent = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => deleteEvent(id),
    onSuccess: () => {
      console.log("succesfully deleted");
      queryClient.invalidateQueries({ queryKey: ['events'] })
    }
  })
}