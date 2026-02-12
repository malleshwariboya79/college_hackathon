"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { clearUser, getUser } from "../lib/auth";

export default function FloatingProfile() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const router = useRouter();
  const [user] = useState<{ name: string } | null>(() => getUser());

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!menuRef.current) return;
      if (menuRef.current.contains(e.target as Node)) return;
      if (buttonRef.current && buttonRef.current.contains(e.target as Node)) return;
      setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const logout = () => {
    try { clearUser(); } catch {}
    router.push("/login");
  };

  return (
    <div className="floating-profile">
      <button
        ref={buttonRef}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 ring-2 ring-white shadow-lg flex items-center justify-center text-white smooth-transition"
        title={user?.name || 'User'}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 15c2.761 0 5.303.786 7.379 2.126M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>

      {open && (
        <div ref={menuRef} role="menu" className="floating-menu card p-2 mt-2">
          <div className="px-3 py-2 text-sm">{user?.name || 'Student'}</div>
          <button className="w-full text-left px-3 py-2 hover:bg-gray-100" onClick={() => router.push('/profile')}>My Profile</button>
          <button className="w-full text-left px-3 py-2 hover:bg-gray-100" onClick={logout}>Logout</button>
        </div>
      )}
    </div>
  );
}
