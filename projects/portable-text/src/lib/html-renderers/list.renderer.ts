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
  constructor() {
  }

  /**
   *
   */
  getPriority(): number {
    return 0;
  }

  /**
   *
   * @param cato
   */
  render(cato: ClassifiedArbitraryTypedObject): HTMLElement {
    switch (cato.type) {
      case ClassifiedArbitraryTypedObjectType.UnorderedList:
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
    const e = document.createElement('ul');
    cato.setDomNode(e);

    this.renderLi(cato.classifiedNodes).forEach((el) => {
      e.appendChild(el);
    });

    return e;
  }

  /**
   *
   * @param cato
   */
  renderOl(cato: ClassifiedArbitraryTypedObject): HTMLOListElement {
    const e = document.createElement('ol');
    cato.setDomNode(e);

    this.renderLi(cato.classifiedNodes).forEach((el) => {
      e.appendChild(el);
    });

    return e;
  }

  /**
   *
   * @param catos
   */
  renderLi(catos: ClassifiedArbitraryTypedObject[]): HTMLLIElement[] {
    const e: HTMLLIElement[] = [];

    catos.forEach((cn) => {
      let li = document.createElement('li');
      cn.setDomNode(li);
      let span = document.createElement('span');
      span.innerHTML = cn.nodes[0]['children'][0]['text'];

      if (cn.classifiedNodes.length === 1 && this.isList(cn.classifiedNodes[0])) {
        li.innerHTML = span.outerHTML + this.render(cn.classifiedNodes[0]).outerHTML;
      } else {
        li.innerHTML = span.outerHTML;
      }

      e.push(li);
    });

    return e;
  }

  /**
   *
   * @param cato
   */
  isList(cato: ClassifiedArbitraryTypedObject): boolean {
    return cato.type === ClassifiedArbitraryTypedObjectType.UnorderedList || cato.type === ClassifiedArbitraryTypedObjectType.OrderedList;
  }

  /**
   *
   * @param type
   */
  supports(type: ClassifiedArbitraryTypedObjectType): boolean {
    return type === ClassifiedArbitraryTypedObjectType.UnorderedList || type === ClassifiedArbitraryTypedObjectType.OrderedList;
  }
}
