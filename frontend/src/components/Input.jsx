import React from "react";

export default function Input({ label, error, ...props }) {
  return (
    <div className="space-y-1">
      {label && <label className="text-sm font-medium text-slate-200">{label}</label>}
      <input
        {...props}
        className={[
          "w-full rounded-xl bg-slate-950 px-4 py-3 text-slate-100 ring-1 outline-none",
          error ? "ring-red-500/60 focus:ring-red-500" : "ring-slate-800 focus:ring-slate-600",
        ].join(" ")}
      />
      {error && <p className="text-sm text-red-300">{error}</p>}
    </div>
  );
}
