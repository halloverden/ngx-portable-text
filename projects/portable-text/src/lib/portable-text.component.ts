import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {PortableTextConfigInterface} from './interfaces/portable-text-config.interface';
import {isPortableTextBlock, isPortableTextListItemBlock} from '@portabletext/toolkit';
import {ArbitraryTypedObject, PortableTextBlock, PortableTextListItemBlock} from "@portabletext/types";

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
export class PortableTextComponent implements OnInit {
  @Input()
  config!: PortableTextConfigInterface;

  @Input()
  portableTexts: PortableTextBlock[] | ArbitraryTypedObject[] = [];

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
  }

  /**
   *
   * @param node
   */
  renderAsList(node: any): boolean {
    return isPortableTextListItemBlock(node);
  }

  /**
   *
   * @param node
   */
  renderAsPTag(node: any): boolean {
    return isPortableTextBlock(node);
  }

  /**
   *
   * @private
   */
  private initConfig(): void {
    // TODO: Init config
    if (!this.config) {
      this.config = {};
    }
  }
}
