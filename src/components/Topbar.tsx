import { Link } from "react-router-dom";
import { useAuth } from "../lib/context/AuthContext";
import AppIcon from "../icons/AppIcon";
import MenuIcon from "../icons/MenuIcon";
import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const { logout, isUserAuthenticated } = useAuth();
  const navigate = useNavigate();

  const authButtonHandler = () => {
    try {
      if (isUserAuthenticated) {
        logout();
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error("Authentication error:", error);
    }
  };

  return (
    <header className="shadow bg-[#09090b] z-50 fixed top-0 w-full border-b border-[#18181b]">
      <div className="relative flex max-w-screen-xl flex-col overflow-hidden px-4 py-4 md:mx-auto md:flex-row md:items-center">
        <Link
          to="/"
          className="flex items-center whitespace-nowrap text-2xl font-black"
        >
          <span className="mr-2 text-4xl text-blue-600">
            <AppIcon />
          </span>
          <span className="text-white">Task Manager</span>
        </Link>

        <input type="checkbox" className="peer hidden" id="navbar-open" />
        <label
          className="absolute top-5 right-7 cursor-pointer md:hidden text-white"
          htmlFor="navbar-open"
        >
          <span className="sr-only text-white">Toggle Navigation</span>
          <MenuIcon />
        </label>

        <nav
          aria-label="Header Navigation"
          className="peer-checked:mt-8 peer-checked:max-h-56 flex max-h-0 w-full flex-col items-center justify-between overflow-hidden transition-all md:ml-24 md:max-h-full md:flex-row md:items-start"
        >
          <ul className="flex flex-col items-center space-y-2 md:ml-auto md:flex-row md:space-y-0">
            <li className="text-gray-600 md:mr-12 hover:text-blue-600">
              <button
                type="button"
                className="rounded-md border-2 border-blue-600 px-6 py-1 font-medium text-white bg-blue-600 transition-colors duration-300 ease-in-out hover:bg-[#09090b] hover:text-blue-600"
                onClick={authButtonHandler}
              >
                {isUserAuthenticated ? "Log Out" : "Log In"}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Topbar;
