import { Route } from '../nextbus/models';
import { streetsReducer, StreetEffects } from './streets';
import { routesReducer, RoutesEffects } from './routes';

export interface State {
  streets: any[];
  routes: Route[];
}

export const reducers = {
  streets: streetsReducer,
  routes: routesReducer
};

export const effects = [
  StreetEffects,
  RoutesEffects
];

export const Streets = (state: State) => state.streets;
export const Routes = (state: State) => state.routes;
