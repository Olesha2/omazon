import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../../shared/models/user.model';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  bul = 0;

  constructor(private http: HttpClient) {
  }

  createNewUser(user: User): Observable<any> {
    console.log(user);
    const formData = new FormData();
    Object.keys(user).forEach(key => formData.append(key, user[key]));
    return this.http.post<any>(`http://kyrsovoi/registration.php`, formData).pipe(
      map((res) => {
        this.bul = res['data'];
        return this.bul;
      }));
  }
}
