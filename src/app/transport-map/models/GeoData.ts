import { GeoFeature } from './GeoFeature';

export interface GeoData<T = any> {
  type: string;
  features: GeoFeature<T>[];
}
