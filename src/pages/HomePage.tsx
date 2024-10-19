import { useAuth } from "../lib/context/AuthContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight as ArrowRightIcon } from "lucide-react";

const HomePage = () => {
  const { isUserAuthenticated } = useAuth();

  return (
    <div
      className="min-h-screen bg-[#09090b] text-gray-200"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke-width='2' stroke='%2318181b'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
      }}
    >
      <main className="relative h-screen flex justify-center items-center">
        <div className="px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl pt-20 pb-32 sm:pt-48 sm:pb-40"
          >
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-200 sm:text-6xl">
                Track your tasks with
                <span className="block text-primary">Task Manager</span>
              </h1>
              <p className="mt-6 text-lg leading-8 max-w-2xl mx-auto text-gray-300">
                Organize, prioritize, and accomplish your tasks with ease using
                our powerful task management platform.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                {isUserAuthenticated ? (
                  <Link to="/dashboard">
                    <button className="text-lg px-8 py-6 rounded-full shadow-lg border border-blue-600 bg-blue-600 text-white hover:bg-blue-500 transition-all duration-300 flex justify-center items-center">
                      Go to Dashboard
                      <ArrowRightIcon className="ml-2 h-5 w-5" />
                    </button>
                  </Link>
                ) : (
                  <>
                    <Link to="/login">
                      <button className="text-lg px-8 py-6 rounded-full shadow-lg border border-blue-600 bg-blue-600 text-white hover:bg-blue-500 transition-all duration-300 flex justify-center items-center">
                        Get Started
                        <ArrowRightIcon className="ml-2 h-5 w-5" />
                      </button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>

    // <div className="mt-20">
    //   {isUserAuthenticated ? (
    //     <Link to="/dashboard">Got to Dashboard</Link>
    //   ) : (
    //     <Link to="/login">Log In</Link>
    //   )}
    // </div>
  );
};

export default HomePage;
