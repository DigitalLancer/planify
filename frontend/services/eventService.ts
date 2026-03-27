import { Event, CreateEventDto } from "@/types/event";

export async function getEvents(): Promise<Event[]> {
  const response = await fetch("http://localhost:5278/api/Event")
  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }
  return response.json();
}

export async function getEventById(id:number): Promise<Event> {
  if (!id) {
    throw new Error("Invalid Event ID");
  }
  const response = await fetch(`http://localhost:5278/api/Event/${id}`)
  if (!response.ok) {
    throw new Error("Failed to fetch event");
  }
  return response.json();
}

export async function createEvent(data: CreateEventDto): Promise<Event> {
  const response = await fetch("http://localhost:5278/api/Event", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to create event");
  }

  return response.json();
}

export async function updateEvent(id:number, data: CreateEventDto){
  const response = await fetch(`http://localhost:5278/api/Event/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to create event");
  }
}

export async function deleteEvent(id:number) {
  const response = await fetch(`http://localhost:5278/api/Event/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) throw new Error("Failed to delete event");
}

