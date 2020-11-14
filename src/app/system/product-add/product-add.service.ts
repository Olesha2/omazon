import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';

import {Products} from './product.model';
import {catchError, map} from 'rxjs/operators';
import {ProductsEdit} from './ProductEdit';

@Injectable({
  providedIn: 'root'
})
export class ProductAddService {

  productEdit: ProductsEdit;
  constructor(private http: HttpClient) {
  }

  addProduct(product: Products, editId: string): Observable<any> {
    console.log(product);
    const formData = new FormData();
    Object.keys(product).forEach(key => formData.append(key, product[key]));
    Object.keys(product['photos']).forEach(key => formData.append(key, product['photos'][key]));
    formData.append('editId', editId);
    return this.http.post<any>(`http://kyrsovoi/addProduct.php`, formData);
  }

  getEdit(tov: string ): Observable<ProductsEdit>{
    console.log(tov);
    const formData = new FormData();
    formData.append('tov', tov);
    return this.http.post(`http://kyrsovoi/get_editProduct.php`, formData)
      .pipe(
        map((res) => {
          this.productEdit = res['data'];

          return this.productEdit;
        }),
        catchError(this.handleError));
  }
  private handleError(error: HttpErrorResponse) {
    console.log(error);

    // return an observable with a user friendly message
    return throwError('error');
  }
}
