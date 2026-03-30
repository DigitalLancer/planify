import { User } from "@/types/user";

export async function getUserById(id: string): Promise<User> {
  if (!id) {
    throw new Error("Invalid User ID");
  }
  const response = await fetch(`http://localhost:5278/api/User/${id}`)
  if (!response.ok) {
    throw new Error("Failed to fetch user info");
  }
  return response.json();
}

export async function getMe() {
  const response = await fetch("http://localhost:5278/api/User/me", {
    method: "GET",
    credentials: "include",
  });

  if (response.status === 401) return null;
  if (!response.ok) throw new Error("Failed to fetch user");

  return response.json();
}