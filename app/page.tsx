"use client"

import { useEffect, useState } from "react"
import { books } from "./data/books"
import BookCard from "./components/BookCard"
import { supabase } from "./lib/supabaseClient"

export default function Home() {
  const [user, setUser] = useState<any>(null)
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([])

  useEffect(() => {
    loadUserAndBookmarks()
  }, [])

  async function loadUserAndBookmarks() {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    setUser(user)

    if (!user) return

    const { data } = await supabase
      .from("bookmarks")
      .select("book_id")
      .eq("user_id", user.id)

    if (data) {
      setBookmarkedIds(data.map((b) => b.book_id))
    }
  }

  async function toggleBookmark(bookId: string) {
    if (!user) {
      alert("Please sign in with Google.")
      return
    }

    if (bookmarkedIds.includes(bookId)) {
      await supabase
        .from("bookmarks")
        .delete()
        .eq("book_id", bookId)
        .eq("user_id", user.id)

      setBookmarkedIds((prev) => prev.filter((id) => id !== bookId))
    } else {
      await supabase.from("bookmarks").insert({
        book_id: bookId,
        user_id: user.id,
      })

      setBookmarkedIds((prev) => [...prev, bookId])
    }
  }

  return (
    <div className="pt-24 min-h-screen bg-black text-white p-10">
      <h1 className="text-3xl font-bold mb-10">
        📚 Free Classic Books
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {books.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            isBookmarked={bookmarkedIds.includes(book.id)}
            onToggleBookmark={() => toggleBookmark(book.id)}
          />
        ))}
      </div>
    </div>
  )
}
