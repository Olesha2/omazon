import {Injectable} from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

import {BehaviorSubject, Observable, throwError} from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {productSearch} from './productSearch';


@Injectable({
  providedIn: 'root'
})
export class SearchService {
constructor(private http: HttpClient) {}
  baseUrl = 'http://kyrsovoi';
  products: productSearch[];
  search$: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  getProducts(name: string): Observable<productSearch[]> {
    const formData = new FormData();
    formData.append('name', name);
    return this.http.post(`${this.baseUrl}/get_SearchProduct.php`, formData)
      .pipe(
        map((res) => {
          this.products = res['data'];

          return this.products;
        }),
        catchError(this.handleError));
  }
  private handleError(error: HttpErrorResponse) {
    console.log(error);

    // return an observable with a user friendly message
    return throwError('error');
  }

  updateSearch(qwery: string): void {
    this.search$.next(qwery);
  }
}
