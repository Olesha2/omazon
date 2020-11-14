import {Component, OnInit} from '@angular/core';
import {Product} from './product';
import {MainPageService} from './main-page.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  products: Product[];
  error = '';
  success = '';
categoryNames = [
  "Недвижимость",
  "Транспорт",
  "Хобби",
  "Электроника"
];
  constructor(
    private productService: MainPageService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getAll().subscribe(
      (res: Product[]) => {
        this.products = res;
      },
      (err) => {
        this.error = err;
      }
    );
  }

}
