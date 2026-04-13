import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ReCAPTCHA from "react-google-recaptcha";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [captcha, setCaptcha] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ captcha validation
    if (!captcha) {
      alert("Please verify captcha ❌");
      return;
    }

    try {
      await login(form.email, form.password, captcha); // ✅ pass captcha
      navigate("/dashboard");
    } catch (err) {
      alert("Login failed ❌");
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 px-4">

      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8">

        <h2 className="text-3xl font-bold text-center text-white mb-2">
          Welcome Back 👋
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
          <input
            type="email"
            required
            placeholder="Email"
            className="w-full p-3 rounded-xl bg-white/20 text-white"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              required
              placeholder="Password"
              className="w-full p-3 rounded-xl bg-white/20 text-white pr-10"
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-white cursor-pointer"
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          {/* ✅ CAPTCHA (CORRECT PLACEMENT) */}
          <div className="flex justify-right scale-75 origin-right">
  <ReCAPTCHA
    sitekey="6LfUgawsAAAAAMcmKVStxjN6HZBUpm1uBK5mxhT4"
    onChange={(value) => setCaptcha(value)}
  />
</div>

          {/* Button */}
          <button className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
            Login
          </button>
        </form>

        <p className="text-center text-gray-300 text-sm mt-6">
          Don’t have an account?{" "}
          <Link to="/register" className="text-indigo-400">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}