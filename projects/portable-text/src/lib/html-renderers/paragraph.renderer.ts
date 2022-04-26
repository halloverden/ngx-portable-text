import { HtmlRendererInterface } from './html-renderer.interface';
import {
  ClassifiedArbitraryTypedObject,
  ClassifiedArbitraryTypedObjectType
} from '../helpers/arbitrary-typed-object.helper';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ParagraphRenderer implements HtmlRendererInterface {
  /**
   *
   * @param cato
   */
  render(cato: ClassifiedArbitraryTypedObject): HTMLParagraphElement {
    const e = document.createElement('p');
    e.innerText = cato.nodes[0]['text'];
    return e;
  }

  /**
   *
   * @param type
   */
  supports(type: ClassifiedArbitraryTypedObjectType): boolean {
    return type === ClassifiedArbitraryTypedObjectType.Paragraph;
  }
}
