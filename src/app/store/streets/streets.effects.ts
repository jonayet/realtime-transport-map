import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, Effect } from '@ngrx/effects';

import { StreetsUpdated, ActionType } from './streets.actions';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

@Injectable()
export class StreetEffects {
  @Effect()
  update = this.actions
    .ofType(ActionType.UPDATE)
    .switchMap(() => this.getStreets()
      .map(data => new StreetsUpdated(data))
    );

  constructor(
    private http: HttpClient,
    private actions: Actions,
  ) { }

  private getStreets() {
    const streetsUrl = 'assets/sfmaps/streets.json';
    return this.http.get<any>(streetsUrl).map((result) => result.features);
  }
}
