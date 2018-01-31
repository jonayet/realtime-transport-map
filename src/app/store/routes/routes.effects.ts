import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

import { NextbusService } from '../../nextbus/services';
import { RoutesUpdated, RouteDetailsUpdated, ActionType } from './routes.actions';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';


@Injectable()
export class RoutesEffects {
  @Effect()
  updateRoutes = this.actions
    .ofType(ActionType.UPDATE)
    .mergeMap(() => this.nextbusService
      .getRoutes()
      .map(data => new RoutesUpdated(data))
    );

  @Effect()
  updateRouteDetails = this.actions
    .ofType(ActionType.UPDATE_DETAILS)
    .mergeMap((action: any) => this.nextbusService
      .updateRouteDetails(action.payload)
      .map(data => new RouteDetailsUpdated(data))
    );

  constructor(
    private nextbusService: NextbusService,
    private actions: Actions
  ) { }
}
