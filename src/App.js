import React, { useState } from 'react';
import './App.css';
import MeterDisplay from './components/MeterDisplay';
import LocationSelector from './components/LocationSelector';
import MonthSelector from './components/MonthSelector';
import ConsumptionTracker from './components/ConsumptionTracker';
import { metersData } from './data/metersData';

function App() {
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('');
  const [selectedMeter, setSelectedMeter] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  const filteredMeters = metersData.filter(meter => {
    if (!selectedCity) return false;
    if (meter.city !== selectedCity) return false;
    if (selectedDistrict && meter.district !== selectedDistrict) return false;
    if (selectedNeighborhood && meter.neighborhood !== selectedNeighborhood) return false;
    return true;
  });

  return (
    <div className="App">
      <header className="app-header">
        <h1>Doğalgaz Sayaç Takip Sistemi</h1>
        <p>Sayaçlarınızı kolayca takip edin</p>
      </header>

      <div className="container">
        <LocationSelector
          selectedCity={selectedCity}
          selectedDistrict={selectedDistrict}
          selectedNeighborhood={selectedNeighborhood}
          setSelectedCity={setSelectedCity}
          setSelectedDistrict={setSelectedDistrict}
          setSelectedNeighborhood={setSelectedNeighborhood}
          setSelectedMeter={setSelectedMeter}
        />

        {filteredMeters.length > 0 && (
          <div className="meters-section">
            <h2>📍 Bölgedeki Sayaçlar ({filteredMeters.length})</h2>
            <div className="meters-list">
              {filteredMeters.map(meter => (
                <div
                  key={meter.serialNumber}
                  className={`meter-card ${selectedMeter?.serialNumber === meter.serialNumber ? 'active' : ''}`}
                  onClick={() => setSelectedMeter(meter)}
                >
                  <div className="meter-serial">
                    <span className="label">Seri No:</span>
                    <span className="value">{meter.serialNumber}</span>
                  </div>
                  <div className="meter-address">
                    {meter.address}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedMeter && (
          <>
            <MonthSelector
              selectedMonth={selectedMonth}
              setSelectedMonth={setSelectedMonth}
            />

            <MeterDisplay
              meter={selectedMeter}
              selectedMonth={selectedMonth}
            />

            <ConsumptionTracker
              meter={selectedMeter}
              selectedMonth={selectedMonth}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
