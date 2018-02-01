import { Action } from '@ngrx/store';

import { Route } from '../../nextbus/models';

export const enum ActionType {
  SET_VISIBLE = '[VISIBLE_ROUTES] SET_VISIBLE'
}

export class SetVisibleRoutes implements Action {
  readonly type = ActionType.SET_VISIBLE;

  constructor(public payload: Route[]) {}
}

export type Actions = SetVisibleRoutes;
