import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function FutureGoal() {
  const navigate = useNavigate();

  const [goal, setGoal] = useState({ date: "", note: "" });
  const [remainingDays, setRemainingDays] = useState(null);

  // Load goal from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("future-goal")) || null;
    if (saved) {
      setGoal(saved);
      calculateRemainingDays(saved.date);
    }
  }, []);

  const calculateRemainingDays = (dateStr) => {
    if (!dateStr) return;
    const today = new Date();
    const target = new Date(dateStr);
    const diff = Math.ceil((target - today) / (1000 * 60 * 60 * 24));
    setRemainingDays(diff >= 0 ? diff : 0);
  };

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setGoal((prev) => ({ ...prev, date: newDate }));
    calculateRemainingDays(newDate);
  };

  const handleNoteChange = (e) => {
    const note = e.target.value;
    setGoal((prev) => ({ ...prev, note }));
  };

  const handleSave = () => {
    localStorage.setItem("future-goal", JSON.stringify(goal));
    alert("Goal saved!");
  };

  return (
    <div className="page">
      <button className="back-button" onClick={() => navigate("/")}>
        ← Back
      </button>

      <h1>CREATE FUTURE GOAL</h1>

      {remainingDays !== null && (
        <p>Next goal in <strong>{remainingDays}</strong> day(s)</p>
      )}

      <div className="goal-form">
        <label>
          Select goal date (next 3 months):
          <input
            type="date"
            value={goal.date}
            min={new Date().toISOString().split("T")[0]}
            max={new Date(new Date().setMonth(new Date().getMonth() + 3))
              .toISOString()
              .split("T")[0]}
            onChange={handleDateChange}
          />
        </label>

        <label>
          Write your goal / commitments:
          <textarea
            value={goal.note}
            onChange={handleNoteChange}
            placeholder="Type your goal here..."
          />
        </label>

        <button className="save-button" onClick={handleSave}>
          Save Goal
        </button>
      </div>
    </div>
  );
}
