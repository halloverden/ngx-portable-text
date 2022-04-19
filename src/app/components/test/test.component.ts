import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {PortableTextInterface} from '../../../../projects/portable-text/src/lib/interfaces/portable-text.interface';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestComponent {
  @Input()
  portableText!: PortableTextInterface;

  /**
   *
   */
  test(): void {
    console.log(this.portableText);
  }
}
