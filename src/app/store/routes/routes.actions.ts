import { Action } from '@ngrx/store';

import { Route, Routes } from '../../nextbus/models';

export const enum ActionType {
  UPDATE = '[ROUTES] UPDATE',
  UPDATE_DETAILS = '[ROUTES] UPDATE_DETAILS',
  UPDATED = '[ROUTES] UPDATED',
  DETAILS_UPDATED = '[ROUTES] DETAILS_UPDATE'
}

export class UpdateRoutes implements Action {
  readonly type = ActionType.UPDATE;
}

export class RoutesUpdated implements Action {
  readonly type = ActionType.UPDATED;

  constructor(public payload: Routes) {}
}

export class UpdateRouteDetails implements Action {
  readonly type = ActionType.UPDATE_DETAILS;

  constructor(public payload: Route) {}
}

export class RouteDetailsUpdated implements Action {
  readonly type = ActionType.DETAILS_UPDATED;

  constructor(public payload: Routes) {}
}

export type Actions = UpdateRoutes
| RoutesUpdated
| UpdateRouteDetails
| RouteDetailsUpdated;
