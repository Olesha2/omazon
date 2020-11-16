import {Component, OnInit} from '@angular/core';

import {Categories} from './category';
import {CategoryService} from './category.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductAddService} from './product-add.service';
import {Products} from './product.model';
import {HttpClient} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductsEdit} from './ProductEdit';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  form: FormGroup;
  category: Categories[];
  edId = '0';
  error = '';
  success = '';
  selectedFile: File[] = [];
  productEdit: ProductsEdit;
  links: Array<string | ArrayBuffer> = [];

  constructor(
    private cookieService: CookieService,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productAddService: ProductAddService,
    private http: HttpClient,
    private router: Router) {
  }


  ngOnInit() {
this.ifEdit();
    this.getCategories();
    this.form = new FormGroup({
      'name': new FormControl(null, [Validators.required, Validators.maxLength(50)]),
      'category': new FormControl(1, [Validators.required]),
      'price': new FormControl(null, [Validators.required, Validators.pattern('[0-9]+')]),
      'about': new FormControl(null, [Validators.required]),
      'photos': new FormControl(false, [Validators.required]),
      'min_price': new FormControl(null, [Validators.required, Validators.pattern('[0-9]+')]),
      'id': new FormControl(false, [Validators.required])
    });
  }

  onSubmit() {
    this.form.value.photos = this.selectedFile;
    this.form.value.id = this.cookieService.get('id');
    const {name, category, price, about, photos, min_price, id} = this.form.value;
    const product = new Products(name, category, price, about, photos, min_price, id);
    if(this.route.snapshot.params.id_tov){
      alert("Toвар успішно відредаговано");

    }else{
      alert("Toвар успішно додано");
    }
    // tslint:disable-next-line:no-shadowed-variable
    console.log(this.form.value);
    this.productAddService.addProduct(product, this.edId).subscribe((product: Products) => {
      console.log(this.form.value);
    });
    this.router.navigate(['/system/clientSys/client_products']);
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe(
      (res: Categories[]) => {
        this.category = res;
      },
      (err) => {
        this.error = err;
      }
    );
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files;
    this.links = [];
    for (let i = 0; i < this.selectedFile.length; i++) {
      const fr = new FileReader();

      fr.addEventListener('load', () => {
        this.links.push(fr.result);
      }, false);

      fr.readAsDataURL(this.selectedFile[i]);
    }
  }

  ifEdit(){
    if(this.route.snapshot.params.id_tov){
this.EditProduct();
this.edId = this.route.snapshot.params.id_tov;
    }
  }
  EditProduct(){
this.productAddService.getEdit(this.route.snapshot.params.id_tov).subscribe(
  (res: ProductsEdit) => {
    console.log(res);
    this.productEdit = new ProductsEdit({...res});
    this.links = [];
    for (let i of this.productEdit.photos){
      this.links.push("http://kyrsovoi/photos/"+i+".jpg");
    }
    this.form.patchValue({
      name: this.productEdit.name,
      category: this.productEdit.id_category,
      price: this.productEdit.samaStavka,
      min_price: this.productEdit.min_rate,
      about: this.productEdit.about
    });
  },
  (err) => {
    this.error = err;
  }
);
  }
}
