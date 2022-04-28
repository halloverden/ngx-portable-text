import { MarkerInterface } from './marker.interface';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StrongMarker implements MarkerInterface {
  applyMarks(child: string, options: { [p: string]: any }): HTMLElement {
    const e = document.createElement('strong');
    e.innerHTML = child;
    return e;
  }

  supports(type: string): boolean {
    return type === 'strong';
  }
}
