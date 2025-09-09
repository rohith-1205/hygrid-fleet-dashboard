import SimulationCard from "../components/SimulationCard";

const fleetData = [
  { id: "EV-101", status: "Active", range: 300, hydrogen: "Full" },
  { id: "EV-102", status: "Idle", range: 180, hydrogen: "Half" },
  { id: "EV-103", status: "Charging", range: 220, hydrogen: "Low" },
];

export default function Fleet() {
  return (
    <div>
      <h2>Fleet Simulation</h2>
      <div style={{ display: "flex", gap: "20px" }}>
        <SimulationCard title="Total Fleet" value={50} unit="vehicles" />
        <SimulationCard title="Active Today" value={38} unit="vehicles" />
      </div>

      <h3>Vehicle Status</h3>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Status</th>
            <th>Range (km)</th>
            <th>Hydrogen Level</th>
          </tr>
        </thead>
        <tbody>
          {fleetData.map((v) => (
            <tr key={v.id}>
              <td>{v.id}</td>
              <td>{v.status}</td>
              <td>{v.range}</td>
              <td>{v.hydrogen}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
