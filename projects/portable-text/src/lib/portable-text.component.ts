import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges
} from '@angular/core';
import {PortableTextInterface} from './interfaces/portable-text.interface';
import {PortableTextConfigInterface} from './interfaces/portable-text-config.interface';
import {ChildInterface} from './interfaces/child.interface';

@Component({
  selector: 'ngx-portable-text',
  template: '',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
/**
 * DOCS:
 * @see https://www.sanity.io/guides/introduction-to-portable-text
 * @see https://www.sanity.io/docs/presenting-block-text
 *
 * OTHER IMPLEMENTATIONS:
 * @see https://github.com/portabletext/to-html
 * @see https://github.com/portabletext/react-portabletext
 * @see https://github.com/rdunk/sanity-blocks-vue-component
 * @see https://github.com/portabletext/svelte-portabletext/
 * @see https://github.com/sanity-io/block-content-to-hyperscript
 * @see https://github.com/sanity-io/block-content-to-markdown
 * @see https://github.com/oslofjord/sanity-linq#9-rendering-block-content
 * @see https://github.com/otovo/python-portabletext-html
 * @see https://github.com/sanity-io/sanity-php#rendering-block-content
 */
export class PortableTextComponent implements OnInit, OnChanges {
  @Input()
  config?: PortableTextConfigInterface;

  @Input()
  portableTexts: PortableTextInterface[] = [];

  /**
   *
   * @param element
   * @param renderer
   */
  constructor(private element: ElementRef,
              private renderer: Renderer2) { }

  /**
   *
   * @param changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['portableTexts'] && !changes['portableTexts'].isFirstChange()) {
      this.renderContent();
    }
  }

  /**
   *
   */
  ngOnInit(): void {
    this.renderContent();
  }

  /**
   * @private
   */
  private renderContent(): void {
    // console.log(this.portableTexts);
    // console.log(this.config);

    this.portableTexts.forEach((portableText: PortableTextInterface) => {
      console.log('TEXT: ', portableText);

      switch (portableText._type) {
        case 'block':
          const pTag = this.renderer.createElement('p');
          let text = '';

          portableText.children?.forEach((child: ChildInterface) => {
            console.log('CHILD: ', child);
            text += child.text;
          });

          const textContent = this.renderer.createText(text);
          this.renderer.appendChild(pTag, textContent);
          this.renderer.appendChild(this.element.nativeElement, pTag);
          break;
        default:
          throw Error('Unknown type'); // TODO: Handle other types
      }
    });
  }
}
