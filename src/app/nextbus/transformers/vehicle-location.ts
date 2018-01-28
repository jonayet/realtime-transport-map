import { Vehicle, VehicleLocationsRaw, VehicleLocationRaw, VehicleLocation } from '../models';

export function transformToVehicleLocation(vehicle: Vehicle, locations: VehicleLocationsRaw): VehicleLocation {
  const vehiclelocation = {
    [vehicle.tag]: []
  };
  if (!locations.vehicle || !locations.vehicle.length) {
    return vehiclelocation;
  }
  const locationMap = locations.vehicle
    .reduce((map, location) => {
      if (location.secsSinceReport) {
        map[location.secsSinceReport] = location;
      }
      return map;
    }, {});

  const locationKeys = Object.keys(locationMap).map(k => Number(k));
  if (!locationKeys.length) {
    const defaultLocation = locations.vehicle[0];
    vehiclelocation[vehicle.tag] = [Number(defaultLocation.lat), Number(defaultLocation.lon)];
    return vehiclelocation;
  }
  const mostRecetTime = Math.min(...locationKeys);
  const mostRecetLocation = locationMap[mostRecetTime.toString()];
  vehiclelocation[vehicle.tag] = [Number(mostRecetLocation.lat), Number(mostRecetLocation.lon)];
  return vehiclelocation;
}
