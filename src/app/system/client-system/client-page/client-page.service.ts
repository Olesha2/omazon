import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';

import {catchError, map} from 'rxjs/operators';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Client} from './client';
import {productClientwins} from './product-clientwins';
import {clientbets} from './clientbets';

@Injectable({
  providedIn: 'root'
})
export class ClientPageService {
  baseUrl = 'http://kyrsovoi';
  client: Client;
  prodWins: productClientwins[];
  prodBets: clientbets[];

  constructor(private http: HttpClient) {
  }

  getClient(id: string): Observable<Client> {
    const formData = new FormData();
    formData.append('id', id);
    return this.http.post(`${this.baseUrl}/get_client.php`, formData)
      .pipe(
        map((res) => {
          this.client = res['data'];

          return this.client;
        }),
        catchError(this.handleError));
  }

  getWins(id: string): Observable<productClientwins[]> {
    const formData = new FormData();
    formData.append('id', id);
    return this.http.post(`${this.baseUrl}/get_wins.php`, formData)
      .pipe(
        map((res) => {
          this.prodWins = res['data'];

          return this.prodWins;
        }),
        catchError(this.handleError));
  }

  getBets(id: string): Observable<clientbets[]> {
    const formData = new FormData();
    formData.append('id', id);
    return this.http.post(`${this.baseUrl}/get_bets.php`, formData)
      .pipe(
        map((res) => {
          this.prodBets = res['data'];

          return this.prodBets;
        }),
        catchError(this.handleError));
  }


  private handleError(error: HttpErrorResponse) {
    console.log(error);

    // return an observable with a user friendly message
    return throwError('error');
  }
}
