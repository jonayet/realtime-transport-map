import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Route, Routes, RouteList, Vehicles, VehicleLocations } from '../models';
import { transformRoutes, transformVehicles } from '../transformers';

import 'rxjs/add/operator/map';

@Injectable()
export class NextbusService {
  private agency = 'sf-muni';
  private baseUrl = 'http://webservices.nextbus.com/service/publicJSONFeed';
  private lastRequestTimeMap = {};

  constructor(private http: HttpClient) { }

  getRoutes(): Observable<Routes> {
    const routesUrl = `${this.baseUrl}?command=routeList&a=${this.agency}`;
    return this.http.get<RouteList>(routesUrl).map(result => transformRoutes(result));
  }

  getVehicles(route: Route): Observable<Vehicles> {
    const lastRequestTime = this.lastRequestTimeMap[route.tag] || 0;
    const routesUrl = `${this.baseUrl}?command=vehicleLocations&a=${this.agency}&r=${route.tag}&t=${lastRequestTime}`;
    return this.http.get<VehicleLocations>(routesUrl).map(result => {
      this.lastRequestTimeMap[route.tag] = result.lastTime.time;
      return transformVehicles(route, result);
    });
  }
}
