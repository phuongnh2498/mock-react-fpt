import { FC } from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import ErrorPage from "./error";
import Layout from "../components/layout";
import Home from "./home";
import Login from "./login";
import UserManager from "./user-manager";
type RootProps = {};

const Root: FC<RootProps> = ({}) => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user-manager" element={<UserManager />} />
        {/* Using path="*"" means "match anything", so this route
          acts like a catch-all for URLs that we don't have explicit
          routes for. */}
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
};
export default Root;
