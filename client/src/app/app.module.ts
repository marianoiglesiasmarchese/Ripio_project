import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MediaMatcher } from '@angular/cdk/layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { UserComponent } from './app-user/user.component';
import { CurrencyComponent } from './app-currency/currency.component';
import { AccountComponent } from './app-account/account.component';
import { TransactionComponent } from './app-transaction/transaction.component';
import { FooterComponent } from './app-footer/footer.component';
import { PageNotFoundComponent } from './not-found.component';
import { AlertComponent } from './app-alert/alert.component';

import {
  MatCardModule,
  MatSelectModule,
  MatButtonModule,
  MatIconModule,
  MatSidenavModule,
  MatExpansionModule,
  MatListModule,
  MatFormFieldModule,
  MatInputModule
} from '@angular/material';

import { UserService } from './service/user.service';
import { CurrencyService } from './service/currency.service';
import { AlertService } from './service/alert.service';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    UserComponent,
    CurrencyComponent,
    AccountComponent,
    TransactionComponent,
    PageNotFoundComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatExpansionModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [
    UserService,
    CurrencyService,
    AlertService,
    MediaMatcher
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
