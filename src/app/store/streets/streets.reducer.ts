import { Actions, ActionType } from './streets.actions';

export function streetsReducer(state: any[] = [], action: Actions) {
  switch (action.type) {
    case ActionType.UPDATED:
      return action.payload;
    default:
      return state;
  }
}
