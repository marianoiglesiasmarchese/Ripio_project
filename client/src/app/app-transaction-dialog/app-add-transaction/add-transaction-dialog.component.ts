import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators,  FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatTableDataSource } from '@angular/material';

import { Currency } from '../../model/currency.model';
import { Account } from '../../model/account.model';

import {
  MatFormFieldModule
  } from '@angular/material';

import { User } from '../../model/user.model';
import { Operation } from '../../model/operation.model';
import { OperationType } from '../../model/enum/operation-type.model';

import { AlertService } from '../../service/alert.service';
import { CurrencyService } from '../../service/currency.service';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-transaction-add-dialog',
  templateUrl: './add-transaction-dialog.component.html',
  styleUrls: ['./add-transaction-dialog.component.css']
})

export class AddTransactionDialogComponent implements OnInit {

  public currencies: Currency[];

  public users: User[];

  public originAccounts: Account[];
  public targetAccounts: Account[];

  public map = new Map<string, Object>();

  originAccountFormControl = new FormControl('',  Validators.required);
  transferencyAmountFormControl = new FormControl('',  Validators.required);
  targetUserFormControl = new FormControl('',  Validators.required);
  targetAccountFormControl = new FormControl('',  Validators.required);

  form = new FormGroup({
    'origin_account': this.originAccountFormControl,
    'transferency_amount': this.transferencyAmountFormControl,
    'target_user': this.targetUserFormControl,
    'target_account': this.targetAccountFormControl,
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddTransactionDialogComponent>,
    private alertService: AlertService,
    private currencyService: CurrencyService,
    private userService: UserService) {
      console.log('received data in dialog: ' + data);
   }

   ngOnInit() {
    this.currencyService.getCurrencies().then(currencies =>
      this.currencies = currencies
    );
    this.userService.getUsers().then(users =>
      this.users = users
    );
    this.userService.getAccounts(this.data.user).then(
      accounts => (this.originAccounts = accounts)
    );
  }

  validateForm(): boolean {
    Object.keys(this.form.controls).forEach(field => {
      const control = this.form.get(field);
      control.markAsTouched({ onlySelf: true });
    });
    return this.form.valid;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  showAmount(account: Account) {
    (<HTMLInputElement> document.getElementById('available_amount')).value = account.amount.toString();
  }

  findTargetUserAccounts(user: User) {
    this.userService.getAccounts(user).then(
      accounts => (this.targetAccounts = accounts)
    );
  }

  /*   realizar transferencia entre cualquier tipo de cuenta y
  por medio de la cotizacion, realizar las operaciones de intercambio. */
  doTransaction() {

    if (this.validateForm()) {

      const transferency_amount = this.form.get('transferency_amount').value ;

      if ( transferency_amount > 0 ) {

        const origin_account = this.form.get('origin_account').value as Account ;
        const target_account = this.form.get('target_account').value as Account ;

        if ( origin_account.amount > 0 && transferency_amount <= origin_account.amount  ) {

          if ( origin_account.currency.id === target_account.currency.id ) {

            var operation = new Operation();
            operation.amount = transferency_amount;
            /* operation.type = OperationType.credit; */
            operation.currency = origin_account.currency;
            operation.date = new Date(Date.now());

            const target_user = this.form.get('target_user').value as User;

            // arma los datos para la transferencia
            this.map.set('target_user', target_user);
            this.map.set('operation', operation);

          } else {
            this.alertService.error('Las operaciones de transferencia solo pueden realizarce entre cuentas de igual moneda');
          }
        } else {
          this.alertService.error('La cuenta no tiene fondos suficientes para realizar la operacion');
        }
      } else {
        this.alertService.error('No se puede realizar una transferencia de un monto negativo');
      }
    }

  }

}
