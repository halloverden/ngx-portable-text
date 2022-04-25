import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {ArbitraryTypedObject} from "@portabletext/types";

@Injectable({
  providedIn: 'root'
})
export class MockService {
  constructor(private http: HttpClient) {}

  /**
   *
   */
  getMock(mockFile: string): Observable<ArbitraryTypedObject[]> {
    return this.http.get('/assets/mocks/' + mockFile).pipe(
      map((response: any) => {
        return response as ArbitraryTypedObject[];
      })
    );
  }
}
