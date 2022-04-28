import { MarkerInterface } from './marker.interface';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LinkMarker implements MarkerInterface {
  applyMarks(child: string, options: { [p: string]: any }): HTMLAnchorElement {
    const e = document.createElement('a');
    e.innerHTML = child;
    e.href = options['markDef']['href'];
    return e;
  }

  supports(type: string): boolean {
    return type === 'link';
  }
}
