import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const destinations = [
    { city: "Tel aviv",  country: "Israel" },
    { city: "Paris",     country: "France" },
    { city: "Rome",      country: "Italy" },
    { city: "Tokyo",     country: "Japan" },
    { city: "Barcelona", country: "Spain" },
    { city: "Santorini", country: "Greece" },
  ];

  const imgUrlFor = (city) =>
    `${process.env.PUBLIC_URL}/images/${encodeURIComponent(city)}.png`;

  return (
    <div className="App">
      <header className="navbar">
        <h2 className="logo">🌍 TravelPath</h2>
        <div style={{display:"flex", gap:8}}>
          <button className="login-btn" onClick={() => navigate("/login")}>Login</button>
          <button className="btn" onClick={() => navigate("/signup")}>Sign Up</button>
        </div>
      </header>

      <section className="hero">
        <div className="hero-text">
          <h1>Plan your next adventure</h1>
          <p>Discover stunning destinations and craft the perfect trip.</p>
          <div style={{marginTop:12}}>
            <button className="btn" onClick={() => navigate("/signup")}>Create free account</button>
          </div>
        </div>
      </section>

      <section className="destinations">
        <h3>Popular Destinations</h3>
        <div className="grid">
          {destinations.map((d) => (
            <div
              className="card"
              key={d.city}
              onClick={() => navigate(`/city/${encodeURIComponent(d.city)}`)}
              title={`Open ${d.city}`}
            >
              <img src={imgUrlFor(d.city)} alt={`${d.city}, ${d.country}`} loading="lazy" />
              <div className="card-info">
                <div>
                  <h4>{d.city}</h4>
                  <p className="country">{d.country}</p>
                </div>
                <span>Explore →</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer><p>© 2025 TravelPath</p></footer>
    </div>
  );
}
