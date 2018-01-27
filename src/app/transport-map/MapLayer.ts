import { Selection, EnterElement } from 'd3';

export interface MapLayer {
  node: Selection<Element | EnterElement | Document | Window, {}, null, undefined>;
  width: number;
  height: number;
}
