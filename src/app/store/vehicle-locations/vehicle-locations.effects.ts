import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

import { NextbusService } from '../../nextbus/services';
import { VehicleLocationsUpdated, ActionType } from './vehicle-locations.actions';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';


@Injectable()
export class VehicleLocationsEffects {
  @Effect()
  update = this.actions
    .ofType(ActionType.UPDATE)
    .switchMap((action: any) => this.nextbusService
      .getVehicleLocations(action.payload)
      .map(data => new VehicleLocationsUpdated(data)));

  constructor(
    private nextbusService: NextbusService,
    private actions: Actions
  ) { }
}
