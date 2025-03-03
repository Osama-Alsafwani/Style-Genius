import { Navigate } from "react-router-dom";
import { useAuthStore } from "../lib/store/authStore";
import { JSX } from "react";

export default function ProtectedRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const { token } = useAuthStore();

  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  return children;
}
