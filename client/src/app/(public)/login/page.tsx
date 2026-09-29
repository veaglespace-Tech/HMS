"use client";

import Link from "next/link";
import { Activity } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/redux/services/arogyaApi";
import { useDispatch } from "react-redux";
import { setAuth } from "@/redux/slices/authSlice";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  
  const router = useRouter();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    
    try {
      const response = await login({ email, password }).unwrap();
      
      if (response && response.token) {
        dispatch(setAuth({
          token: response.token,
          user: response.user
        }));
        router.push("/dashboard"); // Redirect to actual dashboard
      }
    } catch (err: any) {
      setErrorMsg(err?.data?.message || "Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-canvas dark:bg-background flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-foreground">Arogya <span className="text-primary">HMS</span></span>
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Welcome back</h1>
          <p className="text-muted-foreground text-sm mt-1">Sign in to your hospital account</p>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-card rounded-2xl border border-border shadow-soft p-8">
          <form className="flex flex-col gap-4" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
              <input
                id="login-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                placeholder="doctor@hospital.com"
                className="w-full px-4 py-3 rounded-xl border border-border bg-canvas dark:bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-foreground">Password</label>
                <a href="#" className="text-xs text-primary hover:underline">Forgot password?</a>
              </div>
              <input
                id="login-password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-border bg-canvas dark:bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
              />
            </div>

            {errorMsg && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-3 text-sm text-red-500">
                {errorMsg}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary-600 transition-all disabled:opacity-50"
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/register-hospital" className="text-primary font-medium hover:underline">
              Register your hospital
            </Link>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          By signing in, you agree to our{" "}
          <Link href="/terms" className="hover:underline">Terms</Link> and{" "}
          <Link href="/privacy" className="hover:underline">Privacy Policy</Link>.
        </p>
      </div>
    </div>
  );
}
