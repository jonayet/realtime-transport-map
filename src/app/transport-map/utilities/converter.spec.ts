import { convertToArray, convertToGeoData } from './converter';

describe('Converter', () => {
  it('convertToArray should convert object to array', () => {
    const test = convertToArray({'1': 'A', 2: 'B', 'C': 'C'}, (v) => v);
    expect(test).toEqual(['A', 'B', 'C']);
  });

  it('convertToArray should convert to array using transform function', () => {
    const test = convertToArray({'1': 'A', 2: 'B', 'C': 'C'}, (v) => {
      return v.toLowerCase();
    });
    expect(test).toEqual(['a', 'b', 'c']);
  });

  it('convertToGeoData should convert geometry', () => {
    const geoData = convertToGeoData({
      'a': {
        lat: 123,
        lon: 321,
        color: 'red'
      }
    });

    expect(geoData.features[0].geometry).toEqual({
      type: 'Point',
      coordinates: [321, 123]}
    );
  });

  it('geoData should have properties.color', () => {
    const geoData = convertToGeoData({
      'a': {
        color: 'red'
      }
    });

    expect(geoData.features[0].properties).toEqual({
      color: 'red'
    });
  });

  it('geoData should not have properties.lat or properties.lon', () => {
    const geoData = convertToGeoData({
      'a': {
        lat: 123,
        lon: 321,
      }
    });

    expect(geoData.features[0].properties.lat).toBeUndefined();
    expect(geoData.features[0].properties.lon).toBeUndefined();
  });
});

function chooseFromList(data) {
  return data[Math.round(Math.random() * (data.length - 1))];
}
