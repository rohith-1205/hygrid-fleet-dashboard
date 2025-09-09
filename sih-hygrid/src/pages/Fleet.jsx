import { vehicles } from "../data/mockData";

export default function Fleet() {
  return (
    <div>
      <h1>Fleet</h1>

      <div className="page-card">
        <h3>Vehicle list (mock data)</h3>
        {vehicles.map((v) => (
          <div key={v.id} className="list-item">
            <strong>{v.id} — {v.type}</strong>
            <div>Location: {v.lat.toFixed(4)}, {v.lng.toFixed(4)}</div>
            <div>H₂: {v.hydrogen}% • Battery: {v.battery}%</div>
            <div>Status: {v.status}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
