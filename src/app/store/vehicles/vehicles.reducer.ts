import { Vehicle } from '../../nextbus/models';
import { Actions, ActionType } from './vehicles.actions';

export function vehiclesReducer(state: Vehicle[] = [], action: Actions): Vehicle[] {
  switch (action.type) {
    case ActionType.UPDATED:
      return action.payload;
    default:
      return state;
  }
}
