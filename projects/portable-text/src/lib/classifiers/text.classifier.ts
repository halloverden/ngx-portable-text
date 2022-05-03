import { ClassifierInterface } from './classifier.interface';
import {
  ClassifiedArbitraryTypedObject,
  ClassifiedArbitraryTypedObjectType
} from '../helpers/arbitrary-typed-object.helper';
import { ArbitraryTypedObject } from '@portabletext/types';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TextClassifier implements ClassifierInterface {
  /**
   *
   * @param nodes
   */
  classify(nodes: ArbitraryTypedObject[]): ClassifiedArbitraryTypedObject {
    const firstNode = nodes.splice(0, 1)[0];
    return (new ClassifiedArbitraryTypedObject(ClassifiedArbitraryTypedObjectType.paragraph)).addNode(firstNode);
  }

  /**
   *
   */
  getPriority(): number {
    return 0;
  }

  /**
   *
   * @param node
   */
  supports(node: ArbitraryTypedObject): boolean {
    return node['_type'] === 'block' && !node['listItem'];
  }
}
