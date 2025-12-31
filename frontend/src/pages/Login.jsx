import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import Card from "../components/Card";
import Button from "../components/Button";
import Input from "../components/Input";
import MotionPage from "../components/MotionPage";
import { useAuth } from "../context/AuthContext";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

export default function Login() {
  const { login, loading } = useAuth();
  const nav = useNavigate();
  const [serverErr, setServerErr] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
    mode: "onTouched",
  });

  const onSubmit = async (values) => {
    setServerErr("");
    try {
      await login(values.email, values.password);
      nav("/todos");
    } catch (e) {
      setServerErr(e?.response?.data?.error?.message || e.message || "Login failed");
    }
  };

  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <MotionPage>
        <Card title="Welcome back" subtitle="Sign in to manage your todos.">
          {serverErr && (
            <div className="mb-4 rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-200">
              {serverErr}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <Input
              label="Email"
              placeholder="you@example.com"
              error={errors.email?.message}
              {...register("email")}
            />
            <Input
              label="Password"
              type="password"
              placeholder="Your password"
              error={errors.password?.message}
              {...register("password")}
            />

            <Button className="w-full" disabled={loading || isSubmitting}>
              {loading || isSubmitting ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          <p className="mt-4 text-sm text-slate-300">
            No account?{" "}
            <Link className="text-indigo-300 hover:text-indigo-200" to="/register">
              Create one
            </Link>
          </p>
        </Card>
      </MotionPage>
    </div>
  );
}
