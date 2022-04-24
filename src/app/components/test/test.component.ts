import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CustomComponent} from '../../../../projects/portable-text/src/lib/directives/custom.component';
import {PortableTextInterface} from '../../../../projects/portable-text/src/lib/interfaces/portable-text.interface';

@Component({
  selector: 'app-test',
  template: '<button (click)="test()">CLICK ME!</button>',
  styles: [':host{display: block}'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestComponent implements CustomComponent {
  portableText!: PortableTextInterface;
  data!: any;

  /**
   *
   */
  test(): void {
    console.log(this.portableText);
    console.log(this.data);
  }
}
