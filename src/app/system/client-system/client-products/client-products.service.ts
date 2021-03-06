import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {clientProducts} from './clientProducts';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientProductsService {
  baseUrl = 'http://kyrsovoi';
  cliProds: clientProducts[];
  constructor(private http: HttpClient) {
  }

  getClientProductsS(id: string): Observable<clientProducts[]> {
    const formData = new FormData();
    formData.append('id', id);
    return this.http.post(`${this.baseUrl}/get_cliProds.php`, formData)
      .pipe(
        map((res) => {
          this.cliProds = res['data'];

          return this.cliProds;
        }),
        catchError(this.handleError));
  }
  deleteProduct(idProd: string) {
    console.log('ddd');
    const formData = new FormData();
    formData.append('id', idProd);
    return this.http.post(`${this.baseUrl}/delete_product.php`, formData);
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);

    // return an observable with a user friendly message
    return throwError('error');
  }
}
