import { Vehicle, Vehicles } from '../../nextbus/models';
import { Actions, ActionType } from './vehicles.actions';
import { convertToArray } from '../../transport-map/utilities';

export function vehiclesReducer(state: Vehicles = {}, action: Actions): Vehicles {
  switch (action.type) {
    case ActionType.UPDATED:
      return Object.assign({}, state, action.payload);

    case ActionType.SET_VISIBLE:
      const routesMap = action.payload.reduce((map, route) => {
        map[route.tag] = true;
        return map;
      }, {});
      const vehicles: Vehicles = {};

      convertToArray<Vehicle>(state, (r) => r).forEach((vehicle) => {
        const isVisible = !!routesMap[vehicle.routeTag];
        vehicles[vehicle.routeTag + vehicle.id] = {...vehicle, show: isVisible};
      });
      return vehicles;
    default:
      return state;
  }
}
