export default function SimulationCard({ title, value, unit }) {
  return (
    <div className="sim-card">
      <h4>{title}</h4>
      <p>{value} {unit}</p>
    </div>
  );
}
