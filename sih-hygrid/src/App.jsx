import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Overview from "./pages/Overview.jsx";
import Fleet from "./pages/Fleet.jsx";
import Stations from "./pages/Stations.jsx";
import Policy from "./pages/Policy.jsx";

export default function App() {
  return (
    <Router>
      <div className="app-shell">
        <aside className="sidebar">
          <h2>Hygrid SIH</h2>
          <nav>
            <ul>
              <li><Link to="/">Overview</Link></li>
              <li><Link to="/fleet">Fleet</Link></li>
              <li><Link to="/stations">Stations</Link></li>
              <li><Link to="/policy">Policy</Link></li>
            </ul>
          </nav>
          <div className="footer-note">Rohith — SIH Plan</div>
        </aside>

        <main className="content">
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/fleet" element={<Fleet />} />
            <Route path="/stations" element={<Stations />} />
            <Route path="/policy" element={<Policy />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
