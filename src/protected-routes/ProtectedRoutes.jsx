import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; 

function ProtectedRoutes({ children }) {
  const location = useLocation();
  const { user, authLoading } = useAuth();

  if (authLoading) {
    return <div className="text-sm text-zinc-300">Checking session...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}

export default ProtectedRoutes;
