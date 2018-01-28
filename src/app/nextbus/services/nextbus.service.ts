import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Route } from '../models/Route';

import 'rxjs/add/operator/map';

@Injectable()
export class NextbusService {
  private agency = 'sf-muni';
  private baseUrl = 'http://webservices.nextbus.com/service/publicJSONFeed';

  constructor(private http: HttpClient) { }

  getRoutes(): Observable<Route[]> {
    const routesUrl = `${this.baseUrl}?command=routeList&a=${this.agency}`;
    return this.http.get<any>(routesUrl).map(result => {
      return result.route.map((route: Route) => route);
    });
  }
}
