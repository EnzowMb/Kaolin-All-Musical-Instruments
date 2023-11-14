import { Navigate, Outlet } from "react-router-dom";
import { authenticStore } from "../stores/authentic.store";

export const PrivateRoute = () => {
  const { isAuthentic } = authenticStore;

  return isAuthentic ? <Outlet /> : <Navigate to="/login" />;
};
