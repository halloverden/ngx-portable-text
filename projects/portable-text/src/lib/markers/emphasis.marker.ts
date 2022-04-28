import { MarkerInterface } from './marker.interface';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmphasisMarker implements MarkerInterface {
  applyMarks(child: string, options: { [p: string]: any }): HTMLElement {
    const e = document.createElement('e');
    e.innerHTML = child;
    return e;
  }

  supports(type: string): boolean {
    return type === 'em';
  }
}
