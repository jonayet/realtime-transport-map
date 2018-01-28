import { Vehicle, VehicleLocationsRaw, VehicleLocationRaw } from '../models';
import { transformToVehicleLocation } from './vehicle-location';

describe('Vehicle Location Transformer', () => {
  it('location should have a key with same as vehicle.tag', () => {
    const vehicle = mockVehicle();
    const locationRaw = mockVehicleLocations();
    const location = transformToVehicleLocation(vehicle, locationRaw);
    expect(location[vehicle.tag]).toBeDefined();
  });

  it('location should contain {lat, lon} from locationRaw', () => {
    const vehicle = mockVehicle();
    const locationRaw = mockVehicleLocations({vehicle: [mockVehicleLocation({lat: '123', lon: '321'})]});
    const location = transformToVehicleLocation(vehicle, locationRaw);
    expect(location[vehicle.tag]).toEqual([123, 321]);
  });

  it('location should contain empty array if locationRaw.vehicle = []', () => {
    const vehicle = mockVehicle();
    const locationRaw = mockVehicleLocations({vehicle: []});
    const location = transformToVehicleLocation(vehicle, locationRaw);
    expect(location[vehicle.tag]).toEqual([]);
  });

  it('location should contain empty array if locationRaw.vehicle = undefined', () => {
    const vehicle = mockVehicle();
    const locationRaw = mockVehicleLocations({vehicle: undefined});
    const location = transformToVehicleLocation(vehicle, locationRaw);
    expect(location[vehicle.tag]).toEqual([]);
  });

  it('location should contain most recent location from locationRaw.vehicle', () => {
    const vehicle = mockVehicle();
    const locations = [
      mockVehicleLocation({lat: '1', lon: '2', secsSinceReport: '7'}),
      mockVehicleLocation({lat: '3', lon: '4', secsSinceReport: '3'}),
      mockVehicleLocation({lat: '5', lon: '6', secsSinceReport: '9'}),
      mockVehicleLocation({lat: '7', lon: '8', secsSinceReport: '1'}),
      mockVehicleLocation({lat: '9', lon: '10', secsSinceReport: undefined}),
    ];
    const locationRaw = mockVehicleLocations({vehicle: locations});
    const location = transformToVehicleLocation(vehicle, locationRaw);
    expect(location[vehicle.tag]).toEqual([7, 8]);
  });

  it('location should contain first location if locationRaw.vehicle{secsSinceReport} are undeffined', () => {
    const vehicle = mockVehicle();
    const locations = [
      mockVehicleLocation({lat: '1', lon: '2', secsSinceReport: undefined}),
      mockVehicleLocation({lat: '3', lon: '4', secsSinceReport: undefined}),
      mockVehicleLocation({lat: '5', lon: '6', secsSinceReport: undefined}),
      mockVehicleLocation({lat: '7', lon: '8', secsSinceReport: undefined}),
      mockVehicleLocation({lat: '9', lon: '10', secsSinceReport: undefined}),
    ];
    const locationRaw = mockVehicleLocations({vehicle: locations});
    const location = transformToVehicleLocation(vehicle, locationRaw);
    expect(location[vehicle.tag]).toEqual([1, 2]);
  });
});

function chooseFromList(data) {
  return data[Math.round(Math.random() * (data.length - 1))];
}

function mockVehicle({...props} = {}): Vehicle {
  const vehicle: Vehicle = {
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
  const noOfVehicles = Math.round(Math.random() * 5);
  const vehicles = Array.from(Array(noOfVehicles).keys()).map(() => {
    return mockVehicleLocation();
  });

  const location: VehicleLocationsRaw = {
    vehicle: vehicles,
    lastTime: {
      time: 0
    },
    ...props
  };
  return location;
}
