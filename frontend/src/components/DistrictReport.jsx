import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const DistrictReport = ({ district, language }) => {
  const [stats, setStats] = useState(null);
  const [history, setHistory] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(`/api/stats/${district}`);
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching district stats:', error);
      }
    };

    const fetchHistory = async () => {
      try {
        const response = await axios.get(`/api/stats/history/${district}`);
        setHistory(response.data);
      } catch (error) {
        console.error('Error fetching district history:', error);
      }
    };

    fetchStats();
    fetchHistory();
  }, [district]);

  if (!stats || !history) {
    return <div>Loading...</div>;
  }

  const chartData = {
    labels: history.map(item => `${item.month} ${item.year}`).reverse(),
    datasets: [
      {
        label: 'Total Person-Days',
        data: history.map(item => item.total_person_days).reverse(),
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Last 6 Months Performance',
      },
    },
  };

  return (
    <div className="max-w-4xl w-full bg-white p-8 rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        {language === 'en' ? `Report for ${district}` : `${district} மாவட்டத்திற்கான அறிக்கை`}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center mb-6">
        <div className="bg-blue-100 p-4 rounded-lg">
          <span role="img" aria-label="people" className="text-4xl">👨‍🌾</span>
          <p className="font-bold text-lg">{language === 'en' ? 'Total Persons Employed' : 'வேலை வாய்ப்பு பெற்ற மக்கள்'}</p>
          <p className="text-2xl">{stats.total_people_worked}</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg">
          <span role="img" aria-label="money" className="text-4xl">💰</span>
          <p className="font-bold text-lg">{language === 'en' ? 'Total Wages Paid' : 'செலவழிக்கப்பட்ட தொகை'}</p>
          <p className="text-2xl">{stats.total_money_spent}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg">
          <span role="img" aria-label="calendar" className="text-4xl">📅</span>
          <p className="font-bold text-lg">{language === 'en' ? 'Total Work Days Generated' : 'மொத்த வேலை நாட்கள்'}</p>
          <p className="text-2xl">{stats.total_work_days}</p>
        </div>
      </div>

      <div>
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default DistrictReport;
