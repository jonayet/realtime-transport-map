import { GeoFeature, GeoData } from '../models';

export function convertToArray<T = any>(source: {}, tranformFn: (item: any) => T): T[] {
  return Object.keys(source).reduce((prev, key) => {
    const item = source[key];
    prev.push(tranformFn(item));
    return prev;
  }, [] as T[]);
}

export function convertToGeoData<T = any>(source: {}): GeoData<T> {
  const features = convertToArray<GeoFeature>(source, (item) => {
    const {lon, lat, ...properties} = item;
    return {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [lon, lat]
      },
      properties: properties
    };
  });

  return {
    type: 'FeatureCollection',
    features
  };
}
