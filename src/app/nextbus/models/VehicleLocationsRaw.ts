export interface VehicleLocationRaw {
      heading: string;
      id: string;
      lat: string;
      lon: string;
      routeTag: string;
      predictable: string;
      secsSinceReport: string;
      speedKmHr: string;
}

export interface VehicleLocationsRaw {
  vehicle: VehicleLocationRaw [];
  lastTime: {
    time: number
  };
}
