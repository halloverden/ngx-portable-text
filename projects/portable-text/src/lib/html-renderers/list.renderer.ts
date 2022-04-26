import { HtmlRendererInterface } from './html-renderer.interface';
import {
  ClassifiedArbitraryTypedObject,
  ClassifiedArbitraryTypedObjectType
} from '../helpers/arbitrary-typed-object.helper';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListRenderer implements HtmlRendererInterface {
  /**
   *
   * @param cato
   */
  render(cato: ClassifiedArbitraryTypedObject): HTMLElement {
    switch (cato.type) {
      case ClassifiedArbitraryTypedObjectType.UnorderedListItem:
        return this.renderUl(cato);
      default:
        return this.renderOl(cato);
    }
  }

  /**
   *
   * @param cato
   */
  renderUl(cato: ClassifiedArbitraryTypedObject): HTMLUListElement {
    const e = new HTMLUListElement();

    this.renderLi(cato).forEach((el) => {
      e.appendChild(el);
    });

    return e;
  }

  /**
   *
   * @param cato
   */
  renderOl(cato: ClassifiedArbitraryTypedObject): HTMLOListElement {
    const e = new HTMLOListElement();

    this.renderLi(cato).forEach((el) => {
      e.appendChild(el);
    });

    return e;
  }

  /**
   *
   * @param cato
   */
  renderLi(cato: ClassifiedArbitraryTypedObject): HTMLLIElement[] {
    const e: HTMLLIElement[] = [];

    cato.nodes.forEach((node) => {
      let li = new HTMLLIElement();
      li.innerText = node['text'];
      e.push(li);
    });

    return e;
  }

  /**
   *
   * @param type
   */
  supports(type: ClassifiedArbitraryTypedObjectType): boolean {
    return type === ClassifiedArbitraryTypedObjectType.UnorderedListItem || type === ClassifiedArbitraryTypedObjectType.OrderedListItem;
  }
}
