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
import {ArbitraryTypedObject} from "@portabletext/types";

@Component({
  selector: 'app-root',
  template: '<ngx-portable-text [nodes]="nodes" [config]="config"></ngx-portable-text>',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  config: PortableTextInterface = {
    ...
  };

  nodes: ArbitraryTypedObject[] = []; // Data from server / Sanity.io
}
```

### Config

```typescript
export interface PortableTextConfigInterface {
  types?: Array<PortableTextConfigTypeInterface>,
  marks?: any,
  styles?: any,
  list?: any,
  listItem?: any,
  hardBreak?: any
}

export interface PortableTextConfigTypeInterface {
  type: string;
  component?: Type<any>;
  data?: any;
}
```

To use a custom component, implement the `CustomComponent` which ships with the package: 

[//]: # (TODO: Is this the correct import?)

```typescript
import {CustomComponent} from '@halloverden/ngx-portable-text';
import {ArbitraryTypedObject} from "@portabletext/types";

export class TestComponent implements CustomComponent {
  node!: ArbitraryTypedObject;
  data?: any;
}
```

This Component will make sure your component gets the portable text data injected, as well as an optional custom data.

## License
MIT © [Hallo Verden](https://github.com/halloverden)

## Change log

### 1.0.0
- Initial version
