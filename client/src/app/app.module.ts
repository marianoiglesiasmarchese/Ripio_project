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
import { AddDialogComponent } from './app-dialog/app-add/add-dialog.component';
import { EditDialogComponent } from './app-dialog/app-edit/edit-dialog.component';
import { DeleteDialogComponent } from './app-dialog/app-delete/delete-dialog.component';

import {
  MatCardModule,
  MatSelectModule,
  MatButtonModule,
  MatIconModule,
  MatSidenavModule,
  MatExpansionModule,
  MatListModule,
  MatFormFieldModule,
  MatInputModule,
  MatSortModule,
  MatTableModule,
  MatToolbarModule,
  MatPaginatorModule,
  MatDialogModule
} from '@angular/material';

import { UserService } from './service/user.service';
import { CurrencyService } from './service/currency.service';
import { AlertService } from './service/alert.service';
import { TableColumnUtils } from './service/table-column.service';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    UserComponent,
    CurrencyComponent,
    AccountComponent,
    TransactionComponent,
    PageNotFoundComponent,
    AlertComponent,
    AddDialogComponent,
    EditDialogComponent,
    DeleteDialogComponent
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
    MatInputModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatDialogModule
  ],
  providers: [
    UserService,
    CurrencyService,
    AlertService,
    TableColumnUtils,
    MediaMatcher
  ],
  entryComponents: [
    AddDialogComponent,
    EditDialogComponent,
    DeleteDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
