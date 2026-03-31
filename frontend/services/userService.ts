import { User } from "@/types/user";

export async function getUserById(id: string): Promise<User> {
  if (!id) {
    throw new Error("Invalid User ID");
  }
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Users/${id}`,{
    credentials:"include"
  })
  if (!response.ok) {
    throw new Error("Failed to fetch user info");
  }
  return response.json();
}

export async function getMe() {
  console.log("getMe called");
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Users/me`, {
    method: "GET",
    credentials: "include",
  });

  if (response.status === 401) return null;
  if (!response.ok) throw new Error("Failed to fetch user");

  return response.json();
}