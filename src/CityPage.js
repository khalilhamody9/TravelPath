import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import data from "./data/destinations";

const bgUrlFor = (city) =>
  `${process.env.PUBLIC_URL}/images/${encodeURIComponent(city)}.png`;

const norm = (s) => String(s).toLowerCase().replace(/\s+/g, "");

export default function CityPage() {
  const { cityName } = useParams();
  const navigate = useNavigate();
  const decoded = decodeURIComponent(cityName || "");

  const cityData =
    data.find((c) => norm(c.city) === norm(decoded)) ||
    { city: decoded, country: "", description: "", highlights: [], bestTime: "" };

  const bgUrl = bgUrlFor(cityData.city);

  const smartBack = () => {
    if (window.history.length > 1) navigate(-1);
    else navigate("/");
  };

  return (
    <div className="city-page">
      <img className="city-bg" src={bgUrl} alt={cityData.city} />
      <div className="city-gradient" />

      <header className="navbar city-navbar">
        <button className="btn-outline sm" onClick={smartBack}>← Back</button>
        <h2 className="logo">{cityData.city}</h2>
        <button className="btn sm" onClick={() => navigate("/login")}>Login</button>
      </header>

      <main className="city-card">
        <div className="city-header">
          <h1>{cityData.city}</h1>
          <span className="country-badge">{cityData.country}</span>
        </div>

        {cityData.description && <p className="city-desc">{cityData.description}</p>}

        {cityData.highlights?.length > 0 && (
          <>
            <h4 className="section-title">Highlights</h4>
            <div className="chips">
              {cityData.highlights.map((h) => (
                <span className="chip" key={h}>{h}</span>
              ))}
            </div>
          </>
        )}

        {cityData.bestTime && (
          <div className="info-row">
            <span className="info-label">Best time to visit</span>
            <span className="info-value">{cityData.bestTime}</span>
          </div>
        )}

        <div className="actions">
          <button className="btn" onClick={() => navigate("/login")}>Plan a trip</button>
          <button className="btn-outline" onClick={() => navigate("/")}>Go to Home</button>
        </div>
      </main>
    </div>
  );
}
