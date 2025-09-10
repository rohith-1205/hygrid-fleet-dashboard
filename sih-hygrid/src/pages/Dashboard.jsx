import React, { useState, useEffect, useRef } from "react";
import mockData from "../data/mockData";
import EnergyFlow from "../components/EnergyFlow";

export default function Dashboard() {
  const maxHydrogen = 5; // kg
  const kmPerKg = 125; // 125 km per 1 kg H2
  const batteryFullRange = 250; // km

  // states
  const [speed, setSpeed] = useState(20);
  const [hydrogen, setHydrogen] = useState(maxHydrogen); // kg
  const [battery, setBattery] = useState(batteryFullRange); // km
  const [tripInput, setTripInput] = useState(""); // typed by user
  const [totalKms, setTotalKms] = useState(0); // cumulative km driven

  const lowAlertShownRef = useRef(false);

  // power source rule
  const powerSource = speed < 30 ? "Battery" : "Hydrogen";

  // computed ranges
  const hydrogenRange = hydrogen * kmPerKg; // km available from hydrogen
  const batteryRange = battery; // km available from battery
  const totalRange = hydrogenRange + batteryRange;

  // nearest station (from mockData)
  const nearestStation =
    mockData.stations && mockData.stations.length
      ? mockData.stations.reduce((prev, cur) =>
          prev.distance < cur.distance ? prev : cur
        )
      : { name: "N/A", distance: 0 };

  // One-time low-range alert when totalRange <= 20
  useEffect(() => {
    if (totalRange > 20) {
      lowAlertShownRef.current = false; // allow future alerts
    } else if (totalRange > 0 && totalRange <= 20 && !lowAlertShownRef.current) {
      lowAlertShownRef.current = true;
      // show single alert
      alert(
        `⚠️ Low Range Alert: only ${totalRange.toFixed(
          1
        )} km left. Nearest station: ${nearestStation.name} (${nearestStation.distance} km)`
      );
    }
  }, [totalRange, nearestStation]);

  // Drive handler (called when user presses Drive)
  const handleDrive = (e) => {
    e.preventDefault();
    const requested = parseFloat(tripInput);
    if (isNaN(requested) || requested <= 0) return;

    if (totalRange <= 0) {
      alert("🚫 Cannot travel — no power left. Refill or recharge first.");
      return;
    }

    let remainingTrip = requested;
    let drove = 0;

    // Helper closures to update states after calculation (use functional updates)
    // We'll compute newBattery/newHydrogen then set states once

    let newBattery = battery;
    let newHydrogen = hydrogen;

    if (powerSource === "Battery") {
      // First consume battery
      const batteryPossible = newBattery;
      const useFromBattery = Math.min(remainingTrip, batteryPossible);
      newBattery = Math.max(0, newBattery - useFromBattery);
      remainingTrip -= useFromBattery;
      drove += useFromBattery;

      // If needed, fallback to hydrogen
      if (remainingTrip > 0 && newHydrogen > 0) {
        const hydrogenPossibleKm = newHydrogen * kmPerKg;
        const useFromHydrogenKm = Math.min(remainingTrip, hydrogenPossibleKm);
        const useFromHydrogenKg = useFromHydrogenKm / kmPerKg;
        newHydrogen = Math.max(0, newHydrogen - useFromHydrogenKg);
        remainingTrip -= useFromHydrogenKm;
        drove += useFromHydrogenKm;

        if (useFromHydrogenKm < requested - useFromBattery) {
          // hydrogen exhausted
          alert("⚠ Hydrogen depleted while driving. Please refill.");
        }
      } else if (remainingTrip > 0 && newHydrogen <= 0) {
        alert("⚠ Battery + Hydrogen insufficient to complete requested trip.");
      }
    } else {
      // powerSource === "Hydrogen"
      const hydrogenPossibleKm = newHydrogen * kmPerKg;
      const useFromHydrogenKm = Math.min(remainingTrip, hydrogenPossibleKm);
      const useFromHydrogenKg = useFromHydrogenKm / kmPerKg;
      newHydrogen = Math.max(0, newHydrogen - useFromHydrogenKg);
      remainingTrip -= useFromHydrogenKm;
      drove += useFromHydrogenKm;

      // fallback to battery if needed
      if (remainingTrip > 0 && newBattery > 0) {
        const useFromBattery = Math.min(remainingTrip, newBattery);
        newBattery = Math.max(0, newBattery - useFromBattery);
        remainingTrip -= useFromBattery;
        drove += useFromBattery;

        if (useFromBattery < requested - useFromHydrogenKm) {
          alert("⚠ Battery depleted while driving. Please recharge.");
        }
      } else if (remainingTrip > 0 && newBattery <= 0) {
        alert("⚠ Hydrogen + Battery insufficient to complete requested trip.");
      }
    }

    // Commit state updates
    setBattery((_) => newBattery);
    setHydrogen((_) => newHydrogen);
    setTotalKms((prev) => prev + drove);

    // clear input once processed
    setTripInput("");
  };

  // Refill hydrogen function
  const handleRefill = () => {
    const refillKg = Math.max(0, maxHydrogen - hydrogen);
    if (refillKg <= 0) {
      alert("Tank already full.");
      return;
    }
    const cost = refillKg * 450;
    if (confirm(`Refill ${refillKg.toFixed(2)} kg for ₹${cost.toFixed(2)}?`)) {
      setHydrogen(maxHydrogen);
      alert(`✅ Refueled ${refillKg.toFixed(2)} kg for ₹${cost.toFixed(2)}`);
    }
  };

  // Recharge battery function
  const handleRecharge = () => {
    const need = Math.max(0, batteryFullRange - battery);
    if (need <= 0) {
      alert("Battery already full.");
      return;
    }
    setBattery(batteryFullRange);
    alert(`🔋 Battery recharged +${need.toFixed(1)} km`);
  };

  return (
    <div>
      <h2>Hybrid Hydrogen-EV Dashboard</h2>

      <div style={{ display: "flex", gap: 20 }}>
        {/* status */}
        <div className="card" style={{ width: "45%" }}>
          <h3>Vehicle Status</h3>
          <p><b>Speed:</b> {speed} km/h</p>
          <p><b>Power Source:</b> {powerSource}</p>

          <p><b>Battery Range:</b> {battery.toFixed(1)} km</p>
          <div className="progress-container">
            <div className="progress-bar" style={{ width: `${(battery / batteryFullRange) * 100}%` }} />
          </div>

          <p style={{ marginTop: 12 }}><b>Hydrogen Range:</b> {hydrogenRange.toFixed(1)} km ({hydrogen.toFixed(2)} kg)</p>
          <div className="progress-container">
            <div className="progress-bar" style={{ width: `${(hydrogen / maxHydrogen) * 100}%` }} />
          </div>

          <p style={{ marginTop: 12 }}><b>Total Effective Range:</b> {totalRange.toFixed(1)} km</p>
          <p><b>Total Distance Travelled:</b> {totalKms.toFixed(1)} km</p>
          <p><b>Nearest Station:</b> {nearestStation.name} ({nearestStation.distance} km)</p>

          {totalRange > 0 && totalRange <= 20 && (
            <div className="alert warning">⚠ Low range: {totalRange.toFixed(1)} km — nearest {nearestStation.name}</div>
          )}
          {totalRange <= 0 && (
            <div className="alert danger">🚫 No power left. Refill or recharge to continue.</div>
          )}
        </div>

        {/* controls */}
        <div className="card" style={{ width: "45%" }}>
          <h3>Controls</h3>

          <label>Speed: {speed} km/h</label>
          <input
            type="range"
            min="0"
            max="120"
            value={speed}
            onChange={(e) => setSpeed(parseInt(e.target.value, 10))}
          />

          <form onSubmit={handleDrive} style={{ marginTop: 12 }}>
            <label>Distance to drive (km)</label>
            <input
              type="number"
              min="0"
              step="0.1"
              value={tripInput}
              onChange={(e) => setTripInput(e.target.value)}
              disabled={totalRange <= 0}
              style={{ width: "100%", padding: 8, marginTop: 6 }}
            />
            <div style={{ marginTop: 10 }}>
              <button type="submit" disabled={totalRange <= 0}>Drive</button>
            </div>
          </form>
        </div>
      </div>

      <div className="card" style={{ marginTop: 20 }}>
        <h3>Refuel & Recharge</h3>
        <p>Hydrogen to full: {(maxHydrogen - hydrogen).toFixed(2)} kg • Cost: ₹{((maxHydrogen - hydrogen) * 450).toFixed(2)}</p>
        <button onClick={handleRefill}>Refill Hydrogen</button>
        <button style={{ marginLeft: 10, background: "#118ab2" }} onClick={handleRecharge}>Recharge Battery</button>
      </div>

      {/* Energy flow visualization */}
      <EnergyFlow powerSource={powerSource} />
    </div>
  );
}
