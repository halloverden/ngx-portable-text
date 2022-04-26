import {
  ClassifiedArbitraryTypedObject,
  ClassifiedArbitraryTypedObjectType
} from '../helpers/arbitrary-typed-object.helper';

export interface HtmlRendererInterface {
  render(cato: ClassifiedArbitraryTypedObject): HTMLElement;
  supports(type: ClassifiedArbitraryTypedObjectType): boolean;
}
