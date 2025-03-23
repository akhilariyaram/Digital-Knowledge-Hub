import React, { useState, useContext } from "react";
import { auth } from "../../../firebase/fire.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login_main = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Email Login

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    if (!email && !password) {
      setErrorMessage("Email and password are required fields.");
      return;
    } else if (!email) {
      setErrorMessage("Email is a required field.");
      return;
    } else if (!password) {
      setErrorMessage("Password is a required field.");
      return;

    } else if (!email.includes("@")) {
      setErrorMessage("Invalid email.");
      return;
    }
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('Login successful');
      console.log(user);
      setSuccessMessage('Login successful. Redirecting to Home...');

      setTimeout(() => {
        setSuccessMessage('');
        // Redirect to homepage
        window.location.href = '/';
      },);
    }
    catch (error) {
      if (error.message.includes("auth/user-not-found")) {
        setErrorMessage("User not found. Please sign up first.");
      } else if (error.message.includes("auth/wrong-password")) {
        setErrorMessage("Incorrect password. Please try again.");
      } else {
        setErrorMessage(error.message);
      }
    }
  };


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="bg-primary min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full px-6 py-8 bg-white shadow-md overflow-hidden rounded-md">
          <h2 className="text-2xl text-gray-800 font-bold mb-6">Login Page</h2>
          <form onSubmit={handleEmailLogin}>
            <div className="mb-4">
              <label htmlFor="email" className="text-gray-800 font-bold">
                Email:
              </label>
              <input
                type="email"
                id="email"
                className={`w-full px-3 py-2 mt-1 border rounded-md ${errorMessage && !email ? "border-red-500" : "border-gray-300"
                  }`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="text-gray-800 font-bold">
                Password:
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className={`w-full px-3 py-2 mt-1 border rounded-md ${errorMessage && !password ? "border-red-500" : "border-gray-300"
                    }`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 ${showPassword ? "visible" : ""
                    }`}
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <FontAwesomeIcon icon={faEyeSlash} />
                  ) : (
                    <FontAwesomeIcon icon={faEye} />
                  )}
                </span>
              </div>
            </div>
            {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
            {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
            <button
              type="submit"
              className="w-full px-4 py-2 rounded-md bg-green-500 text-white font-bold hover:bg-green-600"
            >
              Login
            </button>
          </form>

          {/* Google login */}
          {/* <button
            className="mt-4 w-full px-4 py-2 rounded-md bg-blue-500 text-white font-bold hover:bg-blue-600"
            onClick={handleGoogleLogin}
          >
            <img src={icon} alt="google icon" className="w-6 h-6 inline-block mr-2" />
            Google Login
          </button> */}
          <p className="mt-4 flex justify-center">
            Don't have an account?{" "}
            <a href="/signup" className="text-blue-500 hover:text-blue-600">
              Sign up
            </a>
          </p>

          {/* Mobile login
          <button
            className="mt-4 w-full px-4 py-2 rounded-md bg-gray-500 text-white font-bold hover:bg-gray-600"
            onClick={handleMobileLogin}
          >
            <FontAwesomeIcon icon={faMobile} className="mr-2" />
            Mobile Login
          </button> */}
        </div>
      </div>
    </>
  );
};

export default Login_main;
