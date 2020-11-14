import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import {Product} from './product';
import {imageg} from './imageg';

@Injectable({
  providedIn: 'root'
})
// tslint:disable-next-line:class-name
export class productPageService {
  baseUrl = 'http://kyrsovoi';
  product: Product;
  images: imageg[];

  constructor(private http: HttpClient) {
  }

  getAll(id: string): Observable<Product> {
    const formData = new FormData();
    formData.append('id', id);
    return this.http.post(`${this.baseUrl}/get_product.php`, formData)
      .pipe(
        map((res) => {
          this.product = res['data'];

          return this.product;
        }),
        catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);

    // return an observable with a user friendly message
    return throwError('error');
  }

  // tslint:disable-next-line:typedef
  postBet(id: string, betts : string, idClient) {
    const formData = new FormData();
    formData.append('id', id);
    formData.append('idClient', idClient);
    formData.append('bet', betts);

    return this.http.post<any>(`${this.baseUrl}/post_bet.php`, formData);
  }

  getImages(id: string): Observable<imageg[]> {
    const formData = new FormData();
    formData.append('id', id);
    return this.http.post(`${this.baseUrl}/get_img_of_product.php`, formData)
      .pipe(
        map((res) => {
          this.images = res['data'];
          return this.images;
        }),
        catchError(this.handleError));

  }


}

//const formData = new FormData();
//Object.keys(product).forEach( key => formData.append(key, product[key]));
