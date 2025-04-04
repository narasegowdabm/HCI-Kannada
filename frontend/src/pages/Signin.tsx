import React, { useState } from "react";
import { saveUserToLocal } from "../utils/localStorage";
import { useNavigate, Link } from "react-router-dom";

const Signin: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSignin = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        saveUserToLocal(data.user);
        setMessage("Login successful!");
        navigate("/home");
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error("Signin Error:", error);
      setMessage("Error signing in. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        
        {/* Centered Logo */}
        <div className="flex justify-center mb-6">
          <Link to="/" className="flex flex-col items-center space-y-2">
            <div className="rounded-full bg-kid-blue p-4">
              <span className="text-white font-bold text-2xl">ಕ</span>
            </div>
            <span className="font-comic text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-kid-blue to-kid-purple">
              Kannada ಕಲಿ
            </span>
          </Link>
        </div>

        <h2 className="text-3xl font-bold text-center mb-6">Sign In</h2>
        {message && <p className="text-center mb-4 text-red-500">{message}</p>}
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        
        <button
          onClick={handleSignin}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Login
        </button>

        <p className="text-center text-gray-600 mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
