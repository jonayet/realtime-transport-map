import { Stop, Stops } from '../../nextbus/models';
import { Actions, ActionType } from './stops.actions';
import { convertToArray } from '../../transport-map/utilities';

export function stopsReducer(state: Stops = {}, action: Actions): Stops {
  switch (action.type) {
    case ActionType.UPDATE:
      return Object.assign({}, state, action.payload);

    case ActionType.SET_VISIBLE:
      const routesMap = action.payload.reduce((map, route) => {
        map[route.tag] = true;
        return map;
      }, {});
      const stops: Stops = {};

      convertToArray<Stop>(state, (s) => s).forEach((stop) => {
        const isVisible = !!routesMap[stop.tag];
        stops[stop.routeTag + stop.tag] = {...stop, show: isVisible};
      });
      return stops;

    default:
      return state;
  }
}
