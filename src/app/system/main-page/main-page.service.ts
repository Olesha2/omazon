import {Injectable} from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Product } from './product';
@Injectable({
  providedIn: 'root'
})
export class MainPageService {
  baseUrl = 'http://kyrsovoi/get_products.php';
  products: Product[];

  constructor(private http: HttpClient) { }

  getAll(): Observable<Product[]> {
    return this.http.get(`${this.baseUrl}`).pipe(
      map((res) => {
        this.products = res['data'];
        console.log(this.products)
        return this.products;
      }),
    catchError(this.handleError));
  }
  private handleError(error: HttpErrorResponse) {
    console.log(error);

    // return an observable with a user friendly message
    return throwError('privetkakdela');
  }
}
