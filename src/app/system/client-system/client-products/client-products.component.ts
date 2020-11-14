import {Component, OnInit} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {ClientProductsService} from './client-products.service';
import {clientProducts} from './clientProducts';

@Component({
  selector: 'app-client-products',
  templateUrl: './client-products.component.html',
  styleUrls: ['./client-products.component.css']
})
export class ClientProductsComponent implements OnInit {

  error: string;
  ClientId = this.cookieService.get('id');
  cliProds: clientProducts[];

  constructor(
    private cookieService: CookieService,
    private clientProductsService: ClientProductsService
  ) {
  }



  ngOnInit(): void {
    this.getClientProducts();
  }

  getClientProducts(): void {
    this.clientProductsService.getClientProductsS(this.ClientId).subscribe(
      (res: clientProducts[]) => {
        this.cliProds = res.map(item => new clientProducts({...item}));
        console.log(this.cliProds);
      },
      (err) => {
        this.error = err;
      }
    );
  }

  private mess: string;

  Days(day: number): string {
    // tslint:disable-next-line:label-position no-unused-expression

    if (day >= 5) {
      this.mess = 'днів';
    }
    if (day >= 2 && day <= 4) {
      this.mess = 'дні';
    }
    if (day <= 1) {
      this.mess = 'день';
    }
    return this.mess;
  }

  deleteProduct(id_tovar: number) {
    let confirm1 = confirm('Ви дійсно хочете видалити цей товар');
    if (confirm1){
      this.clientProductsService.deleteProduct(id_tovar.toString()).subscribe((id: string) => {
        this.getClientProducts();
      });
    }
    else{
      console.log('ничего не делаем');
    }
  }
}
