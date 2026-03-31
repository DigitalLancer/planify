import { Event, CreateEventDto } from "@/types/event";

export async function getEvents(): Promise<Event[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Events`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }
  return response.json();
}

export async function getEventById(id: number): Promise<Event> {
  if (!id) {
    throw new Error("Invalid Event ID");
  }
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Events/${id}`,{
    credentials:"include"
  })
  if (!response.ok) {
    throw new Error("Failed to fetch event");
  }
  return response.json();
}

export async function getEventsByUserId(id: string): Promise<Event[]> {
  if (!id) {
    throw new Error("Invalid User ID");
  }
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Users/${id}/events`,{
    credentials:"include"
  })
  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }
  return response.json();
}

export async function createEvent(data: CreateEventDto): Promise<Event> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials:"include",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to create event");
  }

  return response.json();
}

export async function updateEvent(id: number, data: CreateEventDto) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Events/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials:"include",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to create event");
  }
}

export async function deleteEvent(id: number) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Events/${id}`, {
    method: "DELETE",
    credentials:"include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) throw new Error("Failed to delete event");
}

