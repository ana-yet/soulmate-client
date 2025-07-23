# SoulMate - MERN Matrimonial Platform (Frontend)

SoulMate is a modern, secure, and user-friendly full-stack MERN application designed to help everyone to find their life partners in a manner that aligns with Islamic values. This repository contains the complete frontend code, built with React, Tailwind CSS, and a suite of modern libraries for a seamless user experience.

## ✨ Features

The platform is divided into a feature-rich user-facing site and a comprehensive admin dashboard for management and oversight.

### 👤 User Features

#### Authentication: Secure user registration and login with Email/Password and Google, powered by Firebase Authentication.

- Biodata Management:

- Create a detailed personal biodata with numerous fields (personal, family, partner preferences).

- Edit and update existing biodata at any time.

- View your own biodata in a clean, profile-style layout.

#### Browse & Discover:

- A comprehensive biodatas page with advanced server-side filtering (age, gender, division) and search.

- Clean, responsive biodata cards with key information.

- Dynamic pagination that updates the URL for shareable links.

#### Contact & Favourites:

- Add interesting profiles to a personal "Favourites" list.

- Request contact information for a biodata by making a secure payment via Stripe.

- View the status of all your contact requests (pending/approved).

#### Success Stories:

- Submit a "Got Married" form to share your success story with the community.

- View a gallery of approved success stories on the homepage.

- Personalized Dashboard:

- A dedicated dashboard for users to view their biodata summary, contact request stats, and favourites count.

- Visual charts and progress trackers to guide the user journey.

#### 🛡️ Admin Features

#### **Admin Dashboard**: A central hub with statistical overviews, including total biodata, gender distribution, premium members, and total revenue, visualized with charts.

#### User Management:

- View a list of all registered users with server-side search.

- Promote users to "Admin" role.

- Upgrade users to "Premium" status.

#### **Approval Workflows**:

- Approve or reject pending requests from users to make their biodata premium.

- Approve or reject contact information requests.

- Review and approve user-submitted success stories before they are published.

## 📁 Folder Structure

```
src/
│
├── assets/ # Images, icons, and static assets
├── Config/ # Global config files (like axios or base URLs)
├── Contexts/ # React Context for global state management
├── Firebase/ # Firebase config and admin setup
├── Hook/ # Custom React hooks (auth, userInfo)
│
├── Pages/ # Route-level pages
│ ├── AboutUsPage/
│ ├── BiodataDetails/
│ ├── BiodataPage/
│ ├── ContactUsPage/
│ ├── Authentication/
│ ├── Dashboard/
│ │ ├── useAdmin/ # Admin-only components & pages
│ │ ├── useUser/ # User-only dashboard components
│ │ ├── Sidebar/
│ │ ├── Header/
│ ├── ForbiddenPage/
│ ├── NotFoundPage/
│
├── Home/ # Landing page sections
│ ├── Banner/
│ ├── HowItWorksSection/
│ ├── PremiumMember/
│ ├── SuccessCounterSection/
│ ├── SuccessStoriesSection/
│
├── Provider/ # Auth and other global providers
├── Routes/ # Route configs
├── Shared/ # Reusable components (Navbar, Footer, Logo, BackButton)
│
├── index.js # React entry point
├── App.jsx # Root component
└── README.md # You’re reading this
```

## 🚀 Tech Stack

#### **Framework**: React 18+

- **Routing**: React Router v8+

- **Styling**: Tailwind CSS with a custom theme for light and dark modes.

- **State Management & Data Fetching**: TanStack Query (React Query)

- **Authentication**: Firebase Authentication

- **Form Handling**: React Hook Form

- **Payment Integration**: Stripe.js and React Stripe.js

- **Animations**: Framer Motion

- **Notifications**: React Hot Toast & SweetAlert2

- **Charting**: Recharts

- **axios**: For data fetching

- **motion**: Animate the components

- **prop-types**: For validate props

- **react-countup**: Countup animation

- **react-helmet-async**: Page title and description for seo friendly

- **react-intersection-observer**: Observing

## ⚙️ Installation & Setup

#### Follow these steps to get the frontend application running on your local machine.

##### Prerequisites

###### Node.js (v18 or later)

###### npm or yarn

#### 1. Clone the Repository

```
 git clone <your-repository-url>
 cd <repository-folder-name>
```

#### 2. Install Dependencies

```
   npm install


# or

yarn install
```

#### 3. Set Up Environment Variables

Create a .env.local file in the root of your project and add the following environment variables. Replace the placeholder values with your actual keys.

# Firebase Configuration

```
VITE_FIREBASE_API_KEY="AIza..."
VITE_FIREBASE_AUTH_DOMAIN="your-project.firebaseapp.com"
VITE_FIREBASE_PROJECT_ID="your-project-id"
VITE_FIREBASE_STORAGE_BUCKET="your-project.appspot.com"
VITE_FIREBASE_MESSAGING_SENDER_ID="..."
VITE_FIREBASE_APP_ID="..."
```

# Stripe Public Key

```
VITE_STRIPE_PUBLISHABLE_KEY="pk_test*..."
```

# ImageBB API Key (for image uploads)

```

VITE_imgbb_API_KEY="..."
```

# Your Backend API URL

```

VITE_server_api="http://localhost:5000/api"
```

#### 4. Run the Development Server

```
   npm run dev

# or

yarn dev
```

The application should now be running on http://localhost:5173.

## 📜 Available Scripts

- `npm run dev`: Starts the development server.

- `npm run build`: Creates a production-ready build of the application.

- `npm run lint`: Lints the code for errors and style issues.

- `npm run preview`: Serves the production build locally to preview it.
