import { Route, VehicleLocationsRaw, VehicleLocationRaw } from '../models';
import { transformVehicleLocation } from './vehicle.transformer';

describe('Route Location Transformer', () => {
  it('location should have a key with same as vehicle.tag', () => {
    const vehicle = mockVehicle();
    const locationRaw = mockVehicleLocations();
    const location = transformVehicleLocation(vehicle, locationRaw);
    expect(location[vehicle.tag]).toBeDefined();
  });

  it('location should contain {lat, lon} from locationRaw', () => {
    const vehicle = mockVehicle();
    const locationRaw = mockVehicleLocations({vehicle: [mockVehicleLocation({lon: '321', lat: '123', })]});
    const location = transformVehicleLocation(vehicle, locationRaw);
    expect(location[vehicle.tag]).toEqual([321, 123]);
  });

  it('location should contain empty array if locationRaw.vehicle = []', () => {
    const vehicle = mockVehicle();
    const locationRaw = mockVehicleLocations({vehicle: []});
    const location = transformVehicleLocation(vehicle, locationRaw);
    expect(location[vehicle.tag]).toEqual([]);
  });

  it('location should contain empty array if locationRaw.vehicle = undefined', () => {
    const vehicle = mockVehicle();
    const locationRaw = mockVehicleLocations({vehicle: undefined});
    const location = transformVehicleLocation(vehicle, locationRaw);
    expect(location[vehicle.tag]).toEqual([]);
  });

  it('location should contain most recent location from locationRaw.vehicle', () => {
    const vehicle = mockVehicle();
    const locations = [
      mockVehicleLocation({lon: '4', lat: '3', secsSinceReport: '3'}),
      mockVehicleLocation({lon: '6', lat: '5', secsSinceReport: '9'}),
      mockVehicleLocation({lon: '2', lat: '1', secsSinceReport: '7'}),
      mockVehicleLocation({lon: '8', lat: '7', secsSinceReport: '1'}),
      mockVehicleLocation({lon: '10', lat: '9', secsSinceReport: undefined}),
    ];
    const locationRaw = mockVehicleLocations({vehicle: locations});
    const location = transformVehicleLocation(vehicle, locationRaw);
    expect(location[vehicle.tag]).toEqual([8, 7]);
  });

  it('location should contain first location if locationRaw.vehicle{secsSinceReport} are undeffined', () => {
    const vehicle = mockVehicle();
    const locations = [
      mockVehicleLocation({lon: '2', lat: '1', secsSinceReport: undefined}),
      mockVehicleLocation({lon: '4', lat: '3', secsSinceReport: undefined}),
      mockVehicleLocation({lon: '6', lat: '5', secsSinceReport: undefined}),
      mockVehicleLocation({lon: '8', lat: '7', secsSinceReport: undefined}),
      mockVehicleLocation({lon: '10', lat: '9', secsSinceReport: undefined}),
    ];
    const locationRaw = mockVehicleLocations({vehicle: locations});
    const location = transformVehicleLocation(vehicle, locationRaw);
    expect(location[vehicle.tag]).toEqual([2, 1]);
  });
});

function chooseFromList(data) {
  return data[Math.round(Math.random() * (data.length - 1))];
}

function mockVehicle({...props} = {}): Route {
  const vehicle: Route = {
    tag: chooseFromList(['E', 'F', 'G', 'H']),
    title: chooseFromList(['E Bus', 'F Train', 'G Tarm', 'H Metro']),
    ...props
  };
  return vehicle;
}

function mockVehicleLocation({...props} = {}): VehicleLocationRaw {
  const location: VehicleLocationRaw = {
        id: Math.round(Math.random() * 1000).toString(),
        lat: (Math.random() * 1000).toFixed(2),
        lon: (Math.random() * 1000).toFixed(2),
        heading: chooseFromList(['east', 'west', 'north', 'south']),
        predictable: chooseFromList(['true', 'false']),
        routeTag: chooseFromList(['E', 'F', 'G', 'H']),
        secsSinceReport: Math.round(Math.random() * 100).toString(),
        speedKmHr: Math.round(Math.random() * 100).toString(),
        ...props
      };
    return location;
}

function mockVehicleLocations({...props} = {}): VehicleLocationsRaw {
  const noOfRoutes = Math.round(Math.random() * 5);
  const routes = Array.from(Array(noOfRoutes).keys()).map(() => {
    return mockVehicleLocation();
  });

  const location: VehicleLocationsRaw = {
    vehicle: routes,
    lastTime: {
      time: 0
    },
    ...props
  };
  return location;
}
