import React, { useEffect, useState, useMemo } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { AuthContext } from "../Contexts/AuthContext";
import { app } from "../Firebase/firebase.init";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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

    return unsubscribe; // cleanup
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
    }),
    [user, loading]
  );

  return <AuthContext value={authContextValue}>{children}</AuthContext>;
};

export default AuthProvider;
