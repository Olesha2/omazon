import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {productSearch} from './productSearch';
import {FormGroup} from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(private http: HttpClient) {
  }

  baseUrl = 'http://kyrsovoi';
  products: productSearch[];
  search$: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  getProducts(name: string, form: FormGroup): Observable<productSearch[]> {
    const formData = new FormData();
    formData.append('name', name);
    console.log(form);
    Object.keys(form.value).forEach(key => formData.append(key, form.value[key]));

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
