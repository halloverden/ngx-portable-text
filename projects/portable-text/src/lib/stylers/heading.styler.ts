import { StylerInterface } from './styler.interface';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeadingStyler implements StylerInterface {
  applyMarks(child: string, options: { [p: string]: any }): HTMLElement | string {
    const e = document.createElement(options['style']);
    e.innerHTML = child;
    return e;
  }

  supports(type: string): boolean {
    return ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].indexOf(type) !== -1;
  }
}
