import { ArbitraryTypedObject } from '@portabletext/types';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ArbitraryTypedObjectHelper {
  constructor() {
  }

  classifyNodes(nodes: ArbitraryTypedObject[]): ClassifiedArbitraryTypedObject[] {
    const n: ClassifiedArbitraryTypedObject[] = [];

    console.log([...nodes]);

    while (nodes.length > 0) {
      n.push(this.classifyNode(nodes));
    }

    return n;
  }

  /**
   *
   * @param nodes
   */
  classifyNode(nodes: ArbitraryTypedObject[]): ClassifiedArbitraryTypedObject {
    const firstNode = nodes.splice(0, 1)[0];

    if (this.isParagraph(firstNode)) {
      return (new ClassifiedArbitraryTypedObject(ClassifiedArbitraryTypedObjectType.Paragraph)).addNode(firstNode);
    } else if (this.isUnorderedList(firstNode)) {
      let n = new ClassifiedArbitraryTypedObject(ClassifiedArbitraryTypedObjectType.UnorderedList);
      n.addClassifiedNode((new ClassifiedArbitraryTypedObject(ClassifiedArbitraryTypedObjectType.UnorderedListItem)).addNode(firstNode))

      let child = this.getListNodes(nodes, firstNode);

      while (null !== child) {
        n.addClassifiedNode((new ClassifiedArbitraryTypedObject(ClassifiedArbitraryTypedObjectType.UnorderedListItem)).addNode(child));
        child = this.getListNodes(nodes, child);
      }

      return n;
    } else if (this.isOrderedList(firstNode)) {
      let n = (new ClassifiedArbitraryTypedObject(ClassifiedArbitraryTypedObjectType.OrderedList));
      n.addClassifiedNode((new ClassifiedArbitraryTypedObject(ClassifiedArbitraryTypedObjectType.OrderedListItem)).addNode(firstNode))

      let child = this.getListNodes(nodes, firstNode);

      while (null !== child) {
        n.addClassifiedNode((new ClassifiedArbitraryTypedObject(ClassifiedArbitraryTypedObjectType.OrderedListItem)).addNode(child));
        child = this.getListNodes(nodes, child);
      }

      return n;
    } else {
      return (new ClassifiedArbitraryTypedObject()).addNode(firstNode);
    }
  }

  isUnorderedList(node: ArbitraryTypedObject): boolean {
    return node['listItem'] && node['listItem'] === 'bullet';
  }

  isOrderedList(node: ArbitraryTypedObject): boolean {
    return node['listItem'] && node['listItem'] === 'number';
  }

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

  isParagraph(node: ArbitraryTypedObject): boolean {
    return node['_type'] === 'block' && node['style'] === 'normal' && !node['listItem'];
  }
}

/**
 *
 */
export class ClassifiedArbitraryTypedObject {
  type: ClassifiedArbitraryTypedObjectType;
  nodes: ArbitraryTypedObject[] = [];
  classifiedNodes: ClassifiedArbitraryTypedObject[] = [];

  constructor(type?: ClassifiedArbitraryTypedObjectType) {
    this.type = type || ClassifiedArbitraryTypedObjectType.Unknown;
  }

  addNode(node: ArbitraryTypedObject): ClassifiedArbitraryTypedObject {
    this.nodes.push(node);
    return this;
  }

  addClassifiedNode(node: ClassifiedArbitraryTypedObject): ClassifiedArbitraryTypedObject {
    this.classifiedNodes.push(node);
    return this;
  }
}

export enum ClassifiedArbitraryTypedObjectType {
  OrderedList = 'OrderedList',
  OrderedListItem = 'OrderedListItem',
  Paragraph = 'Paragraph',
  Unknown = 'Unknown',
  UnorderedList = 'UnorderedList',
  UnorderedListItem = 'UnorderedListItem'
}
