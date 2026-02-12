"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import Link from "next/link"

import { registerUser, setUser, findUserByEmail } from "@/lib/auth"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"

export default function RegisterPage() {
  const router = useRouter()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSignup = () => {
    setError(null)

    if (!name || !email || !password) {
      setError("All fields are required.")
      return
    }

    const exists = findUserByEmail(email)
    if (exists) {
      setError("An account with this email already exists.")
      return
    }

    setLoading(true)

    const ok = registerUser(name, email, password)

    if (!ok) {
      setError("Unable to create account.")
      setLoading(false)
      return
    }

    setUser({ name, email })
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 p-4">
      <Card className="w-full max-w-md shadow-xl border border-slate-200">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            Create Account
          </CardTitle>
          <CardDescription>
            Start organizing your academic journey today.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-5">

          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          <Button
            className="w-full"
            onClick={handleSignup}
            disabled={loading}
          >
            {loading ? "Creating account..." : "Sign Up"}
          </Button>

          <p className="text-sm text-center text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="underline underline-offset-4 hover:text-foreground">
              Login
            </Link>
          </p>

        </CardContent>
      </Card>
    </div>
  )
}
