import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Signup: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Signup successful! Please login.");
        navigate("/signin");
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error("Signup Error:", error);
      setMessage("Error signing up. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
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

      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center mb-6">Signup</h2>
        {message && <p className="text-center mb-4 text-red-500">{message}</p>}
        <label className="block mb-2 text-gray-700">Email</label>
        <input
          type="email"
          className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="block mb-2 text-gray-700">Password</label>
        <input
          type="password"
          className="w-full mb-6 px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleSignup}
          className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors mb-4"
        >
          Signup
        </button>
        <p className="text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/signin" className="text-blue-500 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
