import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DistrictReport from './components/DistrictReport';

function App() {
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [language, setLanguage] = useState('en');
  const [showReport, setShowReport] = useState(false);
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const response = await axios.get('/api/districts');
        setDistricts(response.data);
      } catch (error) {
        console.error('Error fetching districts:', error);
      }
    };
    fetchDistricts();
  }, []);

  const handleDistrictChange = (event) => {
    setSelectedDistrict(event.target.value);
    setShowReport(false);
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleSubmit = () => {
    if (selectedDistrict) {
      setShowReport(true);
    }
  };

  const handleGeolocate = () => {
    // Mocking geolocation result
    const mockDistrict = 'Coimbatore';
    if (districts.includes(mockDistrict)) {
      setSelectedDistrict(mockDistrict);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          {language === 'en' ? 'MGNREGA District Dashboard - Tamil Nadu' : 'மகாத்ма காந்தி தேசிய ஊரக வேலைவாய்ப்பு திட்டம் - தமிழ்நாடு'}
        </h1>

        <div className="flex justify-center mb-6">
          <select
            value={language}
            onChange={handleLanguageChange}
            className="p-2 rounded-md border border-gray-300"
          >
            <option value="en">English</option>
            <option value="ta">தமிழ்</option>
          </select>
        </div>

        <div className="mb-4">
          <button
            onClick={handleGeolocate}
            className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md mb-2"
          >
            {language === 'en' ? 'Detect My District' : 'எனது மாவட்டத்தைக் கண்டறியவும்'}
          </button>
          <label htmlFor="district" className="block text-gray-700 font-bold mb-2">
            {language === 'en' ? 'Select District' : 'மாவட்டத்தைத் தேர்ந்தெடுக்கவும்'}
          </label>
          <select
            id="district"
            value={selectedDistrict}
            onChange={handleDistrictChange}
            className="w-full p-2 rounded-md border border-gray-300"
          >
            <option value="">{language === 'en' ? '-- Select a District --' : '-- ஒரு மாவட்டத்தைத் தேர்ந்தெடுக்கவும் --'}</option>
            {districts.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
        >
          {language === 'en' ? 'Show District Report' : 'மாவட்ட அறிக்கையைக் காட்டு'}
        </button>
      </div>

      {showReport && <DistrictReport district={selectedDistrict} language={language} />}
    </div>
  );
}

export default App;
