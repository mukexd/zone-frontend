import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function History() {
  const navigate = useNavigate();

  // Dummy data: Last 14 days
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("zone-history")) || [];
    setHistory(saved);

    // If no data, generate random sample
    if (saved.length === 0) {
      const sample = Array.from({ length: 14 }, (_, i) => ({
        day: `Day ${i + 1}`,
        score: Math.floor(Math.random() * 11), // 0-10
      }));
      setHistory(sample);
      localStorage.setItem("zone-history", JSON.stringify(sample));
    }
  }, []);

  // Map scores to categories
  const getColor = (score) => {
    if (score >= 7) return "#28a745"; // High Zone
    if (score >= 4) return "#ffc107"; // Mid Zone
    return "#dc3545"; // Low Zone
  };

  const data = {
    labels: history.map((h) => h.day),
    datasets: [
      {
        label: "Zone Score",
        data: history.map((h) => h.score),
        backgroundColor: history.map((h) => getColor(h.score)),
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      y: { min: 0, max: 10 },
    },
  };

  return (
    <div className="page">
      <button className="back-button" onClick={() => navigate("/")}>
        ← Back
      </button>

      <h1>YOUR HISTORY WITH ZONE</h1>
      <p>Hover bars to see exact daily scores. Green = High, Yellow = Mid, Red = Low.</p>

      <div style={{ maxWidth: "800px", marginTop: "40px" }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
