import { HtmlRendererInterface } from './html-renderer.interface';
import {
  ClassifiedArbitraryTypedObject,
  ClassifiedArbitraryTypedObjectType
} from '../helpers/arbitrary-typed-object.helper';
import { Injectable } from '@angular/core';
import { MarkerProviderService } from '../services/marker-provider.service';

@Injectable({
  providedIn: 'root'
})
export class ParagraphRenderer implements HtmlRendererInterface {
  constructor(private markerProvider: MarkerProviderService) {}

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
  render(cato: ClassifiedArbitraryTypedObject): HTMLParagraphElement {
    const e = document.createElement('p');
    const theNode = cato.nodes[0];

    for (let c of theNode['children']) {
      const marked = this.appendMarks(theNode, c);
      if (marked instanceof HTMLElement) {
        e.innerHTML += marked.outerHTML;
      } else {
        e.innerHTML += marked;
      }
    }

    return e;
  }

  hasMarks(child: any): boolean {
    return child['marks'] && child['marks']['length'] > 0;
  }

  appendMarks(node: any, child: any): HTMLElement | string {
    if (!this.hasMarks(child) || !node['markDefs'] || node['markDefs']['length'] < 1) {
      return child.text;
    }

    let s = child.text;

    for (let mark of child['marks']) {
      for (let markDef of node['markDefs']) {
        if (mark === markDef['_key']) {
          let marker = this.markerProvider.getMarker(markDef['_type']);

          if (!marker) {
            console.warn('No marker found for markDef type ' + markDef['_type']);
            continue;
          }

          s = marker?.applyMarks(s, {markDef});
        }
      }
    }

    return s;
  }

  /**
   *
   * @param type
   */
  supports(type: ClassifiedArbitraryTypedObjectType): boolean {
    return type === ClassifiedArbitraryTypedObjectType.paragraph;
  }
}
