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
