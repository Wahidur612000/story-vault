"use client"

import { supabase } from "../lib/supabaseClient"

export default function LoginButton({ glow }: { glow?: boolean }) {
  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        queryParams: {
          prompt: "select_account",
        },
      },
    })
  }

  return (
    <button
      onClick={handleLogin}
      className={`px-5 py-2 rounded-lg font-semibold transition-all duration-300 ${
        glow
          ? "bg-purple-600 shadow-[0_0_20px_rgba(168,85,247,0.9)] scale-105 animate-pulse"
          : "bg-purple-500 hover:bg-purple-600"
      }`}
    >
      Sign in with Google
    </button>
  )
}

