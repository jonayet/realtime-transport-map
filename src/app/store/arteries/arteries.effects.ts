import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import { GeoData } from '../../transport-map/models';
import { ArteriesUpdated, ActionType } from './arteries.actions';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';


@Injectable()
export class ArteriesEffects {
  @Effect()
  update = this.actions
    .ofType(ActionType.UPDATE)
    .switchMap(() => this.getArteries()
      .map(data => new ArteriesUpdated(data))
    );

  constructor(
    private http: HttpClient,
    private actions: Actions,
  ) { }

  private getArteries(): Observable<GeoData> {
    const streetsUrl = 'assets/sfmaps/arteries.json';
    return this.http.get<GeoData>(streetsUrl);
  }
}
