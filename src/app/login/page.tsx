"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import Link from "next/link"

import { loginUser, setUser } from "@/lib/auth"

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
import { Separator } from "@/components/ui/separator"

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleLogin = () => {
    setError(null)

    if (!email || !password) {
      setError("Please enter email and password.")
      return
    }

    setLoading(true)

    const user = loginUser(email, password)

    if (!user) {
      setError("Invalid email or password.")
      setLoading(false)
      return
    }

    setUser(user)
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 p-4">
      <Card className="w-full max-w-md shadow-xl border border-slate-200">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            Welcome Back
          </CardTitle>
          <CardDescription>
            Enter your credentials to access your dashboard.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-5">

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
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Signing in..." : "Login"}
          </Button>

          <Separator />

          <p className="text-sm text-center text-muted-foreground">
            Don’t have an account?{" "}
            <Link href="/register" className="underline underline-offset-4 hover:text-foreground">
              Register
            </Link>
          </p>

        </CardContent>
      </Card>
    </div>
  )
}
