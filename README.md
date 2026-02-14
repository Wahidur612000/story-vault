📚 Smart Bookmark App

A modern bookmark management application built with Next.js (App Router) and Supabase, featuring Google OAuth authentication, private user bookmarks, and real-time updates.

🚀 Live Demo

🔗 Vercel Deployment:
https://your-vercel-url.vercel.app

🛠 Tech Stack

Next.js 14+ (App Router)

Supabase

Authentication (Google OAuth)

PostgreSQL Database

Realtime subscriptions

Tailwind CSS

Vercel (Deployment)

✅ Features Implemented
🔐 Authentication

Google OAuth login (no email/password)

Secure session management

Auth context with global state handling

Protected bookmark actions (requires login)

⭐ Bookmark Functionality

Users can bookmark books

Bookmarks are private per user

Star indicator updates based on user’s bookmarks

Bookmark removal supported

UI prevents bookmarking when not logged in

Auth-required banner appears and auto-dismisses after 5 seconds

🔄 Real-Time Updates

Bookmarks update instantly

If opened in two tabs, changes reflect automatically

Uses Supabase Realtime

📖 Reading Experience

Public domain books loaded from local .txt files

Clean reader UI

Responsive layout

Scrollable reading interface

Bookmark star available inside reader page

📱 Responsive Design

Fully responsive layout

Mobile navbar with hamburger menu

Fixed navigation bar

Clean UI for both desktop and mobile

🗂 Project Structure
app/
 ├── book/[id]/        → Book reader page
 ├── bookmarks/        → User bookmarks page
 ├── components/       → UI components
 ├── context/          → AuthContext
 ├── data/             → Book metadata
 ├── lib/              → Supabase client
 ├── layout.tsx
 └── page.tsx          → Home page

public/
 └── books/            → Public domain book files

🔐 Database Schema
bookmarks table
Column	Type
id	UUID
user_id	UUID
book_id	TEXT
created_at	TIMESTAMP
🔒 Row Level Security (RLS)

Policies:

-- Insert
auth.uid() = user_id

-- Select
auth.uid() = user_id

-- Delete
auth.uid() = user_id


This ensures:

Users can only access their own bookmarks

Complete data isolation

⚙ Environment Variables

Required:

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=


Set in:

.env.local (development)

Vercel → Project Settings → Environment Variables (production)

🔄 OAuth Configuration
Supabase

Site URL: Vercel production URL

Redirect URLs:

http://localhost:3000

https://your-vercel-url.vercel.app

Google Cloud

Authorized JavaScript Origins:

http://localhost:3000

https://your-vercel-url.vercel.app

Authorized Redirect URI:

https://your-project-id.supabase.co/auth/v1/callback

⚠ Challenges Faced & Solutions
1️⃣ Supabase Environment Variables Missing in Production

Problem:
Vercel build failed with:

supabaseUrl is required


Cause:
Environment variables were only set locally.

Solution:
Added NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in Vercel dashboard and redeployed.

2️⃣ TypeScript Build Errors in Production

Problem:
Implicit any type errors during next build.

Cause:
Component props were not typed explicitly.

Solution:
Defined proper TypeScript interfaces for all component props.

3️⃣ Nested Git Repository Error

Problem:
Git refused to add public/books directory.

Cause:
A nested .git folder existed inside public/books.

Solution:
Removed nested .git directory using PowerShell:

Remove-Item -Recurse -Force public\books\.git

4️⃣ OAuth Redirecting to Localhost After Deployment

Problem:
After login in production, redirect went to localhost.

Cause:
Supabase Site URL was still set to http://localhost:3000.

Solution:
Updated Site URL to Vercel production URL.

5️⃣ Bookmark Star Not Updating Correctly

Problem:
Star was not reflecting bookmark state properly.

Cause:
Each card was querying Supabase individually.

Solution:
Fetched all user bookmarks once in parent component and passed bookmarked state down as props.

6️⃣ Navbar Not Updating After Login

Problem:
Login state didn’t update UI.

Cause:
Navbar was outside AuthProvider or session not managed globally.

Solution:
Created AuthContext to manage authentication globally.

📦 How to Run Locally
git clone https://github.com/Wahidur612000/story-vault.git
cd smart-bookmark-app
npm install
npm run dev


Visit:

http://localhost:3000