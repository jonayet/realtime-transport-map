import { Route } from '../nextbus/models';
import { routesReducer, RoutesEffects } from './routes';

export interface State {
  routes: Route[];
}

export const reducers = {
  routes: routesReducer
};

export const effects = [
  RoutesEffects
];

export const Routes = (state: State) => state.routes;
