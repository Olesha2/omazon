import { Component } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {Product} from './main-page/product';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {SearchService} from './search/search.service';
//import {SystemService} from './system.service';

@Component({
  selector: 'app-system',
  templateUrl: 'system.component.html',
  styleUrls: ['./system.component.css']
})
export class SystemComponent {
  id = this.cookieService.get('id');

  constructor(
    private cookieService: CookieService,
    private router: Router,
    private searchService: SearchService,
             // private systemService: SystemService
  ) {}
  form: FormGroup;
  ngOnInit () {
    this.form = new FormGroup({
      searchValue: new FormControl(null, [Validators.required, Validators.minLength(1)])
    });
  }
  onSubmit(){
    console.log(this.form.value);
    this.searchService.updateSearch(this.form.value.searchValue);
    this.router.navigate(['./system/search/', this.form.value.searchValue]);
  }
  IfAuth(){return this.cookieService.get('user');}
  LohOut(){
    this.cookieService.delete('user');
    this.cookieService.delete('id');
  }
}
