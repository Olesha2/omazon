import {Component, OnInit} from '@angular/core';
import {productSearch} from './productSearch';
import {SearchService} from './search.service';
import {ActivatedRoute} from '@angular/router';
import {CategoryService} from '../product-add/category.service';
import {Product} from '../main-page/product';
import {Categories} from '../product-add/category';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  form: FormGroup;
  products: productSearch[];
  error: string;
  searchName = this.route.snapshot.params.name;
  category: Categories[];
  private mess: string;

  constructor(
    private searchService: SearchService,
    private route: ActivatedRoute,
    private categoryService: CategoryService
  ) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      'category': new FormControl(0, [Validators.required]),
      'minDay': new FormControl(null, [Validators.required, Validators.pattern('[1-6]+')]),
      'maxDay': new FormControl(null, [Validators.required, Validators.pattern('[2-7]+')]),
      'rateMin': new FormControl(null, [Validators.required, Validators.pattern('[0-9]+')]),
      'rateMax': new FormControl(null, [Validators.required, Validators.pattern('[0-9]+')])
    });
    this.getCategories();
    this.searchService.updateSearch(this.searchName);
    this.searchService.search$.subscribe(queryString => {
      this.searchName = queryString;
      this.getProductSearch();

    });
  }

  onSubmit() {
    console.log(this.form.value);
    this.filterProducts(
      this.form.value.category,
      this.form.value.minDay,
      this.form.value.maxDay,
      this.form.value.rateMin,
      this.form.value.rateMax
    );
  }

  getProductSearch(): void {
    this.searchService.getProducts(this.searchName).subscribe(
      (res: productSearch[]) => {
        console.log(res);
        this.products = res.map(item => new productSearch({...item}));
        console.log(this.products);
        console.log(this.products[0].id_images);
      },
      (err) => {
        this.error = err;
      }
    );
  }

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

  filterProducts(
    category: number,
    daysMin: number,
    daysMax: number,
    minRate: number,
    maxRate: number,
  ) {

    console.log(category);
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
}
