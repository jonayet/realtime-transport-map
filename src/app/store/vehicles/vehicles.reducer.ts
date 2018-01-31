import { Vehicles } from '../../nextbus/models';
import { Actions, ActionType } from './vehicles.actions';

export function vehiclesReducer(state: Vehicles = {}, action: Actions): Vehicles {
  switch (action.type) {
    case ActionType.UPDATED:
      return Object.assign({}, state, action.payload);
    case ActionType.REMOVE_ALL:
      return {};
    default:
      return state;
  }
}
