import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Email validation regex
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  async function handleLogin(e) {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setErrorMessage("");

    // Validate email format
    if (!email.trim()) {
      setErrorMessage("Email is required");
      setLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage("Please enter a valid email address");
      setLoading(false);
      return;
    }

    // Validate password
    if (!password.trim()) {
      setErrorMessage("Password is required");
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      setErrorMessage(error.message);
      setLoading(false);
      return;
    }

    setMessage("Login successful!");

    setTimeout(() => {
      navigate("/dashboard");
    }, 1000);

    setLoading(false);
  }

  return (
    <div className="auth-page">

      <div className="auth-card">

        <div className="auth-logo">
          Sports<span>Hub</span>
        </div>

        <h1>Welcome Back</h1>

        <p className="auth-subtitle">
          Login to your SportsHub account.
        </p>

        <form onSubmit={handleLogin}>

          <label>Email Address</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="remember-row">

            <label>
              <input type="checkbox" />
              Remember me
            </label>

            <a href="#">
              Forgot Password?
            </a>

          </div>

          <button
            type="submit"
            className="auth-button"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        {errorMessage && (
          <p className="auth-message" style={{ color: "#ff4757" }}>
            {errorMessage}
          </p>
        )}

        {message && (
          <p className="auth-message" style={{ color: "#2ed573" }}>
            {message}
          </p>
        )}

        <p className="auth-footer">
          Don't have an account?
          <Link to="/register"> Create Account</Link>
        </p>

        <Link to="/" className="back-home">
          ← Back to Home
        </Link>

      </div>

    </div>
  );
}

export default Login;
