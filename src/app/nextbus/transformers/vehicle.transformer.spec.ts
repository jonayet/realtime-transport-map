import { Route, VehicleLocations, VehicleRaw, Vehicle } from '../models';
import { transformVehicles } from './vehicle.transformer';

describe('Vehicle Transformer', () => {
  it('vehicles should have a unqique key with same as route.tag + vehicle.id', () => {
    const route = mockRoute();
    const vehicleLocations = mockVehicleLocations({vehicle: [mockVehicle({id: '123'})]});
    const vehicles = transformVehicles(route, vehicleLocations);
    expect(vehicles[route.tag + '123']).toBeDefined();
  });

  it('vehicles should contain {lat, lon} from vehicleLocations.vehicle', () => {
    const route = mockRoute();
    const vehicleLocations = mockVehicleLocations({vehicle: [mockVehicleLocations({id: '111', lon: '321', lat: '123'})]});
    const vehicles = transformVehicles(route, vehicleLocations);
    expect(vehicles[route.tag + '111'].lat).toEqual(123);
    expect(vehicles[route.tag + '111'].lon).toEqual(321);
  });

  it('vehicles should stay empty if vehicleLocations.vehicle = undefined or empty []', () => {
    const route = mockRoute();
    let vehicleLocations = mockVehicleLocations({vehicle: []});
    let vehicles = transformVehicles(route, vehicleLocations);
    expect(Object.keys(vehicles).length).toEqual(0);

    vehicleLocations = mockVehicleLocations({vehicle: undefined});
    vehicles = transformVehicles(route, vehicleLocations);
    expect(Object.keys(vehicles).length).toEqual(0);
  });

  it('vehicle should contain secsSinceReport', () => {
    const route = mockRoute();
    const vehicleLocations = mockVehicleLocations({vehicle: [mockVehicleLocations({id: '111', secsSinceReport: '46578'})]});
    const vehicle = transformVehicles(route, vehicleLocations);
    expect(vehicle[route.tag + '111'].secsSinceReport).toEqual(46578);
  });

  it('vehicle should contain color from route.color', () => {
    const route = mockRoute();
    const vehicleLocations = mockVehicleLocations({vehicle: [mockVehicleLocations({id: '111'})]});
    const vehicle = transformVehicles(route, vehicleLocations);
    expect(vehicle[route.tag + '111'].color).toEqual(route.color);
  });
});

function chooseFromList(data) {
  return data[Math.round(Math.random() * (data.length - 1))];
}

function mockRoute({...props} = {}): Route {
  const route: Route = {
    tag: chooseFromList(['E', 'F', 'G', 'H']),
    title: chooseFromList(['E Bus', 'F Train', 'G Tarm', 'H Metro']),
    color: chooseFromList(['red', 'green', 'blue']),
    ...props
  };
  return route;
}

function mockVehicle({...props} = {}): VehicleRaw {
  const vehicle: VehicleRaw = {
        id: Math.round(Math.random() * 1000).toString(),
        lat: (Math.random() * 1000).toFixed(6),
        lon: (Math.random() * 1000).toFixed(6),
        dirTag: chooseFromList(['east', 'west', 'north', 'south']),
        heading:  Math.round(Math.random() * 360).toString(),
        predictable: chooseFromList(['true', 'false']),
        routeTag: chooseFromList(['E', 'F', 'G', 'H']),
        secsSinceReport: Math.round(Math.random() * 100).toString(),
        speedKmHr: Math.round(Math.random() * 100).toString(),
        ...props
      };
    return vehicle;
}

function mockVehicleLocations({...props} = {}): VehicleLocations {
  const noOfRoutes = Math.round(Math.random() * 5);
  const vehicles = Array.from(Array(noOfRoutes).keys()).map(() => {
    return mockVehicle();
  });

  const vehicleLocations: VehicleLocations = {
    vehicle: vehicles,
    lastTime: {
      time: Math.round(Math.random() * 100).toString()
    },
    ...props
  };
  return vehicleLocations;
}
