import { Component, OnInit } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {ClientPageService} from '../client-page/client-page.service';

import {clientbets} from '../client-page/clientbets';

@Component({
  selector: 'app-client-bets',
  templateUrl: './client-bets.component.html',
  styleUrls: ['../client-products/client-products.component.css']
})
export class ClientBetsComponent implements OnInit {

  constructor(
    private cookieService: CookieService,
    private clientPageService: ClientPageService ) { }
  prodBets: clientbets[];
  ClientId = this.cookieService.get('id');
  error: string;
  ngOnInit(): void {
    this.getBets();
  }
  getBets(): void{
    this.clientPageService.getBets(this.ClientId).subscribe(
      (res: clientbets[]) => {
        this.prodBets = res.map(item => new clientbets({...item}));
        console.log(this.prodBets);
      },
      (err) => {
        this.error = err;
      }
    );
  }

}
