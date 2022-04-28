import { Inject, Injectable } from '@angular/core';
import { ClassifierInterface } from '../classifiers/classifier.interface';
import { ArbitraryTypedObject } from '@portabletext/types';

@Injectable({
  providedIn: 'root'
})
export class ClassifierProviderService {
  /**
   *
   * @param classifiers
   */
  constructor(@Inject('ClassifierInterface') private classifiers: ClassifierInterface[]) {
  }

  /**
   *
   * @param node
   */
  getClassifier(node: ArbitraryTypedObject): ClassifierInterface | null {
    let s: ClassifierInterface | null = null;

    this.classifiers.forEach((classifier) => {
      if (classifier.supports(node) && null === s) {
        s = classifier;
      }
    });

    return s;
  }
}
