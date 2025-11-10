import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import CityPage from "./CityPage";
import Login from "./auth/Login";
import Signup from "./auth/Signup.js";
import "./App.css";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/city/:cityName" element={<CityPage/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
      </Routes>
    </Router>
  );
}
