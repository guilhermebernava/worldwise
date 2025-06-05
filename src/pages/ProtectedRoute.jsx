import { useLogin } from "../context/LoginContext";
import { Navigate } from "react-router-dom";
import { memo } from "react";

const ProtectedRoute = memo(({ children }) => {
  const { user } = useLogin();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
});

export default ProtectedRoute;
