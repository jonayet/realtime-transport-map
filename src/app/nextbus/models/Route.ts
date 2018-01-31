export interface Route {
  tag: string;
  title: string;
  color: string;
  show?: boolean;
  latMin?: number;
  latMax?: number;
  lonMin?: number;
  lonMax?: number;
  isUpdated?: boolean;
}
