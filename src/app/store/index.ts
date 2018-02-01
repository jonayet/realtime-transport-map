import { GeoData } from '../transport-map/models';
import { Route, Routes, Vehicles, Stop } from '../nextbus/models';
import { streetsReducer, StreetEffects } from './streets';
import { routesReducer, RoutesEffects, visibleRoutesReducer } from './routes';
import { vehiclesReducer, VehiclesEffects } from './vehicles';
import { stopsReducer } from './stops';

export interface State {
  streets: GeoData;
  routes: Routes;
  visibleRoutes: Route[];
  vehicles: Vehicles;
  stops: Stop[];
}

export const reducers = {
  streets: streetsReducer,
  routes: routesReducer,
  visibleRoutes: visibleRoutesReducer,
  vehicles: vehiclesReducer,
  stops: stopsReducer
};

export const effects = [
  StreetEffects,
  RoutesEffects,
  VehiclesEffects
];

export const StreetsStore = (state: State) => state.streets;
export const RoutesStore = (state: State) => state.routes;
export const VisibleRoutesStore = (state: State) => state.visibleRoutes;
export const VehiclesStore = (state: State) => state.vehicles;
export const StopsStore = (state: State) => state.stops;
