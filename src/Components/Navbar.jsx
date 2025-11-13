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
  // console.log(user);

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

      {user && (
        <>
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

          <NavLink
            to="/add-crops"
            className={({ isActive }) =>
              isActive
                ? "bg-green-500 text-white rounded-md px-3 py-1"
                : "text-black md:text-white"
            }
          >
            Add Crops
          </NavLink>

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
        </>
      )}
    </>,
  ];
  return (
    <div className="navbar z-5 glass-card fixed top-0 text-white bg-green-700/60 justify-between">
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
            {links.map((link, index) => (
              <li key={index}>{link}</li>
            ))}
          </ul>
        </div>

        <Link to="/" className="flex items-center gap-1 md:text-xl text-lg font-bold">
          <img
            className="w-9 md:w-13 lg:w-15 rounded-full md:mr-1 ml-2 sm:ml-0"
            src={projectLogo}
            alt="Logo Pic"
          />
          krishiLink
        </Link>
      </div>

      <div className={`navbar-center hidden md:flex items-center ${user && 'md:pl-15 lg:pl-7'}`}>
        <ul className="menu menu-horizontal px-1 gap-3 font-semibold">
          {links.map((link, index) => (
            <li key={index} className="flex flex-row items-center gap-3">
              {link}
            </li>
          ))}
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
                    "https://static.vecteezy.com/system/resources/previews/007/296/447/non_2x/user-icon-in-flat-style-person-icon-client-symbol-vector.jpg"
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
          <div className="flex items-center md:gap-5 gap-2">
            <Link
              to={"/auth/login"}
              className="btn shadow-none border-none rounded md:py-6
          bg-green-400 text-white md:text-lg hover:scale-115 transition duration-300"
            >
              <IoLogIn size={20} /> Login
            </Link>
            <Link
              to={"/auth/register"}
              className="border border-green-400 md:font-semibold md:text-lg md:px-8 px-3
          lg:px-13 py-2 rounded text-white hover:bg-green-800 hover:border-none transition-colors duration-400"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
