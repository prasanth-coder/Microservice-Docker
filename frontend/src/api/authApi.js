import axios from "axios";

const AUTH_BASE = import.meta.env.VITE_AUTH_API || "http://localhost:4000";



export async function register(payload) {
  const res = await axios.post(`${AUTH_BASE}/auth/register`, payload, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data; // { token, user }
}

export async function login(payload) {
  const res = await axios.post(`${AUTH_BASE}/auth/login`, payload, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data; // { token, user }
}
