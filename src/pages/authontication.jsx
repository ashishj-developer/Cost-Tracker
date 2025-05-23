import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const [user, setUser] = useState(null); // To track authenticated user
  const [checkingAuth, setCheckingAuth] = useState(true); // To show loader until auth state is known

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setCheckingAuth(false); // Done checking
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  if (checkingAuth) {
    return <div>Loading...</div>; // Show loader until auth status is checked
  }

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
