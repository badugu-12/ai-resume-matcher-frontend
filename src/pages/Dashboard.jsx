import { useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import LoginModal from "../components/LoginModal";
import SignupModal from "../components/SignupModal";
import { useMatch } from "../context/MatchContext";

export default function Dashboard() {
  const [resume, setResume] = useState(null);
  const [jobDesc, setJobDesc] = useState("");
  const [loading, setLoading] = useState(false);

  const [resetKey, setResetKey] = useState(0);

  const { matchResult, setMatchResult, resetMatch } = useMatch();


  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  /* ===========================
     MATCH RESUME
  ============================ */
  const submitForm = async () => {
    if (!resume || !jobDesc) {
      alert("Upload resume & job description");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("job_description", jobDesc);

    try {
      setLoading(true);
      const res = await api.post("/match", formData);
      setMatchResult(res.data); // ✅ SINGLE SOURCE OF TRUTH
    } catch (err) {
      alert(err.response?.data?.detail || "Match failed");
    } finally {
      setLoading(false);
    }
  };

     /* ===========================
     🔥 FORCE RESET (MAGIC)
  ============================ */
  const handleReset = () => {
    resetMatch();              // clear context
    setResume(null);
    setJobDesc("");
    setResetKey(prev => prev + 1); // 🔥 force remount
  };


  return (
    <div 
    key={resetKey}
    className="min-h-screen bg-gradient-to-br from-[#071016] to-[#020617]"
    >
      
      <Navbar
        onLogin={() => setShowLogin(true)}
        onSignup={() => setShowSignup(true)}
      />

      <div className="flex flex-col items-center mt-20 px-4">
        {/* ===========================
            HEADER
        ============================ */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white">
            Resume Matcher
          </h1>
          <p className="text-emerald-300 mt-1">
            Smart ATS-friendly resume & job matching
          </p>
        </div>

        {/* ===========================
            UPLOAD CARD
        ============================ */}
        <div className="bg-white rounded-2xl p-8 w-full max-w-xl shadow-xl">
          <input
            type="file"
            onChange={(e) => setResume(e.target.files[0])}
          />

          <textarea
            className="w-full border rounded-lg p-3 mt-4"
            rows="5"
            placeholder="Paste job description..."
            value={jobDesc}
            onChange={(e) => setJobDesc(e.target.value)}
          />

          <button
            onClick={submitForm}
            className="mt-6 w-full py-3 rounded-lg bg-emerald-500 text-white font-semibold"
          >
            {loading ? "Matching..." : "Match Resume"}
          </button>

          {matchResult && (
            <button
              onClick={handleReset}
              className="mt-3 w-full py-2 rounded-lg bg-gray-200 text-gray-800 font-semibold"
            >
              Reset & Match Another Job
            </button>
          )}

        </div>

        {/* ===========================
            RESULTS
        ============================ */}
        {matchResult && (
          <div className="mt-8 space-y-6 w-full max-w-xl">

            {/* MATCH SCORE */}
            <div className="bg-white rounded-xl p-5 shadow">
              <h2 className="text-lg font-semibold mb-2">
                Match Score
              </h2>

              <div className="flex items-center gap-4">
                <div className="text-3xl font-bold text-emerald-600">
                  {matchResult.match_percentage}%
                </div>

                <div className="flex-1 h-3 bg-gray-200 rounded-full">
                  <div
                    className="h-3 bg-emerald-500 rounded-full"
                    style={{ width: `${matchResult.match_percentage}%` }}
                  />
                </div>
              </div>
            </div>

            {/* MATCHED SKILLS */}
            {matchResult.matched_skills?.length > 0 && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-emerald-800 mb-3">
                  ✅ Matched Skills
                </h3>

                <div className="flex flex-wrap gap-2">
                  {matchResult.matched_skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-emerald-200 text-emerald-900 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* MISSING SKILLS */}
            {matchResult.missing_skills?.length > 0 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-yellow-800 mb-3">
                  ⚠️ Missing Skills (Recommended to Learn)
                </h3>

                <div className="flex flex-wrap gap-2">
                  {matchResult.missing_skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-yellow-200 text-yellow-900 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* ATS SCORE */}
            {matchResult.ats_score && (
              <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-indigo-800 mb-2">
                  ATS Resume Quality Score
                </h3>

                <p className="text-3xl font-bold text-indigo-600 mb-3">
                  {matchResult.ats_score.score}/100
                </p>

                <ul className="text-sm space-y-1">
                  <li>Formatting: {matchResult.ats_score.breakdown.formatting}/20</li>
                  <li>Skill Density: {matchResult.ats_score.breakdown.skill_density}/30</li>
                  <li>Action Verbs: {matchResult.ats_score.breakdown.action_verbs}/20</li>
                  <li>Length: {matchResult.ats_score.breakdown.length}/15</li>
                  <li>Sections: {matchResult.ats_score.breakdown.sections}/15</li>
                </ul>
              </div>
            )}

            {/* RESUME FEEDBACK */}
            {matchResult.resume_feedback?.length > 0 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-yellow-800 mb-3">
                  Resume Improvement Suggestions ✨
                </h3>

                {matchResult.resume_feedback.map((item, i) => (
                  <div key={i} className="mb-4">
                    <h4 className="font-semibold text-gray-800">
                      ⚠ {item.title}
                    </h4>
                    <p className="text-sm text-gray-700">
                      {item.message}
                    </p>
                    {item.example && (
                      <p className="text-sm text-green-700 italic">
                        Example: {item.example}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* JOB RECOMMENDATIONS */}
            {matchResult.job_recommendations?.length > 0 && (
              <div className="bg-white border rounded-xl p-5 shadow">
                <h3 className="text-lg font-semibold mb-4">
                  🎯 Job Positions You Can Apply For
                </h3>

                <div className="space-y-4">
                  {matchResult.job_recommendations.map((job, i) => (
                    <div
                      key={i}
                      className="border rounded-lg p-4 hover:shadow transition"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold text-gray-800">
                          {job.job_title}
                        </h4>
                        <span className="text-sm font-bold text-emerald-600">
                          {job.match_percentage}%
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {job.matched_skills.map((skill, j) => (
                          <span
                            key={j}
                            className="px-2 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}
      </div>

      {/* AUTH MODALS */}
      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onSuccess={() => setShowLogin(false)}
        />
      )}
      {showSignup && (
        <SignupModal
          onClose={() => setShowSignup(false)}
          onSuccess={() => {
            setShowSignup(false);
            setShowLogin(true);
          }}
        />
      )}
    </div>
  );
}
