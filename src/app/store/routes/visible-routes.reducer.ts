import { Route, Routes } from '../../nextbus/models';
import { convertToArray } from '../../transport-map/utilities';
import { Actions, ActionType } from './visible-routes.actions';

export function visibleRoutesReducer(state: Route[] = [], action: Actions): Route[] {
  switch (action.type) {
    case ActionType.SET_VISIBLE:
      return action.payload;

    default:
      return state;
  }
}
