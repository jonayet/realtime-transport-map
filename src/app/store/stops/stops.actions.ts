import { Action } from '@ngrx/store';

import { Route, Stops } from '../../nextbus/models';

export const enum ActionType {
  UPDATE = '[STOPES] UPDATE',
  SET_VISIBLE = '[STOPES] SET_VISIBLE'
}

export class UpdateStops implements Action {
  readonly type = ActionType.UPDATE;

  constructor(public payload: Stops) {}
}

export class SetVisibleStops implements Action {
  readonly type = ActionType.SET_VISIBLE;

  constructor(public payload: Route[]) {}
}

export type Actions = UpdateStops
| SetVisibleStops;
