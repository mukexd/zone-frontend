import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const loggedIn = localStorage.getItem("zoneLoggedIn") === "true";

  return (
    <header className="header">
      <div className="logo" onClick={() => navigate("/")}>
        ZONE
        <span className="tagline">be in the zone, just for today</span>
      </div>

      <nav className="nav">
        <Link to="/">Help</Link>
        {loggedIn ? (
          <button
            className="logout-button"
            onClick={() => {
              localStorage.removeItem("zoneLoggedIn");
              navigate("/");
            }}
          >
            Log Out
          </button>
        ) : (
          <>
            <Link to="/sign-up">Sign Up</Link>
            <Link to="/sign-in">Sign In</Link>
          </>
        )}
        <Link to="/account">Your Account</Link>
      </nav>
    </header>
  );
}
