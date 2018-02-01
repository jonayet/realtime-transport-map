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
        isUpdated: false,
        show: false
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
    isUpdated: true,
    show: route.show
  };
  return {
    [route.tag]: routeDetails
  };
}
