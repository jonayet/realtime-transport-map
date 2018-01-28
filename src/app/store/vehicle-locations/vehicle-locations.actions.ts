import { Action } from '@ngrx/store';

import { Vehicle, VehicleLocations } from '../../nextbus/models';

export const enum ActionType {
  UPDATE = '[VEHICLE_LOCATIONS] UPDATE',
  UPDATED = '[VEHICLE_LOCATIONS] UPDATED'
}

export class UpdateVehicleLocations implements Action {
  readonly type = ActionType.UPDATE;

  constructor(public payload: string) {}
}

export class VehicleLocationsUpdated implements Action {
  readonly type = ActionType.UPDATED;

  constructor(public payload: VehicleLocations) {}
}

export type Actions = UpdateVehicleLocations | VehicleLocationsUpdated;
