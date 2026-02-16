import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Upload from "./pages/Upload";
import Results from "./pages/Results";
import History from "./pages/History";
import JobDescription from "./pages/JobDescription";
import "./index.css";

function App() {
  return (
    <Router>
      <div className="nav-bar">
        <h1 style={{ fontSize: "1.5rem", margin: 0, background: "linear-gradient(to right, #dc2626, #f87171)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          AI Resume Analyzer
        </h1>
        <div className="nav-links">
          <Link to="/upload">Upload</Link>
          <Link to="/job-description">Job Description</Link>
          <Link to="/results">Results</Link>
          <Link to="/">Login</Link>
        </div>
      </div>

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
