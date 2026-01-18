import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

export default function SignIn() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const { email, password } = form;

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("zoneUsers")) || {};
    const user = users[email];

    if (!user || user.password !== password) {
      setError("Invalid email or password.");
      return;
    }

    localStorage.setItem("zoneLoggedIn", "true");
    localStorage.setItem("zoneCurrentUser", email);

    navigate("/");
  };

  return (
    <div className="auth-page">
      <button className="back-button" onClick={() => navigate("/")}>
        ← Back
      </button>
      <h1>Sign In to Your ZONE</h1>

      {error && <p className="auth-error">{error}</p>}

      <form className="auth-form" onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={form.email}
            onChange={handleChange}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={form.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit" className="save-button">
          Sign In
        </button>
      </form>
    </div>
  );
}
