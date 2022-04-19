import {Component, Input, OnInit} from '@angular/core';
import {PortableTextInterface} from '../../interfaces/portable-text.interface';

@Component({
  selector: 'app-custom-component',
  templateUrl: './custom-component.component.html',
  styleUrls: ['./custom-component.component.scss']
})
export class CustomComponentComponent implements OnInit {
  @Input()
  portableText!: PortableTextInterface;

  constructor() { }

  ngOnInit(): void {
  }
}
