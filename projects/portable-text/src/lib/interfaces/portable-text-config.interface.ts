import {Type} from '@angular/core';

export interface PortableTextConfigInterface {
  types?: Array<PortableTextConfigTypeInterface>,
  marks?: any,
  styles?: any,
  list?: any,
  listItem?: any,
  hardBreak?: any
}

export interface PortableTextConfigTypeInterface {
  type: string;
  component?: Type<any>;
  data?: any;
}
