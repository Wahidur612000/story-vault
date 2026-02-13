"use client"

import { useEffect, useState } from "react"
import { supabase } from "../lib/supabaseClient"

export function useBookmark(bookId: string) {
  const [bookmarked, setBookmarked] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadSession = async () => {
      const { data } = await supabase.auth.getSession()
      const sessionUser = data.session?.user || null
      setUser(sessionUser)

      if (sessionUser) {
        const { data: bookmark } = await supabase
          .from("bookmarks")
          .select("*")
          .eq("book_id", bookId)
          .eq("user_id", sessionUser.id)
          .maybeSingle()

        if (bookmark) setBookmarked(true)
      }

      setLoading(false)
    }

    loadSession()
  }, [bookId])

  const toggleBookmark = async () => {
    if (!user) return false

    if (bookmarked) {
      const { error } = await supabase
        .from("bookmarks")
        .delete()
        .eq("book_id", bookId)
        .eq("user_id", user.id)

      if (!error) {
        setBookmarked(false)
      } else {
        console.error(error.message)
      }

    } else {
      const { error } = await supabase
        .from("bookmarks")
        .insert([
          {
            book_id: bookId,
            user_id: user.id,
          },
        ])

      if (!error) {
        setBookmarked(true)
      } else {
        console.error(error.message)
      }
    }

    return true
  }

  return { bookmarked, toggleBookmark, user, loading }
}
