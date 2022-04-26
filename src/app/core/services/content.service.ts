import { Injectable } from '@angular/core';
import { from, map, Observable } from 'rxjs';
import { ArbitraryTypedObject } from '@portabletext/types';
import sanityClientConstructor from '@sanity/client';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  sanityClient;

  constructor() {
    this.sanityClient = sanityClientConstructor(environment.sanity.options);
  }

  /**
   *
   */
  getSamorgLocalUnionIntroData(): Observable<ArbitraryTypedObject[]> {
    return from(this.sanityClient.fetch(`{ 'localUnion': *[ _type == "localUnion" && name == "Oslo" ][0]{...} }`)).pipe(
      map((response: any) => {
        return response.localUnion.intro as ArbitraryTypedObject[];
      })
    );
  }
}
