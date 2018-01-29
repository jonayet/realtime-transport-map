import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { select, zoom, event, geoMercator, geoPath } from 'd3';

import { MapLayer, LayerOptions } from '../models';
import { MapViewService, MapDataService } from '../services';

@Component({
  selector: 'app-transport-map',
  templateUrl: './transport-map.component.html',
  styleUrls: ['./transport-map.component.scss']
})

export class TransportMapComponent implements OnInit {
  @ViewChild('mapHost') private hostElement: ElementRef;

  private projectionOption = {
    scale: 300000,
    centroid: [-122.45, 37.76]
  };

  private rootLayerOptions = {
    fill: '#eee'
  };

  private routeLayerOptions = {
    stroke: '#aaa'
  };

  private transportLayerOptions = {
    fill: 'red',
    stroke: 'red'
  };

  private routeLayer: MapLayer;
  private transportLayer: MapLayer;

  constructor(
    private mapViewService: MapViewService,
    private mapDataService: MapDataService
  ) {}

  ngOnInit() {
    const mapRootLayer = this.mapViewService.createMap(this.hostElement.nativeElement, this.rootLayerOptions, this.projectionOption);
    this.routeLayer = this.mapViewService.createLayer(mapRootLayer, this.routeLayerOptions);
    this.transportLayer = this.mapViewService.createLayer(mapRootLayer, this.transportLayerOptions);

    this.mapDataService.streets.subscribe((streets) => {
      this.mapViewService.drawRouteLayer(this.routeLayer, streets);
    });

    this.mapDataService.vehicleLocations.subscribe((vehicleLocations) => {
      let n = 0;
      const vehiclePositions = Object.keys(vehicleLocations).reduce((positions, vehicleTag) => {
        const position = vehicleLocations[vehicleTag];
        if (position.length && n < 5) {
          positions.push(position);
          n++;
        }
        return positions;
      }, []);
      this.mapViewService.drawTransportLayer(this.transportLayer, []);
      this.mapViewService.drawTransportLayer(this.transportLayer, vehiclePositions);
    });

    this.mapDataService.updateStreets();
    this.mapDataService.updateVehicles();
  }
}

// const m = [
//   [-122.40995, 37.793804],
//   [-122.473228, 37.782501],
//   [-122.446976, 37.787716],
//   [-122.406258, 37.785366],
//   [-122.415703, 37.778015],
//   [-122.478546, 37.765324],
//   [-122.407516, 37.783512],
//   [-122.404625, 37.7868],
//   [-122.395668, 37.784733],
//   [-122.41758, 37.7523539],
//   [-122.460205, 37.706306],
//   [-122.499474, 37.785069]
// ];
// this.mapViewService.drawTransportLayer(this.transportLayer, []);
// this.mapViewService.drawTransportLayer(this.transportLayer, m);
