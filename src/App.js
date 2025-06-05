import React, { useEffect, useState } from 'react';
import {UAParser} from 'ua-parser-js';
import RadioPlayer from './RadioPlayer';
import './App.css';
import PrivacyPopup from './PrivacyPopup';

function App() {
  const [location, setLocation] = useState(null);
  const [geoDetails, setGeoDetails] = useState({ city: '', country: '' });
  const [browserInfo, setBrowserInfo] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setLocation({ latitude, longitude });

          fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
            .then((res) => res.json())
            .then((data) => {
              const city = data.address.city || data.address.town || data.address.village || '';
              const country = data.address.country || '';
              setGeoDetails({ city, country });
            })
            .catch((err) => console.error('Geolocation error:', err));
        },
        (err) => {
          console.error('Geolocation denied or error:', err);
        }
      );
    }

    try {
      const parser = new UAParser();
      const result = parser.getResult();

      setBrowserInfo({
          userAgent: navigator.userAgent,
          appName: result.browser.name,
          platform: result.os.name + result.os.version,
          reliability: true
        });
    } catch {
      setBrowserInfo({
          userAgent: navigator.userAgent,
          appName: navigator.appName,
          platform: navigator.platform,
          reliability: false
        });
    }
  }, []);

  return (
    <div className="app">
      <header className="header">
        <h1>Radio Internetowe</h1>
      </header>
      <main className="main-content">
        <RadioPlayer />
        {location && (
          <div>
            <p>Twoja lokalizacja: {location.latitude}, {location.longitude} – {' '}
          {geoDetails.city}, {geoDetails.country}</p>
          </div>
        )}
        {browserInfo && (
          <div>
            <p>Twoje ({browserInfo.reliability?'prawdopodobne':'niekoniecznie wiarygodne'}) informacje o przeglądarce: </p>
            <p>Przeglądarka: {browserInfo.appName}</p>
            <p>System: {browserInfo.platform}</p>
            <p>User Agent: {browserInfo.userAgent}</p>
          </div>
        )}
      </main>
      <footer className="footer">
        <p>&copy; 2025 Radio Internetowe. Wszelkie prawa zastrzeżone.</p>
      </footer>
      <PrivacyPopup />
    </div>
  );
}
export default App;
