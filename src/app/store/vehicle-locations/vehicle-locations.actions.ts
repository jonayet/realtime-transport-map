import { Action } from '@ngrx/store';

import { Vehicle, VehicleLocation } from '../../nextbus/models';

export const enum ActionType {
  UPDATE = '[VEHICLE_LOCATIONS] UPDATE',
  UPDATED = '[VEHICLE_LOCATIONS] UPDATED'
}

export class UpdateVehicleLocations implements Action {
  readonly type = ActionType.UPDATE;

  constructor(public payload: Vehicle) {}
}

export class VehicleLocationsUpdated implements Action {
  readonly type = ActionType.UPDATED;

  constructor(public payload: VehicleLocation) {}
}

export type Actions = UpdateVehicleLocations | VehicleLocationsUpdated;
