import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SystemComponent} from './system.component';
import {MainPageComponent} from './main-page/main-page.component';
import {ProductAddComponent} from './product-add/product-add.component';
import {ClientPageComponent} from './client-system/client-page/client-page.component';
import {ProductPageComponent} from './product-page/product-page.component';
import {AuthGuard} from '../auth-guard.service';
import {CategoryProductsComponent} from './category-products/category-products.component';
import {NotFoundComponent} from '../not-found/not-found.component';
import {ContactsPageComponent} from './contacts-page/contacts-page.component';
import {ClientProductsComponent} from './client-system/client-products/client-products.component';
import {ClientBetsComponent} from './client-system/client-bets/client-bets.component';
import {ClientWinsComponent} from './client-system/client-wins/client-wins.component';
import {ClientSystemComponent} from './client-system/client-system.component';
import {SearchComponent} from './search/search.component';


const routes: Routes = [
  // {path: 'main', component: MainPageComponent},
  {path: '', component: SystemComponent, children: [
      {path: 'main', component: MainPageComponent},
      {path: 'add', component: ProductAddComponent, canActivate: [AuthGuard]},

      {path: 'product', redirectTo: 'error'},
      {path: 'product/:id', component: ProductPageComponent},
      {path: 'categories', redirectTo: 'error'},
      {path: 'categories/:category', component: CategoryProductsComponent},
      {path: 'error', component: NotFoundComponent},
      {path: 'contact', component: ContactsPageComponent},
      {path: 'search', redirectTo: 'error'},
      {path: 'search/:name', component: SearchComponent},

      {path: 'clientSys', component: ClientSystemComponent, canActivate: [AuthGuard], children:[
          {path: 'client', redirectTo: 'error'},
          {path: 'client/:id', component: ClientPageComponent, canActivate: [AuthGuard]},
          {path: 'client_products', component: ClientProductsComponent, canActivate: [AuthGuard]},
          {path: 'my-bets', component: ClientBetsComponent, canActivate: [AuthGuard]},
          {path: 'my-wins', component: ClientWinsComponent, canActivate: [AuthGuard]},
        ]},

    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class SystemRoutingModule {

}
