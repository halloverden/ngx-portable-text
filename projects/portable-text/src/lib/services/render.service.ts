import {Injectable} from '@angular/core';
import {PortableTextBlock, PortableTextMarkDefinition} from "@portabletext/types";
import {ArbitraryTypedObject} from "@portabletext/types";
import {PortableTextSpan} from "@portabletext/types/src/portableText";
import strongMark from '../marks/strong.mark';
import emphasisMark from '../marks/emphasis.mark';
import underlineMark from '../marks/underline.mark';
import strikeThroughMark from '../marks/strike-through.mark';

@Injectable({
  providedIn: 'root'
})
export class RenderService {
  /**
   * TODO: Rename method?
   *
   * @param node
   */
  renderContent(node: PortableTextBlock): string {
    let blockContent = '';

    node.children?.forEach((child: ArbitraryTypedObject | PortableTextSpan) => {
      if (child.marks.length !== 0) {
        blockContent += this.addMarks(node, child);
      } else {
        blockContent += child.text;
      }
    });

    return blockContent;
  }

  /**
   *
   * @param node
   * @param child
   * @private
   */
  private addMarks(node: PortableTextBlock, child: ArbitraryTypedObject | PortableTextSpan): string {
    let markedChild = child.text;

    // TODO: Order? Link (and other types?) should be the outer element
    child.marks.forEach((mark: string) => {
      const markDef = this.getMarkDef(node, mark);
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
   * @param node
   * @param mark
   * @private
   */
  private getMarkDef(node: PortableTextBlock, mark: string): PortableTextMarkDefinition|null {
    let markDef = null;

    node.markDefs?.forEach((targetMarkDef: PortableTextMarkDefinition) => {
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
    switch (mark) {
      case 'em':
        return emphasisMark(markedChild);
      case 'strong':
        return strongMark(markedChild);
      case 'strike-through':
        return strikeThroughMark(markedChild);
      case 'underline':
        return underlineMark(markedChild);
      default:
        console.warn('Unknown mark type ' + mark);
        return markedChild;
    }
  }

  /**
   *
   * @param markDef
   * @param markedChild
   * @private
   */
  private static addMarkDef(markDef: PortableTextMarkDefinition, markedChild: string): string {
    // TODO: Define html (string/function) somewhere and use it here
    switch (markDef._type) {
      case 'link':
        return '<a href="' + markDef['href'] + '">' + markedChild + '</a>';
      default:
        throw Error('Unknown markDef type: ' + markDef._type); // TODO: Handle unknown types
    }
  }
}
