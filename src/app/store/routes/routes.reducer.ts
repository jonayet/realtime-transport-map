import { Route, Routes } from '../../nextbus/models';
import { convertToArray } from '../../transport-map/utilities';
import { Actions, ActionType } from './routes.actions';

export function routesReducer(state: Routes = {}, action: Actions): Routes {
  switch (action.type) {
    case ActionType.UPDATED:
      return Object.assign({}, state, action.payload);

    case ActionType.DETAILS_UPDATED:
      return Object.assign({}, state, action.payload);

    case ActionType.SET_VISIBLE:
      const routesMap = action.payload.reduce((map, route) => {
        map[route.tag] = true;
        return map;
      }, {});

      const routes: Routes = {};
      convertToArray<Route>(state, (r) => r).forEach((route) => {
        const isVisible = !!routesMap[route.tag];
        routes[route.tag] = { ...route, show: isVisible };
      });
      return routes;

    default:
      return state;
  }
}
