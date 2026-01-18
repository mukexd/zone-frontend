import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ReflectionZone() {
  const navigate = useNavigate();

  const [photo, setPhoto] = useState(null);
  const [talking, setTalking] = useState(false);

  const [noteText, setNoteText] = useState("");
  const [notesEnabled, setNotesEnabled] = useState(false);

  useEffect(() => {
    const savedPhoto = localStorage.getItem("reflection-photo");
    if (savedPhoto) setPhoto(savedPhoto);

    const savedNotes = localStorage.getItem("reflection-notes");
    if (savedNotes) {
      setNoteText(savedNotes);
      setNotesEnabled(true);
    }
  }, []);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPhoto(reader.result);
      localStorage.setItem("reflection-photo", reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDeletePhoto = () => {
    setPhoto(null);
    setTalking(false);
    localStorage.removeItem("reflection-photo");
  };

  const handleTalkClick = () => {
    setTalking((prev) => !prev);
  };

  const handleThoughtsClick = () => {
    setNotesEnabled(true);
  };

  const handleDeleteNotes = () => {
    setNoteText("");
    setNotesEnabled(false);
    localStorage.removeItem("reflection-notes");
  };

  const handleNoteChange = (e) => {
    const value = e.target.value;
    setNoteText(value);
    localStorage.setItem("reflection-notes", value);
  };

  return (
    <div className="page">
      <button className="back-button" onClick={() => navigate("/")}>
        ← Back
      </button>

      <h1>Reflection Zone</h1>

      <div className="reflection-grid">
        {/* LEFT BOX – IMAGE */}
        <div className="reflection-box">
          <div className="reflection-box-inner">
            {!photo && (
              <label className="reflection-upload-label">
                <span className="reflection-upload-text">Upload image</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleUpload}
                  className="reflection-upload-input"
                />
              </label>
            )}

            {photo && (
              <img
                src={photo}
                alt="Reflection"
                className="reflection-photo-box"
              />
            )}

            {talking && (
              <div className="reflection-wave">
                <span className="bar bar1" />
                <span className="bar bar2" />
                <span className="bar bar3" />
              </div>
            )}
          </div>

          <div className="reflection-buttons-row">
            <button
              className={`reflection-btn left ${
                talking ? "active" : ""
              }`}
              onClick={handleTalkClick}
              disabled={!photo}
            >
              {talking ? "▌▌" : "Talk"}
            </button>
            <button
              className="reflection-btn right"
              onClick={handleDeletePhoto}
              disabled={!photo}
            >
              Thank you
            </button>
          </div>
        </div>

        {/* RIGHT BOX – NOTES */}
        <div className="reflection-box">
          <div className="reflection-box-inner">
            <textarea
              className="reflection-notes"
              placeholder="Write your thoughts here..."
              value={noteText}
              onChange={handleNoteChange}
              readOnly={!notesEnabled}
            />
          </div>

          <div className="reflection-buttons-row">
            <button
              className={`reflection-btn left ${
                notesEnabled ? "active" : ""
              }`}
              onClick={handleThoughtsClick}
            >
              Thoughts
            </button>
            <button
              className="reflection-btn right"
              onClick={handleDeleteNotes}
              disabled={!noteText}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
