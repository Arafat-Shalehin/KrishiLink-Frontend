import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../Context/AuthProvider';
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'react-toastify';

const Login = () => {

    const {loginUser, googleLogin} = useContext(AuthContext);

    const [error, setError] = useState('');
    const [show, setShow] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        const form = e.target;

        const email = form.email.value;
        const password = form.password.value;

        // console.log({email, password});

        loginUser(email, password)
        .then((result) => {
            const user = result.user;
            console.log(user);
            toast.success("Login Successful.");
            navigate(`${location.state? location.state : '/'}`);
        })
        .catch((error) => {
            const errorCode = error.code;
            console.log(errorCode);
            if (errorCode == 'auth/invalid-credential') {
                setError('Password or Email is not correct.');
            }
        });
    };

    const handleGoogleLogin = () => {
        googleLogin()
        .then((result) => {
            const user = result.user;
            console.log(user);
            toast.success("SignIn Successful.");
            navigate(`${location.state? location.state : '/'}`);
        })
        .catch((error) => {
            const errorCode = error.code;
            console.log(errorCode);
        });
    };

    return (
         <div 
         className='flex justify-center items-center my-10'
         >
            <div 
            className="card w-full max-w-sm shrink-0 shadow-2xl mt-15"
            >
                <h2 className='font-bold text-2xl text-center pt-10'>Login Your Account</h2>
                <form onSubmit={handleLogin} className="card-body">
                    <fieldset className="fieldset relative">
                        <label className="label">Email</label>
                        <input 
                        name='email' 
                        type="email" 
                        className="input" 
                        placeholder="Email" />

                        <label className="label">Password</label>
                        <input 
                        name='password' 
                        type={show ? 'text' : "password"} 
                        className="input" 
                        placeholder="Password" />
                        <span onClick={() => setShow(!show)} className='absolute right-[25px] top-[109px] cursor-pointer z-50'>
                            {
                                show ? <p className='text-black text-md font-semibold'>Hide</p> : <p className='text-black text-md font-semibold'>Show</p>
                            }
                        </span>

                        <div><a target='_blank' href='https://mail.google.com/mail/u/0/#inbox' className="link link-hover">Forgot password?</a></div>
                        {
                            error && <p className='text-red-800 font-semibold text-xs'>{error}</p>
                        }
                        <button type='submit' className="btn btn-neutral mt-4">Login</button>
                        <div className="divider divider-neutral">OR</div>
                        <button
                        onClick={handleGoogleLogin} 
                        className='border-2 border-gray-400 bg-white hover:bg-green-300/20 px-14 py-2 rounded 
                        font-bold text-lg flex text-center items-center transition-colors
                        mx-auto gap-2 cursor-pointer'>
                           <FcGoogle size={30}/> Sign in with Google
                        </button>

                        <p className='text-center font-semibold pt-3'>
                            Don't have an account?
                            <Link className='text-secondary' to='/auth/register'>
                             Register
                            </Link>
                        </p>
                    </fieldset>
                </form>
            </div>
        </div>
    );
};

export default Login;