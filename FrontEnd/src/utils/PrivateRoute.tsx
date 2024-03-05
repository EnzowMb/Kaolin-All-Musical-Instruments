import { Navigate, Outlet } from "react-router-dom";
import { authenticStore } from "../stores/authentic.store";
import { useAuth } from "../contexts/authContext";

export const PrivateRoute = () => {
  const { user, loading } = useAuth();

  if (loading) return <></>;

  return user ? <Outlet /> : <Navigate to="/login" />;
};
