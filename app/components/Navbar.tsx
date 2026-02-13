"use client"

import Link from "next/link"
import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import LoginButton from "./LoginButton"
import LogoutButton from "./LogoutButton"

export default function Navbar() {
  const { user, authRequired, authMessage } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-zinc-900/90 backdrop-blur-md border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          {/* Logo */}
          <Link href="/" className="text-xl font-bold">
            📚 StoryVault
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/bookmarks" className="hover:text-purple-400 transition">
              My Bookmarks
            </Link>

            {user ? (
              <>
                <span className="text-sm text-gray-400">
                  {user.email}
                </span>
                <LogoutButton />
              </>
            ) : (
              <LoginButton glow={authRequired} />
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            ☰
          </button>
        </div>

        {/* Mobile Dropdown */}
        {isOpen && (
          <div className="md:hidden bg-zinc-900 border-t border-zinc-800 px-6 pt-6 pb-6 space-y-4">
            <Link
              href="/bookmarks"
              className="block hover:text-purple-400 transition"
              onClick={() => setIsOpen(false)}
            >
              My Bookmarks
            </Link>

            {user ? (
              <>
                <div className="text-sm text-gray-400">
                  {user.email}
                </div>
                <LogoutButton />
              </>
            ) : (
              <LoginButton glow={authRequired} />
            )}
          </div>
        )}
      </nav>

      {/* 🔴 AUTH MESSAGE BANNER */}
      {authRequired && (
        <div className="fixed top-[72px] left-0 w-full z-40 bg-red-600 text-white text-center py-2 text-sm shadow-md">
          {authMessage || "You need to sign in first to bookmark books."}
        </div>
      )}
    </>
  )
}
