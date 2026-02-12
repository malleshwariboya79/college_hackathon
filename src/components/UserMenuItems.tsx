"use client";
import { useRouter } from "next/navigation";
import { clearUser } from "../lib/auth";

export default function UserMenuItems({ router }: { router: ReturnType<typeof useRouter> }) {
  const handleLogout = () => {
    try {
      clearUser();
    } catch {
      // ignore
    }
    router.push("/login");
  };

  return (
    <>
      <button role="menuitem" tabIndex={0} onClick={() => router.push('/profile')} className="w-full text-left px-4 py-2 hover:bg-gray-100">My Profile</button>
      <button role="menuitem" tabIndex={0} onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-gray-100">Logout</button>
    </>
  );
}
