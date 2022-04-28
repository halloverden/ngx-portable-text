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

    if (this.isListNode(firstNode)) {
      const firstNode = nodes[0];

      let l = new ClassifiedArbitraryTypedObject();

      if (this.isOrderedListNode(firstNode['listItem'])) {
        l.type = ClassifiedArbitraryTypedObjectType.OrderedList;
      } else if (this.isUnorderedListNode(firstNode['listItem'])) {
        l.type = ClassifiedArbitraryTypedObjectType.UnorderedList;
      }

      let listItems = this.classifyListItems(this.getConsecutiveListItems(nodes));

      listItems.forEach((listItem) => {
        l.addClassifiedNode(listItem);
      });

      return l;
    }

    throw Error('Unable to classify node: ' + firstNode);
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
    return this.isListNode(node);
  }

  /**
   *
   * @param node
   */
  isListNode(node: ArbitraryTypedObject): boolean {
    return node && !!node['listItem'];
  }

  /**
   *
   * @param listItemType
   */
  isOrderedListNode(listItemType: string): boolean {
    return listItemType === 'number';
  }

  /**
   *
   * @param listItemType
   */
  isUnorderedListNode(listItemType: string): boolean {
    return listItemType === 'bullet';
  }

  /**
   *
   * @param nodes
   */
  classifyListItems(nodes: ArbitraryTypedObject[]): ClassifiedArbitraryTypedObject[] {
    let nextNode = nodes[0];
    let previousNode = null;
    const n = [];

    do {
      let classifiedListNode = (new ClassifiedArbitraryTypedObject(ClassifiedArbitraryTypedObjectType.ListItem)).addNode(nextNode);
      n.push(classifiedListNode);
      previousNode = nodes.splice(0, 1)[0];
      nextNode = nodes[0];

      if (this.isListNode(nextNode)) {
        // console.log('blep');
      }

      if (!this.isListNode(nextNode)) {
        break;
      }

      if (this.isNextLevel(nextNode, previousNode)) {
        // console.log('next level shizzle', nextNode, previousNode);
        classifiedListNode.addClassifiedNode(this.classify(nodes));
      } else if (this.isPreviousLevel(nextNode, previousNode)) {
      }
    } while (this.isListNode(nextNode) && this.isSameType(nextNode, previousNode))

    console.log('n', n);

    return n;
  }

  /**
   *
   * @param nodes
   */
  getConsecutiveListItems(nodes: ArbitraryTypedObject[]): ArbitraryTypedObject[] {
    const c: ArbitraryTypedObject[] = [];
    let currentItem = nodes[0];
    let previousItem = null;

    while (this.isListNode(currentItem) && (null === previousItem || this.isSameType(currentItem, previousItem))) {
      c.push(currentItem);
      previousItem = nodes.splice(0, 1)[0];
      currentItem = nodes[0];
    }

    return c;
  }

  /**
   *
   */
  isNextLevel(nextNode: ArbitraryTypedObject, previousNode: ArbitraryTypedObject): boolean {
    return nextNode['level'] > previousNode['level'] && this.isSameType(nextNode, previousNode);
  }

  /**
   *
   */
  isPreviousLevel(nextNode: ArbitraryTypedObject, previousNode: ArbitraryTypedObject): boolean {
    return nextNode['level'] < previousNode['level'] && this.isSameType(nextNode, previousNode);
  }

  /**
   *
   */
  isSameType(nextNode: ArbitraryTypedObject, previousNode: ArbitraryTypedObject): boolean {
    return nextNode['listItem'] === previousNode['listItem'];
  }
}
