import {Component, OnInit} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-client-system',
  templateUrl: './client-system.component.html',
  styleUrls: ['./client-system.component.css']
})
export class ClientSystemComponent implements OnInit {

  id = this.cookieService.get('id');

  constructor(private cookieService: CookieService,
              // private systemService: SystemService
  ) {
  }

  ngOnInit(): void {
  }

}
