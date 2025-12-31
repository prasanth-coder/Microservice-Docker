import React from "react";

export default function Card({ title, subtitle, children }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 shadow-sm">
      {title && <h2 className="text-xl font-semibold text-slate-100">{title}</h2>}
      {subtitle && <p className="mt-1 text-sm text-slate-300">{subtitle}</p>}
      <div className="mt-5">{children}</div>
    </div>
  );
}
