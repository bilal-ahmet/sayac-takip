import React from 'react';
import { getLocations } from '../data/metersData';
import './LocationSelector.css';

function LocationSelector({
  selectedCity,
  selectedDistrict,
  selectedNeighborhood,
  setSelectedCity,
  setSelectedDistrict,
  setSelectedNeighborhood,
  setSelectedMeter
}) {
  const { cities, districts, neighborhoods } = getLocations();

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
    setSelectedDistrict('');
    setSelectedNeighborhood('');
    setSelectedMeter(null);
  };

  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
    setSelectedNeighborhood('');
    setSelectedMeter(null);
  };

  const handleNeighborhoodChange = (e) => {
    setSelectedNeighborhood(e.target.value);
    setSelectedMeter(null);
  };

  return (
    <div className="location-selector">
      <h2>📍 Adres Seçimi</h2>
      <div className="selector-grid">
        <div className="selector-item">
          <label>İl</label>
          <select value={selectedCity} onChange={handleCityChange}>
            <option value="">İl Seçiniz</option>
            {cities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        <div className="selector-item">
          <label>İlçe</label>
          <select 
            value={selectedDistrict} 
            onChange={handleDistrictChange}
            disabled={!selectedCity}
          >
            <option value="">İlçe Seçiniz</option>
            {selectedCity && districts[selectedCity]?.map(district => (
              <option key={district} value={district}>{district}</option>
            ))}
          </select>
        </div>

        <div className="selector-item">
          <label>Mahalle</label>
          <select 
            value={selectedNeighborhood} 
            onChange={handleNeighborhoodChange}
            disabled={!selectedDistrict}
          >
            <option value="">Mahalle Seçiniz</option>
            {selectedCity && selectedDistrict && 
              neighborhoods[`${selectedCity}-${selectedDistrict}`]?.map(neighborhood => (
                <option key={neighborhood} value={neighborhood}>{neighborhood}</option>
              ))
            }
          </select>
        </div>
      </div>
    </div>
  );
}

export default LocationSelector;
