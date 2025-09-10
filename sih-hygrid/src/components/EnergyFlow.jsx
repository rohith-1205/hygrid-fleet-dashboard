import React from "react";
import "./EnergyFlow.css";

export default function EnergyFlow({ powerSource }) {
  return (
    <div className="energy-flow">
      <h3>Energy Flow</h3>
      <div className="flow-diagram">
        <div className="wheel">⚙️</div>

        {/* Animated glowing arrow */}
        <div
          className={`arrow ${powerSource === "Battery" ? "active-battery" : ""} ${
            powerSource === "Hydrogen" ? "active-hydrogen" : ""
          }`}
        ></div>

        <div className="motor">🔄</div>

        {/* Animated glowing arrow */}
        <div
          className={`arrow ${powerSource === "Battery" ? "active-battery" : ""} ${
            powerSource === "Hydrogen" ? "active-hydrogen" : ""
          }`}
        ></div>

        <div
          className={`${
            powerSource === "Battery" ? "battery" : "hydrogen"
          } storage`}
        >
          {powerSource === "Battery" ? "🔋" : "🟢 H₂"}
        </div>
      </div>
      <p>
        {powerSource === "Battery"
          ? "Power flowing from Battery → Motor → Wheels"
          : "Power flowing from Hydrogen → Fuel Cell → Motor → Wheels"}
      </p>
    </div>
  );
}
