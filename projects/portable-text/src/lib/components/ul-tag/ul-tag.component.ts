import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {PortableTextConfigInterface} from "../../interfaces/portable-text-config.interface";
import {PortableTextListItemBlock} from "@portabletext/types";

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
  portableText!: PortableTextListItemBlock;
}
