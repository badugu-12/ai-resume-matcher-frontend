import { useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function LoginModal({ onClose, onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      const res = await api.post("/login", {
        email,
        password, // ✅ JSON BODY
      });

      login(res.data.access_token);
      onSuccess();
    } catch (err) {
      alert(
        err.response?.data?.detail || "Login failed"
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-96">
        <h2 className="text-xl font-bold mb-4">Login</h2>

        <input
          className="w-full border p-2 mb-3 rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full border p-2 mb-4 rounded"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-emerald-500 text-white py-2 rounded"
        >
          Login
        </button>

        <button
          onClick={onClose}
          className="w-full mt-2 text-sm text-gray-500"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
