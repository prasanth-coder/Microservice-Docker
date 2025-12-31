import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "./Button";

export default function Navbar() {
  const { user, isAuthed, logout } = useAuth();
  const nav = useNavigate();

  return (
    <header className="border-b border-slate-800 bg-slate-950/70 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link to="/" className="text-lg font-semibold text-slate-100">
          TodoStack
        </Link>

        <div className="flex items-center gap-3">
          {isAuthed ? (
            <>
              <span className="hidden text-sm text-slate-300 sm:block">
                Signed in as <span className="font-medium">{user?.name || user?.email}</span>
              </span>
              <Button
                variant="secondary"
                onClick={() => {
                  logout();
                  nav("/login");
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link className="text-sm text-slate-300 hover:text-slate-100" to="/login">
                Login
              </Link>
              <Link className="text-sm text-slate-300 hover:text-slate-100" to="/register">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
