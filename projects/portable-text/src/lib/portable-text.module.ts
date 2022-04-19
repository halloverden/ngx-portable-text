import { NgModule } from '@angular/core';
import { PortableTextComponent } from './portable-text.component';
import {CommonModule} from '@angular/common';
import {CustomComponentComponent} from './components/custom-component/custom-component.component';
import {PTagComponent} from './components/p-tag/p-tag.component';

@NgModule({
  declarations: [
    CustomComponentComponent,
    PortableTextComponent,
    PTagComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PortableTextComponent
  ]
})
export class PortableTextModule { }
