const mockData = {
  stations: [
    { id: 1, name: "Station A", distance: 1.1, capacity: 50 },
    { id: 2, name: "Station B", distance: 3.5, capacity: 80 },
    { id: 3, name: "Station C", distance: 7.2, capacity: 65 },
  ],
  efficiency: 0.54, // fuel cell efficiency ~54%
  hydrogenUsage: [
    { day: "Mon", fleetA: 120, fleetB: 90 },
    { day: "Tue", fleetA: 135, fleetB: 110 },
    { day: "Wed", fleetA: 150, fleetB: 95 },
    { day: "Thu", fleetA: 170, fleetB: 120 },
    { day: "Fri", fleetA: 160, fleetB: 130 },
  ],
};

export default mockData;
