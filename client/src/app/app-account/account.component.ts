import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormControl, Validators,  FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  MatCardModule,
  MatFormFieldModule
  } from '@angular/material';

import { Account } from '../model/account.model';
import { Currency } from '../model/currency.model';
import { User } from '../model/user.model';

import { UserService } from '../service/user.service';
import { CurrencyService } from '../service/currency.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})

export class AccountComponent implements OnInit {

  public currencies: Currency[];
  public users: User[];

  public account = new Account();

  nameFormControl = new FormControl('',  Validators.required);
  amountFormControl = new FormControl('',  Validators.required);
  userFormControl = new FormControl('',  Validators.required);
  currencyFormControl = new FormControl('',  Validators.required);

  form = new FormGroup({
    'name': this.nameFormControl,
    'amount': this.amountFormControl,
    'user': this.userFormControl,
    'currency': this.currencyFormControl,
  });

  constructor(
    public route: ActivatedRoute,
    public location: Location,
    private userService: UserService,
    private currencyService: CurrencyService
  ) {}

  ngOnInit() {
    this.userService.getUsers().then(
      users => (this.users = users)
    );
    this.currencyService.getCurrencies().then(
      currencies => (this.currencies = currencies
      )
    );
  }

  validateForm(): boolean {
    Object.keys(this.form.controls).forEach(field => {
      const control = this.form.get(field);
      control.markAsTouched({ onlySelf: true });
    });
    return this.form.valid;
  }

  createAccount() {
    if (this.validateForm()) {

      const user = this.form.get('user').value as User ;

      this.userService.saveAccount(user, this.account).then();
    }
  }

}
