import { Action } from '@ngrx/store';

import { Route, Vehicles } from '../../nextbus/models';

export const enum ActionType {
  UPDATE = '[VEHICLES] UPDATE',
  UPDATED = '[VEHICLES] UPDATED',
  SET_VISIBLE = '[VEHICLES] SET_VISIBLE'
}

export class UpdateVehicles implements Action {
  readonly type = ActionType.UPDATE;

  constructor(public payload: Route) {}
}

export class VehiclesUpdated implements Action {
  readonly type = ActionType.UPDATED;

  constructor(public payload: Vehicles) {}
}

export class SetVisibleVehicles implements Action {
  readonly type = ActionType.SET_VISIBLE;

  constructor(public payload: Route[]) {}
}

export type Actions = UpdateVehicles
| VehiclesUpdated
| SetVisibleVehicles;
