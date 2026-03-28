import { useState } from "react";
import useLogin from "../hooks/useLogin";
import "../styles/LoginPage.css"

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const login = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous errors

    try {
      await login(username, password);
    } catch (err) {
      setError("Invalid username or password. Please try again.");
    }
  };

  return (
    <div className="login">
      <div className="login__card">
        <h1 className="login__title">Admin Login</h1>
        <p className="login__subtitle">Sign in to your account</p>

        <form onSubmit={handleSubmit} className="login__form">
          {error && <div className="login__error">{error}</div>}

          <div className="login__field">
            <label htmlFor="username" className="login__label">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="login__field">
            <label htmlFor="password" className="login__label">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit">Sign In</button>
        </form>
      </div>
    </div>
  );
}
