import { Inject, Injectable } from '@angular/core';
import { StylerInterface } from '../stylers/styler.interface';

@Injectable({
  providedIn: 'root'
})
export class StylerProviderService {
  /**
   *
   * @param stylers
   */
  constructor(@Inject('StylerInterface') private stylers: StylerInterface[]) {
  }

  /**
   *
   * @param type
   */
  getMarker(type: string): StylerInterface | null {
    let s: StylerInterface | null = null;

    this.stylers.forEach((styler) => {
      if (styler.supports(type) && null === s) {
        s = styler;
      }
    });

    return s;
  }
}
