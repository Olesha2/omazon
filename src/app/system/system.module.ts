import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {SystemRoutingModule} from './system-routing.module';
import {MainPageComponent} from './main-page/main-page.component';
import {SystemComponent} from './system.component';
import {ProductAddComponent} from './product-add/product-add.component';
import {ClientPageComponent} from './client-system/client-page/client-page.component';
import {ProductPageComponent} from './product-page/product-page.component';
import {ClientProductsComponent} from './client-system/client-products/client-products.component';
import {ClientBetsComponent} from './client-system/client-bets/client-bets.component';
import {ClientWinsComponent} from './client-system/client-wins/client-wins.component';
import {ClientSystemComponent} from './client-system/client-system.component';
import {SearchComponent} from './search/search.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SystemRoutingModule
  ],
  declarations: [
    MainPageComponent,
    SystemComponent,
    ProductAddComponent,
    ClientPageComponent,
    ProductPageComponent,
    ClientProductsComponent,
    ClientBetsComponent,
    ClientWinsComponent,
    ClientSystemComponent,
    SearchComponent
  ]


})
export class SystemModule {

}
