import { Link, NavLink } from "react-router";
import MyContainer from "./MyContainer";
import logo from "../assets/logo.png";
import { useState } from "react";

const Navbar = () => {
  const [user, setUser] = useState(false);
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
                <div className="avatar avatar-online">
                  <div className="w-12 rounded-full border-2 border-primary">
                    <img
                      src={
                        user.photoURL ||
                        "https://img.icons8.com/?size=100&id=z-JBA_KtSkxG&format=png&color=000000"
                      }
                    />
                  </div>
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
          </div>
        </div>
      </MyContainer>
    </div>
  );
};

export default Navbar;
