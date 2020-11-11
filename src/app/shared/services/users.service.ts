import {HttpClientModule} from '@angular/common/http';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../models/user.model';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient ) {
  }
  getUserByEmail(email: string): Observable<any>{
    return this.http.get(`http://localhost:3000/users?email =${email}`)
      .pipe(map((response: Response) => response)).pipe(map((user: any) => user[0] ? user[0] : undefined));
     // .map((user: User) => console.log(user));
  }
}

