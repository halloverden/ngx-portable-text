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

    if (this.isListItemNode(firstNode)) {
      const li = this.sliceLeveledNodes(nodes);
      const l = li.length;
      const classifiedList = this.classifyList(li);

      nodes.splice(0, l);

      return classifiedList;
    }

    throw Error('Unable to classify node: ' + firstNode);
  }

  /**
   *
   * @param nodes
   */
  classifyList(nodes: ArbitraryTypedObject[]): ClassifiedArbitraryTypedObject {
    const firstNode = nodes[0];

    let l = new ClassifiedArbitraryTypedObject();

    if (this.isOrderedListNode(firstNode['listItem'])) {
      l.type = ClassifiedArbitraryTypedObjectType.OrderedList;
    } else if (this.isUnorderedListNode(firstNode['listItem'])) {
      l.type = ClassifiedArbitraryTypedObjectType.UnorderedList;
    }

    l.setClassifiedNodes(this.classifyListItems(nodes));

    return l;
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
    return this.isListItemNode(node);
  }

  /**
   *
   * @param node
   */
  isListItemNode(node: ArbitraryTypedObject): boolean {
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
    let i = 0;
    let nextNode = nodes[i];
    let previousNode = null;
    const n = [];

    while (null === previousNode || this.isSameType(nextNode, previousNode) || i > nodes.length) {
      let classifiedListNode = (new ClassifiedArbitraryTypedObject(ClassifiedArbitraryTypedObjectType.ListItem)).addNode(nextNode).setNode(nextNode);
      n.push(classifiedListNode);
      previousNode = nextNode;
      nextNode = nodes[++i];

      if (!this.isListItemNode(nextNode)) {
        break;
      }

      if (this.isNextLevel(nextNode, previousNode)) {
        let ln = this.sliceLeveledNodes(nodes.slice(i));
        nodes.splice(i, ln.length);
        nextNode = nodes[i];
        classifiedListNode.addClassifiedNode(this.classifyList(ln));
      }
    }

    return n;
  }

  /**
   *
   * @param nodes
   */
  sliceLeveledNodes(nodes: ArbitraryTypedObject[]): ArbitraryTypedObject[] {
    let bottomLevel = nodes[0]['level'];
    let bottomLevelListType = nodes[0]['listItem'];
    let nodesToGet = 0;
    let i = 0;
    let currentItem = nodes[i];

    while (this.isListItemNode(currentItem)) {
      if ((currentItem['level'] === bottomLevel && currentItem['listItem'] !== bottomLevelListType) || currentItem['level'] < bottomLevel) {
        break;
      }

      nodesToGet++;
      currentItem = nodes[++i];
    }

    return nodes.slice(0, nodesToGet);
  }

  /**
   *
   */
  isNextLevel(nextNode: ArbitraryTypedObject, previousNode: ArbitraryTypedObject): boolean {
    return this.isSameType(nextNode, previousNode) && nextNode['level'] > previousNode['level'];
  }

  /**
   *
   */
  isSameType(nextNode: ArbitraryTypedObject, previousNode: ArbitraryTypedObject): boolean {
    return this.isListItemNode(nextNode) && this.isListItemNode(previousNode) && nextNode['listItem'] === previousNode['listItem'];
  }
}
