import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import { NextbusService } from '../../nextbus/services';
import { transformRouteDetails, transformStops } from '../../nextbus/transformers';
import { RoutesUpdated, RouteDetailsUpdated, ActionType } from './routes.actions';
import { UpdateStops } from '../stops/stops.actions';

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
      .mergeMap(routeConfig => {
        return [
          new RouteDetailsUpdated(transformRouteDetails(action.payload, routeConfig)),
          new UpdateStops(transformStops(action.payload, routeConfig))
        ];
      }));

  constructor(
    private nextbusService: NextbusService,
    private actions: Actions
  ) { }
}
