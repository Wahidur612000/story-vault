"use client"

import { useParams } from "next/navigation"
import { books } from "../../data/books"
import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabaseClient"
import { useAuth } from "../../context/AuthContext"

export default function BookReader() {
  const { id } = useParams()
  const book = books.find((b) => b.id === id)

  const { user, setAuthRequired } = useAuth()

  const [text, setText] = useState("")
  const [isBookmarked, setIsBookmarked] = useState(false)

  useEffect(() => {
    if (!book) return

    fetch(book.file)
      .then((res) => res.text())
      .then((data) => setText(data))
  }, [book])

  useEffect(() => {
    if (!user || !book) return

    checkBookmark()
  }, [user, book])

  async function checkBookmark() {
    const { data } = await supabase
      .from("bookmarks")
      .select("book_id")
      .eq("book_id", book?.id)
      .eq("user_id", user.id)
      .maybeSingle()

    if (data) setIsBookmarked(true)
  }

  async function toggleBookmark() {
    if (!user) {
      setAuthRequired(true)
      return
    }

    if (isBookmarked) {
      await supabase
        .from("bookmarks")
        .delete()
        .eq("book_id", book?.id)
        .eq("user_id", user.id)

      setIsBookmarked(false)
    } else {
      await supabase.from("bookmarks").insert({
        book_id: book?.id,
        user_id: user.id,
      })

      setIsBookmarked(true)
    }
  }

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Book not found
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#111111] text-[#e5e5e5] flex flex-col">

      {/* Header */}
      <div className="p-6 border-b border-zinc-800 flex justify-between items-center">
        <div className="p-6 border-b border-zinc-800">
  <h1 className="text-3xl font-bold">{book.title}</h1>
  <p className="text-gray-400">{book.author}</p>
</div>

        {/* Bookmark Button */}
        <button
          onClick={toggleBookmark}
          className={`text-2xl transition ${
            isBookmarked
              ? "text-yellow-400"
              : "text-white/70 hover:text-yellow-300"
          }`}
        >
          ★
        </button>
      </div>

      {/* Reader */}
      <div className="flex-1 overflow-y-scroll px-8 py-12 max-w-3xl mx-auto text-lg leading-9 whitespace-pre-wrap font-serif">
        {text}
      </div>
    </div>
  )
}
