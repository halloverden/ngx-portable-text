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
import { ListClassifier } from './classifiers/list.classifier';
import { StylerProviderService } from './services/styler-provider.service';
import { HeadingStyler } from './stylers/heading.styler';
import { ImageClassifier } from './classifiers/image.classifier';
import { TextClassifier } from './classifiers/text.classifier';
import { NormalStyler } from './stylers/normal.styler';

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
    {provide: 'ClassifierInterface', useClass: ImageClassifier, multi: true},
    {provide: 'ClassifierInterface', useClass: ListClassifier, multi: true},
    {provide: 'ClassifierInterface', useClass: TextClassifier, multi: true},
    ClassifierProviderService,
    {provide: 'HtmlRendererInterface', useClass: ListRenderer, multi: true},
    {provide: 'HtmlRendererInterface', useClass: ParagraphRenderer, multi: true},
    HtmlRendererProviderService,
    {provide: 'MarkerInterface', useClass: EmphasisMarker, multi: true},
    {provide: 'MarkerInterface', useClass: LinkMarker, multi: true},
    {provide: 'MarkerInterface', useClass: StrikeThroughMarker, multi: true},
    {provide: 'MarkerInterface', useClass: StrongMarker, multi: true},
    {provide: 'MarkerInterface', useClass: UnderlineMarker, multi: true},
    MarkerProviderService,
    {provide: 'StylerInterface', useClass: HeadingStyler, multi: true},
    {provide: 'StylerInterface', useClass: NormalStyler, multi: true},
    StylerProviderService
  ]
})
export class PortableTextModule { }
