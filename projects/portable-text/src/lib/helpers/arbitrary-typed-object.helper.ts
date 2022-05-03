import { ArbitraryTypedObject } from '@portabletext/types';
import { Injectable } from '@angular/core';
import { ClassifierProviderService } from '../services/classifier-provider.service';


@Injectable({
  providedIn: 'root'
})
export class ArbitraryTypedObjectHelper {
  constructor(private classifierProvider: ClassifierProviderService) {
  }

  classifyNodes(nodes: ArbitraryTypedObject[]): ClassifiedArbitraryTypedObject[] {
    const n: ClassifiedArbitraryTypedObject[] = [];

    console.log([...nodes]);

    while (nodes.length > 0) {
      let classifier = this.classifierProvider.getClassifier(nodes[0]);

      if (!classifier) {
        const firstNode = nodes.splice(0, 1)[0];
        n.push((new ClassifiedArbitraryTypedObject()).addNode(firstNode));

        continue;
      }

      n.push(classifier.classify(nodes));
    }

    return n;
  }
}

/**
 *
 */
export class ClassifiedArbitraryTypedObject {
  private _type: ClassifiedArbitraryTypedObjectType;
  nodes: ArbitraryTypedObject[] = [];
  classifiedNodes: ClassifiedArbitraryTypedObject[] = [];
  private _node: ArbitraryTypedObject | null = null;
  private _domNode: HTMLElement | null = null;

  constructor(type?: ClassifiedArbitraryTypedObjectType) {
    this._type = type || ClassifiedArbitraryTypedObjectType.Unknown;
  }

  get type(): ClassifiedArbitraryTypedObjectType {
    return this._type;
  }

  set type(value: ClassifiedArbitraryTypedObjectType) {
    this._type = value;
  }

  addNode(node: ArbitraryTypedObject): ClassifiedArbitraryTypedObject {
    this.nodes.push(node);
    return this;
  }

  addClassifiedNode(node: ClassifiedArbitraryTypedObject): ClassifiedArbitraryTypedObject {
    this.classifiedNodes.push(node);
    return this;
  }

  setClassifiedNodes(nodes: ClassifiedArbitraryTypedObject[]): ClassifiedArbitraryTypedObject {
    this.classifiedNodes = nodes;
    return this;
  }

  get node(): ArbitraryTypedObject | null {
    return this._node;
  }

  setNode(value: ArbitraryTypedObject | null): ClassifiedArbitraryTypedObject {
    this._node = value;
    return this;
  }

  get domNode(): HTMLElement | null {
    return this._domNode;
  }

  setDomNode(value: HTMLElement | null): ClassifiedArbitraryTypedObject {
    this._domNode = value;
    return this;
  }
}

export enum ClassifiedArbitraryTypedObjectType {
  Heading = 'Heading',
  Image = 'Image',
  ListItem = 'ListItem',
  OrderedList = 'OrderedList',
  Paragraph = 'Paragraph',
  Unknown = 'Unknown',
  UnorderedList = 'UnorderedList'
}
