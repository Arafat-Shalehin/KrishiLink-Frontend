import { Link, NavLink } from "react-router";
import { IoLogoModelS } from "react-icons/io";
import { GoHomeFill } from "react-icons/go";
import { IoLogIn, IoLogOut } from "react-icons/io5";
import projectLogo from "../Assets/unnamed.webp";

const Navbar = () => {
  return (
    <div className="navbar z-5 glass-card fixed top-0 text-white bg-green-700/30">
      <div className="navbar-start px-3">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
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
            className="menu menu-sm dropdown-content bg-base-100 
            rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "bg-green-500 text-white rounded-md px-2"
                    : ""
                }
              >
                <GoHomeFill />
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/all-crops"
                className={({ isActive }) =>
                  isActive
                    ? "bg-green-500 text-white rounded-md px-2"
                    : ""
                }
              >
                <IoLogoModelS /> All Crops
              </NavLink>
            </li>
          </ul>
        </div>

        <Link to="/" className="flex items-center gap-1 text-xl font-bold">
          <img
            className="w-10 md:w-13 lg:w-15 rounded-full md:mr-1 ml-2 sm:ml-0"
            src={projectLogo}
            alt="Logo Pic"
          />
          krishiLink
        </Link>
      </div>

      <div className="navbar-center hidden md:flex">
        <ul className="menu menu-horizontal px-1 gap-3 font-semibold">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "bg-green-500 text-white rounded-md px-3 py-1"
                  : ""
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/all-crops"
              className={({ isActive }) =>
                isActive
                  ? "bg-green-500 text-white rounded-md px-3 py-1"
                  : ""
              }
            >
              All Crops
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="navbar-end gap-3 px-3">
        <Link
          to={"/auth/login"}
          className="btn shadow-none border-none rounded-lg 
          bg-green-400 text-white text-lg hover:scale-115 transition"
        >
          <IoLogIn size={20} /> Login
        </Link>
        {/* {user ? (
          <div className="dropdown dropdown-end z-50">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-9 border-2 border-gray-300 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  referrerPolicy="no-referrer"
                  src={user.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="menu  menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
            >
              <div className=" pb-3 border-b border-b-gray-200">
                <li className="text-sm font-bold">{user.displayName}</li>
                <li className="text-xs">{user.email}</li>
              </div>
              <li className="mt-3">
                <Link to={"/profile"}>
                  <FaUser /> Home
                </Link>
              </li>

              <li>
                <Link to={"/my-models"}>
                  All Crops
                </Link>
              </li>

              <li >
                <Link to={"/my-downloads"}>
                 Profile
                </Link>
              </li>

              <li >
                <Link to={"/my-downloads"}>
                 Add Crops
                </Link>
              </li>

              <li >
                <Link to={"/my-downloads"}>
                 My Posts
                </Link>
              </li>

              <li >
                <Link to={"/my-downloads"}>
                 My Interests
                </Link>
              </li>

              <input
                onChange={(e)=> handleTheme(e.target.checked)}
                type="checkbox"
                defaultChecked={localStorage.getItem('theme') === "dark"}
                className="toggle"/>
              
              <li>
                <button
                  onClick={signOutUser}
                  className="btn btn-xs text-left bg-linear-to-r from-pink-500 to-red-500 text-white"
                >
                  <IoLogOut /> Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link
            to={"/auth/login"}
            className="btn shadow-none border-none rounded-lg 
          bg-green-400 text-white text-lg hover:scale-115 transition"
          >
            <IoLogIn size={20} /> Login
          </Link>
        )} */}
      </div>
    </div>
  );
};

export default Navbar;
