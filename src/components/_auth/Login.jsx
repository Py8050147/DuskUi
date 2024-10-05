import { useMutation } from "@tanstack/react-query";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../https/api";

const Login = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null); 
  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      console.log('User login successfully', response)
      navigate('/currentUser')
    },
    onError: (error) => {
      console.log('Login failed', error)
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const email = emailRef.current?.value
    const password = passwordRef.current?.value

    if (!email || !password) {
      return alert("Please fill out all fields");
    }
    mutation.mutate({ email, password });
  };

  return (
    <div className=" container max-w-full mx-auto py-32 flex align-middle justify-center ">
    <div className="max-w-md mx-auto p-6 ring-1 ring-gray-400 shadow-md shadow-gray-700 rounded-md">
      <div className="p-4 rounded-lg">
        <h2 className="text-center text-2xl font-bold mb-4 text-gray-300">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>

      <form className="flex gap-3 flex-col">
        <label className="input input-bordered flex items-center gap-2 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            type="email"
            className="grow"
              placeholder="Email"
              ref={emailRef}
            required
          />
        </label>

        <label className="input input-bordered flex items-center gap-2 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="password"
            className="grow"
            placeholder="Password"
            ref={passwordRef}
            required
          />
          </label>
          
          <h2 className="text-lg text-orange-300 text-right mb-2 underline underline-offset-auto active:text-orange-900 transform-cpu">
            <Link to={'/changePassword'}>Froget Password</Link>
          </h2>

        <button
            type="submit"
            onClick={handleSubmit}
          className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg"
        >
          Sign-in
        </button>
      </form>
      </div>
      </div>
  );
};

export default Login;
