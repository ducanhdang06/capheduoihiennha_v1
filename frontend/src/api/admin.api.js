import api from "./axios"

export async function Login (username, password) {
  const res = await api.post("/auth/login", {username, password});
  return res.data;
};