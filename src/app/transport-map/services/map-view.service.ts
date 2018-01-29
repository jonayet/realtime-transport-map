import { Injectable } from '@angular/core';
import { select, zoom, event, geoMercator, geoPath, GeoProjection, ExtendedFeature, GeoGeometryObjects } from 'd3';

import { MapLayer, LayerOptions, ProjectionOptions } from '../models';

@Injectable()
export class MapViewService {

  private projection: GeoProjection;

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

  drawRouteLayer(layer: MapLayer, geoFeatures: ExtendedFeature<GeoGeometryObjects, any>[]) {
    const path = geoPath()
      .projection(this.projection);

    const nodes = layer.node.selectAll('path')
      .data(geoFeatures);

    nodes.enter()
      .append('path')
      .attr('d', path)
      .attr('vector-effect', 'non-scaling-stroke')
      .merge(nodes);

    nodes.exit()
      .remove();
  }

  drawTransportLayer(layer: MapLayer, positions: any[]) {
    const nodes = layer.node.selectAll('circle')
      .data(positions);

    nodes.enter()
      .append('circle')
      .attr('cx', (d) => this.projection(d)[0])
      .attr('cy', (d) => this.projection(d)[1])
      .attr('r', '1px')
      .merge(nodes);

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
