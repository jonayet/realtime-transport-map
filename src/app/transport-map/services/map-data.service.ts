import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store, select } from '@ngrx/store';

import { Route } from '../../nextbus/models';
import { State, Routes } from '../../store';
import { UpdateRoutes } from '../../store/routes';

@Injectable()
export class MapDataService {
  routes: Observable<Route[]>;

  constructor(private store: Store<State>) {
    this.routes = store.pipe(select(Routes));
  }

  updateRoutes() {
    this.store.dispatch(new UpdateRoutes());
  }
}
