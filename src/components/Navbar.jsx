import { useAuth } from "../context/AuthContext";

export default function Navbar({ onReset,onLogin, onSignup }) {
  const { token, logout } = useAuth();

  return (
    <nav className="flex justify-between items-center px-6 py-4">
      {/* LEFT LOGO */}
      <button
        onClick={onReset}
        className="text-white font-bold text-lg"
      >
        Resume Matcher
      </button>

      <div className="flex gap-4 text-sm items-center">
        <span className="text-emerald-300 cursor-pointer"></span>
        <span className="text-emerald-300 cursor-pointer"></span>
        <span className="text-emerald-300 cursor-pointer"></span>

        {!token ? (
          <>
            <button
              onClick={onLogin}
              className="text-emerald-300"
            >
              Login
            </button>
            <button
              onClick={onSignup}
              className="bg-emerald-500 text-white px-4 py-2 rounded-lg"
            >
              Signup
            </button>
          </>
        ) : (
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
