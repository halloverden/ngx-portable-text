import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {PortableTextInterface} from '../../projects/portable-text/src/lib/interfaces/portable-text.interface'

@Injectable({
  providedIn: 'root'
})
export class MockService {
  constructor(private http: HttpClient) {}

  /**
   *
   */
  getMock(mockFile: string): Observable<PortableTextInterface[]> {
    return this.http.get('/assets/mocks/' + mockFile).pipe(
      map((response: any) => {
        return response as PortableTextInterface[];
      })
    );
  }
}
