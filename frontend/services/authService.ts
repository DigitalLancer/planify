import { LoginDto } from "@/types/auth";

export async function loginUser(data: LoginDto) {
  const response = await fetch("http://localhost:5278/api/Auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  const contentType = response.headers.get("content-type");
  const result = contentType?.includes("application/json")
    ? await response.json()
    : null;

  if (!response.ok) {
    throw new Error(result?.message || "Login failed.");
  }
  return result;
}