import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../../shared/models/user.model';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  bul = 0;

  constructor(private http: HttpClient) {
  }

  getUser(user: User): Observable<any> {
    const formData = new FormData();
    Object.keys(user).forEach(key => formData.append(key, user[key]));
    return this.http.post<any>(`http://kyrsovoi/get_user.php`, formData).pipe(
      map((res) => {
        this.bul = res['data'];
        return this.bul;
      }));
  }
}
