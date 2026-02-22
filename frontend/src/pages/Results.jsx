import { useState, useEffect } from "react";
import api from "../api";

function Results() {
  const [resumes, setResumes] = useState([]);
  const [selectedResume, setSelectedResume] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await api.get("/api/resumes/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setResumes(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAnalyze = async (resumeId) => {
    const token = localStorage.getItem("token");
    const jdId = localStorage.getItem("current_jd_id");

    if (!jdId) {
      alert("No Job Description selected. Please go back.");
      return;
    }

    setLoading(true);
    setSelectedResume(resumeId);

    try {
      const res = await api.post(
        "/api/analyze/",
        { resume_id: resumeId, job_desc_id: jdId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAnalysis(res.data);
    } catch (err) {
      alert("Analysis failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", gap: "2rem", alignItems: "start" }}>
      {/* List of Resumes */}
      <div className="glass-panel" style={{ flex: 1 }}>
        <h3>Your Resumes</h3>
        {resumes.length === 0 && <p className="text-secondary">No resumes uploaded yet.</p>}

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {resumes.map(resume => (
            <div key={resume.id} style={{
              padding: "1rem",
              background: selectedResume === resume.id ? "rgba(59, 130, 246, 0.1)" : "rgba(255,255,255,0.05)",
              borderRadius: "8px",
              border: selectedResume === resume.id ? "1px solid var(--primary-color)" : "1px solid transparent"
            }}>
              <p style={{ margin: "0 0 0.5rem 0", fontSize: "0.9rem" }}>
                Uploaded: {new Date(resume.uploaded_at).toLocaleDateString()}
              </p>
              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  onClick={() => handleAnalyze(resume.id)}
                  disabled={loading}
                  style={{ flex: 1, padding: "0.5rem", fontSize: "0.9rem" }}
                >
                  {loading && selectedResume === resume.id ? "Analyzing..." : "Analyze"}
                </button>
                <a
                  href={resume.resume_file}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    padding: "0.5rem 1rem",
                    border: "1px solid var(--glass-border)",
                    borderRadius: "8px",
                    color: "var(--text-color)",
                    textDecoration: "none",
                    fontSize: "0.9rem",
                    display: "flex",
                    alignItems: "center"
                  }}
                >
                  PDF
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Analysis Output */}
      <div className="glass-panel" style={{ flex: 2 }}>
        {analysis ? (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <h2 style={{ margin: 0 }}>Match Score</h2>
              <div style={{
                fontSize: "2rem",
                fontWeight: "bold",
                color: analysis.match_score > 70 ? "var(--success-color)" : (analysis.match_score > 40 ? "orange" : "var(--error-color)")
              }}>
                {analysis.match_score}%
              </div>
            </div>

            <div style={{ background: "rgba(255,255,255,0.05)", padding: "1rem", borderRadius: "8px", marginBottom: "1.5rem" }}>
              <strong>Suggestion:</strong> {analysis.suggestions}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
              <div>
                <h4 style={{ color: "var(--success-color)", borderBottom: "1px solid rgba(16, 185, 129, 0.3)", paddingBottom: "0.5rem" }}>Matched Skills</h4>
                <ul style={{ paddingLeft: "1.2rem", marginTop: "0.5rem" }}>
                  {analysis.matched_skills && analysis.matched_skills.split(',').filter(Boolean).map((word, i) => (
                    <li key={i}>{word}</li>
                  ))}
                  {(!analysis.matched_skills || analysis.matched_skills.length === 0) && <li>None</li>}
                </ul>
              </div>
              <div>
                <h4 style={{ color: "var(--error-color)", borderBottom: "1px solid rgba(239, 68, 68, 0.3)", paddingBottom: "0.5rem" }}>Missing Skills</h4>
                <ul style={{ paddingLeft: "1.2rem", marginTop: "0.5rem" }}>
                  {analysis.missing_skills && analysis.missing_skills.split(',').filter(Boolean).map((word, i) => (
                    <li key={i}>{word}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "3rem", color: "var(--secondary-color)" }}>
            <p>Select a resume from the left to analyze it against the Job Description.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Results;
