import {Component} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
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
  form: FormGroup;
  categoryNames = [ // ydali  i napishi normalniy zapros na bekend
    "Нерухомість",
    "Траспорт",
    "Хобі",
    "Електроніка",
    "Інструменти для дому",
    "Товари для дітей",
    "Одяг",
    "Спорт і туризм",
    "Товари для бізнесу",
    "Інше"
  ];
  constructor(
    private cookieService: CookieService,
    private router: Router,
    private searchService: SearchService,
    // private systemService: SystemService
  ) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      searchValue: new FormControl(null, [Validators.required, Validators.minLength(1)])
    });
  }

  onSubmit() {
    console.log(this.form.value);
    this.searchService.updateSearch(this.form.value.searchValue);
    this.router.navigate(['./system/search/', this.form.value.searchValue]);
  }

  IfAuth() {
    return this.cookieService.get('user');
  }


  Sort(arr) {
    let flag = 1;
    for(let i=0;i<arr.length; i++){
      if( arr[i] < arr[i+1]) { flag = 0; }
    }
    return flag;
  }
}
