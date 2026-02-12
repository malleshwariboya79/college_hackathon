"use client";
import { useRouter } from "next/navigation";
import { setUser, validateCredentials, findUserByEmail } from "@/lib/auth";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = () => {
    setError(null);
    const user = validateCredentials(email, password);
    if (user) {
      setUser({ name: user.name, email: user.email });
      router.push("/dashboard");
      return;
    }

    const existing = findUserByEmail(email);
    if (existing) {
      setError("Incorrect password. Try again.");
      return;
    }

    // No account found -> redirect to register with prefilled email
    router.push(`/register?email=${encodeURIComponent(email)}`);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-100 to-white">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Welcome Back!
        </h2>

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

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
        >
          Login
        </button>

        <div className="text-center text-sm text-gray-600 mt-3">
          No account? <a href="/register" className="text-blue-600">Sign up</a>
        </div>
      </div>
    </div>
  );
}
