import { Action } from '@ngrx/store';

import { Route, Vehicles } from '../../nextbus/models';

export const enum ActionType {
  UPDATE = '[VEHICLES] UPDATE',
  REMOVE_ALL = '[VEHICLES] REMOVE_ALL',
  UPDATED = '[VEHICLES] UPDATED'
}

export class UpdateVehicles implements Action {
  readonly type = ActionType.UPDATE;

  constructor(public payload: Route) {}
}

export class RemoveAllVehicles implements Action {
  readonly type = ActionType.REMOVE_ALL;
}

export class VehiclesUpdated implements Action {
  readonly type = ActionType.UPDATED;

  constructor(public payload: Vehicles) {}
}

export type Actions = UpdateVehicles | VehiclesUpdated | RemoveAllVehicles;
