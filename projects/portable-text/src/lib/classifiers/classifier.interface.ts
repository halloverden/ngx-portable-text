import { ArbitraryTypedObject } from '@portabletext/types';
import { ClassifiedArbitraryTypedObject, } from '../helpers/arbitrary-typed-object.helper';

/**
 *
 */
export interface ClassifierInterface {
  classify(nodes: ArbitraryTypedObject[]): ClassifiedArbitraryTypedObject
  getPriority(): number;
  supports(node: ArbitraryTypedObject): boolean;
}
