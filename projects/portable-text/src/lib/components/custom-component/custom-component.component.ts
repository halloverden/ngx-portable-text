import {ChangeDetectionStrategy, Component, Input, OnInit, ViewContainerRef} from '@angular/core';
import {PortableTextInterface} from '../../interfaces/portable-text.interface';
import {PortableTextConfigInterface} from '../../interfaces/portable-text-config.interface';
import {TestComponent} from '../../../../../../src/app/components/test/test.component';

@Component({
  selector: 'app-custom-component',
  template: '',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomComponentComponent implements OnInit {
  @Input()
  config!: PortableTextConfigInterface;

  @Input()
  portableText!: PortableTextInterface;

  /**
   *
   */
  constructor(private element: ViewContainerRef) { }

  /**
   *
   */
  ngOnInit(): void {
    console.log(this.portableText._type);
    console.log(this.config);

    this.element.createComponent(TestComponent);
  }
}
