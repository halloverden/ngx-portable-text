import {Type} from '@angular/core';

export interface PortableTextConfigInterface {
  types?: Map<string, Type<any>>,
  marks?: any,
  styles?: any,
  list?: any,
  listItem?: any,
  hardBreak?: any
}
