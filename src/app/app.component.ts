import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MockService} from './mock.service';
import {tap} from 'rxjs';
import {PortableTextInterface} from '../../projects/portable-text/src/lib/interfaces/portable-text.interface'
import {
  PortableTextConfigInterface
} from '../../projects/portable-text/src/lib/interfaces/portable-text-config.interface';
import {TestComponent} from './components/test/test.component';

@Component({
  selector: 'app-root',
  template: '<ngx-portable-text [portableTexts]="portableTexts" [config]="config"></ngx-portable-text>',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  config: PortableTextConfigInterface = {
    types: [{
      type: 'content.imageWithAltText',
      component: TestComponent,
      data: {test: 'test'}
    }]
  };

  portableTexts: PortableTextInterface[] = [];

  /**
   *
   * @param cdr
   * @param mockService
   */
  constructor(private cdr: ChangeDetectorRef,
              private mockService: MockService) {}

  /**
   *
   */
  ngOnInit(): void {
    this.mockService.getMock('simple.json').pipe(
      tap((portableTexts: PortableTextInterface[]) => {
        this.portableTexts = portableTexts;
        this.cdr.detectChanges();
      })
    ).subscribe();
  }
}
