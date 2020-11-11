import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {Products} from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductAddService {

  constructor(private http: HttpClient) {
  }

  addProduct(product: Products): Observable<any> {
    console.log(product);
    const formData = new FormData();
    Object.keys(product).forEach(key => formData.append(key, product[key]));
    Object.keys(product['photos']).forEach(key => formData.append(key, product['photos'][key]));
    return this.http.post<any>(`http://kyrsovoi/addProduct.php`, formData);
  }
}
