import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
// import { GeneralContext } from "../context/GeneralContext";

function ProtectedRoute({ children }) {
  const isAuthenticated = useSelector((state) => state?.user?.isAuthenticated);
  // const { UserData } = useContext(GeneralContext);
  // const userIsAuthenticated = UserData?.isAuthenticated;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
