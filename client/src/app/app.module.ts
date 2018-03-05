import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MediaMatcher } from '@angular/cdk/layout';


import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { UserComponent } from './app-user/user.component';
import { TransactionComponent } from './app-transaction/transaction.component';
import { FooterComponent } from './app-footer/footer.component';
import { PageNotFoundComponent } from './not-found.component';

import {
  MatCardModule,
  MatSelectModule,
  MatButtonModule,
  MatIconModule,
  MatSidenavModule,
  MatExpansionModule,
  MatListModule
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
    BrowserAnimationsModule,
    MatCardModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatExpansionModule,
    MatListModule
  ],
  providers: [
    UserService,
    MediaMatcher
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
