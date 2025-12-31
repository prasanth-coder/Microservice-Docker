import axios from "axios";

const TODO_BASE = import.meta.env.VITE_TODO_API || "http://localhost:4001";

function authHeader(token) {
  return { Authorization: `Bearer ${token}` };
}

export async function listTodos(token) {
  const res = await axios.get(`${TODO_BASE}/todos`, {
    headers: authHeader(token),
  });
  return res.data; // { data: [...] }
}

export async function createTodo(token, title) {
  const res = await axios.post(
    `${TODO_BASE}/todos`,
    { title },
    { headers: { ...authHeader(token), "Content-Type": "application/json" } }
  );
  return res.data; // { data: todo }
}

export async function toggleTodo(token, todo) {
  const res = await axios.patch(
    `${TODO_BASE}/todos/${todo._id}`,
    { completed: !todo.completed },
    { headers: { ...authHeader(token), "Content-Type": "application/json" } }
  );
  return res.data; // { data: todo }
}

export async function deleteTodo(token, id) {
  await axios.delete(`${TODO_BASE}/todos/${id}`, {
    headers: authHeader(token),
  });
}
