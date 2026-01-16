import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ReflectionZone() {
  const navigate = useNavigate();

  const [photo, setPhoto] = useState(null);
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    const savedPhoto = localStorage.getItem("reflection-photo");
    if (savedPhoto) setPhoto(savedPhoto);
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

  return (
    <div className="page">
      <button className="back-button" onClick={() => navigate("/")}>
        ← Back
      </button>

      <h1>Reflection Zone</h1>

      {!photo && (
        <div className="upload-section">
          <p>Upload a photo to reflect with:</p>
          <input type="file" accept="image/*" onChange={handleUpload} />
        </div>
      )}

      {photo && (
        <div className="photo-section">
          <img src={photo} alt="Reflection" className="reflection-photo" />
          <div className="toggle-buttons">
            <button
              onClick={() => setSpeaking(true)}
              disabled={speaking}
            >
              Click to Speak
            </button>
            <button
              onClick={() => setSpeaking(false)}
              disabled={!speaking}
            >
              Click to Pause
            </button>
          </div>
        </div>
      )}

      {speaking && <p className="speaking-text">🎙️ Speaking... reflect your thoughts</p>}
    </div>
  );
}
