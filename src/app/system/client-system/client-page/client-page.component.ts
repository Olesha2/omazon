import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ClientPageService} from './client-page.service';
import {Client} from './client';
import {productClientwins} from './product-clientwins';
import {clientbets} from './clientbets';
import {CookieService} from 'ngx-cookie-service';


@Component({
  selector: 'app-client-page',
  templateUrl: './client-page.component.html',
  styleUrls: ['./client-page.component.css']
})
export class ClientPageComponent implements OnInit {

  id: string;
  client: Client;
  prodWins: productClientwins[];
  prodBets: clientbets[];
  error = '';
  success = '';

  constructor(
    private route: ActivatedRoute,
    private clientPageService: ClientPageService,
    private cookieService: CookieService,
  ) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getClient();
    this.getWins();
    this.getBets();
  }

  getClient(): void {
    this.clientPageService.getClient(this.id).subscribe(
      (res: Client) => {
        console.log(res);
        this.client = new Client({...res});
      },
      (err) => {
        this.error = err;
      }
    );
  }

  getWins(): void {
    this.clientPageService.getWins(this.id).subscribe(
      (res: productClientwins[]) => {
        this.prodWins = res.map(item => new productClientwins({item}));
        console.log(this.prodWins);
      },
      (err) => {
        this.error = err;
      }
    );
  }

  getBets(): void {
    this.clientPageService.getBets(this.id).subscribe(
      (res: clientbets[]) => {
        this.prodBets = res.map(item => new clientbets({item}));
        console.log(this.prodBets);
      },
      (err) => {
        this.error = err;
      }
    );
  }

  LogOut() {
    this.cookieService.delete('user');
    this.cookieService.delete('id');
  }
}
