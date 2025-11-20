# Matrimony Platform - Client

A modern, feature-rich matrimony platform built with React and Vite, designed to help users find their perfect match. This application provides a seamless user experience with real-time features, secure payments, and a comprehensive dashboard.

## 🚀 Features

-   **User Authentication**: Secure login and registration using Firebase Authentication.
-   **Biodata Management**: Users can create, update, and view detailed biodatas.
-   **Premium Membership**: Integrated Stripe payment gateway for premium subscription plans.
-   **Real-time Chat**: Instant messaging system powered by Socket.io for premium members.
-   **Advanced Search**: Filter and search for profiles based on various criteria.
-   **Dashboard**:
    -   **User Dashboard**: Manage profile, view requests, and favorites.
    -   **Admin Dashboard**: Manage users, approve premium requests, and view statistics.
-   **Blog System**: Read and interact with success stories and relationship advice.
-   **Responsive Design**: Fully responsive UI built with Tailwind CSS for all devices.
-   **Dark Mode**: Toggle between light and dark themes for better accessibility.

## 🛠️ Tech Stack

-   **Frontend Framework**: [React](https://reactjs.org/) (v18)
-   **Build Tool**: [Vite](https://vitejs.dev/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **State Management & Data Fetching**: [TanStack Query (React Query)](https://tanstack.com/query/latest)
-   **Routing**: [React Router](https://reactrouter.com/)
-   **Authentication**: [Firebase](https://firebase.google.com/)
-   **HTTP Client**: [Axios](https://axios-http.com/)
-   **Real-time Communication**: [Socket.io-client](https://socket.io/)
-   **Payments**: [Stripe](https://stripe.com/)
-   **Forms**: [React Hook Form](https://react-hook-form.com/)
-   **UI Components/Icons**: React Icons, SweetAlert2, React Hot Toast, Framer Motion.

## 📦 Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/ana-yet/soulmate-client.git
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Environment Setup:**

    Create a `.env.local` file in the root directory and add your Firebase and Stripe configuration:

    ```env
    VITE_apiKey=your_firebase_api_key
    VITE_authDomain=your_firebase_auth_domain
    VITE_projectId=your_firebase_project_id
    VITE_storageBucket=your_firebase_storage_bucket
    VITE_messagingSenderId=your_firebase_messaging_sender_id
    VITE_appId=your_firebase_app_id
    VITE_payment_Gateway_PK=your_stripe_publishable_key
    VITE_API_URL=http://localhost:5000 # Or your server URL
    ```

## 🏃‍♂️ Running the Application

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

## 🏗️ Building for Production

To build the application for production:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## 📂 Project Structure

```
client/
├── src/
│   ├── assets/         # Static assets (images, icons)
│   ├── Config/         # Configuration files
│   ├── Context/        # React Context providers
│   ├── Hook/           # Custom React Hooks
│   ├── Layouts/        # Page layouts (Main, Dashboard)
│   ├── Pages/          # Application pages
│   ├── Provider/       # Auth and other providers
│   ├── Routes/         # Route definitions
│   ├── Shared/         # Reusable components (Navbar, Footer)
│   ├── index.css       # Global styles (Tailwind imports)
│   └── main.jsx        # Entry point
├── .env.local          # Environment variables
├── package.json        # Dependencies and scripts
└── vite.config.js      # Vite configuration
```
