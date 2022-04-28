import { Inject, Injectable } from '@angular/core';
import { MarkerInterface } from '../markers/marker.interface';

@Injectable({
  providedIn: 'root'
})
export class MarkerProviderService {
  /**
   *
   * @param markers
   */
  constructor(@Inject('MarkerInterface') private markers: MarkerInterface[]) {
  }

  /**
   *
   * @param type
   */
  getMarker(type: string): MarkerInterface | null {
    let s: MarkerInterface | null = null;

    this.markers.forEach((marker) => {
      if (marker.supports(type) && null === s) {
        s = marker;
      }
    });

    return s;
  }
}
