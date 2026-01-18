import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const loggedIn = localStorage.getItem("zoneLoggedIn") === "true";

  const handleLogoClick = () => navigate("/");

  const handleLogout = () => {
    localStorage.setItem("zoneLoggedIn", "false");
    localStorage.removeItem("zoneCurrentUser");
    navigate("/");
  };

  return (
    <header className="header">
      <div className="logo" onClick={handleLogoClick}>
        ZONE
        <span className="tagline">be in the zone, just for today</span>
      </div>

      <nav className="nav">
        <Link to="/">Help</Link>

        {!loggedIn && (
          <>
            <Link to="/sign-up">Sign Up</Link>
            <Link to="/sign-in">Sign In</Link>
          </>
        )}

        {loggedIn && (
          <>
            <Link to="/account">Your Account</Link>
            <button className="logout-button" onClick={handleLogout}>
              Log Out
            </button>
          </>
        )}
      </nav>
    </header>
  );
}
