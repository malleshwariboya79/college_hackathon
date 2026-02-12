"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { registerUser, setUser, findUserByEmail } from "@/lib/auth";

export default function RegisterPage() {
  const router = useRouter();
  const params = useSearchParams();
  const preEmail = params?.get("email") || "";

  const [name, setName] = useState("");
  const [email, setEmail] = useState(preEmail);
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  // email is initialized from the `preEmail` search param

  const handleSignup = () => {
    setError(null);
    if (!email || !password || !name) {
      setError("Please fill all fields.");
      return;
    }

    const exists = findUserByEmail(email);
    if (exists) {
      setError("An account with this email already exists. Please log in.");
      return;
    }

    const ok = registerUser(name, email, password);
    if (!ok) {
      setError("Unable to create account. Try a different email.");
      return;
    }

    // Auto-login after signup
    setUser({ name, email });
    router.push("/dashboard");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-100 to-white">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-4 p-2 border rounded-lg"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-2 border rounded-lg"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 border rounded-lg"
        />

        {error && <div className="text-red-500 text-sm mb-2">{error}</div>}

        <button onClick={handleSignup} className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700">Sign Up</button>

        <div className="text-center text-sm text-gray-600 mt-3">
          Already have an account? <a href="/login" className="text-blue-600">Login</a>
        </div>
      </div>
    </div>
  );
}
