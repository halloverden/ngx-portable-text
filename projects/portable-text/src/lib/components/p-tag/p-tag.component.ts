import {ChangeDetectionStrategy, Component, ElementRef, Input, OnInit} from '@angular/core';
import {PortableTextInterface} from '../../interfaces/portable-text.interface';
import {PortableTextConfigInterface} from '../../interfaces/portable-text-config.interface';
import {RenderService} from '../../services/render.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[pTag]',
  template: '',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PTagComponent implements OnInit {
  @Input()
  config!: PortableTextConfigInterface;

  @Input()
  portableText!: PortableTextInterface;

  /**
   *
   */
  constructor(private element: ElementRef,
              private renderService: RenderService) { }

  /**
   *
   */
  ngOnInit(): void {
    this.element.nativeElement.innerHTML = this.renderService.renderContent(this.portableText);
  }
}
