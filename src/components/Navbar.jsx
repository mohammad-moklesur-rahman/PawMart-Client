import { Link, NavLink } from "react-router";
import MyContainer from "./MyContainer";
import logo from "../assets/logo.png";
import useAuth from "../hooks/UseAuth";
import toast from "react-hot-toast";
import useTheme from "../hooks/useTheme";
import { motion, AnimatePresence } from "framer-motion";
import { FaMoon, FaSun } from "react-icons/fa";

const Navbar = () => {
  const { user, signOUt, setAuthLoading } = useAuth();
  const { theme, toggleTheme } = useTheme();

  // * Sing Out user
  const handelSignOut = () => {
    signOUt()
      .then(() => {
        toast.success("Signed out successfully!");
        setAuthLoading(false);
      })
      .catch((error) => {
        setAuthLoading(false);
        if (error.code === "auth/no-current-user") {
          toast.warning("No user is currently signed in.");
        } else {
          toast.error("Error signing out. Please try again.");
        }
      });
  };

  const menu = (
    <>
      {user ? (
        <>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/pets-and-supplies">Pets &amp; Supplies</NavLink>
          </li>
          <li>
            <NavLink to="/add-listing">Add Listing</NavLink>
          </li>
          <li>
            <NavLink to="/my-listings">My Listings</NavLink>
          </li>
          <li>
            <NavLink to="/my-orders">My Orders</NavLink>
          </li>
        </>
      ) : (
        <>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/pets-and-supplies">Pets &amp; Supplies</NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="bg-primary-content">
      <MyContainer>
        <div className="navbar">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {" "}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />{" "}
                </svg>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                {menu}
              </ul>
            </div>
            <Link to="/" className="text-xl">
              <div className="flex items-center hover:scale-105 transition-all">
                <figure>
                  <img className="w-12" src={logo} alt="" />
                </figure>
                <h2 className="text-[#FF9292] text-[20px] font-bold">
                  <span className="text-green-500">P</span>aw
                  <span className="text-green-500">M</span>art
                </h2>
              </div>
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 text-accent">{menu}</ul>
          </div>
          <div className="navbar-end">
            {user ? (
              <>
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} className="avatar avatar-online">
                    <div className="w-12 rounded-full border-2 border-primary">
                      <img
                        src={
                          user.photoURL ||
                          "https://img.icons8.com/?size=100&id=z-JBA_KtSkxG&format=png&color=000000"
                        }
                      />
                    </div>
                  </div>

                  <ul
                    tabIndex="-1"
                    className="dropdown-content menu bg-secondary rounded-box z-10 w-25 p-1 mt-2 shadow-sm"
                  >
                    <li>
                      <a onClick={handelSignOut}>Sign Out</a>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <NavLink to="/login" className="btn primary-btn mr-3">
                  Login
                </NavLink>
                <NavLink to="/register" className="btn primary-btn">
                  Register
                </NavLink>
              </>
            )}

            {/* 🔘 Animated Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="btn btn-ghost btn-circle text-2xl relative overflow-hidden ml-4"
            >
              <AnimatePresence mode="wait" initial={false}>
                {theme === "light" ? (
                  <motion.span
                    key="moon"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <FaMoon />
                  </motion.span>
                ) : (
                  <motion.span
                    key="sun"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 flex items-center justify-center text-accent"
                  >
                    <FaSun />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </MyContainer>
    </div>
  );
};

export default Navbar;
