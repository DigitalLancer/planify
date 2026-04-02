import { User } from "@/types/user";

export async function getUserById(id: string): Promise<User> {
  if (!id) {
    throw new Error("Invalid User ID");
  }
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Users/${id}`, {
    credentials: "include"
  })
  if (!response.ok) {
    throw new Error("Failed to fetch user info");
  }
  return response.json();
}

export async function getMe() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Users/me`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    const data = await response.json();
    console.log("Status:", response.status);
    console.log("Message:", data.message);
  }
  return response.json();
}