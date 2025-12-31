import React from "react";

const base =
  "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-slate-500 disabled:opacity-60";
const variants = {
  primary: "bg-indigo-600 text-white hover:bg-indigo-500",
  secondary: "bg-slate-800 text-slate-100 hover:bg-slate-700",
  ghost: "bg-transparent text-slate-200 hover:bg-slate-900",
};

export default function Button({ variant = "primary", className = "", ...props }) {
  return <button className={`${base} ${variants[variant]} ${className}`} {...props} />;
}
