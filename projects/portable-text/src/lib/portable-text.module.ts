import { NgModule } from '@angular/core';
import { PortableTextComponent } from './portable-text.component';
import {CommonModule} from '@angular/common';
import {PTagComponent} from './components/p-tag/p-tag.component';
import {RenderCustomComponentComponent} from './components/render-custom-component/render-custom-component.component';
import {UlTagComponent} from "./components/ul-tag/ul-tag.component";
import { ParagraphRenderer } from './html-renderers/paragraph.renderer';
import { ListRenderer } from './html-renderers/list.renderer';
import { HtmlRendererProviderService } from './services/html-renderer-provider.service';

@NgModule({
  declarations: [
    PortableTextComponent,
    PTagComponent,
    RenderCustomComponentComponent,
    UlTagComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    PortableTextComponent
  ],
  providers: [
    {provide: 'HtmlRendererInterface', useClass: ParagraphRenderer, multi: true},
    {provide: 'HtmlRendererInterface', useClass: ListRenderer, multi: true},
    HtmlRendererProviderService
  ]
})
export class PortableTextModule { }
