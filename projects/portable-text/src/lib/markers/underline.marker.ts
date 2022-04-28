import { MarkerInterface } from './marker.interface';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UnderlineMarker implements MarkerInterface {
  applyMarks(child: string, options: { [p: string]: any }): HTMLElement {
    const e = document.createElement('u');
    e.innerHTML = child;
    return e;
  }

  supports(type: string): boolean {
    return type === 'underline';
  }
}
