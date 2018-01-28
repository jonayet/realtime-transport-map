import { Action } from '@ngrx/store';

export const enum ActionType {
  UPDATE = '[STREETS] UPDATE',
  UPDATED = '[STREETS] UPDATED'
}

export class UpdateStreets implements Action {
  readonly type = ActionType.UPDATE;
}

export class StreetsUpdated implements Action {
  readonly type = ActionType.UPDATED;

  constructor(public payload: any[]) {}
}

export type Actions = UpdateStreets | StreetsUpdated;
