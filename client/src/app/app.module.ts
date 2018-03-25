import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AlertModule } from 'ngx-bootstrap/alert';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MediaMatcher } from '@angular/cdk/layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorHandler } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AlertComponent } from './app-alert/alert.component';

import { LoaderBarComponent } from './app-loader-bar/loader-bar.component';
import { PageNotFoundComponent } from './not-found.component';
import { FooterComponent } from './app-footer/footer.component';

import { UserComponent } from './app-user/user.component';
import { AddUserDialogComponent } from './app-user-dialog/app-add-user/add-user-dialog.component';
import { EditUserDialogComponent } from './app-user-dialog/app-edit-user/edit-user-dialog.component';
import { DeleteUserDialogComponent } from './app-user-dialog/app-delete-user/delete-user-dialog.component';

import { CurrencyComponent } from './app-currency/currency.component';
import { AddCurrencyDialogComponent } from './app-currency-dialog/app-add-currency/add-currency-dialog.component';
import { EditCurrencyDialogComponent } from './app-currency-dialog/app-edit-currency/edit-currency-dialog.component';
import { DeleteCurrencyDialogComponent } from './app-currency-dialog/app-delete-currency/delete-currency-dialog.component';

import { AccountComponent } from './app-account/account.component';
import { AddAccountDialogComponent } from './app-account-dialog/app-add-account/add-account-dialog.component';
import { EditAccountDialogComponent } from './app-account-dialog/app-edit-account/edit-account-dialog.component';
import { DeleteAccountDialogComponent } from './app-account-dialog/app-delete-account/delete-account-dialog.component';

import { TransactionComponent } from './app-transaction/transaction.component';
import { AddTransactionDialogComponent } from './app-transaction-dialog/app-add-transaction/add-transaction-dialog.component';

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
  MatDialogModule,
  MatProgressBarModule,
  MatTabsModule
} from '@angular/material';

import { UserService } from './service/user.service';
import { CurrencyService } from './service/currency.service';
import { AlertService } from './service/alert.service';
import { TableColumnUtils } from './service/table-column.service';
import { LoaderService } from './service/loader.service';

import { LocalErrorHandler} from './error.handler';

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
    LoaderBarComponent,
    AddUserDialogComponent,
    EditUserDialogComponent,
    DeleteUserDialogComponent,
    AddCurrencyDialogComponent,
    EditCurrencyDialogComponent,
    DeleteCurrencyDialogComponent,
    AddAccountDialogComponent,
    EditAccountDialogComponent,
    DeleteAccountDialogComponent,
    AddTransactionDialogComponent
  ],
  imports: [
    AlertModule.forRoot(),
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
    MatDialogModule,
    MatProgressBarModule,
    MatTabsModule
  ],
  providers: [
    UserService,
    CurrencyService,
    AlertService,
    TableColumnUtils,
    LoaderService,
    MediaMatcher,
    {
      provide: ErrorHandler,
      useClass: LocalErrorHandler
    }
  ],
  entryComponents: [
    LoaderBarComponent,
    AddUserDialogComponent,
    EditUserDialogComponent,
    DeleteUserDialogComponent,
    AddCurrencyDialogComponent,
    EditCurrencyDialogComponent,
    DeleteCurrencyDialogComponent,
    AddAccountDialogComponent,
    EditAccountDialogComponent,
    DeleteAccountDialogComponent,
    AddTransactionDialogComponent
  ],
  bootstrap: [
    AppComponent,
    LoaderBarComponent
  ]
})

export class AppModule {

}
