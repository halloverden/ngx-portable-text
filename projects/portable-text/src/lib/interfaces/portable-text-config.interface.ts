import {Type} from '@angular/core';
import { CustomComponent } from '../directives/custom.component';
import { CatoRenderFunction } from '../helpers/arbitrary-typed-object.helper';

export interface PortableTextConfigInterface {
  overrides?: PortableTextConfigInterfaceOverrides;
}

export interface PortableTextConfigInterfaceOverrides {
  markers?: {[key: string]: CatoRenderFunction},
  styles?: {[key: string]: CatoRenderFunction},
  orderedList?: CatoRenderFunction,
  unorderedList?: CatoRenderFunction,
  listItem?: CatoRenderFunction
  types?: Array<PortableTextConfigTypeInterface>
}

export interface PortableTextConfigTypeInterface {
  type: string;
  component?: Type<CustomComponent>;
  data?: any;
  rendererFunction?: CatoRenderFunction;
}
