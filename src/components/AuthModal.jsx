import { useState } from "react";
import { motion } from "framer-motion";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase";

const AuthModal = ({ setShowAuth }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(
          auth,
          user.email,
          user.password
        );
      } else {
        const userCredential =
          await createUserWithEmailAndPassword(
            auth,
            user.email,
            user.password
          );

        await updateProfile(userCredential.user, {
          displayName: user.name,
        });
      }

      if (isLogin) {
        setLoadingText("Welcome Back 👋");
      } else {
        setLoadingText("Welcome To MovieMax 🎬");
      }

      setAuthLoading(true);

      setTimeout(() => {
        setAuthLoading(false);
        setShowAuth(false);
      }, 2500);
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setErrorMsg("Email already registered. Please login.");
      } else if (error.code === "auth/invalid-credential") {
        setErrorMsg("Invalid email or password.");
      } else if (error.code === "auth/weak-password") {
        setErrorMsg("Password must be at least 6 characters.");
      } else {
        setErrorMsg(error.message);
      }
    }

    setLoading(false);
  };

  return (
    <>
      {authLoading && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black">
          <div className="flex flex-col items-center gap-6">

            <div className="h-24 w-24 animate-spin rounded-full border-4 border-zinc-700 border-t-red-500"></div>

            <h2 className="text-4xl font-black text-white">
              {loadingText}
            </h2>

            <p className="text-zinc-400">
              Preparing your cinema experience...
            </p>

          </div>
        </div>
      )}

      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 px-5 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="relative w-full max-w-md rounded-3xl border border-white/10 bg-zinc-950 p-8 text-white shadow-2xl shadow-purple-500/20"
        >
          <button
            onClick={() => setShowAuth(false)}
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-xl hover:bg-white hover:text-black"
          >
            ×
          </button>

          <h2 className="mb-2 text-3xl font-black">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>

          <p className="mb-6 text-sm text-gray-400">
            {isLogin
              ? "Login with your real Firebase account."
              : "Create your real Firebase account."}
          </p>

          <div className="mb-6 flex rounded-full bg-white/10 p-1">
            <button
              type="button"
              onClick={() => {
                setIsLogin(true);
                setErrorMsg("");
              }}
              className={`flex-1 rounded-full py-2 text-sm font-bold ${isLogin ? "bg-white text-black" : "text-gray-300"
                }`}
            >
              Login
            </button>

            <button
              type="button"
              onClick={() => {
                setIsLogin(false);
                setErrorMsg("");
              }}
              className={`flex-1 rounded-full py-2 text-sm font-bold ${!isLogin ? "bg-white text-black" : "text-gray-300"
                }`}
            >
              Sign Up
            </button>
          </div>

          {errorMsg && (
            <p className="mb-4 rounded-xl bg-red-500/20 p-3 text-sm text-red-300">
              {errorMsg}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <input
                type="text"
                placeholder="Full Name"
                value={user.name}
                onChange={(e) =>
                  setUser({ ...user, name: e.target.value })
                }
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none"
                required
              />
            )}

            <input
              type="email"
              placeholder="Email Address"
              value={user.email}
              onChange={(e) =>
                setUser({ ...user, email: e.target.value })
              }
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none"
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={user.password}
              onChange={(e) =>
                setUser({ ...user, password: e.target.value })
              }
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-purple-600 py-3 font-bold text-white hover:bg-purple-700"
            >
              {loading
                ? "Please wait..."
                : isLogin
                  ? "Login"
                  : "Create Account"}
            </button>
          </form>
        </motion.div>
      </div>
    </>
  )
};
export default AuthModal;