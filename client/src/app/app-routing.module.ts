import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserComponent } from './app-user/user.component';
import { CurrencyComponent } from './app-currency/currency.component';
import { TransactionComponent } from './app-transaction/transaction.component';
import { PageNotFoundComponent } from './not-found.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: 'users', component: UserComponent },
  { path: 'currencies', component: CurrencyComponent },
  { path: 'transactions', component: TransactionComponent },
  // { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/transactions', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      { enableTracing: true } // debugging purposes only
      )
    ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
