import { GeoData } from '../../transport-map/models';
import { Actions, ActionType } from './arteries.actions';

export function arteriesReducer(state: GeoData = {type: '', features: []}, action: Actions): GeoData {
  switch (action.type) {
    case ActionType.UPDATED:
      return action.payload;
    default:
      return state;
  }
}
