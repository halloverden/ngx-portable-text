import { NgModule } from '@angular/core';
import { PortableTextComponent } from './portable-text.component';
import {CommonModule} from '@angular/common';
import {RenderCustomComponentComponent} from './components/render-custom-component/render-custom-component.component';
import { ParagraphRenderer } from './html-renderers/paragraph.renderer';
import { ListRenderer } from './html-renderers/list.renderer';
import { HtmlRendererProviderService } from './services/html-renderer-provider.service';
import { MarkerProviderService } from './services/marker-provider.service';
import { EmphasisMarker } from './markers/emphasis.marker';
import { LinkMarker } from './markers/link.marker';
import { StrikeThroughMarker } from './markers/strike-through.marker';
import { StrongMarker } from './markers/strong.marker';
import { UnderlineMarker } from './markers/underline.marker';

@NgModule({
  declarations: [
    PortableTextComponent,
    RenderCustomComponentComponent
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
    HtmlRendererProviderService,
    {provide: 'MarkerInterface', useClass: EmphasisMarker, multi: true},
    {provide: 'MarkerInterface', useClass: LinkMarker, multi: true},
    {provide: 'MarkerInterface', useClass: StrikeThroughMarker, multi: true},
    {provide: 'MarkerInterface', useClass: StrongMarker, multi: true},
    {provide: 'MarkerInterface', useClass: UnderlineMarker, multi: true},
    MarkerProviderService
  ]
})
export class PortableTextModule { }
