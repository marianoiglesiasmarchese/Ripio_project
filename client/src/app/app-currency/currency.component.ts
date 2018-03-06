import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormControl, Validators,  FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  MatCardModule,
  MatFormFieldModule
  } from '@angular/material';

import { User } from '../model/user.model';
import { Currency } from '../model/currency.model';

import { CurrencyService } from '../service/currency.service';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.css']
})

export class CurrencyComponent implements OnInit {

  public currencies: Currency[];

  public currency = new Currency();
/*
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]); */

  nameFormControl = new FormControl('',  Validators.required);
  symbolFormControl = new FormControl('',  Validators.required);

  form = new FormGroup({
    'name': this.nameFormControl,
    'symbol': this.symbolFormControl,
  });

  constructor(
    public route: ActivatedRoute,
    public location: Location,
    private currencyService: CurrencyService
  ) {}

  ngOnInit() {
    this.currencyService.getCurrencies().then(
      currencies => (this.currencies = currencies)
    );
  }

  validateForm(): boolean {
    Object.keys(this.form.controls).forEach(field => {
      const control = this.form.get(field);
      control.markAsTouched({ onlySelf: true });
    });
    return this.form.valid;
  }

  createCurrency() {
    if (this.validateForm()) {
      this.currencyService.saveCurrency(this.currency).then();
    }
  }

}
