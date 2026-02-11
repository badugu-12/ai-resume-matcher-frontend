import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { token } = useAuth();

  return (
    <div className="min-h-screen bg-[#071016] p-10 text-white">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>

      <p className="text-gray-300">
        Logged in: {token ? "Yes" : "No"}
      </p>

      <p className="mt-2 text-sm text-gray-400">
        (Later: email, resume history, ATS averages)
      </p>
    </div>
  );
}
