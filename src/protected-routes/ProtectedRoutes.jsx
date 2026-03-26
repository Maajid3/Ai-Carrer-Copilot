import { Navigate } from "react-router";
import { useUserContext } from "../context/useUserContext";

export default function ProtectedRoutes() {
  const { user } = useUserContext();

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ message: "Please Login to access chats!" }}
      />
    );
  }
}
