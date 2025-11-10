import './App.css';
import { motion } from 'framer-motion';

function App() {
  return (
    <div className="App">
      <header className="navbar">
        <h2 className="logo">🌍 TravelPath</h2>
        <nav>
          <a href="#home">Home</a>
          <a href="#destinations">Destinations</a>
          <a href="#login">Login</a>
        </nav>
      </header>

      <section className="hero">
        <motion.div
          className="hero-text"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1>Explore the world with TravelPath</h1>
          <p>Plan your dream trips easily and discover hidden gems worldwide.</p>
          <button className="explore-btn">Start Now</button>
        </motion.div>
      </section>

      <footer>
        <p>© 2025 TravelPath. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
