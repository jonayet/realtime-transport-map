import { Action } from '@ngrx/store';

import { Route } from '../../nextbus/models';

export const enum ActionType {
  UPDATE = '[ROUTES] UPDATE',
  UPDATED = '[ROUTES] UPDATED'
}

export class UpdateRoutes implements Action {
  readonly type = ActionType.UPDATE;
}

export class RoutesUpdated implements Action {
  readonly type = ActionType.UPDATED;

  constructor(public payload: Route[]) {}
}

export type Actions = UpdateRoutes | RoutesUpdated;
