import React, { useState, useEffect } from "react";
import { getLatestStats, getHistoryStats } from "../api.js";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DistrictReport = ({ district, language }) => {
  const [stats, setStats] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const latest = await getLatestStats(district);
        setStats(latest.data);

        const hist = await getHistoryStats(district);
        setHistory(hist.data);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    fetchData();
  }, [district]);

  if (!stats || !history.length) {
    return <div className="text-center p-4 text-gray-600">Loading...</div>;
  }

  // Prepare chart data
  const chartData = {
    labels: history.map((entry) => entry.month),
    datasets: [
      {
        label: "Total Workdays",
        data: history.map((entry) => entry.total_workdays),
        borderWidth: 2,
        fill: false,
      },
      {
        label: "Total Wages (₹)",
        data: history.map((entry) => entry.total_wages),
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {language === "ta" ? `${district} மாவட்ட அறிக்கை` : `${district} District Report`}
      </h2>

      <div className="grid grid-cols-3 gap-4 text-center border p-4 rounded-lg">
        <div>
          👨‍🌾 <strong>{stats.active_workers}</strong><br />
          {language === "ta" ? "செயலில் உள்ள தொழிலாளர்கள்" : "Active Workers"}
        </div>
        <div>
          💰 <strong>₹{stats.total_wages}</strong><br />
          {language === "ta" ? "செலவிட்ட கூலி" : "Total Wages"}
        </div>
        <div>
          📅 <strong>{stats.total_workdays}</strong><br />
          {language === "ta" ? "பணிநாட்கள்" : "Workdays"}
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2 text-center">
          {language === "ta" ? "கடைசி 6 மாத செயல்திறன்" : "Last 6 Months Performance"}
        </h3>
        <Line data={chartData} />
      </div>
    </div>
  );
};

export default DistrictReport;
