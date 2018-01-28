import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';

import { NextbusService } from '../../nextbus/services';
import { RoutesUpdated, ActionType } from './routes.actions';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';


@Injectable()
export class RoutesEffects {
  @Effect()
  update = this.actions
    .ofType(ActionType.UPDATE)
    .switchMap(() => this.nextbusService
      .getRoutes()
      .map(data => new RoutesUpdated(data))
    );

  constructor(
    private nextbusService: NextbusService,
    private actions: Actions
  ) { }
}
