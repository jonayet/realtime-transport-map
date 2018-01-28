import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store, select } from '@ngrx/store';

import { Route } from '../../nextbus/models';
import { State, Streets, Routes } from '../../store';
import { UpdateStreets } from '../../store/streets';
import { UpdateRoutes } from '../../store/routes';

@Injectable()
export class MapDataService {
  streets: Observable<any[]>;
  routes: Observable<Route[]>;

  constructor(private store: Store<State>) {
    this.streets = store.pipe(select(Streets));
    this.routes = store.pipe(select(Routes));
  }

  updateStreets() {
    this.store.dispatch(new UpdateStreets());
  }

  updateRoutes() {
    this.store.dispatch(new UpdateRoutes());
  }
}
