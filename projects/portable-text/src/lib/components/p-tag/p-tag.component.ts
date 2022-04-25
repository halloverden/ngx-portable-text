import {ChangeDetectionStrategy, Component, ElementRef, Input, OnInit} from '@angular/core';
import {PortableTextConfigInterface} from '../../interfaces/portable-text-config.interface';
import {RenderService} from '../../services/render.service';
import {PortableTextBlock} from "@portabletext/types";

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
  node!: PortableTextBlock;

  /**
   *
   */
  constructor(private element: ElementRef,
              private renderService: RenderService) { }

  /**
   *
   */
  ngOnInit(): void {
    this.element.nativeElement.innerHTML = this.renderService.renderContent(this.node);
  }
}
