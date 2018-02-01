import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/timer';

import { GeoData, GeoFeature } from '../models';
import { Route, Routes, Vehicles } from '../../nextbus/models';
import { State, StreetsStore, RoutesStore, VisibleRoutesStore, VehiclesStore, StopsStore } from '../../store';
import { UpdateStreets } from '../../store/streets';
import { UpdateRoutes, UpdateRouteDetails, SetVisibleRoutes } from '../../store/routes';
import { UpdateVehicles, SetVisibleVehicles } from '../../store/vehicles';
import { SetVisibleStops } from '../../store/stops';
import { convertToArray, convertToGeoData, doLazyStream } from '../utilities';

@Injectable()
export class MapDataService {
  streetsGeoData: Observable<GeoData>;
  routes: Observable<Route[]>;
  visibleRoutes: Observable<Route[]>;
  vehiclesGeoData: Observable<GeoData>;
  stopesGeoData: Observable<GeoData>;
  private routeStreamSubscription: Subscription;
  private vehicleStreamSubscription: Subscription;
  private vehicleStreamTimerSubscription: Subscription;

  constructor(private store: Store<State>) {
    this.streetsGeoData = store.pipe(select(StreetsStore));
    this.routes = store.pipe(select(RoutesStore)).map((routes) => convertToArray(routes, (r) => r));
    this.visibleRoutes = store.pipe(select(VisibleRoutesStore));
    this.vehiclesGeoData = store.pipe(select(VehiclesStore)).map((vehicles) => convertToGeoData(vehicles));
    this.stopesGeoData = store.pipe(select(StopsStore)).map((stops) => convertToGeoData(stops));
  }

  updateRouteDetailsOnceInBackground(routes: Route[]) {
    this.stopUpdatingRouteDetails();
    this.routeStreamSubscription = doLazyStream<Route>(routes, 5, 15000).subscribe((route) => {
      this.store.dispatch(new UpdateRouteDetails(route));
    }, (error) => {
      console.log(error);
    });
  }

  updateVehiclesInBackground(routes: Route[]) {
    this.stopUpdatingVehicles();
    this.vehicleStreamSubscription = doLazyStream<Route>(routes, 5, 15000).subscribe((route) => {
      this.store.dispatch(new UpdateVehicles(route));
    }, (error) => {
      console.log(error);
    }, () => {
      this.vehicleStreamTimerSubscription = Observable.timer(15000).subscribe(() => {
        this.updateVehiclesInBackground(routes);
      });
    });
  }

  stopUpdatingRouteDetails() {
    if (this.routeStreamSubscription) {
      this.routeStreamSubscription.unsubscribe();
    }
  }

  stopUpdatingVehicles() {
    if (this.vehicleStreamSubscription) {
      this.vehicleStreamSubscription.unsubscribe();
    }
    if (this.vehicleStreamTimerSubscription) {
      this.vehicleStreamTimerSubscription.unsubscribe();
    }
  }

  setVisibleRoutes(routes: Route[]) {
    this.store.dispatch(new SetVisibleRoutes(routes));
  }

  setVisibleVehicles(routes: Route[]) {
    this.store.dispatch(new SetVisibleVehicles(routes));
  }

  setVisibleStops(routes: Route[]) {
    this.store.dispatch(new SetVisibleStops(routes));
  }

  updateVehicles(route: Route) {
    this.store.dispatch(new UpdateVehicles(route));
  }

  updateStreets() {
    this.store.dispatch(new UpdateStreets());
  }

  updateRoutes() {
    this.store.dispatch(new UpdateRoutes());
  }
}
