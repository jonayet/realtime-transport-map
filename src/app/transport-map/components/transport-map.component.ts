import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { select, zoom, event, geoMercator, geoPath } from 'd3';

import { Route, Routes } from '../../nextbus/models';
import { MapLayer, LayerOptions } from '../models';
import { MapViewService, MapDataService } from '../services';

@Component({
  selector: 'app-transport-map',
  templateUrl: './transport-map.component.html',
  styleUrls: ['./transport-map.component.scss']
})

export class TransportMapComponent implements OnInit, OnDestroy {
  @ViewChild('mapHost') hostElement: ElementRef;

  routesControl = new FormControl();
  routes: Route[] = [];
  filteredRoutes: Route[];
  isInitialized = false;
  showStops = true;

  private projectionOption = {
    scale: 1000000,
    centroid: [-122.45, 37.78]
  };

  private rootLayerOptions = {
    fill: '#eee'
  };

  private routeLayerOptions = {
    stroke: '#aaa'
  };

  private transportLayerOptions = {
    fill: 'red'
  };

  private streetsLayer: MapLayer;
  private arteriesLayer: MapLayer;
  private vehiclesLayer: MapLayer;
  private stopsLayer: MapLayer;

  constructor(
    private mapViewService: MapViewService,
    private mapDataService: MapDataService
  ) {}

  ngOnInit() {
    const mapRootLayer = this.mapViewService.createMap(this.hostElement.nativeElement, this.rootLayerOptions, this.projectionOption);
    this.streetsLayer = this.mapViewService.createLayer(mapRootLayer, this.routeLayerOptions);
    this.arteriesLayer = this.mapViewService.createLayer(mapRootLayer, this.routeLayerOptions);
    this.vehiclesLayer = this.mapViewService.createLayer(mapRootLayer, this.transportLayerOptions);
    this.stopsLayer = this.mapViewService.createLayer(mapRootLayer, this.transportLayerOptions);

    this.mapDataService.streetsGeoData.subscribe((streetsGeoData) => {
      // this.mapViewService.drawStreetsLayer(this.streetsLayer, streetsGeoData);
    });

    this.mapDataService.arteriesGeoData.subscribe((arteriesGeoData) => {
      console.log(arteriesGeoData);
      this.mapViewService.drawArteriesLayer(this.streetsLayer, arteriesGeoData);
    });

    this.mapDataService.routes.subscribe((routes) => {
      this.updateRoutesCache(routes);
      if (!this.isInitialized && routes.length) {
        this.routes = routes;
        this.filteredRoutes = [routes[0]];
        this.mapDataService.setVisibleRoutes(this.filteredRoutes);
        this.isInitialized = true;
      }
    });

    this.mapDataService.visibleRoutes.subscribe((routes) => {
      this.mapDataService.setVisibleVehicles(routes);
      this.mapDataService.setVisibleStops(this.showStops ? routes : []);
      this.mapDataService.updateRouteDetailsOnceInBackground(routes);
      this.mapDataService.updateVehiclesInBackground(routes);
    });

    this.mapDataService.vehiclesGeoData.subscribe((vehicleGeoData) => {
      this.mapViewService.drawVehiclesLayer(this.vehiclesLayer, vehicleGeoData);
    });

    this.mapDataService.stopesGeoData.subscribe((stopsGeoData) => {
      this.mapViewService.drawStopsLayer(this.stopsLayer, stopsGeoData);
    });

    this.mapDataService.updateStreets();
    this.mapDataService.updateArteries();
    this.mapDataService.updateRoutes();
  }

  ngOnDestroy() {
    this.mapDataService.stopUpdatingRouteDetails();
    this.mapDataService.stopUpdatingVehicles();
  }

  onCheckboxChange() {
    // this.stopsLayer.node.style('opacity', this.showStops ? 1 : 0);
    this.mapDataService.setVisibleStops(this.showStops ? this.filteredRoutes : []);
  }

  onFilterChange() {
    this.mapDataService.setVisibleRoutes(this.filteredRoutes);
  }

  private updateRoutesCache(routes: Route[]) {
    const updatedRoutes = routes.reduce((map, route) => {
      map[route.tag] = route;
      return map;
    }, {} as Routes);

    this.routes.forEach((route) => {
      const updatedRoute = updatedRoutes[route.tag];
      route.color = updatedRoute.color;
      route.isUpdated = updatedRoute.isUpdated;
      route.latMax = updatedRoute.latMax;
      route.latMin = updatedRoute.latMin;
      route.lonMax = updatedRoute.lonMax;
      route.lonMin = updatedRoute.lonMin;
    });
  }
}
