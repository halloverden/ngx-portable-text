import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CustomComponent} from '../../../../projects/portable-text/src/lib/directives/custom.component';
import {ArbitraryTypedObject} from "@portabletext/types";

@Component({
  selector: 'app-test',
  template: '<button (click)="test()">CLICK ME!</button>',
  styles: [':host{display: block}'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestComponent implements CustomComponent {
  portableText!: ArbitraryTypedObject;
  data!: any;

  /**
   *
   */
  test(): void {
    console.log(this.portableText);
    console.log(this.data);
  }
}
