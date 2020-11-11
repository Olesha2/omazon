import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Categories} from './category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  baseUrl = 'http://kyrsovoi/get_category.php';
  category: Categories[];

  constructor(private http: HttpClient) {
  }

  getCategories(): Observable<Categories[]> {
    return this.http.get(`${this.baseUrl}`).pipe(
      map((res) => {
        this.category = res['data'];
        return this.category;
      }),
      catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);

    // return an observable with a user friendly message
    return throwError('privetkakdela');
  }
}
