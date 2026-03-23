import { Event } from "@/types/event";


export type CreateEventDto = {
  title: string;
  description?: string;
  startDate: string;
  location?: string;
  category?: string;
};

const BASE_URL = "http://localhost:5278/api/Event";

export async function getEvents(): Promise<Event[]> {
  const response = await fetch(BASE_URL)
  if (!response.ok) {
    throw new Error("Etkinlikler alınamadı");
  }

  return response.json();
}

export async function createEvent(data: CreateEventDto): Promise<Event> {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Etkinlik oluşturulamadı");
  }

  return response.json();
}