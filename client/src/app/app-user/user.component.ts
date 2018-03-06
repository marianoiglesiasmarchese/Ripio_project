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
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {

  public currencies: Currency[];

  public user = new User();

  nameFormControl = new FormControl('',  Validators.required);
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);

  form = new FormGroup({
    'name': this.nameFormControl,
    'symbol': this.emailFormControl,
  });

  constructor(
    public route: ActivatedRoute,
    public location: Location,
    private userService: UserService,
    private currencyService: CurrencyService
  ) {}

  ngOnInit() {
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

  createUser() {
    if (this.validateForm()) {
      this.userService.saveUser(this.user).then();
    }
  }

}
