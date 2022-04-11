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
import {MarkDefInterface} from './interfaces/mark-def.interface';

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
   *
   * @param mark
   * @param markedChild
   * @private
   */
  private addMark(mark: string, markedChild: string): string {
    // TODO: Define html (string/function) somewhere and use it here
    switch (mark) {
      case 'strong':
        return '<strong>' + markedChild + '</strong>';
      default:
        throw Error('Unknown mark type ' + mark); // TODO: Handle unknown types
    }
  }

  /**
   *
   * @param markDef
   * @param markedChild
   * @private
   */
  private addMarkDef(markDef: MarkDefInterface, markedChild: string): string {
    // TODO: Define html (string/function) somewhere and use it here
    switch (markDef._type) {
      case 'link':
        return '<a href="' + markDef.href + '">' + markedChild + '</a>';
      default:
        throw Error('Unknown markDef type: ' + markDef._type); // TODO: Handle unknown types
    }
  }

  /**
   *
   * @param portableText
   * @param child
   * @private
   */
  private addMarks(portableText: PortableTextInterface, child: ChildInterface): string {
    let markedChild = child.text;

    // TODO: Order? Link (and other types?) should be the outer element
    child.marks.forEach((mark: string) => {
      const markDef = this.getMarkDef(portableText, mark);
      if (!markDef) {
        markedChild = this.addMark(mark, markedChild);
      } else {
        markedChild = this.addMarkDef(markDef, markedChild);
      }
    });

    return markedChild;
  }

  /**
   *
   * @param portableText
   * @param mark
   * @private
   */
  private getMarkDef(portableText: PortableTextInterface, mark: string): MarkDefInterface|null {
    let markDef = null;

    portableText.markDefs?.forEach((targetMarkDef: MarkDefInterface) => {
      if (targetMarkDef._key === mark) {
        markDef = targetMarkDef;
      }
    });

    return markDef;
  }

  /**
   *
   * @param portableText
   * @private
   */
  private renderBlock(portableText: PortableTextInterface): void {
    const pTag = this.renderer.createElement('p');
    let blockContent = '';

    portableText.children?.forEach((child: ChildInterface) => {
      if (child.marks.length !== 0) {
        blockContent += this.addMarks(portableText, child);
      } else {
        blockContent += child.text;
      }
    });

    pTag.innerHTML = blockContent;
    this.renderer.appendChild(this.element.nativeElement, pTag);
  }

  /**
   * @private
   */
  private renderContent(): void {
    // console.log(this.portableTexts);
    // console.log(this.config);

    this.portableTexts.forEach((portableText: PortableTextInterface) => {
      switch (portableText._type) {
        case 'block':
          this.renderBlock(portableText);
          break;
        default:
          throw Error('Unknown type ' + portableText._type); // TODO: Handle unknown types
      }
    });
  }
}
