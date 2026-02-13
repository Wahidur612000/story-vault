"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { supabase } from "../lib/supabaseClient"

const AuthContext = createContext<any>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null)
  const [authRequired, setAuthRequired] = useState(false)
  const [authMessage, setAuthMessage] = useState("")

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null)
    })

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
        setAuthRequired(false)
        setAuthMessage("")
      }
    )

    return () => listener.subscription.unsubscribe()
  }, [])

  // ⏳ Auto-clear after 5 seconds
  useEffect(() => {
    if (!authRequired) return

    const timer = setTimeout(() => {
      setAuthRequired(false)
      setAuthMessage("")
    }, 5000)

    return () => clearTimeout(timer)
  }, [authRequired])

  return (
    <AuthContext.Provider
      value={{
        user,
        authRequired,
        setAuthRequired,
        authMessage,
        setAuthMessage,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
