import { Route, VehicleRaw, VehicleLocations, Vehicle, Vehicles } from '../models';

export function transformVehicles(route: Route, vehicleLocations: VehicleLocations): Vehicles {
  if (!vehicleLocations.vehicle || !vehicleLocations.vehicle.length) {
    return {};
  }
  const vehicles = vehicleLocations.vehicle
    .reduce((vehiclesMap, vehicle) => {
      vehiclesMap[route.tag + vehicle.id] = {
        id: vehicle.id,
        routeTag: vehicle.routeTag,
        lon: Number(vehicle.lon),
        lat: Number(vehicle.lat),
        heading: Number(vehicle.heading),
        speedKmHr: Number(vehicle.speedKmHr),
        secsSinceReport: Number(vehicle.secsSinceReport),
        color: route.color
      };
      return vehiclesMap;
    }, {} as Vehicles);
  return vehicles;
}
