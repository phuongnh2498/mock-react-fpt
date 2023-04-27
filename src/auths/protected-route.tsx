import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../utils/context";
import { ReactElement } from "react";
interface ProtectedRouteProps {
  children: ReactElement;
}
export const ProtectedRoute = ({
  children,
}: ProtectedRouteProps): ReactElement => {
  const { user } = useAuth();
  if (!user) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }
  return children;
};
