import { Vehicles } from '../../nextbus/models';
import { Actions, ActionType } from './vehicles.actions';

export function vehiclesReducer(state: Vehicles = {}, action: Actions): Vehicles {
  switch (action.type) {
    case ActionType.UPDATED:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}
