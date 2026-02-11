import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import JobMatches from "./pages/JobMatches";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/job-matches" element={<JobMatches />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}
