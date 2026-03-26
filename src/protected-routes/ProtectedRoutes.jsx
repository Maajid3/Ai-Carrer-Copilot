import { Navigate, useLocation } from "react-router";
import { useUserContext } from "../context/useUserContext";

function ProtectedRoutes({ children }) {
  const location = useLocation();
  const { user, authLoading } = useUserContext();

  if (authLoading) {
    return <div className="text-sm text-zinc-300">Checking session...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ message:"Please Login to access chats" }} />;
  }

  return children;
}

export default ProtectedRoutes;
