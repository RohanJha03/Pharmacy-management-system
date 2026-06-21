import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Mail,
  Phone,
  Eye,
  EyeOff,
} from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

function Login() {
  const { login, guestLogin } = useAuth();
  const navigate = useNavigate();

  const handleGuestLogin = () => {
    guestLogin();
    toast.success("Logged in as Guest! 🚀");
    navigate("/dashboard/medicines", { replace: true });
  };

  const [input, setInput] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "forest");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!input.trim() || !password.trim()) {
      return toast.error("All fields are required ❌");
    }

    try {
      setLoading(true);

      const credentials = input.includes("@")
        ? { email: input.trim(), password }
        : { phone: input.trim(), password };

      const response = await login(credentials);
      toast.success(response.message);

      navigate("/dashboard", { replace: true });
    } catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data?.message ||
        error?.message ||
        "Login Failed ❌"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-[#08221c] overflow-hidden px-4 font-sans">
      {/* Background blobs for premium glassmorphism feel */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-green-500/20 to-teal-500/20 blur-[120px] pointer-events-none animate-pulse duration-[8000ms]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-emerald-500/20 to-cyan-500/20 blur-[120px] pointer-events-none animate-pulse duration-[6000ms]" />

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/[0.06] backdrop-blur-xl border border-white/[0.08] shadow-2xl rounded-3xl p-8 space-y-6 relative z-10 transition-all duration-300 hover:border-white/[0.15]"
      >
        {/* Logo / Header */}
        <div className="text-center space-y-2">
          <div className="mx-auto w-14 h-14 bg-gradient-to-tr from-green-400 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/20 transition-transform duration-300 hover:scale-110">
            <svg width="28" height="28" viewBox="0 0 24 24" className="text-white">
              <rect x="9" y="3" width="6" height="18" rx="3" fill="currentColor" />
              <rect x="3" y="9" width="18" height="6" rx="3" fill="currentColor" />
            </svg>
          </div>
          <h2 className="text-3xl font-extrabold bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent tracking-tight">
            New Drug
          </h2>
          <p className="text-xs text-gray-400 font-medium">Welcome back! Please enter your details.</p>
        </div>

        <div className="space-y-4">
          {/* Email / Phone */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-300 tracking-wider uppercase pl-1">Email or Phone</label>
            <div className="relative group">
              {input.includes("@") ? (
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-400 transition-colors"
                  size={18}
                />
              ) : (
                <Phone
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-400 transition-colors"
                  size={18}
                />
              )}

              <input
                type="text"
                placeholder="email@example.com or 9876543210"
                className="w-full bg-white/[0.04] border border-white/[0.08] focus:border-green-500/50 rounded-2xl py-3.5 pl-11 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-green-500/10 transition-all duration-200"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1">
            <div className="flex justify-between items-center pl-1">
              <label className="text-xs font-semibold text-gray-300 tracking-wider uppercase">Password</label>
              <button
                type="button"
                onClick={() => navigate("/forgot-password")}
                className="text-xs text-green-400 hover:text-green-300 font-medium hover:underline transition-colors"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative group">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full bg-white/[0.04] border border-white/[0.08] focus:border-green-500/50 rounded-2xl py-3.5 pl-4 pr-11 text-white placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-green-500/10 transition-all duration-200"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-3 pt-2">
          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full relative group overflow-hidden bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-400 hover:to-teal-400 text-white font-bold py-3.5 px-6 rounded-2xl shadow-lg shadow-green-500/20 hover:shadow-green-500/35 transition-all duration-300 transform active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Logging in...
              </span>
            ) : (
              "Sign In"
            )}
          </button>

          {/* Guest Login Button */}
          <button
            type="button"
            onClick={handleGuestLogin}
            className="w-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] hover:border-white/[0.2] text-white font-semibold py-3.5 px-6 rounded-2xl transition-all duration-200 transform active:scale-[0.98]"
          >
            Continue as Guest
          </button>
        </div>

        {/* Signup Redirect */}
        <div className="text-center text-sm pt-2 text-gray-400">
          <span>Don't have an account? </span>
          <button
            type="button"
            onClick={() => navigate("/signup")}
            className="text-green-400 hover:text-green-300 font-semibold hover:underline transition-colors"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;