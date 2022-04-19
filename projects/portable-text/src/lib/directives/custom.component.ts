import {Directive, Input} from '@angular/core';
import {PortableTextInterface} from '../interfaces/portable-text.interface';

@Directive()
export abstract class CustomComponent {
  @Input()
  portableText!: PortableTextInterface;
}
