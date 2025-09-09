import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Overview from "./pages/Overview";
import Fleet from "./pages/Fleet";
import Stations from "./pages/Stations";
import Policy from "./pages/Policy";
import Dashboard from "./pages/Dashboard";
import "./App.css";

export default function App() {
  return (
    <Router>
      <div className="app-shell">
        <aside className="sidebar">
          <h2>Hydrogen SIH</h2>
          <nav>
            <ul>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/overview">Overview</Link></li>
              <li><Link to="/fleet">Fleet</Link></li>
              <li><Link to="/stations">Stations</Link></li>
              <li><Link to="/policy">Policy</Link></li>
            </ul>
          </nav>
        </aside>
        <main className="content">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/fleet" element={<Fleet />} />
            <Route path="/stations" element={<Stations />} />
            <Route path="/policy" element={<Policy />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
