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
/* import { EditTransactionDialogComponent } from '../app-transaction-dialog/app-edit-transaction/edit-transaction-dialog.component';
import { DeleteTransactionDialogComponent } from '../app-transaction-dialog/app-delete-transaction/delete-transaction-dialog.component'; */

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

  userFormControl = new FormControl('',  Validators.required);

  form = new FormGroup({
    'user': this.userFormControl
  });

  displayedColumnsForEmitedTransactions = [
    'target_user.name',
    'operation.amount',
    'operation.type',
    'operation.currency.name',
    'operation.currency.symbol'
  ];

  dataSourceEmitedTransactions: MatTableDataSource<Transaction>;

  @ViewChild('paginatorForEmitedTransactions', { read: MatPaginator }) paginatorForEmitedTransactions: MatPaginator;
  @ViewChild('sorterForEmitedTransactions', { read: MatSort }) sorterForEmitedTransactions: MatSort;


  displayedColumnsForReceivedTransactions = [
    'origin_user.name',
    'operation.amount',
    'operation.type',
    'operation.currency.name',
    'operation.currency.symbol'
  ];

  dataSourceReceivedTransactions: MatTableDataSource<Transaction>;

  @ViewChild('paginatorForReceivedTransactions', { read: MatPaginator }) paginatorForReceivedTransactions: MatPaginator;
  @ViewChild('sorterForReceivedTransactions', { read: MatSort }) sorterForReceivedTransactions: MatSort;

  constructor(
/*     private alertService: AlertService, */
    private tableColumnUtils: TableColumnUtils,
    public dialog: MatDialog,
    private userService: UserService
  ) {
    this.dataSourceEmitedTransactions = new MatTableDataSource<Transaction>();
    this.dataSourceEmitedTransactions.filterPredicate =
      this.tableColumnUtils.getFilterPerdicate(this.displayedColumnsForEmitedTransactions);
    this.dataSourceEmitedTransactions.sortingDataAccessor = this.tableColumnUtils.getSortingDataAccessor();

    this.dataSourceReceivedTransactions = new MatTableDataSource<Transaction>();
    this.dataSourceReceivedTransactions.filterPredicate =
      this.tableColumnUtils.getFilterPerdicate(this.displayedColumnsForReceivedTransactions);
    this.dataSourceReceivedTransactions.sortingDataAccessor = this.tableColumnUtils.getSortingDataAccessor();
  }

  applyEmitedFilter(filterValue: string) {
    this.dataSourceEmitedTransactions.filter = this.tableColumnUtils.normalizeFilter(filterValue);
  }

  applyReceivedFilter(filterValue: string) {
    this.dataSourceReceivedTransactions.filter = this.tableColumnUtils.normalizeFilter(filterValue);
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
    this.dataSourceEmitedTransactions.sort = this.sorterForEmitedTransactions;
    this.dataSourceEmitedTransactions.paginator = this.paginatorForEmitedTransactions;
    this.dataSourceReceivedTransactions.sort = this.sorterForReceivedTransactions;
    this.dataSourceReceivedTransactions.paginator = this.paginatorForReceivedTransactions;
  }

  onUserSelect(user: User) {
    this.selectedUser = user;
    console.log(this.selectedUser);
    this.refresh();
    if (!user) {
      this.dataSourceEmitedTransactions.data = [];
      this.dataSourceReceivedTransactions.data = [];
    }
  }

  refresh() {
    if (this.selectedUser) {
      this.userService.getEmitedTransactions(this.selectedUser).then(transactions =>
        this.dataSourceEmitedTransactions.data = transactions
      );
      this.userService.getReceivedTransactions(this.selectedUser).then(transactions =>
        this.dataSourceReceivedTransactions.data = transactions
      );
    }
  }

  addNew() {
    const dialogRef = this.dialog.open(AddTransactionDialogComponent, {
       data: {title: 'transaction', user: this.selectedUser }
     });

     dialogRef.afterClosed().subscribe(result => {
       console.log('received data from dialog: ' + result);

       if (result instanceof Map) {
          // realiza la transferencia
          this.userService.doTransaction(this.selectedUser, result.get('target_user'), result.get('operation')).then();
         /**  TODO > deberia utilizar websoquet para tener una actualizacion dinamica en caso que algun otro
          *   genere una transaccion hacia mi cuenta, sino no la veria  */
         this.refresh();
       }
     });
   }


}
