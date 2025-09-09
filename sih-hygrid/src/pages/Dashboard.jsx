import { useState, useEffect } from "react";
import mockData from "../data/mockData";

export default function Dashboard() {
  const maxTank = 5; // Max hydrogen tank capacity in kg
  const [speed, setSpeed] = useState(60);
  const [hydrogen, setHydrogen] = useState(4.2); // initial hydrogen in kg
  const [kms, setKms] = useState(0);

  const efficiency = mockData.efficiency;
  const kmPerKg = 125; // 125 km per 1 kg H₂

  // Hydrogen & range calculation
  const hydrogenUsed = kms / kmPerKg;
  const remainingHydrogen = Math.max(hydrogen - hydrogenUsed, 0);
  const estimatedRange = remainingHydrogen * kmPerKg;

  // Consumption rate (kg/100km)
  const consumptionRate = (1 / kmPerKg) * 100;

  // Nearest station
  const nearestStation = mockData.stations.reduce((prev, curr) =>
    prev.distance < curr.distance ? prev : curr
  );

  // Refill logic
  const refillNeeded = maxTank - remainingHydrogen;
  const refillCost = refillNeeded * 450;

  const handleRefill = () => {
    alert(
      `Refilled ${refillNeeded.toFixed(2)} kg Green H₂ for ₹${refillCost.toFixed(
        2
      )}`
    );
    setHydrogen(maxTank); // reset tank to full
    setKms(0); // reset travel count
  };

  // Alert driver when remaining range < 20 km
  useEffect(() => {
    if (estimatedRange > 0 && estimatedRange <= 20) {
      alert(
        `⚠️ Low Range Alert! Only ${estimatedRange.toFixed(
          1
        )} km left. Nearest Station: ${nearestStation.name} (${nearestStation.distance} km away)`
      );
    }
  }, [estimatedRange, nearestStation]);

  return (
    <div>
      <h2>Hydrogen EV Dashboard</h2>
      <div style={{ display: "flex", gap: "20px" }}>
        {/* Vehicle status */}
        <div className="card" style={{ width: "45%" }}>
          <h3>Vehicle Status</h3>
          <p><b>Speed:</b> {speed} km/h</p>
          <p><b>Hydrogen Left:</b> {remainingHydrogen.toFixed(2)} kg</p>

          {/* Progress Bar for Hydrogen */}
          <div className="progress-container">
            <div
              className="progress-bar"
              style={{ width: `${(remainingHydrogen / maxTank) * 100}%` }}
            ></div>
          </div>

          <p><b>Estimated Range:</b> {estimatedRange.toFixed(1)} km</p>
          <p><b>Fuel Cell Efficiency:</b> {(efficiency * 100).toFixed(0)}%</p>
          <p><b>Consumption Rate:</b> {consumptionRate.toFixed(2)} kg/100km</p>
          <p><b>Kms Travelled:</b> {kms} km</p>
          <p><b>Nearest Station:</b> {nearestStation.name} ({nearestStation.distance} km away)</p>

          {/* Alerts */}
          {estimatedRange > 0 && estimatedRange <= 20 && (
            <div className="alert warning">
              ⚠ Low Range! Only {estimatedRange.toFixed(1)} km left.
              Nearest Station: {nearestStation.name} ({nearestStation.distance} km)
            </div>
          )}
          {estimatedRange <= 0 && (
            <div className="alert danger">
              🚫 Tank Empty! Please refill.
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="card" style={{ width: "45%" }}>
          <h3>Controls</h3>
          <label>Speed: {speed} km/h</label>
          <input
            type="range"
            min="0"
            max="120"
            value={speed}
            onChange={(e) => setSpeed(e.target.value)}
          />

          <label>Hydrogen (initial tank fill): {hydrogen.toFixed(2)} kg</label>
          <input
            type="range"
            min="0"
            max={maxTank}
            step="0.1"
            value={hydrogen}
            onChange={(e) => setHydrogen(parseFloat(e.target.value))}
          />

          <label>Kms Travelled: {kms} km</label>
          <input
            type="number"
            value={kms}
            onChange={(e) =>
              setKms(
                estimatedRange > 0 ? parseFloat(e.target.value) || 0 : kms
              )
            }
            disabled={estimatedRange <= 0} // disable when no range
          />
          {estimatedRange <= 0 && (
            <p style={{ color: "red", marginTop: "8px" }}>
              🚫 Cannot travel — Tank Empty! Please refill.
            </p>
          )}
        </div>
      </div>

      {/* Trip Planner */}
      <div className="card" style={{ marginTop: "20px" }}>
        <h3>Trip Planner / Savings</h3>
        <p>CO₂ saved vs petrol: ~{(kms * 0.26).toFixed(1)} kg</p>
        <button>Plan route with refuels</button>
      </div>

      {/* Refill Section */}
      <div className="card" style={{ marginTop: "20px" }}>
        <h3>Refuel Hydrogen</h3>
        <p>Tank Capacity: {maxTank} kg</p>
        <p>Hydrogen Needed to Full: {refillNeeded.toFixed(2)} kg</p>
        <p>Refill Cost (@ ₹450/kg): ₹{refillCost.toFixed(2)}</p>
        <button onClick={handleRefill}>Refill Now</button>
      </div>
    </div>
  );
}
