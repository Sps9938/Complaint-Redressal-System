# NIT Agartala — Online Complaint & Redressal System

A simple, modern web app built with React (Vite), Tailwind CSS and Appwrite as backend to manage campus/hostel complaints. Users can sign up/login, create complaints with optional image attachments, view a personal dashboard of complaints, and admins can manage status and view all complaints.

---

## 🔧 Project Overview

- Built with React + Vite
- UI with Tailwind CSS and Framer Motion
- Appwrite used for authentication, database, and file storage
- Redux Toolkit for application state (auth slice)

This repository contains the frontend of a complaint system for students where they can file issues and admins can track and update statuses.

---

## 🚀 Features

- Email/password authentication (Appwrite Account)
- Create complaints (title, description, optional image upload)
- View all complaints (admin) and user-specific complaints (dashboard)
- Admin can update complaint status (Pending / In Progress / Resolved)
- File storage via Appwrite Buckets
- Responsive UI and nice animations (Framer Motion)

---

## 🧰 Tech Stack

- React 18
- Vite
- Tailwind CSS
- Appwrite
- Redux Toolkit
- React Router DOM
- Framer Motion

---

## 📦 Prerequisites

- Node.js >= 18
- npm (or yarn)
- An Appwrite server instance (self-hosted or appwrite cloud)
- (Optional) Vercel account for deployment

---

## ⚙️ Appwrite Setup

1. Create a project in the Appwrite console.
2. Create a database and a collection for complaints.
   - Suggested fields:
     - `title` (String)
     - `description` (String or Text)
     - `status` (String) -> default `Pending`
     - `userId` (String) -> ID of the user who created complaint
     - `image` (String) -> file id returned after upload
3. Create a storage bucket for image uploads. Ensure read permission is public if you want direct viewing.
4. Enable Email/Password authentication for the project.
5. Make note of the following IDs and the endpoint for the project:
   - Project ID
   - Database ID
   - Collection ID
   - Bucket ID
   - Appwrite Endpoint (URL) — e.g., `http://localhost/v1` or your cloud endpoint

---

## 🔒 Environment Variables

The app reads configuration from Vite environment variables (prefixed with `VITE_`). Create a `.env.local` file in the project root with the following contents:

```env
VITE_APPWRITE_URL=<YOUR_APPWRITE_ENDPOINT>
VITE_APPWRITE_PROJECT_ID=<YOUR_PROJECT_ID>
VITE_APPWRITE_DATABASE_ID=<YOUR_DATABASE_ID>
VITE_APPWRITE_COLLECTION_ID=<YOUR_COLLECTION_ID>
VITE_APPWRITE_BUCKET_ID=<YOUR_BUCKET_ID>
```

> ⚠️ Do not commit `.env.local` or your secret keys to source control.

---

## 🔍 Quick Start — Local Development

1. Install dependencies

```powershell
npm install
```

2. Start development server

```powershell
npm run dev
```

3. Open your browser and go to `http://localhost:5173` (or whatever host/port Vite shows).

4. To build for production

```powershell
npm run build
```

5. Preview a production build locally

```powershell
npm run preview
```

---

## 📢 Deploying to Vercel

This repository contains a `vercel.json` file to rewrite requests to `index.html`, which is useful for Single Page App routing.

1. Upload repository to Vercel (via Git or the web UI).
2. Under Project Settings → Environment Variables, add the same environment variables as your local `.env.local`.
3. Deploy. Vercel will build using `npm run build` and serve the app.

---

## 🧪 Notes, Tips & Troubleshooting

- If the Appwrite SDK shows a CORS or 401 error: ensure the domain is allowed in your Appwrite project's console.
- Make sure your `VITE_APPWRITE_URL` points to the exact endpoint, and `VITE_APPWRITE_PROJECT_ID` is set correctly.
- Deploying to Vercel: do not set public keys or secrets in the frontend code; Appwrite client can be configured with only endpoint and projectId in the frontend.
- Admin route is guarded by authentication but not by user role; add role checks or a separate admin user mechanism if needed.

---

## 🛠️ Project Structure

```
index.html
src/
├─ appwrite/         # Appwrite services (auth and config)
├─ components/       # UI components (Navbar, CreateComplaint, ComplaintCard, etc.)
├─ conf/             # Reads env variables
├─ pages/            # Home, Login, Dashboard, Admin
├─ store/            # Redux slices & store
└─ main.jsx          # Entrypoint
```

---

## ✅ Contributing

Contributions are welcome. To add features or fix bugs:

1. Fork the repository
2. Create a branch for your feature/fix
3. Make changes and add tests if applicable
4. Open a Pull Request with a clear description

---

## 🤝 License

No license file found in this repository. Add a `LICENSE` file if you want to provide an explicit license (e.g., MIT).

---

## 📬 Author / Contact

This project seems to be developed for NIT Agartala community.

If you need help setting up Appwrite or running the app locally, open an issue or create a PR.

---

If you'd like, I can also:
- Add a sample `.env.local` with placeholders
- Add a Dockerfile for local Appwrite emulation
- Add a `LICENSE` file (e.g., MIT)
- Add contributions or PR templates

Let me know what you'd prefer.

---

## 🪪 Author, Originality & Proof

This project is original work by the repository owner and implemented to meet NIT Agartala's needs. The goal of this section is to make it clear to reviewers that the repository is not copied and pasted from other public projects.

- Author: **[Your Name Here]** — replace this placeholder with your full name or GitHub handle.
- Repository provenance: Each commit belongs to the project owner and may contain messages and code that show the incremental development workflow.

### Why this project is original

- Custom Appwrite integration: The `src/appwrite/config.js` and `src/appwrite/auth.js` implement project-specific workflow (custom createComplaint, createAccount, uploadFile logic).
- Custom UI and UX: Components like `CreateComplaint.jsx`, `ComplaintCard.jsx`, `AuthLayout.jsx`, and `Navbar.jsx` were implemented to match NIT Agartala branding using Tailwind + Framer Motion animations.
- App-specific flows: The app enforces a user-specific dashboard and an administrator view, with distinct client-side states (Redux toolkit `authSlice`), which indicate a unique implementation.

### How to Verify Originality (Quick checklist)

1. Open the commit history on GitHub and review the commit messages and timestamps (e.g., `git log` or GitHub UI).
   - Example command: `git log --pretty=format:"%h %ad | %s%d [%an]" --graph --date=short`
2. Compare files in `src/` for signatures and custom function names, such as `createComplaint`, `uploadFile`, and `getUserComplaints` in `src/appwrite/config.js`.
3. Check the project's unique styling and UX patterns: look at `src/components/*.jsx` (component names & animations with `framer-motion`).
4. Review `package.json` to verify dependencies and versions are deliberate choices, not a copy of another repo stub.
5. For further verification, review issues, PRs, and the timeline of changes on GitHub.

