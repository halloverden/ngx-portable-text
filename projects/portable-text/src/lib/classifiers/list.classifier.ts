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
export class ListClassifier implements ClassifierInterface {
  /**
   *
   * @param nodes
   */
  classify(nodes: ArbitraryTypedObject[]): ClassifiedArbitraryTypedObject {
    const firstNode = nodes[0];

    if (this.isOrderedList(firstNode)) {
      return this.classifyOrderedList(nodes);
    } else if (this.isUnorderedList(firstNode)) {
      return this.classifyUnorderedList(nodes);
    }

    throw Error('Unable to classify node: ' + firstNode);
  }

  /**
   *
   * @param node
   */
  supports(node: ArbitraryTypedObject): boolean {
    return this.isOrderedList(node) || this.isUnorderedList(node);
  }

  /**
   *
   * @param node
   */
  isOrderedList(node: ArbitraryTypedObject): boolean {
    return node['listItem'] && node['listItem'] === 'number';
  }

  /**
   *
   * @param node
   */
  isUnorderedList(node: ArbitraryTypedObject): boolean {
    return node['listItem'] && node['listItem'] === 'bullet';
  }

  /**
   *
   * @param nodes
   * TODO: Handle levels
   */
  classifyOrderedList(nodes: ArbitraryTypedObject[]): ClassifiedArbitraryTypedObject {
    const firstNode = nodes.splice(0, 1)[0];

    let n = (new ClassifiedArbitraryTypedObject(ClassifiedArbitraryTypedObjectType.OrderedList));
    n.addClassifiedNode((new ClassifiedArbitraryTypedObject(ClassifiedArbitraryTypedObjectType.OrderedListItem)).addNode(firstNode))

    let child = this.getListNodes(nodes, firstNode);

    while (null !== child) {
      n.addClassifiedNode((new ClassifiedArbitraryTypedObject(ClassifiedArbitraryTypedObjectType.OrderedListItem)).addNode(child));
      child = this.getListNodes(nodes, child);
    }

    return n;
  }

  /**
   *
   * @param nodes
   * TODO: Handle levels
   */
  classifyUnorderedList(nodes: ArbitraryTypedObject[]): ClassifiedArbitraryTypedObject {
    const firstNode = nodes.splice(0, 1)[0];

    let n = (new ClassifiedArbitraryTypedObject(ClassifiedArbitraryTypedObjectType.UnorderedList));
    n.addClassifiedNode((new ClassifiedArbitraryTypedObject(ClassifiedArbitraryTypedObjectType.UnorderedListItem)).addNode(firstNode))

    let child = this.getListNodes(nodes, firstNode);

    while (null !== child) {
      n.addClassifiedNode((new ClassifiedArbitraryTypedObject(ClassifiedArbitraryTypedObjectType.UnorderedListItem)).addNode(child));
      child = this.getListNodes(nodes, child);
    }

    return n;
  }

  /**
   *
   * @param nodes
   * @param previousNode
   */
  getListNodes(nodes: ArbitraryTypedObject[], previousNode: ArbitraryTypedObject): ArbitraryTypedObject | null {
    let nextNode = nodes[0];

    if (!nextNode) {
      return null;
    }

    if (nextNode['listItem'] && nextNode['listItem'] === previousNode['listItem'] && nextNode['level'] >= previousNode['level']) {
      return nodes.splice(0, 1)[0];
    }

    return null;
  }
}
