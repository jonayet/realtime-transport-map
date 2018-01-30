import { GeoData } from '../transport-map/models';
import { Routes, Vehicles } from '../nextbus/models';
import { streetsReducer, StreetEffects } from './streets';
import { routesReducer, RoutesEffects } from './routes';
import { vehiclesReducer, VehiclesEffects } from './vehicles';

export interface State {
  streets: GeoData;
  routes: Routes;
  vehicles: Vehicles;
}

export const reducers = {
  streets: streetsReducer,
  routes: routesReducer,
  vehicles: vehiclesReducer
};

export const effects = [
  StreetEffects,
  RoutesEffects,
  VehiclesEffects
];

export const StreetsStore = (state: State) => state.streets;
export const RoutesStore = (state: State) => state.routes;
export const VehiclesStore = (state: State) => state.vehicles;
