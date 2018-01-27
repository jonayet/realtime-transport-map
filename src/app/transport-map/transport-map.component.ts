import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { select, zoom, event, geoMercator, geoPath } from 'd3';

import { MapViewService } from './map-view.service';
import { MapLayer } from './MapLayer';
import { LayerOptions } from './LayerOptions';

@Component({
  selector: 'app-transport-map',
  templateUrl: './transport-map.component.html',
  styleUrls: ['./transport-map.component.scss']
})

export class TransportMapComponent implements OnInit {
  @ViewChild('mapHost') private hostElement: ElementRef;

  constructor(private http: HttpClient, private mapService: MapViewService) { }

  ngOnInit() {
    const layerOptions = {
      fill: '#eee'
    };
    const projectionOption = {
      scale: 300000,
      centroid: [-122.45, 37.76]
    };

    const mapView = this.mapService.createMap(this.hostElement.nativeElement, layerOptions, projectionOption);

    this.http.get('assets/sfmaps/streets.json').subscribe(({ features }: any) => {
      const options = {
        centroid: [-122.50, 37.77],
        pathColor: '#aaa',
        transportColor: 'red'
      };

      // this.http.get('http://webservices.nextbus.com/service/publicJSONFeed?command=vehicleLocations&a=sf-muni&r=F&t=0')
      //   .subscribe(({vehicle}: any) => {
      //     const transports = vehicle.map(({lon, lat}) => {
      //       return [lon, lat];
      //     });
      //     this.createMap(mapView, features, transports, options);
      //   });

      const routeColor = '#aaa';
      const routeLayer = this.mapService.createLayer(mapView, { stroke: routeColor });
      const transportLayer = this.mapService.createLayer(mapView, { stroke: 'red', fill: 'red' });
      this.mapService.drawRouteLayer(routeLayer, features);
      this.mapService.drawTransportLayer(transportLayer, [[-122.495898, 37.748055]]);
    });
  }
}
