import { Vehicle, VehicleLocationsRaw, VehicleLocationRaw, VehicleLocation } from '../models';

export function transformVehicleLocation(vehicle: Vehicle, locations: VehicleLocationsRaw): VehicleLocation {
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
    vehiclelocation[vehicle.tag] = [Number(defaultLocation.lon), Number(defaultLocation.lat)];
    return vehiclelocation;
  }
  const mostRecetTime = Math.min(...locationKeys);
  const mostRecetLocation = locationMap[mostRecetTime.toString()];
  vehiclelocation[vehicle.tag] = [Number(mostRecetLocation.lon), Number(mostRecetLocation.lat)];
  return vehiclelocation;
}
