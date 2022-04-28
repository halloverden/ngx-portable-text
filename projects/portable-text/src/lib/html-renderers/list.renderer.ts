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
    console.log('ul');
    const e = document.createElement('ul');

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
    console.log('ol');
    const e = document.createElement('ol');

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
      console.log(cn);
      let li = document.createElement('li');

      if (cn.classifiedNodes.length > 0) {
        li.innerHTML = this.render(cn).outerHTML;
      } else {
        li.innerText = cn.nodes[0]['children'][0]['text'];
      }

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
