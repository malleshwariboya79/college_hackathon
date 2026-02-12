"use client";
import { useEffect, useState } from "react";
import { getUser, clearUser } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; email?: string } | null>(null);

  useEffect(() => {
    setUser(getUser());
  }, []);

  if (!user) {
    return (
      <div className="p-6 card">
        <p className="text-sm">Not signed in.</p>
        <button className="btn mt-4" onClick={() => router.push('/login')}>Go to Login</button>
      </div>
    );
  }

  return (
    <div className="p-6 card">
      <h2 className="text-2xl font-semibold mb-4">My Profile</h2>
      <p className="mb-2"><strong>Name:</strong> {user.name}</p>
      {user.email && <p className="mb-4"><strong>Email:</strong> {user.email}</p>}

      <div className="flex gap-2">
        <button
          className="btn"
          onClick={() => {
            clearUser();
            router.push('/login');
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
