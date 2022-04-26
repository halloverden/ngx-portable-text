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
    const e = document.createElement('ol');

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
      let li = document.createElement('li');
      li.innerText = node['text'];
      console.log(li);
      e.push(li);
    });

    return e;
  }

  /**
   *
   * @param type
   */
  supports(type: ClassifiedArbitraryTypedObjectType): boolean {
    return type === ClassifiedArbitraryTypedObjectType.UnorderedList || type === ClassifiedArbitraryTypedObjectType.OrderedList;
  }
}
