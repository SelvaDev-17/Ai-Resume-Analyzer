import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

function Upload() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first.");
      return;
    }

    const formData = new FormData();
    // Backend expects 'resume_file' based on Serializer
    formData.append("resume_file", file);

    setLoading(true);
    try {
      await api.post("/api/resume/upload/", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        },
      });
      alert("Resume uploaded successfully!");
      navigate("/job-description");
    } catch (err) {
      console.error(err);
      let errorMessage = "Upload failed!";
      if (err.response?.data) {
        errorMessage = Object.entries(err.response.data)
          .map(([key, val]) => `${key}: ${val}`)
          .join("\n");
      } else if (err.message) {
        errorMessage = err.message;
      }
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-panel" style={{ maxWidth: "500px", margin: "40px auto" }}>
      <h2 className="text-center">Upload Resume</h2>
      <div style={{ border: "2px dashed var(--glass-border)", padding: "2rem", borderRadius: "8px", textAlign: "center", marginBottom: "1rem" }}>
        <input
          type="file"
          accept=".pdf"
          onChange={e => setFile(e.target.files[0])}
          style={{ display: "none" }}
          id="file-upload"
        />
        <label htmlFor="file-upload" style={{ cursor: "pointer", display: "block" }}>
          {file ? file.name : "Click to select PDF Resume"}
        </label>
      </div>
      <button onClick={handleUpload} className="w-full" disabled={loading}>
        {loading ? <span className="loading-spinner"></span> : "Upload & Continue"}
      </button>
    </div>
  );
}

export default Upload;
