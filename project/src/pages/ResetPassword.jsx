import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../Api/axios";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (form.password !== form.confirmPassword) {
      return setError("Passwords do not match ❌");
    }

    try {
      setLoading(true);
      setError("");

      await api.post(`/auth/reset-password/${token}`, {
        password: form.password,
      });

      setSuccess("Password updated successfully ✅");

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-green-900 to-teal-900 px-4">

      {/* Card */}
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8">

        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-white mb-2">
          Reset Password 🔑
        </h2>
        <p className="text-center text-gray-300 text-sm mb-6">
          Enter your new password below
        </p>

        {/* Error */}
        {error && (
          <div className="bg-red-500/20 text-red-300 p-3 rounded-xl text-sm mb-4 text-center">
            {error}
          </div>
        )}

        {/* Success */}
        {success && (
          <div className="bg-green-500/20 text-green-300 p-3 rounded-xl text-sm mb-4 text-center">
            {success}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              required
              className="peer w-full p-3 rounded-xl bg-white/20 text-white placeholder-transparent focus:outline-none"
              placeholder="Password"
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />
            <label className="absolute left-3 top-3 text-gray-300 text-sm transition-all 
              peer-placeholder-shown:top-3 peer-placeholder-shown:text-base 
              peer-focus:top-[-8px] peer-focus:text-xs peer-focus:text-green-300">
              New Password
            </label>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              required
              className="peer w-full p-3 rounded-xl bg-white/20 text-white placeholder-transparent focus:outline-none"
              placeholder="Confirm Password"
              onChange={(e) =>
                setForm({ ...form, confirmPassword: e.target.value })
              }
            />
            <label className="absolute left-3 top-3 text-gray-300 text-sm transition-all 
              peer-placeholder-shown:top-3 peer-placeholder-shown:text-base 
              peer-focus:top-[-8px] peer-focus:text-xs peer-focus:text-green-300">
              Confirm Password
            </label>
          </div>

          {/* Show Password Toggle */}
          <div className="text-right text-sm text-gray-300 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "Hide Password" : "Show Password"}
          </div>

          {/* Button */}
          <button
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-green-600 to-teal-600 
            hover:from-green-700 hover:to-teal-700 text-white font-semibold 
            transition-all duration-300 shadow-lg disabled:opacity-50"
          >
            {loading ? "Updating..." : "Reset Password"}
          </button>
        </form>

        {/* Back */}
        <p className="text-center text-gray-300 text-sm mt-6">
          Back to{" "}
          <Link to="/" className="text-green-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}