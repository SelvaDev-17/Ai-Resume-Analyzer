import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      // Use relative path to leverage Vite proxy
      const res = await axios.post("/api/token/", {
        username,
        password,
      });

      localStorage.setItem("token", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);
      window.location.href = "/upload";
    } catch (err) {
      alert("Login failed! Check credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-panel auth-container">
      <h2 className="text-center">Welcome Back</h2>
      <input
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={handleLogin} className="w-full" disabled={loading}>
        {loading ? <span className="loading-spinner"></span> : "Login"}
      </button>
      <p className="text-center mt-4">
        Don't have an account? <Link to="/register" style={{ color: "var(--primary-color)" }}>Register</Link>
      </p>
    </div>
  );
}

export default Login;
