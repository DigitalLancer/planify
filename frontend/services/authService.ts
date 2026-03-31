import { LoginDto, RegisterDto } from "@/types/auth";


export async function register(data: RegisterDto) {
  console.log("Sending register data:",data);
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Register failed.");
  }
  return response;
}


export async function loginUser(data: LoginDto) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Auth/login`, {
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

export async function logout() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) throw new Error("Logout failed");
}