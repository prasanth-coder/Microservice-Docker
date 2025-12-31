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
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function Register() {
  const { register: registerUser, loading } = useAuth();
  const nav = useNavigate();
  const [serverErr, setServerErr] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", password: "" },
    mode: "onTouched",
  });

  const onSubmit = async (values) => {
    setServerErr("");
    try {
      await registerUser(values.name, values.email, values.password);
      nav("/todos");
    } catch (e) {
      setServerErr(e?.response?.data?.error?.message || e.message || "Register failed");
    }
  };

  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <MotionPage>
        <Card title="Create account" subtitle="Register to start using the app.">
          {serverErr && (
            <div className="mb-4 rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-200">
              {serverErr}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <Input
              label="Name"
              placeholder="Your name"
              error={errors.name?.message}
              {...register("name")}
            />
            <Input
              label="Email"
              placeholder="you@example.com"
              error={errors.email?.message}
              {...register("email")}
            />
            <Input
              label="Password"
              placeholder="Minimum 6 characters"
              type="password"
              error={errors.password?.message}
              {...register("password")}
            />

            <Button className="w-full" disabled={loading || isSubmitting}>
              {loading || isSubmitting ? "Creating..." : "Create account"}
            </Button>
          </form>

          <p className="mt-4 text-sm text-slate-300">
            Already have an account?{" "}
            <Link className="text-indigo-300 hover:text-indigo-200" to="/login">
              Login
            </Link>
          </p>
        </Card>
      </MotionPage>
    </div>
  );
}
