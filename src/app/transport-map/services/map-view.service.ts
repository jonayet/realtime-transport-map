import { Injectable } from '@angular/core';
import { scaleLinear, select, zoom, event, geoMercator, geoPath, GeoProjection, ScaleLinear } from 'd3';

import { MapLayer, LayerOptions, ProjectionOptions, GeoData, GeoFeature } from '../models';

@Injectable()
export class MapViewService {
  private projection: GeoProjection;
  private path: any;
  private vehicleTriangle = '1,0 0,3 2,3';

  constructor() { }

  createMap(hostElement: any, layerOptions: LayerOptions, projectionOptions: ProjectionOptions): MapLayer {
    const host = select(hostElement);
    const svg = host.append('svg')
      .attr('width', '100%')
      .attr('height', '100%');

    svg.append('rect')
      .attr('width', '100%')
      .attr('height', '100%')
      .style('fill', layerOptions.fill);

    const rootNode = svg.append('g')
      .style('fill', layerOptions.fill);

    const zoomHandler = zoom().on('zoom', () => {
      const transform = event.transform;
      rootNode.attr('transform', `translate(${transform.x}, ${transform.y}) scale(${transform.k})`);
    });
    host.call(zoomHandler);

    const layer = {
      node: rootNode,
      width: hostElement.offsetWidth,
      height: hostElement.offsetHeight
    };

    const { centroid, scale } = projectionOptions;
    this.projection = this.createProjection(scale, centroid, hostElement.offsetWidth, hostElement.offsetHeight);
    this.path = geoPath().projection(this.projection);
    return layer;
  }

  createLayer(parent: MapLayer, options: LayerOptions): MapLayer {
    const node = parent.node.append('g');
    if (options.fill) {
      node.style('fill', options.fill);
    }
    if (options.stroke) {
      node.style('stroke', options.stroke);
    }
    const layer = {
      node,
      width: parent.height,
      height: parent.width
    };
    return layer;
  }

  drawRouteLayer(layer: MapLayer, geoData: any) {
    if (!geoData || !geoData.features) {
      return;
    }

    const nodes = layer.node.selectAll('path')
      .data(geoData.features);

    nodes.enter()
      .append('path')
      .merge(nodes)
      .attr('d', this.path)
      .attr('vector-effect', 'non-scaling-stroke');

    nodes.exit()
      .remove();
  }

  drawTransportLayer(layer: MapLayer, geoData: any) {
    if (!geoData || !geoData.features) {
      return;
    }

    const nodes = layer.node.selectAll('polygon')
      .data(geoData.features);

    nodes.enter()
      .append('polygon')
      .merge(nodes)
      .attr('points', this.vehicleTriangle)
      .style('fill', (d: any) => d.properties.color)
      .attr('transform', (d: any) => {
        const transform = `translate(${this.projection(d.geometry.coordinates)})`;
        return d.properties.heading >= 0 ? transform + `rotate(${d.properties.heading})` : transform;
      });

    nodes.exit()
      .remove();
  }

  private createProjection(scale, centroid, width, height) {
    return geoMercator()
      .scale(scale)
      .center(centroid)
      .translate([width / 2, height / 2]);
  }
}
