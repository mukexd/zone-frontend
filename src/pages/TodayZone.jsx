import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function TodayZone() {
  const navigate = useNavigate();

  const [hours, setHours] = useState([]);
  const [notes, setNotes] = useState({});

  useEffect(() => {
    // Generate hours from current hour → 23:00
    const now = new Date();
    const currentHour = now.getHours();
    const tempHours = [];
    for (let h = currentHour; h <= 23; h++) {
      tempHours.push(`${h}:00 - ${h + 1}:00`);
    }
    setHours(tempHours);

    // Load notes from localStorage
    const savedNotes = JSON.parse(localStorage.getItem("zone-today-notes")) || {};
    setNotes(savedNotes);
  }, []);

  const handleNoteChange = (hour, value) => {
    const updatedNotes = { ...notes, [hour]: value };
    setNotes(updatedNotes);
    localStorage.setItem("zone-today-notes", JSON.stringify(updatedNotes));
  };

  return (
    <div className="page">
      <button className="back-button" onClick={() => navigate("/")}>
        ← Back
      </button>

      <h1>YOUR ZONE TODAY</h1>
      <div className="today-zone-container">
        {hours.map((hour) => (
          <div key={hour} className="hour-block">
            <span className="hour-label">{hour}</span>
            <textarea
              className="hour-note"
              placeholder="Write your task..."
              value={notes[hour] || ""}
              onChange={(e) => handleNoteChange(hour, e.target.value)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}