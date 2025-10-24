import React from 'react';
import './ConsumptionTracker.css';

const months = [
  'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
  'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
];

function ConsumptionTracker({ meter, selectedMonth }) {
  const calculateConsumption = (currentMonth) => {
    if (currentMonth === 0) return null; // Ocak ayı için önceki ay yok
    
    const currentReading = meter.readings[currentMonth];
    const previousReading = meter.readings[currentMonth - 1];
    
    if (!currentReading || !previousReading) return null;
    
    return {
      consumption: (currentReading.value - previousReading.value).toFixed(3),
      currentMonth: months[currentMonth],
      previousMonth: months[currentMonth - 1],
      currentValue: currentReading.value,
      previousValue: previousReading.value,
      currentDate: currentReading.date,
      previousDate: previousReading.date
    };
  };

  const getYearlyData = () => {
    const data = [];
    for (let i = 1; i <= 11; i++) {
      const consumption = calculateConsumption(i);
      if (consumption) {
        data.push({
          month: i,
          ...consumption
        });
      }
    }
    return data;
  };

  const currentConsumption = calculateConsumption(selectedMonth);
  const yearlyData = getYearlyData();
  const totalConsumption = yearlyData.reduce((sum, item) => sum + parseFloat(item.consumption), 0).toFixed(3);
  const averageConsumption = yearlyData.length > 0 ? (totalConsumption / yearlyData.length).toFixed(3) : 0;

  return (
    <div className="consumption-tracker">
      <h2>📊 Tüketim Takibi</h2>
      
      {currentConsumption ? (
        <div className="current-consumption">
          <div className="consumption-header">
            <h3>{currentConsumption.previousMonth} Ayı Tüketimi</h3>
          </div>
          
          <div className="consumption-calculation">
            <div className="calc-item">
              <div className="calc-label">{currentConsumption.currentMonth} Okuma</div>
              <div className="calc-value">{currentConsumption.currentValue} m³</div>
              <div className="calc-date">{currentConsumption.currentDate}</div>
            </div>
            
            <div className="calc-operator">−</div>
            
            <div className="calc-item">
              <div className="calc-label">{currentConsumption.previousMonth} Okuma</div>
              <div className="calc-value">{currentConsumption.previousValue} m³</div>
              <div className="calc-date">{currentConsumption.previousDate}</div>
            </div>
            
            <div className="calc-operator">=</div>
            
            <div className="calc-result">
              <div className="result-label">Tüketim</div>
              <div className="result-value">{currentConsumption.consumption} m³</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="no-consumption">
          <p>⚠️ Ocak ayı için önceki ay verisi bulunmamaktadır.</p>
        </div>
      )}

      <div className="yearly-summary">
        <h3>📈 Yıllık Özet</h3>
        <div className="summary-cards">
          <div className="summary-card">
            <div className="summary-icon">📊</div>
            <div className="summary-label">Toplam Tüketim</div>
            <div className="summary-value">{totalConsumption} m³</div>
          </div>
          
          <div className="summary-card">
            <div className="summary-icon">📉</div>
            <div className="summary-label">Ortalama Tüketim</div>
            <div className="summary-value">{averageConsumption} m³</div>
          </div>
          
          <div className="summary-card">
            <div className="summary-icon">📅</div>
            <div className="summary-label">Toplam Ay</div>
            <div className="summary-value">{yearlyData.length} ay</div>
          </div>
        </div>
      </div>

      <div className="consumption-table">
        <h3>📋 Aylık Detaylar</h3>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Tüketim Dönemi</th>
                <th>Önceki Okuma</th>
                <th>Sonraki Okuma</th>
                <th>Tüketim</th>
              </tr>
            </thead>
            <tbody>
              {yearlyData.map((item) => (
                <tr key={item.month} className={item.month === selectedMonth ? 'highlight' : ''}>
                  <td>
                    <strong>{item.previousMonth}</strong>
                    <div className="date-range">{item.previousDate} - {item.currentDate}</div>
                  </td>
                  <td>{item.previousValue} m³</td>
                  <td>{item.currentValue} m³</td>
                  <td>
                    <span className="consumption-badge">{item.consumption} m³</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ConsumptionTracker;
