import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export default function History() {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("zone-history")) || [];
    if (saved.length === 0) {
      const sample = Array.from({ length: 14 }, (_, i) => ({
        day: `Day ${i + 1}`,
        score: Math.floor(Math.random() * 11),
      }));
      localStorage.setItem("zone-history", JSON.stringify(sample));
      setHistory(sample);
    } else {
      setHistory(saved);
    }
  }, []);

  // Custom grey colors for low/mid/high zones
  const getColor = (score) => {
    if (score >= 7) return "#2c2c2c"; // darkest grey
    if (score >= 4) return "#555555"; // dark grey
    return "#999999"; // grey
  };

  const data = {
    labels: history.map((h) => h.day),
    datasets: [
      {
        type: "bar",
        label: "Zone Score",
        data: history.map((h) => h.score),
        backgroundColor: history.map((h) => getColor(h.score)),
        borderRadius: 8,
      },
      {
        type: "line",
        label: "Trend",
        data: history.map((h) => h.score),
        borderColor: "#f5f5dc", // light line for contrast
        backgroundColor: "transparent",
        tension: 0.3,
        pointBackgroundColor: "#f5f5dc",
        pointBorderColor: "#f5f5dc",
        pointRadius: 5,
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
      x: {
        ticks: { color: "#f5f5dc" },
        grid: { display: false }, // remove horizontal grid lines
      },
      y: {
        min: 0,
        max: 10,
        ticks: {
          color: "#f5f5dc",
          stepSize: 2, // only even numbers
        },
        grid: { display: false }, // remove vertical grid lines
      },
    },
    layout: { padding: { top: 20, bottom: 20 } },
    maintainAspectRatio: false,
  };

  return (
    <div className="page" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <button className="back-button" onClick={() => navigate("/")}>
        ← Back
      </button>

      <h1>YOUR HISTORY WITH ZONE</h1>
      <p>Hover bars to see exact daily scores. Grey shades = Low → Mid → High Zone.</p>

      <div style={{ width: "90%", maxWidth: "800px", height: "400px", marginTop: "40px" }}>
        <Chart data={data} options={options} />
      </div>
    </div>
  );
}
