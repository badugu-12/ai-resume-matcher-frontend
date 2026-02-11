import { useState } from "react";
import api from "../api/axios";

export default function SignupModal({ onClose, onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!email || !password) {
      alert("All fields required");
      return;
    }

    if (password !== confirm) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      await api.post("/signup", { email, password });
      alert("Signup successful! Please login.");
      onSuccess(); // open login modal
    } catch (err) {
      alert(err.response?.data?.detail || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Create Account
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded-lg mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded-lg mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full border p-3 rounded-lg mb-4"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />

        <div className="flex justify-between items-center">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            Cancel
          </button>

          <button
            onClick={handleSignup}
            disabled={loading}
            className="
              px-5 py-2 rounded-lg text-white font-medium
              bg-gradient-to-r from-emerald-500 to-teal-500
              hover:opacity-90 disabled:opacity-50
            "
          >
            {loading ? "Creating..." : "Signup"}
          </button>
        </div>
      </div>
    </div>
  );
}
