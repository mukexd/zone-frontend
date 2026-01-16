import { useNavigate } from "react-router-dom";
import "./Auth.css"; // shared styles for Sign In / Sign Up

export default function SignUp() {
  const navigate = useNavigate();

  return (
    <div className="auth-page">
      <button className="back-button" onClick={() => navigate("/")}>← Back</button>
      <h1>Create Your ZONE Account</h1>

      <form className="auth-form">
        <label>
          First Name
          <input type="text" placeholder="Enter first name" />
        </label>
        <label>
          Last Name
          <input type="text" placeholder="Enter last name" />
        </label>
        <label>
          Nickname (optional)
          <input type="text" placeholder="Enter nickname" />
        </label>
        <label>
          Email
          <input type="email" placeholder="Enter email" />
        </label>
        <label>
          Password
          <input type="password" placeholder="Minimum 8 characters" />
        </label>
        <button type="submit" className="save-button">Sign Up</button>
      </form>
    </div>
  );
}
