import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormControl, Validators,  FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* import {
  MatCardModule,
  MatButtonModule,
  MatSelectModule
  } from '@angular/material'; */

import {
  MatTableModule,
  MatPaginator,
  MatTableDataSource,
  MatSort,
  MatToolbarModule,
  MatButtonModule,
  MatDialog,
  MatFormFieldModule,
  MatSelectModule,
  MatTabsModule
  } from '@angular/material';

import { User } from '../model/user.model';
import { Currency } from '../model/currency.model';
import { Account } from '../model/account.model';
import { Operation } from '../model/operation.model';
import { OperationType } from '../model/enum/operation-type.model';

import { AddTransactionDialogComponent } from '../app-transaction-dialog/app-add-transaction/add-transaction-dialog.component';

import { TableColumnUtils } from '../service/table-column.service';
import { AlertService } from '../service/alert.service';
import { UserService } from '../service/user.service';
import { CurrencyService } from '../service/currency.service';
import { Transaction } from '../model/transaction.model';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit, AfterViewInit {

  public users: User[];
  public selectedUser: User;

  public accounts: Account[];
  public selectedAccount: Account;

  userFormControl = new FormControl('',  Validators.required);
  accountFormControl = new FormControl('',  Validators.required);

  form = new FormGroup({
    'user': this.userFormControl,
    'account': this.accountFormControl
  });

  displayedColumnsTransactions = [
    'operation.date',
    'operation.amount',
    'type',
    /* 'account.currency.name',
    'account.currency.symbol' */
  ];

  dataSourceTransactions: MatTableDataSource<Transaction>;

  @ViewChild('paginatorTransactions', { read: MatPaginator }) paginatorTransactions: MatPaginator;
  @ViewChild('sorterTransactions', { read: MatSort }) sorterTransactions: MatSort;

  constructor(
/*     private alertService: AlertService, */
    private tableColumnUtils: TableColumnUtils,
    public dialog: MatDialog,
    private userService: UserService
  ) {
    this.dataSourceTransactions = new MatTableDataSource<Transaction>();
    this.dataSourceTransactions.filterPredicate =
      this.tableColumnUtils.getFilterPerdicate(this.displayedColumnsTransactions);
    this.dataSourceTransactions.sortingDataAccessor = this.tableColumnUtils.getSortingDataAccessor();
  }

  applyFilter(filterValue: string) {
    this.dataSourceTransactions.filter = this.tableColumnUtils.normalizeFilter(filterValue);
  }

  ngOnInit() {
    this.userService.getUsers().then(users =>
      this.users = users
    );
  }

  validateForm(): boolean {
    Object.keys(this.form.controls).forEach(field => {
      const control = this.form.get(field);
      control.markAsTouched({ onlySelf: true });
    });
    return this.form.valid;
  }

  ngAfterViewInit() {
    this.dataSourceTransactions.sort = this.sorterTransactions;
    this.dataSourceTransactions.paginator = this.paginatorTransactions;
  }

  findUserAccounts(user: User) {
    // limpio las transacciones previas y la cuenta seleccionada del usuario que se habia elegido previamente
    this.selectedAccount = null;
    this.dataSourceTransactions.data = [];
    this.selectedUser = user;
    console.log(this.selectedUser);
    this.refresh();
    this.userService.getAccounts(this.selectedUser).then(
      accounts => (this.accounts = accounts)
    );
  }

  onAccountSelect(account: Account) {
    this.selectedAccount = account;
    console.log(this.selectedAccount);
    this.refresh();
    if (!this.selectedAccount) {
      this.dataSourceTransactions.data = [];
    }
  }

  showAmount() {
    (<HTMLInputElement> document.getElementById('available_amount')).value = this.selectedAccount.amount.toString();
  }

  refresh() {
    if (this.selectedUser && this.selectedAccount) {
      this.userService.getTransactionsForAccount(this.selectedUser, this.selectedAccount).then(transactions =>
        this.dataSourceTransactions.data = transactions
      );
      // TODO > deberia recuerar la cuenta tambien y guardarla asi se cual es el monto de la misma
      this.showAmount();
    }
  }

  addNew() {
    const dialogRef = this.dialog.open(AddTransactionDialogComponent, {
       data: {title: 'transaction', user: this.selectedUser, account: this.selectedAccount }
     });

     dialogRef.afterClosed().subscribe(result => {
       console.log('received data from dialog: ' + result);

       if (result instanceof Map) {
          // realiza la transferencia
          this.userService.doTransaction(this.selectedUser, result.get('target_user'), result.get('operation')).then(() =>
          /**  TODO > deberia utilizar websoquet para tener una actualizacion dinamica en caso que algun otro
           *   genere una transaccion hacia mi cuenta, sino no la veria  */
            this.refresh()
          );
       }
     });
   }


}
