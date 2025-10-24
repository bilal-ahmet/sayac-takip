import React from 'react';
import './MonthSelector.css';

const months = [
  'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
  'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
];

function MonthSelector({ selectedMonth, setSelectedMonth }) {
  return (
    <div className="month-selector">
      <h2>📅 Ay Seçimi</h2>
      <div className="months-grid">
        {months.map((month, index) => (
          <button
            key={index}
            className={`month-button ${selectedMonth === index ? 'active' : ''}`}
            onClick={() => setSelectedMonth(index)}
          >
            {month}
          </button>
        ))}
      </div>
    </div>
  );
}

export default MonthSelector;
