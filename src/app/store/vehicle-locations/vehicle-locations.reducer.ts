import { VehicleLocations } from '../../nextbus/models';
import { Actions, ActionType } from './vehicle-locations.actions';

export function vehicleLocationsReducer(state: VehicleLocations = {}, action: Actions): VehicleLocations {
  switch (action.type) {
    case ActionType.UPDATED:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}
