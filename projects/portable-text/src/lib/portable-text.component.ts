import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {PortableTextConfigInterface} from './interfaces/portable-text-config.interface';
import {ArbitraryTypedObject, PortableTextBlock, PortableTextListItemBlock} from "@portabletext/types";
import { HtmlRendererProviderService } from './services/html-renderer-provider.service';
import { ArbitraryTypedObjectHelper, ClassifiedArbitraryTypedObject } from './helpers/arbitrary-typed-object.helper';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'ngx-portable-text',
  templateUrl: './portable-text.component.html',
  styles: [':host {display: block}'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
/**
 * DOCS:
 * @see https://www.sanity.io/guides/introduction-to-portable-text
 * @see https://www.sanity.io/docs/presenting-block-text
 *
 * OTHER IMPLEMENTATIONS:
 * @see https://github.com/portabletext/to-html
 * @see https://github.com/portabletext/react-portabletext
 * @see https://github.com/rdunk/sanity-blocks-vue-component
 * @see https://github.com/portabletext/svelte-portabletext/
 * @see https://github.com/sanity-io/block-content-to-hyperscript
 * @see https://github.com/sanity-io/block-content-to-markdown
 * @see https://github.com/oslofjord/sanity-linq#9-rendering-block-content
 * @see https://github.com/otovo/python-portabletext-html
 * @see https://github.com/sanity-io/sanity-php#rendering-block-content
 */
export class PortableTextComponent implements OnInit, OnChanges {
  @Input()
  config!: PortableTextConfigInterface;

  @Input()
  nodes: ArbitraryTypedObject[] = [];

  classifiedNodes: ClassifiedArbitraryTypedObject[] = [];

  constructor(private arbitraryTypedObjectHelper: ArbitraryTypedObjectHelper,
              private htmlRendererService: HtmlRendererProviderService,
              private sanitizer: DomSanitizer) {
  }

  /**
   *
   */
  asPortableTextBlock(node: ArbitraryTypedObject): PortableTextBlock {
    return node as PortableTextBlock;
  }

  /**
   *
   */
  asPortableTextListItemBlock(node: ArbitraryTypedObject): PortableTextListItemBlock {
    return node as PortableTextListItemBlock;
  }

  /**
   *
   */
  ngOnInit(): void {
    this.initConfig();
    this.initNodes();
  }

  /**
   *
   * @param changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['nodes']) {
      this.initNodes();
    }
  }

  /**
   *
   * @param cato
   */
  shouldRenderAsHtmlElement(cato: ClassifiedArbitraryTypedObject): boolean {
    return this.htmlRendererService.getRenderer(cato) !== null;
  }

  /**
   *
   * @param cato
   */
  renderAsHtmlElement(cato: ClassifiedArbitraryTypedObject): SafeHtml {
    const r = this.htmlRendererService.getRenderer(cato);

    if (r) {
      return this.sanitizer.bypassSecurityTrustHtml(r.render(cato).outerHTML);
    }

    return '';
  }

  /**
   *
   * @param cato
   */
  shouldRenderAsCustomComponent(cato: ClassifiedArbitraryTypedObject): boolean {
    return false;
  }

  /**
   *
   * @private
   */
  private initConfig(): void {
    this.config = this.config || {};
  }

  /**
   *
   * @private
   */
  private initNodes(): void {
    this.classifiedNodes = this.arbitraryTypedObjectHelper.classifyNodes(this.nodes);
  }
}
