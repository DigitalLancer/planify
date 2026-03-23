import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getEvents, createEvent } from '@/services/eventService'

export const useEvents = () => {
  return useQuery({
    queryKey: ['events'], // Cache anahtarı
    queryFn: getEvents,
  })
}

export const useAddEvent = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] })
    },
  })
}