import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../Api/axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await api.post("/auth/forgot-password", { email });
      setSuccess("Reset link sent to your email 📩");
    } catch (err) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 px-4">

      {/* Card */}
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8">

        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-white mb-2">
          Forgot Password 🔐
        </h2>
        <p className="text-center text-gray-300 text-sm mb-6">
          Enter your email to receive reset link
        </p>

        {/* Success Message */}
        {success && (
          <div className="bg-green-500/20 text-green-300 p-3 rounded-xl text-sm mb-4 text-center">
            {success}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email Field */}
          <div className="relative">
            <input
              type="email"
              required
              className="peer w-full p-3 rounded-xl bg-white/20 text-white placeholder-transparent focus:outline-none"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="absolute left-3 top-3 text-gray-300 text-sm transition-all 
              peer-placeholder-shown:top-3 peer-placeholder-shown:text-base 
              peer-focus:top-[-8px] peer-focus:text-xs peer-focus:text-blue-300">
              Email Address
            </label>
          </div>

          {/* Button */}
          <button
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 
            hover:from-blue-700 hover:to-indigo-700 text-white font-semibold 
            transition-all duration-300 shadow-lg disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        {/* Back to Login */}
        <p className="text-center text-gray-300 text-sm mt-6">
          Remember your password?{" "}
          <Link to="/" className="text-blue-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}