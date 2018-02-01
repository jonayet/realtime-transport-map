export interface Route {
  tag: string;
  title: string;
  color: string;
  latMin?: number;
  latMax?: number;
  lonMin?: number;
  lonMax?: number;
  isUpdated?: boolean;
}
