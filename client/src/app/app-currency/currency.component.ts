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

import { Currency } from '../model/currency.model';

import { AddCurrencyDialogComponent } from '../app-currency-dialog/app-add-currency/add-currency-dialog.component';
import { EditCurrencyDialogComponent } from '../app-currency-dialog/app-edit-currency/edit-currency-dialog.component';
import { DeleteCurrencyDialogComponent } from '../app-currency-dialog/app-delete-currency/delete-currency-dialog.component';

import { CurrencyService } from '../service/currency.service';
import { TableColumnUtils } from '../service/table-column.service';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.css']
})

export class CurrencyComponent implements OnInit, AfterViewInit {

  public currency = new Currency();

  displayedColumns = [
    'name',
    'symbol',
    'actions'
  ];

  dataSource: MatTableDataSource<Currency>;

  @ViewChild('paginator', { read: MatPaginator }) paginator: MatPaginator;
  @ViewChild('sorter', { read: MatSort }) sorter: MatSort;

  constructor(
    public dialog: MatDialog,
    private tableColumnUtils: TableColumnUtils,
    private currencyService: CurrencyService
  ) {
    this.dataSource = new MatTableDataSource<Currency>();
    this.dataSource.filterPredicate = this.tableColumnUtils.getFilterPerdicate(this.displayedColumns);
    this.dataSource.sortingDataAccessor = this.tableColumnUtils.getSortingDataAccessor();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = this.tableColumnUtils.normalizeFilter(filterValue);
  }

  ngOnInit() {
    this.currencyService.getCurrencies().then(currencies =>
        this.dataSource.data = currencies
    );
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sorter;
    this.dataSource.paginator = this.paginator;
  }

  refresh() {
    this.currencyService.getCurrencies().then(currencies =>
      this.dataSource.data = currencies
    );
  }

  addNew() {
   const dialogRef = this.dialog.open(AddCurrencyDialogComponent, {
      data: {title: 'currency', currency: this.currency }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('received data from dialog: ' + result);
      if (result instanceof Currency) {
        this.currencyService.saveCurrency(result).then(() =>
        /**  TODO > deberia utilizar websoquet para tener una actualizacion dinamica en caso que algun otro
         *   genere una transaccion hacia mi cuenta, sino no la veria  */
          this.refresh()
        );
      }
    });
  }


  startEdit(currency: Currency) {
    const dialogRef = this.dialog.open(EditCurrencyDialogComponent, {
      data: {title: 'currency', currency: currency }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('received data from dialog: ' + result);
      if (result instanceof Object) {
        this.currencyService.updateCurrency(result).then(() =>
        /**  TODO > deberia utilizar websoquet para tener una actualizacion dinamica en caso que algun otro
         *   genere una transaccion hacia mi cuenta, sino no la veria  */
          this.refresh()
        );
      }
    });
  }

  deleteItem(currency: Currency) {
    const dialogRef = this.dialog.open(DeleteCurrencyDialogComponent, {
      data: {title: 'currency', currency: currency }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('received data from dialog: ' + result);
      if (result instanceof Object) {
        result.enable = false;
        this.currencyService.updateCurrency(result).then(() =>
        /**  TODO > deberia utilizar websoquet para tener una actualizacion dinamica en caso que algun otro
         *   genere una transaccion hacia mi cuenta, sino no la veria  */
          this.refresh()
        );
      }
    });
  }

}
