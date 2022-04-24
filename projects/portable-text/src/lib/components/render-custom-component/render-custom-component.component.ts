import {ChangeDetectionStrategy, Component, Input, OnInit, ViewContainerRef} from '@angular/core';
import {PortableTextInterface} from '../../interfaces/portable-text.interface';
import {
  PortableTextConfigInterface,
  PortableTextConfigTypeInterface
} from '../../interfaces/portable-text-config.interface';
import {CustomComponent} from '../../directives/custom.component';

@Component({
  selector: 'app-render-custom-component',
  template: '',
  styles: [':host{display: none}'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RenderCustomComponentComponent implements OnInit {
  @Input()
  config!: PortableTextConfigInterface;

  @Input()
  portableText!: PortableTextInterface;

  /**
   * Best would be if we somehow would be able to remove this component element from the DOM
   */
  constructor(private element: ViewContainerRef) { }

  /**
   *
   */
  ngOnInit(): void {
    const typeConfig = this.getTypeConfig(this.portableText._type);

    if (typeConfig && typeConfig?.component) {
      const test = this.element.createComponent<CustomComponent>(typeConfig.component);
      test.instance.portableText = this.portableText;
      test.instance.data = typeConfig.data;
    } else {
      // TODO: Unknown type
    }
  }

  /**
   *
   * @param typeName
   * @private
   */
  private getTypeConfig(typeName: string): PortableTextConfigTypeInterface|null {
    let targetType = null;

    this.config.types?.forEach((type) => {
      if (type.type === typeName) {
        targetType = type;
      }
    });

    return targetType;
  }
}
