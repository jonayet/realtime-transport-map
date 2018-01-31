export interface Stop {
  tag: string;
  title: string;
  shortTitle: string;
  lat: string;
  lon: string;
  stopId: string;
}

export interface Direction {
  tag: string;
  title: string;
  name: string;
  stop: [
    {
      tag: string;
     }
  ];
}

export interface RouteConfig {
  route: {
    tag: string;
    title: string;
    shortTitle: string;
    color: string;
    oppositeColor: string;
    latMin: string;
    latMax: string;
    lonMin: string;
    lonMax: string;
    stop: Stop[];
    direction: Direction[];
    path: [{
      point: [
        {
          lat: string;
          lon: string;
        }
      ]
    }];
  };
}
