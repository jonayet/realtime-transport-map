import { Action } from '@ngrx/store';

import { GeoData } from '../../transport-map/models';

export const enum ActionType {
  UPDATE = '[ARTERIES] UPDATE',
  UPDATED = '[ARTERIES] UPDATED'
}

export class UpdateArteries implements Action {
  readonly type = ActionType.UPDATE;
}

export class ArteriesUpdated implements Action {
  readonly type = ActionType.UPDATED;

  constructor(public payload: GeoData) {}
}

export type Actions = UpdateArteries | ArteriesUpdated;
