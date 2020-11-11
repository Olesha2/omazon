import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UsersService} from '../../shared/services/users.service';
import {User} from '../../shared/models/user.model';
import {LoginService} from './login.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../auth.service';
import {CookieService} from 'ngx-cookie-service';
import {Login} from './login';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginName = '';
  message = "Пожалуйста авторизуйтесь";
  form: FormGroup;
  messageColor = 'black';

  constructor(
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService,
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params)=>{
      if(params['NowCanLogin']){
      this.loginName = params['NowCanLogin'];}
      if(this.loginName !=''){
      this.message = this.loginName + " пожалуйста авторизуйтесь";}
    })
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password : new FormControl(null, [Validators.required, Validators.minLength(4)])
    });
  }
  onSubmit(){
    const {email, password} = this.form.value;
    const user = new User(email, password, 'AAA');

    // tslint:disable-next-line:no-shadowed-variable
    this.loginService.getUser(user).subscribe(( baf: Login) => {
      if(baf.match != 0){
        this.changeAuthStatus('login');
        console.log(baf);
        this.cookieService.set('user', String(1));
        this.cookieService.set('id', String(baf.id_client));
        this.router.navigate(['./system/main'],{
    queryParams:{
      nowCanLoggin: true
    }
  });
      }else{
        this.messageColor = 'red';
        this.message = "Что-то пошло не так. Проверьте ваш логин и пароль и попробуйте ещё раз";
      }
    });
  }
   changeAuthStatus(status: string){
if (status === 'login'){
  this.auth.logIn();
}else{
  this.auth.logOut();
}
}
}
