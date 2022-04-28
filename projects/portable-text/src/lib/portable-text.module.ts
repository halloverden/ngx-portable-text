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
import { ClassifierProviderService } from './services/classifier-provider.service';
import { ParagraphClassifier } from './classifiers/paragraph.classifier';
import { ListClassifier } from './classifiers/list.classifier';

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
    {provide: 'ClassifierInterface', useClass: ListClassifier, multi: true},
    {provide: 'ClassifierInterface', useClass: ParagraphClassifier, multi: true},
    ClassifierProviderService,
    {provide: 'HtmlRendererInterface', useClass: ListRenderer, multi: true},
    {provide: 'HtmlRendererInterface', useClass: ParagraphRenderer, multi: true},
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
