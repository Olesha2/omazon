import { Component, OnInit } from '@angular/core';

import {Categories} from './category';
import {CategoryService} from './category.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../shared/models/user.model';
import {ProductAddService} from './product-add.service';
import {Products} from './product.model';
import {Product} from '../main-page/product';
import {HttpClient, HttpEventType} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  form: FormGroup;
  category: Categories[];
  error = '';
  success = '';

  links: Array<string | ArrayBuffer> = [];

  constructor(
    private cookieService: CookieService,
    private categoryService: CategoryService,
              private productAddService: ProductAddService,
              private http: HttpClient) { }


  ngOnInit() {
    this.getCategories();
    this.form = new FormGroup({
      'name' : new FormControl(null, [Validators.required, Validators.maxLength(50)]),
      'category' : new FormControl(1, [Validators.required]),
      'price' : new FormControl(null, [Validators.required, Validators.pattern("[0-9]+")]),
      'about' : new FormControl(null, [Validators.required]),
      'photos' : new FormControl(false, [Validators.required]),
      'min_price' : new FormControl(null, [Validators.required, Validators.pattern("[0-9]+")]),
      'id':  new FormControl(false, [Validators.required])
    });
  }
  onSubmit() {
    this.form.value.photos = this.selectedFile;
    this.form.value.id = this.cookieService.get('id');
    const {name, category, price, about, photos, min_price, id} = this.form.value;
    const product = new Products(name, category, price, about, photos, min_price, id);
    // tslint:disable-next-line:no-shadowed-variable
    console.log(this.form.value);
this.productAddService.addProduct(product).subscribe(( product: Products) => {
    console.log(this.form.value); });
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe(
      (res: Product[]) => {
        this.category = res;
      },
      (err) => {
        this.error = err;
      }
    );
  }
  selectedFile: File[] = [];

  onFileSelected(event) {
    this.selectedFile = event.target.files;
this.links =[];
    for (let i = 0; i < this.selectedFile.length; i++) {
      const fr = new FileReader();

      fr.addEventListener('load', () => {
        this.links.push(fr.result);
      }, false);

      fr.readAsDataURL(this.selectedFile[i]);
    }
  }
}
