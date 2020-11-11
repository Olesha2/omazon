import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './auth/login/login.component';
import {NotFoundComponent} from './not-found/not-found.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'system', loadChildren: () => import('./system/system.module').then(mod => mod.SystemModule)},
  {path: 'error', component: NotFoundComponent},
 // {path: '**', redirectTo: '/error'},

];

@NgModule({
imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
