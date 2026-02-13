"use client"

import { useEffect, useState } from "react"
import { supabase } from "../lib/supabaseClient"
import { books } from "../data/books"
import BookCard from "../components/BookCard"

export default function BookmarksPage() {
  const [user, setUser] = useState<any>(null)
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadBookmarks()
  }, [])

  async function loadBookmarks() {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    setUser(user)

    if (!user) {
      setLoading(false)
      return
    }

    const { data } = await supabase
      .from("bookmarks")
      .select("book_id")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    if (data) {
      setBookmarkedIds(data.map((b) => b.book_id))
    }

    setLoading(false)
  }

  async function toggleBookmark(bookId: string) {
    if (!user) return

    await supabase
      .from("bookmarks")
      .delete()
      .eq("book_id", bookId)
      .eq("user_id", user.id)

    // Remove from UI instantly
    setBookmarkedIds((prev) =>
      prev.filter((id) => id !== bookId)
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading bookmarks...
      </div>
    )
  }

  const bookmarkedBooks = books.filter((book) =>
    bookmarkedIds.includes(book.id)
  )

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-3xl font-bold mb-10">
        ❤️ My Bookmarks
      </h1>

      {bookmarkedBooks.length === 0 ? (
        <div className="text-gray-400">
          No bookmarks yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {bookmarkedBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              isBookmarked={true}
              onToggleBookmark={() => toggleBookmark(book.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
