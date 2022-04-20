# NgxPortableText

Renders [Portable Text](https://github.com/portabletext/portabletext) (used by [Sanity.io](https://sanity.io)) and more.

## Installation
```
npm i @halloverden/ngx-portable-text -S
```

## Usage

The `<ngx-portable-text></ngx-portable-text>` component takes the portable texts and a config as input.
The config objects lets you define what components to use to render different "types" of content:

[//]: # (TODO: Describe the other configs)

[//]: # (TODO: Is this the correct import?)
```typescript
import {PortableTextInterface} from '@halloverden/ngx-portable-text';

@Component({
  selector: 'app-root',
  template: '<ngx-portable-text [portableTexts]="portableTexts" [config]="config"></ngx-portable-text>',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  config: PortableTextInterface = {
    types: new Map().set('customContent', TestComponent),
    marks: any,
    styles: any,
    list: any,
    listItem: any,
    hardBreak: any
  };

  portableTexts: PortableTextInterface[] = [];
}
```

To use a custom component, implement the `CustomComponent` which ships with the package: 

[//]: # (TODO: Is this the correct import?)
```typescript
import {CustomComponent, PortableTextInterface} from '@halloverden/ngx-portable-text';

export class TestComponent implements CustomComponent {
  portableText!: PortableTextInterface;
}
```

This Component will make sure your component gets the portable text data injected.

## License
MIT © [Hallo Verden](https://github.com/halloverden)

## Change log

### 1.0.0
- Initial version
