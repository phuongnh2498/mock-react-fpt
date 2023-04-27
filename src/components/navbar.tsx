import { Link } from "react-router-dom";
import { useAuth } from "../utils/context";

type NavProps = {};
const Navbar = (props: NavProps) => {
  const { user, logout } = useAuth();
  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-white font-bold text-xl">
              My Website
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {user ? (
                  <>
                    <Link
                      to="/profile"
                      className=" text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      {user.full_name}
                    </Link>
                    <Link
                      to={"/login"}
                      onClick={logout}
                      className=" text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Log out
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className=" text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className=" text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {/* Add any additional navigation elements here */}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
