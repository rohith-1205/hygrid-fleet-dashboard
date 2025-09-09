import SimulationCard from "../components/SimulationCard";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import mockData from "../data/mockData";

export default function Overview() {
  return (
    <div>
      <h2>System Overview</h2>
      <div style={{ display: "flex", gap: "20px" }}>
        <SimulationCard title="Active Fleet" value={45} unit="vehicles" />
        <SimulationCard title="Hydrogen Consumed" value={320} unit="kg/day" />
        <SimulationCard title="Avg Range" value={280} unit="km" />
      </div>

      <h3>Hydrogen Usage Trend</h3>
      <LineChart width={600} height={300} data={mockData.hydrogenUsage}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="fleetA" stroke="#8884d8" />
        <Line type="monotone" dataKey="fleetB" stroke="#82ca9d" />
      </LineChart>
    </div>
  );
}
