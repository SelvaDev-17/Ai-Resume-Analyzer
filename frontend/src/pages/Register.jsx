import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    setLoading(true);
    try {
      // Use relative path to leverage Vite proxy
      await axios.post("/api/register/", {
        username,
        email,
        password,
      });
      alert("Registration successful! Please login.");
      navigate("/");
    } catch (err) {
      console.error(err);
      let errorMessage = "Registration failed!";
      if (err.response?.data) {
        // Django DRF returns errors as object: { field: [error1, error2] }
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
    <div className="glass-panel" style={{ maxWidth: "400px", margin: "40px auto" }}>
      <h2 className="text-center">Create Account</h2>
      <input
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <input
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={handleRegister} className="w-full" disabled={loading}>
        {loading ? <span className="loading-spinner"></span> : "Register"}
      </button>
      <p className="text-center mt-4">
        Already have an account? <Link to="/" style={{ color: "var(--primary-color)" }}>Login</Link>
      </p>
    </div>
  );
}

export default Register;
