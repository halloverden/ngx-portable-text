import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {PortableTextInterface} from './interfaces/portable-text.interface';
import {PortableTextConfigInterface} from './interfaces/portable-text-config.interface';

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
  portableTexts: PortableTextInterface[] = [];

  /**
   *
   */
  ngOnInit(): void {
    this.initConfig();
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
