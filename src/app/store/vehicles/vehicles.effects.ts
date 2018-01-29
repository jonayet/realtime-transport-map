import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

import { NextbusService } from '../../nextbus/services';
import { VehiclesUpdated, ActionType } from './vehicles.actions';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';


@Injectable()
export class VehiclesEffects {
  @Effect()
  update = this.actions
    .ofType(ActionType.UPDATE)
    .mergeMap((action: any) => this.nextbusService
      .getVehicles(action.payload)
      .map(data => new VehiclesUpdated(data)));

  constructor(
    private nextbusService: NextbusService,
    private actions: Actions
  ) { }
}
