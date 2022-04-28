import { Inject, Injectable } from '@angular/core';
import { HtmlRendererInterface } from '../html-renderers/html-renderer.interface';
import { ClassifiedArbitraryTypedObject } from '../helpers/arbitrary-typed-object.helper';

@Injectable({
  providedIn: 'root'
})
export class HtmlRendererProviderService {
  /**
   *
   * @param renderers
   */
  constructor(@Inject('HtmlRendererInterface') private renderers: HtmlRendererInterface[]) {
  }

  /**
   *
   * @param cato
   */
  getRenderer(cato: ClassifiedArbitraryTypedObject): HtmlRendererInterface | null {
    let s: HtmlRendererInterface | null = null;

    this.renderers.forEach((renderer) => {
      if (renderer.supports(cato.type) && (null === s || s.getPriority() < renderer.getPriority())) {
        s = renderer;
      }
    });

    return s;
  }
}
