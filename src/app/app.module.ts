import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AuthModule} from './auth/auth.module';
import {AppRoutingModule} from './app.routing-module';
import {UsersService} from './shared/services/users.service';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {RegistrationService} from './auth/registration/registration.service';
import {NotFoundComponent} from './not-found/not-found.component';
import {AuthGuard} from './auth-guard.service';
import {AuthService} from './auth.service';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AuthModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [UsersService, RegistrationService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
