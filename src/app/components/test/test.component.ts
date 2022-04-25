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
  node!: ArbitraryTypedObject;
  data!: any;

  /**
   *
   */
  test(): void {
    console.log(this.node);
    console.log(this.data);
  }
}
