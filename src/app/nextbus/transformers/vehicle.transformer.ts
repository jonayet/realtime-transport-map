import { Route, VehicleRaw, VehicleLocationsRaw, Vehicle, Vehicles } from '../models';

export function transformVehicles(route: Route, vehicleLocations: VehicleLocationsRaw): Vehicles {
  if (!vehicleLocations.vehicle || !vehicleLocations.vehicle.length) {
    return {};
  }
  const vehicles = vehicleLocations.vehicle
    .reduce((vehiclesMap, vehicle) => {
      vehiclesMap[route.tag + vehicle.id] = {
        id: vehicle.id,
        heading: Number(vehicle.heading),
        position: [Number(vehicle.lon), Number(vehicle.lat)],
        routeTag: vehicle.routeTag,
        speedKmHr: Number(vehicle.speedKmHr)
      };
      return vehiclesMap;
    }, {} as Vehicles);
  return vehicles;
}
