import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormControl, Validators,  FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  MatCardModule,
  MatButtonModule,
  MatSelectModule
  } from '@angular/material';

import { User } from '../model/user.model';
import { Currency } from '../model/currency.model';
import { Account } from '../model/account.model';
import { OperationType } from '../model/enum/operation-type.model';

import { UserService } from '../service/user.service';
import { CurrencyService } from '../service/currency.service';
import { AlertService } from '../service/alert.service';
import { Operation } from '../model/operation.model';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  public users: User[];
  public originAccounts: Account[];
  public targetAccounts: Account[];

  originUserFormControl = new FormControl('',  Validators.required);
  originAccountFormControl = new FormControl('',  Validators.required);
  transferencyAmountFormControl = new FormControl('',  Validators.required);
  targetUserFormControl = new FormControl('',  Validators.required);
  targetAccountFormControl = new FormControl('',  Validators.required);

  form = new FormGroup({
    'origin_user': this.originUserFormControl,
    'origin_account': this.originAccountFormControl,
    'transferency_amount': this.transferencyAmountFormControl,
    'target_user': this.targetUserFormControl,
    'target_account': this.targetAccountFormControl,
  });


  constructor(
    public route: ActivatedRoute,
    public location: Location,
    private userService: UserService,
    private currencyService: CurrencyService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.userService.getUsers().then(
      users => (this.users = users)
    );
  }

  validateForm(): boolean {
    Object.keys(this.form.controls).forEach(field => {
      const control = this.form.get(field);
      control.markAsTouched({ onlySelf: true });
    });
    return this.form.valid;
  }

  /* realizar transferencia entre cualquier tipo de cuenta y
  por medio de la cotizacion, realizar las operaciones de intercambio. */
  findOriginUserAccounts(user: any) {
    this.userService.getAccounts(user).then(
      accounts => (this.originAccounts = accounts)
    );
  }

  showAmount(account: Account) {
    (<HTMLInputElement> document.getElementById('available_amount')).value = account.amount.toString();
  }

  findTargetUserAccounts(user: User) {
    this.userService.getAccounts(user).then(
      accounts => (this.targetAccounts = accounts)
    );
  }

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
            operation.type = OperationType.credit;
            operation.currency_id = origin_account.currency.id;
            operation.date = new Date(Date.now());

            const origin_user = this.form.get('origin_user').value as User;
            const target_user = this.form.get('target_user').value as User;

            // realiza la transferencia
            this.userService.doTransaction(origin_user, target_user, operation).then();

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
