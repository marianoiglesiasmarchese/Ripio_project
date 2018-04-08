import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormControl, Validators,  FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  MatTableModule,
  MatPaginator,
  MatTableDataSource,
  MatSort,
  MatToolbarModule,
  MatButtonModule,
  MatDialog,
  MatFormFieldModule,
  MatSelectModule
  } from '@angular/material';

import { Account } from '../model/account.model';
import { Currency } from '../model/currency.model';
import { User } from '../model/user.model';

import { AddAccountDialogComponent } from '../app-account-dialog/app-add-account/add-account-dialog.component';
import { EditAccountDialogComponent } from '../app-account-dialog/app-edit-account/edit-account-dialog.component';
import { DeleteAccountDialogComponent } from '../app-account-dialog/app-delete-account/delete-account-dialog.component';

import { TableColumnUtils } from '../service/table-column.service';
import { UserService } from '../service/user.service';
import { CurrencyService } from '../service/currency.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})

export class AccountComponent implements OnInit, AfterViewInit {

  public users: User[];
  public selectedUser: User;

  public account = new Account();

  userFormControl = new FormControl('',  Validators.required);

  form = new FormGroup({
    'user': this.userFormControl
  });

  displayedColumns = [
    'name',
    'amount',
    'currency.name',
    'actions'
  ];

  dataSource: MatTableDataSource<Account>;

  @ViewChild('paginator', { read: MatPaginator }) paginator: MatPaginator;
  @ViewChild('sorter', { read: MatSort }) sorter: MatSort;

  constructor(
    public dialog: MatDialog,
    private tableColumnUtils: TableColumnUtils,
    private userService: UserService,
    private currencyService: CurrencyService
  ) {
    this.dataSource = new MatTableDataSource<Account>();
    this.dataSource.filterPredicate = this.tableColumnUtils.getFilterPerdicate(this.displayedColumns);
    this.dataSource.sortingDataAccessor = this.tableColumnUtils.getSortingDataAccessor();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = this.tableColumnUtils.normalizeFilter(filterValue);
  }

  ngOnInit() {
    this.userService.getUsers().then(users =>
      (this.users = users)
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
    this.dataSource.sort = this.sorter;
    this.dataSource.paginator = this.paginator;
  }

  onUserSelect(user: User) {
    this.selectedUser = user;
    console.log(this.selectedUser);
    this.refresh();
    if (!user) {
      this.dataSource.data = [];
    }
  }

  refresh() {
    if (this.selectedUser) {
      this.userService.getAccounts(this.selectedUser).then(accounts =>
        (this.dataSource.data = accounts)
      );
    }
  }

  addNew() {
   const dialogRef = this.dialog.open(AddAccountDialogComponent, {
      data: {title: 'account', account: this.account }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('received data from dialog: ' + result);
      if (result instanceof Account) {
        this.userService.saveAccount(this.selectedUser, result).then(() =>
        /**  TODO > deberia utilizar websoquet para tener una actualizacion dinamica en caso que algun otro
         *   genere una transaccion hacia mi cuenta, sino no la veria  */
          this.refresh()
        );
      }
    });
  }


  startEdit(account: Account) {
    const dialogRef = this.dialog.open(EditAccountDialogComponent, {
      data: {title: 'account', account: account }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('received data from dialog: ' + result);
      if (result instanceof Object) {
        this.userService.updateAccount(this.selectedUser, result).then(() =>
        /**  TODO > deberia utilizar websoquet para tener una actualizacion dinamica en caso que algun otro
         *   genere una transaccion hacia mi cuenta, sino no la veria  */
          this.refresh()
        );
      }
    });
  }

  deleteItem(account: Account) {
    const dialogRef = this.dialog.open(DeleteAccountDialogComponent, {
      data: {title: 'account', account: account }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('received data from dialog: ' + result);
      if (result instanceof Object) {
        result.enable = false;
        this.userService.updateAccount(this.selectedUser, result).then(() =>
        /**  TODO > deberia utilizar websoquet para tener una actualizacion dinamica en caso que algun otro
         *   genere una transaccion hacia mi cuenta, sino no la veria  */
          this.refresh()
        );
      }
    });
  }

}
