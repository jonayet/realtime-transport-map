import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

import { NextbusService } from '../../nextbus/services';
import { VehiclesUpdated, ActionType } from './vehicles.actions';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';


@Injectable()
export class VehiclesEffects {
  @Effect()
  update = this.actions
    .ofType(ActionType.UPDATE)
    .switchMap(() => this.nextbusService
      .getVehicles()
      .map(data => new VehiclesUpdated(data))
    );

  constructor(
    private nextbusService: NextbusService,
    private actions: Actions
  ) { }
}
