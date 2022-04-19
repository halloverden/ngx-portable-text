import {Injectable} from '@angular/core';
import {MarkDefInterface} from '../interfaces/mark-def.interface';
import {PortableTextInterface} from '../interfaces/portable-text.interface';
import {ChildInterface} from '../interfaces/child.interface';

@Injectable({
  providedIn: 'root'
})
export class RenderService {
  /**
   * TODO: Rename method?
   *
   * @param portableText
   */
  renderContent(portableText: PortableTextInterface): string {
    let blockContent = '';

    portableText.children?.forEach((child: ChildInterface) => {
      if (child.marks.length !== 0) {
        blockContent += this.addMarks(portableText, child);
      } else {
        blockContent += child.text;
      }
    });

    return blockContent;
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
        markedChild = RenderService.addMark(mark, markedChild);
      } else {
        markedChild = RenderService.addMarkDef(markDef, markedChild);
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
   * @param mark
   * @param markedChild
   * @private
   */
  private static addMark(mark: string, markedChild: string): string {
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
  private static addMarkDef(markDef: MarkDefInterface, markedChild: string): string {
    // TODO: Define html (string/function) somewhere and use it here
    switch (markDef._type) {
      case 'link':
        return '<a href="' + markDef.href + '">' + markedChild + '</a>';
      default:
        throw Error('Unknown markDef type: ' + markDef._type); // TODO: Handle unknown types
    }
  }
}
