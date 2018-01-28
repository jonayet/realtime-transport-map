import { Action } from '@ngrx/store';

import { Vehicle } from '../../nextbus/models';

export const enum ActionType {
  UPDATE = '[VEHICLES] UPDATE',
  UPDATED = '[VEHICLES] UPDATED'
}

export class UpdateVehicles implements Action {
  readonly type = ActionType.UPDATE;
}

export class VehiclesUpdated implements Action {
  readonly type = ActionType.UPDATED;

  constructor(public payload: Vehicle[]) {}
}

export type Actions = UpdateVehicles | VehiclesUpdated;
