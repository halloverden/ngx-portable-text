import { StylerInterface } from './styler.interface';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NormalStyler implements StylerInterface {
  applyMarks(child: string, options: { [p: string]: any }): HTMLElement | string {
    const e = document.createElement('p');
    e.innerHTML = child;
    return e;
  }

  supports(type: string): boolean {
    return ['normal'].indexOf(type) !== -1;
  }
}
