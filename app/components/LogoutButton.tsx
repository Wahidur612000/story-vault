"use client"

import { supabase } from "../lib/supabaseClient"
import { useRouter } from "next/navigation"

export default function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  return (
    <button className="text-red-500" onClick={handleLogout}>
      Logout
    </button>
  )
}
