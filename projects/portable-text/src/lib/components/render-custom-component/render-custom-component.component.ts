import {ChangeDetectionStrategy, Component, Input, OnInit, ViewContainerRef} from '@angular/core';
import {PortableTextInterface} from '../../interfaces/portable-text.interface';
import {PortableTextConfigInterface} from '../../interfaces/portable-text-config.interface';
import {CustomComponent} from '../../directives/custom.component';

@Component({
  selector: 'app-render-custom-component',
  template: '',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RenderCustomComponentComponent implements OnInit {
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
    const t = this.config.types?.get(this.portableText._type);

    if (undefined !== t) {
      const test = this.element.createComponent<CustomComponent>(t);
      test.instance.portableText = this.portableText;
    } else {
      // TODO: Unknown type
    }
  }
}
