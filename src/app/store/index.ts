import { Vehicle, VehicleLocations } from '../nextbus/models';
import { streetsReducer, StreetEffects } from './streets';
import { vehiclesReducer, VehiclesEffects } from './vehicles';
import { vehicleLocationsReducer, VehicleLocationsEffects } from './vehicle-locations';

export interface State {
  streets: any[];
  vehicles: Vehicle[];
  vehicleLocations: VehicleLocations;
}

export const reducers = {
  streets: streetsReducer,
  vehicles: vehiclesReducer,
  vehicleLocations: vehicleLocationsReducer
};

export const effects = [
  StreetEffects,
  VehiclesEffects,
  VehicleLocationsEffects
];

export const StreetsStore = (state: State) => state.streets;
export const VehiclesStore = (state: State) => state.vehicles;
export const VehicleLocationsStore = (state: State) => state.vehicleLocations;
