import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {PortableTextInterface} from './interfaces/portable-text.interface';

@Component({
  selector: 'ngx-portable-text',
  template: '<div #content></div>',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortableTextComponent implements OnInit, OnChanges {
  @Input()
  portableTexts: PortableTextInterface[] = [];

  @ViewChild('content', {static: true})
  content!: ElementRef;

  /**
   *
   */
  constructor() { }

  /**
   *
   * @param changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['portableTexts'] && !changes['portableTexts'].isFirstChange()) {
      this.renderContent();
    }
  }

  /**
   *
   */
  ngOnInit(): void {
    this.renderContent();
  }

  /**
   *
   * @private
   */
  private renderContent(): void {
    console.log(this.portableTexts);
    console.log(this.content);
  }
}
