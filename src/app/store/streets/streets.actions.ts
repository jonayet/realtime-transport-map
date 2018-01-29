import { Action } from '@ngrx/store';
import { ExtendedFeature, GeoGeometryObjects } from 'd3';

export const enum ActionType {
  UPDATE = '[STREETS] UPDATE',
  UPDATED = '[STREETS] UPDATED'
}

export class UpdateStreets implements Action {
  readonly type = ActionType.UPDATE;
}

export class StreetsUpdated implements Action {
  readonly type = ActionType.UPDATED;

  constructor(public payload: ExtendedFeature<GeoGeometryObjects, any>[]) {}
}

export type Actions = UpdateStreets | StreetsUpdated;
