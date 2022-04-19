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
  templateUrl: './app.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  config: PortableTextConfigInterface = {
    types: {
      ['content.imageWithAltText']: TestComponent
    }
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
    this.mockService.getMock('test.json').pipe(
      tap((portableTexts: PortableTextInterface[]) => {
        this.portableTexts = portableTexts;
        this.cdr.detectChanges();
      })
    ).subscribe();
  }
}
