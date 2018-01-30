import { Routes } from '../../nextbus/models';
import { Actions, ActionType } from './routes.actions';

export function routesReducer(state: Routes = {}, action: Actions): Routes {
  switch (action.type) {
    case ActionType.UPDATED:
    return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}
