import {Directive, Input} from '@angular/core';
import { ClassifiedArbitraryTypedObject } from '../helpers/arbitrary-typed-object.helper';

@Directive()
export abstract class CustomComponent {
  @Input()
  data?: any;

  @Input()
  node!: ClassifiedArbitraryTypedObject;
}
