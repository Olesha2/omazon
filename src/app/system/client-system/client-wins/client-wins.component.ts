import {Component, OnInit} from '@angular/core';
import {ClientPageService} from '../client-page/client-page.service';
import {productClientwins} from '../client-page/product-clientwins';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-client-wins',
  templateUrl: './client-wins.component.html',
  styleUrls: ['../client-products/client-products.component.css']
})
export class ClientWinsComponent implements OnInit {

  prodWins: productClientwins[];
  ClientId = this.cookieService.get('id');
  error: string;

  constructor(
    private cookieService: CookieService,
    private clientPageService: ClientPageService) {
  }


  ngOnInit(): void {
    this.getWins();
  }

  getWins(): void {
    this.clientPageService.getWins(this.ClientId).subscribe(
      (res: productClientwins[]) => {
        this.prodWins = res.map(item => new productClientwins({...item}));
        console.log(this.prodWins);
      },
      (err) => {
        this.error = err;
      }
    );
  }

}
