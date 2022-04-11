import {Component, OnInit} from '@angular/core';
import {MockService} from './mock.service';
import {tap} from 'rxjs';
import {PortableTextInterface} from '../../projects/portable-text/src/lib/interfaces/portable-text.interface'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  portableTexts: PortableTextInterface[] = [];

  /**
   *
   * @param mockService
   */
  constructor(private mockService: MockService) {}

  /**
   *
   */
  ngOnInit(): void {
    this.mockService.getMock('simple.json').pipe(
      tap((portableTexts: PortableTextInterface[]) => {
        this.portableTexts = portableTexts;
      })
    ).subscribe();
  }
}
