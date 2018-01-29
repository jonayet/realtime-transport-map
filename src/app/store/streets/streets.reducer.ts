import { ExtendedFeature, GeoGeometryObjects } from 'd3';

import { Actions, ActionType } from './streets.actions';

export function streetsReducer(state: ExtendedFeature<GeoGeometryObjects, any>[] = [], action: Actions):
ExtendedFeature<GeoGeometryObjects, any>[] {
  switch (action.type) {
    case ActionType.UPDATED:
      return action.payload;
    default:
      return state;
  }
}
