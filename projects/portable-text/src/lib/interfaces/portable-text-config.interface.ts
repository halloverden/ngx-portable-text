import {Type} from '@angular/core';
import { CustomComponent } from '../directives/custom.component';
import { ClassifiedArbitraryTypedObject } from '../helpers/arbitrary-typed-object.helper';

export interface PortableTextConfigInterface {
  overrides?: {
    markers?: {[key: string]: (cato: ClassifiedArbitraryTypedObject) => HTMLElement | string},
    styles?: {[key: string]: (cato: ClassifiedArbitraryTypedObject) => HTMLElement | string},
    list?: (node: ClassifiedArbitraryTypedObject) => HTMLElement | string,
    listItem?: (node: ClassifiedArbitraryTypedObject) => HTMLElement | string,
    types?: Array<PortableTextConfigTypeInterface>
  };
}

export interface PortableTextConfigTypeInterface {
  type: string;
  component?: Type<CustomComponent>;
  data?: any;
  rendererFunction?: (node: ClassifiedArbitraryTypedObject) => HTMLElement | string;
}
