import { stations } from "../data/mockData";

export default function Stations() {
  return (
    <div>
      <h1>Stations</h1>

      <div className="page-card">
        <h3>Hydrogen Mini-stations (mock)</h3>
        {stations.map((s) => (
          <div key={s.id} className="list-item">
            <strong>{s.name}</strong>
            <div>Location: {s.lat.toFixed(4)}, {s.lng.toFixed(4)}</div>
            <div>Available canisters: {s.canisters}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
