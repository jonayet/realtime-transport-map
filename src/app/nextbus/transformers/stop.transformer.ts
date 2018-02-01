import { Route, RouteConfig, Stop, Stops } from '../models';

export function transformStops(route: Route, routeConfig: RouteConfig): Stops {
  const stops = routeConfig.route.stop.reduce((map, stopRaw) => {
    const stop: Stop = {
      color: `#${routeConfig.route.color}`,
      lat: stopRaw.lat,
      lon: stopRaw.lon,
      show: route.show,
      stopId: stopRaw.stopId,
      tag: stopRaw.tag,
      title: stopRaw.title,
      routeTag: routeConfig.route.tag
    };
    map[routeConfig.route.tag + stop.tag] = stop;
    return map;
  }, {} as Stops);
  return stops;
}
