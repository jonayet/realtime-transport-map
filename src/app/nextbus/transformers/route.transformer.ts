import { RouteList, Routes, Route, RouteConfig} from '../models';

const defaultRouteColor = '#011a8e';

export function transformRoutes(routeList: RouteList): Routes {
  if (!routeList.route || !routeList.route.length) {
    return {};
  }
  const routes = routeList.route.reduce((routesMap, route) => {
    routesMap[route.tag] = {
        tag: route.tag,
        title: route.title,
        color: defaultRouteColor,
        isUpdated: false
      };
      return routesMap;
    }, {} as Routes);
  return routes;
}

export function transformRouteDetails(route: Route, routeConfig: RouteConfig): Routes {
  const detailsRaw = routeConfig.route;
  if (!detailsRaw) {
    return {};
  }
  const routeDetails: Route = {
    color: `#${detailsRaw.color}`,
    latMax: Number(detailsRaw.latMax),
    latMin: Number(detailsRaw.latMin),
    lonMax: Number(detailsRaw.lonMax),
    lonMin: Number(detailsRaw.lonMin),
    tag: detailsRaw.tag,
    title: detailsRaw.title,
    show: route.show,
    isUpdated: true
  };
  return {
    [route.tag]: routeDetails
  };
}

function randomColor() {
  return '#' + 'rrggbb'.split('').reduce((prev) => {
    return prev + ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'][Math.floor(Math.random() * 16)];
  }, '');
}
