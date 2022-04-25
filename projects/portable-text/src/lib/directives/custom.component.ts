import {Directive, Input} from '@angular/core';
import {ArbitraryTypedObject} from "@portabletext/types";

@Directive()
export abstract class CustomComponent {
  @Input()
  data?: any;

  @Input()
  node!: ArbitraryTypedObject;
}
