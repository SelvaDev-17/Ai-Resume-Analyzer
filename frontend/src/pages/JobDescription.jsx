import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function JobDescription() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Please login first.");
            return;
        }

        setLoading(true);
        try {
            const res = await axios.post(
                "/api/job-description/",
                { title, description_text: description },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            localStorage.setItem("current_jd_id", res.data.id);
            navigate("/results");

        } catch (err) {
            alert("Error saving Job Description: " + (err.response?.data?.message || err.message));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="glass-panel" style={{ maxWidth: "800px", margin: "40px auto" }}>
            <h2 className="text-center">Job Description</h2>
            <div>
                <input
                    placeholder="Job Title (e.g. Software Engineer)"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <textarea
                    placeholder="Paste the Job Description here..."
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    style={{ height: "200px", resize: "vertical" }}
                />
                <button onClick={handleSubmit} className="w-full" disabled={loading}>
                    {loading ? <span className="loading-spinner"></span> : "Analyze Resumes"}
                </button>
            </div>
        </div>
    );
}

export default JobDescription;
