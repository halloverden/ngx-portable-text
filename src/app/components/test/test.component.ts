import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CustomComponent} from '../../../../projects/portable-text/src/lib/directives/custom.component';
import {PortableTextInterface} from '../../../../projects/portable-text/src/lib/interfaces/portable-text.interface';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestComponent implements CustomComponent {
  portableText!: PortableTextInterface;

  /**
   *
   */
  test(): void {
    console.log(this.portableText);
  }
}
