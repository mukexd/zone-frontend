import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function formatHourLabel(h) {
  const start = h % 24;
  const end = (h + 1) % 24;

  const to12 = (hour) => {
    const period = hour >= 12 ? "pm" : "am";
    let h12 = hour % 12;
    if (h12 === 0) h12 = 12;
    return `${h12}${period}`;
  };

  return `${to12(start)} - ${to12(end)}`;
}

export default function TodayZone() {
  const navigate = useNavigate();
  const [todayHours, setTodayHours] = useState([]);
  const [nextDayHours, setNextDayHours] = useState([]);
  const [notes, setNotes] = useState({});
  const [saved, setSaved] = useState({});
  const [justSavedHour, setJustSavedHour] = useState(null);

  useEffect(() => {
    const now = new Date();
    const currentHour = now.getHours(); // 0–23

    const today = [];
    for (let h = currentHour; h <= 23; h++) {
      today.push(h);
    }

    const nextDay = [];
    for (let h = 0; h <= 23; h++) {
      nextDay.push(h + 24); // represent next-day hours as 24–47
    }

    setTodayHours(today);
    setNextDayHours(nextDay);

    const savedNotes =
      JSON.parse(localStorage.getItem("zone-today-notes")) || {};
    const savedFlags =
      JSON.parse(localStorage.getItem("zone-today-saved")) || {};
    setNotes(savedNotes);
    setSaved(savedFlags);
  }, []);

  const handleNoteChange = (hourKey, value) => {
    const updatedNotes = { ...notes, [hourKey]: value };
    setNotes(updatedNotes);
    // Do not auto-save; just keep in memory until Save is clicked.
  };

  const handleSave = (hourKey) => {
    if (!notes[hourKey] || !notes[hourKey].trim()) {
      return;
    }
    const updatedSaved = { ...saved, [hourKey]: true };
    setSaved(updatedSaved);

    // Persist both notes and saved flags
    localStorage.setItem("zone-today-notes", JSON.stringify(notes));
    localStorage.setItem("zone-today-saved", JSON.stringify(updatedSaved));

    setJustSavedHour(hourKey);
    setTimeout(() => setJustSavedHour(null), 1500);
  };

  const handleEdit = (hourKey) => {
    const updatedSaved = { ...saved, [hourKey]: false };
    setSaved(updatedSaved);
    localStorage.setItem("zone-today-saved", JSON.stringify(updatedSaved));
  };

  const handleDelete = (hourKey) => {
    const updatedNotes = { ...notes };
    delete updatedNotes[hourKey];
    setNotes(updatedNotes);

    const updatedSaved = { ...saved };
    delete updatedSaved[hourKey];
    setSaved(updatedSaved);

    localStorage.setItem("zone-today-notes", JSON.stringify(updatedNotes));
    localStorage.setItem("zone-today-saved", JSON.stringify(updatedSaved));
  };

  const renderHourRow = (hourValue) => {
    const hourKey = String(hourValue);
    const label = formatHourLabel(hourValue);
    const isSaved = !!saved[hourKey];
    const hasText = !!(notes[hourKey] && notes[hourKey].trim());
    const isJustSaved = justSavedHour === hourKey;

    return (
      <div
        key={hourKey}
        className={`hour-block todayzone-row ${
          isSaved ? "todayzone-row--saved" : ""
        }`}
      >
        <div className="hour-label">{label}</div>

        <textarea
          className="hour-note todayzone-row-textarea"
          placeholder="Write your task for this hour..."
          value={notes[hourKey] || ""}
          onChange={(e) => handleNoteChange(hourKey, e.target.value)}
          readOnly={isSaved}
        />

        <div className="hour-actions">
          {!isSaved ? (
            <button
              className="hour-btn hour-btn-save"
              onClick={() => handleSave(hourKey)}
              disabled={!hasText}
            >
              {isJustSaved ? "Saved" : "Save"}
            </button>
          ) : (
            <button
              className="hour-btn hour-btn-save"
              onClick={() => handleEdit(hourKey)}
            >
              Edit
            </button>
          )}

          <button
            className="hour-btn hour-btn-delete"
            onClick={() => handleDelete(hourKey)}
            disabled={!hasText}
          >
            Delete
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="page">
      <button className="back-button" onClick={() => navigate("/")}>
        ← Back
      </button>

      <h1>Today&apos;s Zone</h1>

      <p>Plan your hours from now through tonight and into tomorrow.</p>

      <div className="today-zone-container">
        {todayHours.map(renderHourRow)}
      </div>

      <h2 className="next-day-heading">Next Day</h2>

      <div className="today-zone-container">
        {nextDayHours.map(renderHourRow)}
      </div>
    </div>
  );
}
