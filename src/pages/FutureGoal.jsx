import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FutureGoal() {
  const navigate = useNavigate();

  const [goal, setGoal] = useState({ date: "", note: "" });
  const [goals, setGoals] = useState(() => {
    const saved = JSON.parse(localStorage.getItem("future-goals")) || [];
    return saved;
  });
  const [isSaved, setIsSaved] = useState(false);

  const calculateRemainingDays = (dateStr) => {
    if (!dateStr) return 0;
    const today = new Date();
    const target = new Date(dateStr);
    today.setHours(0, 0, 0, 0);
    target.setHours(0, 0, 0, 0);
    const diff = Math.ceil((target - today) / (1000 * 60 * 60 * 24));
    return diff >= 0 ? diff : 0;
  };

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setGoal((prev) => ({ ...prev, date: newDate }));
  };

  const handleNoteChange = (e) => {
    const note = e.target.value;
    setGoal((prev) => ({ ...prev, note }));
  };

  const handleSave = () => {
    if (!goal.date || !goal.note.trim()) {
      return;
    }

    const newGoal = {
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
      date: goal.date,
      note: goal.note.trim(),
      daysLeft: calculateRemainingDays(goal.date),
    };

    const updatedGoals = [...goals, newGoal];
    setGoals(updatedGoals);
    localStorage.setItem("future-goals", JSON.stringify(updatedGoals));

    // reset inputs
    setGoal({ date: "", note: "" });

    // button feedback
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleDelete = (id) => {
    const updatedGoals = goals.filter((g) => g.id !== id);
    setGoals(updatedGoals);
    localStorage.setItem("future-goals", JSON.stringify(updatedGoals));
  };

  return (
    <div className="page">
      <button className="back-button" onClick={() => navigate("/")}>
        ← Back
      </button>

      <h1>CREATE YOUR FUTURE GOAL</h1>

      {/* Removed "Next goal in X days" from top */}

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
          {isSaved ? "Saved Successfully" : "Save Goal"}
        </button>
      </div>

      {/* Boxes between Save button and footer */}
      {goals.length > 0 && (
        <div className="future-goal-boxes-row">
          {goals.map((g) => (
            <div key={g.id} className="future-goal-box">
              <div className="future-goal-box-note">{g.note}</div>
              <div className="future-goal-box-days">
                {g.daysLeft} day{g.daysLeft === 1 ? "" : "s"} left
              </div>
              <button
                className="future-goal-delete-button"
                onClick={() => handleDelete(g.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
