import { Action } from '@ngrx/store';

import { GeoData } from '../../transport-map/models';

export const enum ActionType {
  UPDATE = '[STREETS] UPDATE',
  UPDATED = '[STREETS] UPDATED'
}

export class UpdateStreets implements Action {
  readonly type = ActionType.UPDATE;
}

export class StreetsUpdated implements Action {
  readonly type = ActionType.UPDATED;

  constructor(public payload: GeoData) {}
}

export type Actions = UpdateStreets | StreetsUpdated;
