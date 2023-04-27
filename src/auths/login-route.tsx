import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../utils/context";
import Login from "../pages/login";
import { ReactElement } from "react";
import Home from "../pages/home";
interface ProtectedRouteProps {
  children: ReactElement;
}
export const AlreadyLoginRoute = ({
  children,
}: ProtectedRouteProps): ReactElement => {
  const { user } = useAuth();
  if (user) {
    // user authenticated
    return <Navigate to="/" />;
  }
  return children;
};
