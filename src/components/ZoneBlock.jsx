import { useNavigate } from "react-router-dom";

export default function ZoneBlock({ title, page }) {
  const navigate = useNavigate();

  return (
    <div
      className="block"
      onClick={() => navigate(page)}
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && navigate(page)}
    >
      <span className="block-text">{title}</span>
    </div>
  );
}