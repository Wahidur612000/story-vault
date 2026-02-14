# 📚 StoryVault

> A modern full-stack book reading and bookmarking platform built with **Next.js, Supabase, and Google OAuth**.

🔗 **Live Demo:** https://your-vercel-url.vercel.app  
🔗 **GitHub Repo:** https://github.com/Wahidur612000/story-vault  

---

## ✨ Overview

StoryVault allows users to:

- 📖 Read free public-domain books
- ⭐ Bookmark books (private to each user)
- 🔐 Sign in securely with Google OAuth
- 📱 Use the platform seamlessly across desktop and mobile

All bookmarks are:
- User-specific
- Protected using Supabase Row Level Security (RLS)
- Stored in a PostgreSQL database
- Updated instantly in the UI

---

## 🚀 Features

### 📖 Reading Experience
- Clean, scroll-based reading interface
- Gutenberg header/footer removed
- Bookmark star available inside reader page
- Fixed navbar for better navigation
- Smooth responsive typography

### ⭐ Bookmark System
- Add / Remove bookmark from:
  - Book cards (Home)
  - Reader page
- Bookmarks are:
  - Private to each user
  - Secured via RLS
- Visual bookmark indicator (yellow star)
- Login required prompt with auto-dismiss timer

### 🔐 Authentication
- Google OAuth via Supabase
- Session-based authentication
- Auth state managed globally using React Context
- Auto UI updates on login/logout

### 📱 Responsive Design
- Fully responsive layout
- Sticky navbar
- Mobile hamburger menu
- Clean mobile dropdown experience

---

## 🏗️ Tech Stack

### Frontend
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- React Context API

### Backend & Database
- Supabase (PostgreSQL)
- Supabase Auth (Google OAuth)
- Row Level Security (RLS)

### Deployment
- Vercel (Frontend hosting)
- Supabase (Database + Auth)

---

## 📂 Project Structure

```
app/
│
├── page.tsx                → Home page
├── layout.tsx              → Root layout
├── book/[id]/              → Reader page
├── bookmarks/              → User bookmarks page
│
├── components/             → UI components
│   ├── BookCard.tsx
│   ├── Navbar.tsx
│   ├── LoginButton.tsx
│   └── LogoutButton.tsx
│
├── context/
│   └── AuthContext.tsx     → Global auth state
│
├── data/
│   └── books.ts            → Book metadata
│
├── lib/
│   └── supabaseClient.ts   → Supabase config
│
public/
└── books/                  → Public domain text files
```

---

## 🗄️ Database Schema

### Table: `bookmarks`

| Column     | Type       |
|------------|------------|
| id         | UUID       |
| user_id    | UUID       |
| book_id    | TEXT       |
| created_at | TIMESTAMP  |

---

## 🔒 Row Level Security (RLS)

Enabled to ensure:

- Users can only see their own bookmarks
- Users can only insert their own bookmarks
- Users can only delete their own bookmarks

### Policies:

```sql
-- SELECT
auth.uid() = user_id

-- INSERT
auth.uid() = user_id

-- DELETE
auth.uid() = user_id
```

---

## 🧠 Problems Faced & Solutions

### 1️⃣ Multiple Supabase requests per BookCard
**Problem:** Each card was fetching user session individually.  
**Solution:** Centralized auth state using React Context and fetched bookmarks once on Home page.

---

### 2️⃣ Star UI not syncing after login
**Problem:** Bookmark UI didn’t update after auth state change.  
**Solution:** Managed session via global AuthContext with auth state listener.

---

### 3️⃣ Deployment error: `supabaseUrl is required`
**Problem:** Environment variables missing on Vercel.  
**Solution:** Added environment variables in Vercel Project Settings.

---

### 4️⃣ OAuth redirect not working on production
**Problem:** Google OAuth was configured only for localhost.  
**Solution:** Added Vercel production URL to:
- Supabase Redirect URLs
- Google OAuth Authorized Redirect URIs

---

## 🌍 Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Must be configured in:
- Local `.env.local`
- Vercel Project Settings → Environment Variables

---

## 🧪 How to Run Locally

```bash
git clone https://github.com/Wahidur612000/story-vault.git
cd story-vault
npm install
npm run dev
```

---

## 📌 Submission Checklist

- ✅ Live Vercel URL
- ✅ Public GitHub Repository
- ✅ README with architecture + challenges
- ✅ Secure authentication
- ✅ Clean responsive UI
- ✅ RLS-protected bookmarks

---

## 👨‍💻 Author

**Wahidur Rahman N**  
Java Full Stack Developer  
Built with ❤️ using Next.js + Supabase
