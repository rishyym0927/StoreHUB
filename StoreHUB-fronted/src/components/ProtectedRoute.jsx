import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if(user===null) {
    return <Navigate to="/login" replace />;
  }

  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
