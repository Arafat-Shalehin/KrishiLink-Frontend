import React, { use, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { AuthContext } from "../Context/AuthProvider";
import { toast } from "react-toastify";

const Register = () => {
  const { createUser, setUser } = use(AuthContext);

  const [show, setShow] = useState(false);

  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const handleRegister = (e) => {
    e.preventDefault();

    const form = e.target;

    const name = form.name.value;
    const image = form.image.value;
    const email = form.email.value;
    const password = form.password.value;

    console.log({name, image, email, password});

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    } else if (!/[A-Z]/.test(password)) {
      setError("Password must contain at least one uppercase letter");
      return;
    } else if (!/[a-z]/.test(password)) {
      setError("Password must contain at least one lowercase letter");
      return;
    }

    createUser(email, password)
      .then((result) => {
        // Signed up
        const user = result.user;

        setUser({ ...user, displayName: name, photoURL: image });
        toast.success("SignUp Successful.");
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        setError("Something is not right, Please try again later.");
      });
  };

  return (
    <div className="flex justify-center items-center my-10">
      <div
        className="card bg-base-100 w-full max-w-sm shrink-0 
            shadow-2xl mt-15"
      >
        <h2 className="font-bold text-2xl text-center pt-10">
          Register Your Account
        </h2>
        <form onSubmit={handleRegister} className="card-body">
          <fieldset className="fieldset">
            <label className="label font-semibold">Name</label>
            <input
              name="name"
              type="text"
              className="input mb-2"
              placeholder="Name"
              required
            />

            <label className="label font-semibold">Your Photo</label>
            <input
              name="image"
              type="text"
              className="input mb-2"
              placeholder="Your Image URL"
            />

            <label className="label font-semibold">Email</label>
            <input
              name="email"
              type="email"
              className="input mb-2"
              placeholder="Email"
              required
            />

            <label className="label font-semibold">Password</label>
            <input
              name="password"
              type={show ? "text" : "password"}
              className="input mb-2"
              placeholder="Password"
              required
            />
            <span
              onClick={() => setShow(!show)}
              className="absolute right-[50px] top-[370px] cursor-pointer z-50"
            >
              {show ? (
                <p className="text-black text-md font-semibold">Hide</p>
              ) : (
                <p className="text-black text-md font-semibold">Show</p>
              )}
            </span>

            <div>
              <a className="link link-hover">Terms and Condition</a>
            </div>
            {error && <p className="text-red-600 text-xs">{error}</p>}
            <button type="submit" className="btn btn-neutral mt-4">
              Register
            </button>

            <p className="text-center font-semibold pt-3">
              Already have an account?{" "}
              <Link className="text-secondary" to="/auth/login">
                Login
              </Link>
            </p>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Register;
