import React from 'react';
import './MeterDisplay.css';

const months = [
  'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
  'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
];

function MeterDisplay({ meter, selectedMonth }) {
  const reading = meter.readings[selectedMonth];

  return (
    <div className="meter-display">
      <h2>Sayaç Bilgileri</h2>
      
      <div className="meter-visual">
        <div className="meter-image">
          <div className="meter-body">
            <div className="meter-top">
              <div className="serial-box">
                <div className="serial-label">Seri No</div>
                <div className="serial-number">{meter.serialNumber}</div>
              </div>
            </div>
            
            <div className="meter-display-area">
              <div className="reading-display">
                {reading.value.toString().split('').map((digit, idx) => (
                  <span key={idx} className={digit === '.' ? 'decimal-point' : 'digit'}>
                    {digit}
                  </span>
                ))}
              </div>
              <div className="unit">m³</div>
            </div>

            <div className="meter-bottom">
              <div className="warning-label">
                ⚠️ DİKKAT: Apartman İçerinde veya Dairenizde Gaz Kokusu Alırsanız 187'yi Arayın
              </div>
            </div>
          </div>
        </div>

        <div className="meter-info">
          <div className="info-item">
            <div className="info-label">Seri Numarası</div>
            <div className="info-value">{meter.serialNumber}</div>
          </div>
          
          <div className="info-item">
            <div className="info-label">Sayaç Değeri</div>
            <div className="info-value highlight">{reading.value} m³</div>
          </div>
          
          <div className="info-item">
            <div className="info-label">Okunma Tarihi</div>
            <div className="info-value">{reading.date} ({months[selectedMonth]})</div>
          </div>

          <div className="info-item">
            <div className="info-label">Adres</div>
            <div className="info-value">{meter.address}</div>
          </div>

          <div className="info-item">
            <div className="info-label">Bölge</div>
            <div className="info-value">{meter.neighborhood} / {meter.district} / {meter.city}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MeterDisplay;
