import { useNavigate } from "react-router-dom";
import "./Auth.css";

export default function SignIn() {
  const navigate = useNavigate();

  return (
    <div className="auth-page">
      <button className="back-button" onClick={() => navigate("/")}>← Back</button>
      <h1>Sign In to Your ZONE</h1>

      <form className="auth-form">
        <label>
          Email
          <input type="email" placeholder="Enter email" />
        </label>
        <label>
          Password
          <input type="password" placeholder="Enter password" />
        </label>
        <button type="submit" className="save-button">Sign In</button>
      </form>
    </div>
  );
}
