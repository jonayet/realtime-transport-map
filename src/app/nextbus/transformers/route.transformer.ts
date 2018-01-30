import { RouteList, Routes} from '../models';

export function transformRoutes(routeList: RouteList): Routes {
  if (!routeList.route || !routeList.route.length) {
    return {};
  }
  const routes = routeList.route.reduce((routesMap, route) => {
    routesMap[route.tag] = {
        tag: route.tag,
        title: route.title,
        color: randomColor()
      };
      return routesMap;
    }, {} as Routes);
  return routes;
}

function randomColor() {
  return '#' + 'rrggbb'.split('').reduce((prev) => {
    return prev + ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'][Math.floor(Math.random() * 16)];
  }, '');
}
