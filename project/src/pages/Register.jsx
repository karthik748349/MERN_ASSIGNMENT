import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
  e.preventDefault();

  await register(form);   // 🔥 sends data to backend

  navigate("/");          // go to login
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 px-4">
      
      {/* Card */}
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8">
        
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-white mb-2">
          Create Account 🚀
        </h2>
        <p className="text-center text-gray-300 mb-6 text-sm">
          Start your journey with us
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name */}
          <div className="relative">
            <input
              type="text"
              required
              className="peer w-full p-3 rounded-xl bg-white/20 text-white placeholder-transparent focus:outline-none"
              placeholder="Name"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <label className="absolute left-3 top-3 text-gray-300 text-sm transition-all 
              peer-placeholder-shown:top-3 peer-placeholder-shown:text-base 
              peer-focus:top-[-8px] peer-focus:text-xs peer-focus:text-purple-300">
              Full Name
            </label>
          </div>

          {/* Email */}
          <div className="relative">
            <input
              type="email"
              required
              className="peer w-full p-3 rounded-xl bg-white/20 text-white placeholder-transparent focus:outline-none"
              placeholder="Email"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <label className="absolute left-3 top-3 text-gray-300 text-sm transition-all 
              peer-placeholder-shown:top-3 peer-placeholder-shown:text-base 
              peer-focus:top-[-8px] peer-focus:text-xs peer-focus:text-purple-300">
              Email Address
            </label>
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type="password"
              required
              className="peer w-full p-3 rounded-xl bg-white/20 text-white placeholder-transparent focus:outline-none"
              placeholder="Password"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <label className="absolute left-3 top-3 text-gray-300 text-sm transition-all 
              peer-placeholder-shown:top-3 peer-placeholder-shown:text-base 
              peer-focus:top-[-8px] peer-focus:text-xs peer-focus:text-purple-300">
              Password
            </label>
          </div>

          {/* Button */}
          <button
            className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 
            hover:from-purple-700 hover:to-indigo-700 text-white font-semibold transition-all duration-300 shadow-lg"
          >
            Register
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-[1px] bg-gray-400"></div>
          <span className="text-gray-300 text-sm">OR</span>
          <div className="flex-1 h-[1px] bg-gray-400"></div>
        </div>

        {/* Login Link */}
        <p className="text-center text-gray-300 text-sm">
          Already have an account?{" "}
          <Link to="/" className="text-purple-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}