import React, { useEffect, useMemo, useState } from "react";
import Card from "../components/Card";
import Button from "../components/Button";
import { useAuth } from "../context/AuthContext";
import * as todoApi from "../api/todoApi";
import { AnimatePresence, motion } from "framer-motion";


export default function Todos() {
  const { token } = useAuth();
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  const remaining = useMemo(() => todos.filter(t => !t.completed).length, [todos]);

  async function load() {
    setErr("");
    const res = await todoApi.listTodos(token);
    setTodos(res.data);
  }

  useEffect(() => {
    setBusy(true);
    load().catch(e => setErr(e?.response?.data?.error?.message || e.message)).finally(() => setBusy(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function add(e) {
    e.preventDefault();
    const t = title.trim();
    if (!t) return;
    setBusy(true);
    setErr("");
    try {
      const res = await todoApi.createTodo(token, t);
      setTodos(prev => [res.data, ...prev]);
      setTitle("");
    } catch (e) {
      setErr(e?.response?.data?.error?.message || e.message);
    } finally {
      setBusy(false);
    }
  }

  async function toggle(todo) {
    setBusy(true);
    setErr("");
    try {
      const res = await todoApi.toggleTodo(token, todo);
      setTodos(prev => prev.map(t => (t._id === todo._id ? res.data : t)));
    } catch (e) {
      setErr(e?.response?.data?.error?.message || e.message);
    } finally {
      setBusy(false);
    }
  }

  async function remove(id) {
    setBusy(true);
    setErr("");
    try {
      await todoApi.deleteTodo(token, id);
      setTodos(prev => prev.filter(t => t._id !== id));
    } catch (e) {
      setErr(e?.response?.data?.error?.message || e.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Card
        title="Your Todos"
        subtitle={busy ? "Loading..." : `${remaining} remaining • ${todos.length} total`}
      >
        {err && (
          <div className="mb-4 rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-200">
            {err}
          </div>
        )}

        <form onSubmit={add} className="flex gap-2">
          <input
            className="flex-1 rounded-xl bg-slate-950 px-4 py-3 text-slate-100 ring-1 ring-slate-800 focus:ring-slate-600"
            placeholder="Add a new todo..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Button disabled={busy}>Add</Button>
        </form>

        <div className="mt-6 space-y-2">
          {todos.map((todo) => (
            <motion.div
            key={todo._id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/40 p-4"
          >
              <button onClick={() => toggle(todo)} className="flex items-center gap-3 text-left">
                <span
                  className={[
                    "h-5 w-5 rounded border",
                    todo.completed ? "bg-emerald-500 border-emerald-400" : "border-slate-600",
                  ].join(" ")}
                />
                <span className={todo.completed ? "text-slate-400 line-through" : "text-slate-100"}>
                  {todo.title}
                </span>
              </button>

              <Button variant="secondary" onClick={() => remove(todo._id)}>
                Delete
              </Button>
            </motion.div>
          ))}
        </div>

        {!busy && todos.length === 0 && (
          <p className="mt-6 text-sm text-slate-400">No todos yet. Add your first one ☝️</p>
        )}
      </Card>
    </div>
  );
}
