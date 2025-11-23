import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
      navigate("/");
    } catch (err) {
      alert("Login Failed!");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>🎓 Alumni Portal Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email Address</label>
            <input className="form-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input className="form-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button className="btn-primary" type="submit">Sign In</button>
        </form>
        <div className="auth-link">
          New User? <Link to="/register">Create an Account</Link>
        </div>
      </div>
    </div>
  );
}