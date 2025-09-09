import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Custom marker icon (fixes missing marker issue in Leaflet)
const markerIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const stationData = [
  { name: "Station A - Gandhipuram", coords: [11.0174, 76.9563], capacity: 70 },
  { name: "Station B - Peelamedu", coords: [11.0170, 77.0380], capacity: 50 },
  { name: "Station C - Singanallur", coords: [10.9985, 77.0326], capacity: 90 },
  { name: "Station D - Ukkadam", coords: [10.9880, 76.9500], capacity: 60 },
];

export default function Stations() {
  return (
    <div>
      <h2>Hydrogen Stations in Coimbatore</h2>
      <p>Simulated map of hydrogen refueling stations.</p>

      <MapContainer 
        center={[11.0168, 76.9558]} // Coimbatore center
        zoom={12} 
        style={{ height: "500px", width: "100%", borderRadius: "12px", marginTop: "15px" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {stationData.map((station, index) => (
          <Marker 
            key={index} 
            position={station.coords} 
            icon={markerIcon}
          >
            <Popup>
              <b>{station.name}</b> <br />
              Capacity: {station.capacity} kg/day
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
