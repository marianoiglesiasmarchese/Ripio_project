import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import {
  MatTableModule,
  MatPaginator,
  MatTableDataSource,
  MatSort,
  MatToolbarModule,
  MatButtonModule,
  MatDialog
  } from '@angular/material';

import { Account } from '../model/account.model';
import { Currency } from '../model/currency.model';
import { User } from '../model/user.model';

import { AddDialogComponent } from '../app-dialog/app-add/add-dialog.component';
import { EditDialogComponent } from '../app-dialog/app-edit/edit-dialog.component';
import { DeleteDialogComponent } from '../app-dialog/app-delete/delete-dialog.component';

import { UserService } from '../service/user.service';
import { CurrencyService } from '../service/currency.service';
import { TableColumnUtils } from '../service/table-column.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit, AfterViewInit {

  public currencies: Currency[];
  public user = new User();

  displayedColumns = [
    'name',
    'email',
    'actions'
  ];

  dataSource: MatTableDataSource<User>;

  @ViewChild('paginator', { read: MatPaginator }) paginator: MatPaginator;
  @ViewChild('sorter', { read: MatSort }) sorter: MatSort;

  constructor(
    public dialog: MatDialog,
    private userService: UserService,
    private currencyService: CurrencyService,
    private tableColumnUtils: TableColumnUtils
  ) {
    this.dataSource = new MatTableDataSource<User>();
    this.dataSource.filterPredicate = this.tableColumnUtils.getFilterPerdicate(this.displayedColumns);
    this.dataSource.sortingDataAccessor = this.tableColumnUtils.getSortingDataAccessor();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = this.tableColumnUtils.normalizeFilter(filterValue);
  }

  ngOnInit() {
    this.userService.getUsers().then(users =>
      this.dataSource.data = users
    );
    this.currencyService.getCurrencies().then(currencies =>
      this.currencies = currencies
    );
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sorter;
    this.dataSource.paginator = this.paginator;
  }

  refresh() {
    this.userService.getUsers().then(users =>
      this.dataSource.data = users
    );
  }

  addNew() {
   const dialogRef = this.dialog.open(AddDialogComponent, {
      data: {title: 'user', user: this.user }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('received data from dialog: ' + result);
      if (result instanceof User) {
        this.userService.saveUser(result).then();
        /**  TODO > deberia utilizar websoquet para tener una actualizacion dinamica en caso que algun otro
         *   genere una transaccion hacia mi cuenta, sino no la veria  */
        this.refresh();
      }
    });
  }


  startEdit(user: User) {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: {title: 'user', user: user }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('received data from dialog: ' + result);
      if (result instanceof Object) {
        this.userService.updateUser(result).then();
        /**  TODO > deberia utilizar websoquet para tener una actualizacion dinamica en caso que algun otro
         *   genere una transaccion hacia mi cuenta, sino no la veria  */
        this.refresh();
      }
    });
  }

  deleteItem(user: User) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {title: 'user', user: user }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('received data from dialog: ' + result);
      if (result instanceof Object) {
        result.enable = false;
        this.userService.updateUser(result).then();
        /**  TODO > deberia utilizar websoquet para tener una actualizacion dinamica en caso que algun otro
         *   genere una transaccion hacia mi cuenta, sino no la veria  */
        this.refresh();
      }
    });
  }

}
