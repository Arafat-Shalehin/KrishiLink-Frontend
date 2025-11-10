import { Link, NavLink, useNavigate } from "react-router";
import { IoLogoModelS } from "react-icons/io";
import { GoHomeFill } from "react-icons/go";
import { IoLogIn, IoLogOut } from "react-icons/io5";
import projectLogo from "../Assets/unnamed.webp";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, dltUser } = useContext(AuthContext);

  const navigate = useNavigate();
  console.log(user);

  const handleLogout = () => {
    dltUser()
      .then(() => {
        toast.success("Sign-out successful.");
      })
      .catch((error) => {
        console.log(error);
        alert("Something went wrong. Please try again later.");
      });

    navigate("/");
  };

  const links = [
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "bg-green-500 text-white rounded-md px-3 py-1"
              : "text-black md:text-white"
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
              : "text-black md:text-white"
          }
        >
          All Crops
        </NavLink>
      </li>

      {user && (
        <>
          <li>
            <NavLink
              to="/my-profile"
              className={({ isActive }) =>
                isActive
                  ? "bg-green-500 text-white rounded-md px-3 py-1"
                  : "text-black md:text-white"
              }
            >
              Profile
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/addCrops"
              className={({ isActive }) =>
                isActive
                  ? "bg-green-500 text-white rounded-md px-3 py-1"
                  : "text-black md:text-white"
              }
            >
              Add Crops
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/my-posts"
              className={({ isActive }) =>
                isActive
                  ? "bg-green-500 text-white rounded-md px-3 py-1"
                  : "text-black md:text-white"
              }
            >
              My Posts
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/my-interest"
              className={({ isActive }) =>
                isActive
                  ? "bg-green-500 text-white rounded-md px-3 py-1"
                  : "text-black md:text-white"
              }
            >
              My Interests
            </NavLink>
          </li>
        </>
      )}
    </>,
  ];
  return (
    <div className="navbar z-5 glass-card fixed top-0 text-white bg-green-700/30 justify-between">
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
            rounded-box z-1 mt-3 w-52 p-2 shadow text-white"
          >
            {links}
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

      <div className="navbar-center hidden md:flex items-center md:pl-22 lg:pl-7">
        <ul className="menu menu-horizontal px-1 gap-3 font-semibold">
          {links}
        </ul>
      </div>

      <div className="navbar-end gap-3 px-3">
        {user ? (
          <div className="dropdown dropdown-end z-50">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-25 border-2 border-gray-300 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  referrerPolicy="no-referrer"
                  src={
                    user.photoURL ||
                    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  }
                />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="menu  menu-sm dropdown-content bg-base-100 
              rounded-box z-50 mt-3 w-52 p-2 shadow"
            >
              <div className="border-b border-b-gray-200 p-3">
                <li className="text-sm font-bold text-black">
                  Name: {user.displayName}
                </li>
                <li className="text-xs text-black">Email: {user.email}</li>
              </div>

              {/* <input
                onChange={(e)=> handleTheme(e.target.checked)}
                type="checkbox"
                defaultChecked={localStorage.getItem('theme') === "dark"}
                className="toggle"/> */}

              <li>
                <button
                  onClick={handleLogout}
                  className="border border-green-400 font-semibold text-lg px-8 
          lg:px-13 py-2 rounded text-green-600/90 mt-10 hover:bg-green-300/20 transition-colors"
                >
                  <IoLogOut size={20} /> Logout
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
        )}
      </div>
    </div>
  );
};

export default Navbar;
