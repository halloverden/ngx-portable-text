import { NgModule } from '@angular/core';
import { PortableTextComponent } from './portable-text.component';
import {CommonModule} from '@angular/common';
import {PTagComponent} from './components/p-tag/p-tag.component';
import {RenderCustomComponentComponent} from './components/render-custom-component/render-custom-component.component';

@NgModule({
  declarations: [
    PortableTextComponent,
    PTagComponent,
    RenderCustomComponentComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    PortableTextComponent
  ]
})
export class PortableTextModule { }
