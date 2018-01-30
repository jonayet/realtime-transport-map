export interface Vehicle {
  id: string;
  routeTag: string;
  heading: number;
  speedKmHr: number;
  lat: number;
  lon: number;
  secsSinceReport: number;
  color: string;
}
