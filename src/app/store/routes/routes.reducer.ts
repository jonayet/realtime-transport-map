import { Route } from '../../nextbus/models';
import { Actions, ActionType } from './routes.actions';

export function routesReducer(state: Route[] = [], action: Actions): Route[] {
  switch (action.type) {
    case ActionType.UPDATED:
      return action.payload;
    default:
      return state;
  }
}
