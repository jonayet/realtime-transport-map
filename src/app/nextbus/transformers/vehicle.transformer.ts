import { Route, VehicleRaw, VehicleLocationsRaw, Vehicle, Vehicles } from '../models';

export function transformVehicles(route: Route, vehicleLocations: VehicleLocationsRaw): Vehicles {
  if (!vehicleLocations.vehicle || !vehicleLocations.vehicle.length) {
    return {};
  }
  const vehicles = vehicleLocations.vehicle
    .reduce((vehiclesMap, vehicle) => {
      vehiclesMap[route.tag + vehicle.id] = {
        id: vehicle.id,
        routeTag: vehicle.routeTag,
        dirTag: vehicle.dirTag,
        lon: Number(vehicle.lon),
        lat: Number(vehicle.lat),
        heading: Number(vehicle.heading),
        speedKmHr: Number(vehicle.speedKmHr),
        predictable: Boolean(vehicle.predictable),
        secsSinceReport: Number(vehicle.secsSinceReport)
      };
      return vehiclesMap;
    }, {} as Vehicles);
  return vehicles;
}
