"use client"

import Link from "next/link"
import { useAuth } from "../context/AuthContext"

export default function BookCard({
  book,
  isBookmarked,
  onToggleBookmark,
}) {
  const { user, setAuthRequired, setAuthMessage } = useAuth()

  const handleBookmarkClick = () => {
    if (!user) {
        setAuthMessage("Please sign in first to bookmark this book.")
      setAuthRequired(true)
      return
    }

    onToggleBookmark()
  }

  return (
    <div className="relative group">

      {/* ⭐ Star OUTSIDE Link */}
      <button
        onClick={handleBookmarkClick}
        className={`absolute top-3 right-3 z-20 text-2xl ${
          isBookmarked
            ? "text-yellow-400"
            : "text-white/70 hover:text-yellow-300"
        }`}
      >
        ★
      </button>

      {/* Link only wraps card content */}
      <Link href={`/book/${book.id}`}>
        <div className="bg-zinc-900 rounded-2xl overflow-hidden shadow-lg cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl">

          <div className="relative h-72 overflow-hidden">
            <img
              src={book.image}
              alt={book.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-90" />

            <div className="absolute top-3 left-3 bg-purple-600 text-xs px-3 py-1 rounded-full font-medium">
              {book.tags[0]}
            </div>
          </div>

          <div className="p-4">
            <h2 className="text-lg font-semibold text-white group-hover:text-purple-400 transition-colors duration-300 line-clamp-2">
              {book.title}
            </h2>

            <p className="text-sm text-gray-400 mt-2">
              {book.author}
            </p>
          </div>
        </div>
      </Link>
    </div>
  )
}
