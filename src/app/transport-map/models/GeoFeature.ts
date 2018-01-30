export interface GeoFeature<T = any> {
  type: string;
  geometry: {
    type: string;
    coordinates: number[]
  };
  properties: T;
}
