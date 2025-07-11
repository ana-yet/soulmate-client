🗓️ 6-Day Full Power Plan (11–16 July)
🔥 Day 1 – July 11: Project Setup + Auth System
Goals:
Setup GitHub (client + server repos)

Setup Vite + React + Tailwind (no DaisyUI)

Setup Firebase project (auth + config)

Setup Express + MongoDB backend

AuthContext + Firebase Auth

Send Firebase token to backend → get JWT

Store JWT in localStorage, Axios interceptor

Create user in DB on first login (with role)

Protected Route setup (Dashboard, Biodata Details)

✅ Output: Full Auth system working with role-based auth
💡 Git: 3–4 commits

🔥 Day 2 – July 12: Homepage + Protected Routing
Goals:
Navbar (dynamic menu: guest/user/admin)

Banner / Slider (visually attractive)

6 Premium biodata cards from DB (ascending/descending dropdown)

“How It Works” section (simple 3-step visuals)

Success Counter (total biodata, boys, girls, marriages) → aggregation from backend

Success Stories (desc by date, card-based)

Footer

✅ Output: Fully responsive homepage
💡 Git: 5–6 commits

🔥 Day 3 – July 13: Biodata CRUD + Details + Filter Page
Goals:
Biodata Create/Edit form (React Hook Form)

Auto-generate biodataId from backend

Biodata View Page (protected)

“Make Premium” button → request to admin

Request contact → route to checkout

Filtering: Age range, gender, division

Similar biodatas logic on details page

✅ Output: All biodata functionality + routing done
💡 Git: 4–5 commits

🔥 Day 4 – July 14: User Dashboard + Stripe Integration
Goals:
Dashboard layout (sidebar + routing)

View Biodata Page + "Make Premium" modal

Edit Biodata Page

Favourites (add, remove, show)

Contact Requests Table (only show if admin approved)

Stripe Checkout page (private)

Store pending request in DB

✅ Output: User dashboard + payment working
💡 Git: 4–6 commits

🔥 Day 5 – July 15: Admin Dashboard + Approvals + Analytics
Goals:
Dashboard layout (sidebar + routing)

Manage Users → Promote to Admin, Premium

Approve Premium Requests

Approve Contact Requests

Show Success Stories in table + modal

Create Pie Chart (biodata stats + revenue) using Recharts or Chart.js

✅ Output: Admin panel fully working
💡 Git: 4–5 commits

🔥 Day 6 – July 16: Polishing + README + Deployment
Goals:
Pagination on Biodata page

Axios Interceptor

Toasts for all CRUD + login/signup

Protect details/private routes on reload

Final responsive checks (mobile, tablet, desktop)

Write clean README.md

Host client (Firebase) + server (Render/Vercel)

Final Git commits + code cleanup

✅ Output: Polished, deployed, submitted project
💡 Git: 4–6 commits

## client

/src
/assets # Images, icons
/components
/ui # Button, Input, Select, Modal
/shared # Navbar, Footer, Banner, Cards
/forms # RHF forms (Login, Register, Biodata)
/layouts # Layouts (DashboardLayout, MainLayout)
/pages # Route-based pages
/routes # ProtectedRoute, AdminRoute
/services # axios + api files
/context # AuthContext
/hooks # useAuth, useTitle, etc.
/utils # helper functions
/constants # GenderList, Divisions, etc.
App.jsx
main.jsx

## server

/server
/controllers # Logic for routes
/routes # Auth, biodata, user, admin
/models # MongoDB schemas
/middlewares # verifyJWT, isAdmin, isPremium
/config # connectDB, env configs
/utils # helper logic
/seed # dev seeding scripts
/services # stripeService, authService
.env
server.js
