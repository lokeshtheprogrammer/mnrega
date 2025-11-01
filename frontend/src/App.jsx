import React, { useState, useEffect } from "react";
import axios from "axios";
import DistrictReport from "./components/DistrictReport";
import { getDistricts } from "./api.js";


function App() {
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [language, setLanguage] = useState("en");
  const [showReport, setShowReport] = useState(false);
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const response = await axios.get("/api/districts");
        setDistricts(response.data || []);
      } catch (error) {
        console.error("Error fetching districts:", error);
      }
    };
    fetchDistricts();
  }, []);

  const handleSubmit = () => {
    if (selectedDistrict.trim() !== "") {
      setShowReport(true);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md">

        <h2 className="text-2xl font-semibold text-center mb-6">
          District Water Analysis Report
        </h2>

        {/* District Dropdown */}
        <div className="mb-4">
          <label className="block font-medium mb-2">Select District:</label>
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="">-- Select --</option>
            {districts.map((dist, index) => (
              <option key={index} value={dist}>
                {dist}
              </option>
            ))}
          </select>
        </div>

        {/* Language Select */}
        <div className="mb-4">
          <label className="block font-medium mb-2">Select Language:</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="en">English</option>
            <option value="ta">Tamil</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded text-lg"
        >
          View Report
        </button>

        {/* Report Component */}
        {showReport && selectedDistrict && (
          <div className="mt-8">
            <DistrictReport district={selectedDistrict} language={language} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
