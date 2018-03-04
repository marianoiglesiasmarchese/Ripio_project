import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { UserComponent } from './app-user/user.component';
import { TransactionComponent } from './app-transaction/transaction.component';
import { FooterComponent } from './app-footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './not-found.component';

import {
  MatCardModule
} from '@angular/material';

import { UserService } from './service/user.service';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    UserComponent,
    TransactionComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatCardModule
  ],
  providers: [
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
