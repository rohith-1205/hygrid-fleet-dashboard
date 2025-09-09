import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h2>Hygrid Mobility</h2>
      <nav>
        <ul>
          <li><Link to="/">Overview</Link></li>
          <li><Link to="/fleet">Fleet</Link></li>
          <li><Link to="/stations">Stations</Link></li>
          <li><Link to="/policy">Policy</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
        </ul>
      </nav>
    </aside>
  );
}
