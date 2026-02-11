import Navbar from "../components/Navbar";
import { useMatch } from "../context/MatchContext";

export default function JobMatches() {
  const { matchResult } = useMatch();

  if (!matchResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#071016] to-[#020617] text-white">
        <Navbar />
        <div className="mt-40 text-center">
          <h2 className="text-xl">
            No match data available.  
            Please run Resume Match first.
          </h2>
        </div>
      </div>
    );
  }

  const {
    matched_skills = [],
    missing_skills = [],
    recommendations = {},
  } = matchResult;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#071016] to-[#020617] text-white">
      <Navbar />

      <div className="max-w-3xl mx-auto mt-20 space-y-8 px-4">

        <h1 className="text-3xl font-bold text-center">
          Job Match Insights 🎯
        </h1>

        {/* MATCHED SKILLS */}
        <div className="bg-white text-black rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-3">
            ✅ Matched Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {matched_skills.map((skill, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* MISSING SKILLS */}
        <div className="bg-white text-black rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-3">
            ❌ Missing Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {missing_skills.map((skill, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* RECOMMENDATIONS */}
        <div className="bg-white text-black rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">
            📘 Skill Recommendations
          </h2>

          {Object.entries(recommendations).map(([skill, info], i) => (
            <div
              key={i}
              className="mb-4 p-4 border rounded-lg bg-gray-50"
            >
              <h3 className="font-medium text-lg capitalize">
                {skill}
              </h3>
              <p className="text-sm text-gray-700 mt-1">
                <b>Why:</b> {info.why}
              </p>
              <p className="text-sm text-emerald-700 mt-1">
                <b>Learn:</b> {info.learn}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
