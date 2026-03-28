import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

let authToken: string | null = null;

export function setAuthToken(token: string) {
  authToken = token;
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export function clearAuthToken() {
  authToken = null;
  delete api.defaults.headers.common["Authorization"];
}

export function getAuthToken() {
  return authToken;
}

export async function requestApiKey(wallet: string): Promise<string> {
  const res = await api.post("/auth/request-api-key", { wallet });
  const token = res.data.token;
  setAuthToken(token);
  return token;
}

export default api;
