import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css"; // shared styles for Sign In / Sign Up

export default function SignUp() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    nickName: "",
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

    const { firstName, lastName, email, password } = form;

    if (!firstName.trim() || !lastName.trim() || !email.trim() || !password) {
      setError("Please fill all required fields.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    const existingUsers =
      JSON.parse(localStorage.getItem("zoneUsers")) || {};
    if (existingUsers[email]) {
      setError("An account with this email already exists.");
      return;
    }

    const newUser = {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      nickName: form.nickName.trim(),
      email: form.email.trim(),
      password: form.password, // plain for prototype
    };

    const updatedUsers = { ...existingUsers, [email]: newUser };
    localStorage.setItem("zoneUsers", JSON.stringify(updatedUsers));

    localStorage.setItem("zoneLoggedIn", "true");
    localStorage.setItem("zoneCurrentUser", email);

    navigate("/");
  };

  return (
    <div className="auth-page">
      <button className="back-button" onClick={() => navigate("/")}>
        ← Back
      </button>
      <h1>Create Your ZONE Account</h1>

      {error && <p className="auth-error">{error}</p>}

      <form className="auth-form" onSubmit={handleSubmit}>
        <label>
          First Name
          <input
            type="text"
            name="firstName"
            placeholder="Enter first name"
            value={form.firstName}
            onChange={handleChange}
          />
        </label>
        <label>
          Last Name
          <input
            type="text"
            name="lastName"
            placeholder="Enter last name"
            value={form.lastName}
            onChange={handleChange}
          />
        </label>
        <label>
          Nickname (optional)
          <input
            type="text"
            name="nickName"
            placeholder="Enter nickname"
            value={form.nickName}
            onChange={handleChange}
          />
        </label>
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
            placeholder="Minimum 8 characters"
            value={form.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit" className="save-button">
          Sign Up
        </button>
      </form>
    </div>
  );
}
