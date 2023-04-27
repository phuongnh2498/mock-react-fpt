import { FC } from "react";
import { Link, Outlet } from "react-router-dom";
import Navbar from "./Navbar";
type LayoutProps = {};
const Layout: FC<LayoutProps> = ({}) => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};
export default Layout;
