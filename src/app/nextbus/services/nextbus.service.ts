import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Route, RouteListRaw, Vehicles, VehicleLocationsRaw } from '../models';
import { transformVehicles } from '../transformers';

import 'rxjs/add/operator/map';

@Injectable()
export class NextbusService {
  private agency = 'sf-muni';
  private baseUrl = 'http://webservices.nextbus.com/service/publicJSONFeed';
  private lastRequestTimeMap = {};

  constructor(private http: HttpClient) { }

  getRoutes(): Observable<Route[]> {
    const routesUrl = `${this.baseUrl}?command=routeList&a=${this.agency}`;
    return this.http.get<RouteListRaw>(routesUrl).map(result => result.route);
  }

  getVehicles(route: Route): Observable<Vehicles> {
    const lastRequestTime = this.lastRequestTimeMap[route.tag] || 0;
    const routesUrl = `${this.baseUrl}?command=vehicleLocations&a=${this.agency}&r=${route.tag}&t=${lastRequestTime}`;
    return this.http.get<VehicleLocationsRaw>(routesUrl).map(result => {
      this.lastRequestTimeMap[route.tag] = result.lastTime.time;
      return transformVehicles(route, result);
    });
  }
}
