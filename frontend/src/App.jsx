import { HashRouter as Router, Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Upload from "./pages/Upload";
import Results from "./pages/Results";
import History from "./pages/History";
import JobDescription from "./pages/JobDescription";
import "./index.css";
import api from "./api";

function Navigation() {
  const navigate = useNavigate();
  const location = useLocation(); // Hook to trigger re-render on route change
  const token = localStorage.getItem("token");

  const handleLogout = async () => {
    try {
      if (token) {
        await api.post("/api/logout/", {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
    } catch (err) {
      console.error("Logout error", err);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("refresh");
      navigate("/");
    }
  };

  return (
    <div className="nav-bar">
      <h1 className="gradient-title">
        AI Resume Analyzer
      </h1>
      <div className="nav-links">
        {token ? (
          <>
            <Link to="/upload">Upload</Link>
            <Link to="/job-description">Job Description</Link>
            <Link to="/results">Results</Link>
            <button onClick={handleLogout} style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', fontSize: '1rem', fontFamily: 'inherit' }}>Logout</button>
          </>
        ) : (
          <Link to="/">Login</Link>
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Navigation />

      <div className="container">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/job-description" element={<JobDescription />} />
          <Route path="/results" element={<Results />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
