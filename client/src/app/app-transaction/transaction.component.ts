import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import {
  MatCardModule,
  MatButtonModule,
  MatSelectModule
  } from '@angular/material';

import { User } from '../model/user.model';

import { UserService } from '../service/user.service';
import { CurrencyService } from '../service/currency.service';
import { Currency } from '../model/currency.model';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  public users: User[];
  public originAccounts: Account[];
  public targetAccounts: Account[];

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
  }

  /* realizar transferencia entre cualquier tipo de cuenta y
  por medio de la cotizacion, realizar las operaciones de intercambio. */
  findOriginUserAccounts(user: User) {
    this.userService.getAccounts(user).then(
      accounts => (this.originAccounts = accounts)
    );
  }

  findTargetUserAccounts(user: User) {
    this.userService.getAccounts(user).then(
      accounts => (this.targetAccounts = accounts)
    );
  }

}
