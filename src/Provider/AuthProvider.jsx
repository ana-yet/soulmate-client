import React, { useEffect, useState, useMemo } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
} from "firebase/auth";
import { AuthContext } from "../Contexts/AuthContext";
import { app } from "../Firebase/firebase.init";
import LoadingSpinner from "../Pages/LoadingSpinner/LoadingSpinner";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  // Auth functions
  const createEmailUser = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const googleLogin = () => signInWithPopup(auth, googleProvider);

  const emailPasswordLogin = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const updateUserProfile = (name, photoURL) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL,
    });
  };

  const userSignOut = () => signOut(auth);

  // Track user login status
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Memoize the value to avoid unnecessary re-renders
  const authContextValue = useMemo(
    () => ({
      createEmailUser,
      googleLogin,
      user,
      userSignOut,
      emailPasswordLogin,
      loading,
      setLoading,
      updateUserProfile,
      setDarkMode,
      darkMode,
    }),
    [user, loading, darkMode]
  );
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
