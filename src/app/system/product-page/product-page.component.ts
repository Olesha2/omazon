import {Component, OnInit} from '@angular/core';

import {Product} from './product';
import {productPageService} from './product-page.service';
import {ActivatedRoute} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CookieService} from 'ngx-cookie-service';
import {imageg} from './imageg';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {
  // tslint:disable-next-line:no-shadowed-variable
  product: Product;
  images: imageg[];
  error = '';
  success = '';
  id: string;
  activeProduct = 1;
  form: FormGroup;
  idClient = this.cookieService.get('id');

  constructor(
    private productPageService: productPageService,
    private route: ActivatedRoute,
    private cookieService: CookieService
  ) {
  }



  ngOnInit() {
    this.id = this.route.snapshot.params.id;

    this.getProduct();
    this.getImages();
    this.form = new FormGroup({
      bet: new FormControl(null, [Validators.required])
    });
  }

  getProduct(): void {
    this.productPageService.getAll(this.id).subscribe(
      (res: Product) => {
        console.log(res);
        this.product = new Product({...res});
      },
      (err) => {
        this.error = err;
      }
    );
  }

  getImages(): void {
    this.productPageService.getImages(this.id).subscribe(
      (res: imageg[]) => {
        this.images = res.map(item => new imageg({item}));
        // console.log(this.images[0].item['id_images']);
      },
      (err) => {
        this.error = err;
      }
    );

  }

  onSubmit() {

    this.productPageService.postBet(this.id, this.form.value, this.idClient).subscribe((id: string) => {
      this.getProduct();
    });

  }

  CheckActive() {
    if (this.product.dayloss > 7) {
      this.activeProduct = 0;
    }
    return this.activeProduct;
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

  IfAuth() {
    return this.cookieService.get('user');
  }

}
