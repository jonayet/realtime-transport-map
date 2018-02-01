import { GeoFeature, GeoData } from '../models';

export function convertToArray<T = any>(source: {}, tranformFn: (item: any) => T): T[] {
  return Object.keys(source).reduce((prev, key) => {
    const item = source[key];
    const value = tranformFn(item);
    if (value !== undefined) {
      prev.push(value);
    }
    return prev;
  }, [] as T[]);
}

export function convertToGeoData<T = any>(source: {}): GeoData<T> {
  const features = convertToArray<GeoFeature>(source, (item) => {
    if (item.show === false) {
      return;
    }
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
