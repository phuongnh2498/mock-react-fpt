import { FC } from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import ErrorPage from "./error";
import Layout from "../components/Layout";
import Home from "./home";
import Login from "./login";
import UserManager from "./user-manager";
import AuthProvider from "../utils/context";
import { ProtectedRoute } from "../auths/protected-route";
import { AlreadyLoginRoute } from "../auths/login-route";
import Profile from "./profile";
import Register from "./register";

type RootProps = {};

const Root: FC<RootProps> = ({}) => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <ProtectedRoute>
                <UserManager />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <AlreadyLoginRoute>
                <Login />
              </AlreadyLoginRoute>
            }
          />
          <Route
            path="/register"
            element={
              <AlreadyLoginRoute>
                <Register />
              </AlreadyLoginRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          {/* Using path="*"" means "match anything", so this route
          acts like a catch-all for URLs that we don't have explicit
          routes for. */}
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
};
export default Root;
