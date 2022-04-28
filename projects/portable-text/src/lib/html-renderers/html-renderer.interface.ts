import {
  ClassifiedArbitraryTypedObject,
  ClassifiedArbitraryTypedObjectType
} from '../helpers/arbitrary-typed-object.helper';

export interface HtmlRendererInterface {
  render(cato: ClassifiedArbitraryTypedObject): HTMLElement;
  getPriority(): number;
  supports(type: ClassifiedArbitraryTypedObjectType): boolean;
}
