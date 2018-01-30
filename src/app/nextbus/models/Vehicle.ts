export interface Vehicle {
  id: string;
  routeTag: string;
  heading: number;
  speedKmHr: number;
  dirTag: string;
  lat: number;
  lon: number;
  secsSinceReport: number;
  predictable: boolean;
}
