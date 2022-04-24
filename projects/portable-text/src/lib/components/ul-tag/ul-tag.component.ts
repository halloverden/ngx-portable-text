import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {PortableTextConfigInterface} from "../../interfaces/portable-text-config.interface";
import {PortableTextInterface} from "../../interfaces/portable-text.interface";

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[ulTag]',
  template: '<ul><li *ngFor="let child of portableText.children">{{child.text}}</li></ul>',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UlTagComponent {
  @Input()
  config!: PortableTextConfigInterface;

  @Input()
  portableText!: PortableTextInterface;
}
