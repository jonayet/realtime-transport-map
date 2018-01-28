import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

import { NextbusService } from '../../nextbus/services';
import { VehicleLocationsUpdated, ActionType } from './vehicle-locations.actions';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';


@Injectable()
export class VehicleLocationsEffects {
  @Effect()
  update = this.actions
    .ofType(ActionType.UPDATE)
    .mergeMap((action: any) => this.nextbusService
      .getVehicleLocation(action.payload)
      .map(data => new VehicleLocationsUpdated(data)));

  constructor(
    private nextbusService: NextbusService,
    private actions: Actions
  ) { }
}
