import {ChangeDetectionStrategy, Component, ElementRef, Input, OnInit} from '@angular/core';
import {PortableTextInterface} from '../../interfaces/portable-text.interface';
import {ChildInterface} from '../../interfaces/child.interface';
import {MarkDefInterface} from '../../interfaces/mark-def.interface';
import {PortableTextConfigInterface} from '../../interfaces/portable-text-config.interface';
import {RenderService} from '../../services/render.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[pTag]',
  template: '',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PTagComponent implements OnInit {
  @Input()
  config!: PortableTextConfigInterface;

  @Input()
  portableText!: PortableTextInterface;

  /**
   *
   */
  constructor(private element: ElementRef,
              private renderService: RenderService) { }

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
   * @private
   */
  private renderContent(): void {
    // TODO: Move blockContent to this.renderService and reuse in all content comps
    let blockContent = '';

    this.portableText.children?.forEach((child: ChildInterface) => {
      if (child.marks.length !== 0) {
        blockContent += this.addMarks(this.portableText, child);
      } else {
        blockContent += child.text;
      }
    });

    this.element.nativeElement.innerHTML = blockContent;
  }
}
