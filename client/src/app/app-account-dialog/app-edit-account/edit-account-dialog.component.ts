import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators,  FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatTableDataSource } from '@angular/material';

import { Currency } from '../../model/currency.model';

import {
  MatFormFieldModule
  } from '@angular/material';

import { CurrencyService } from '../../service/currency.service';

@Component({
  selector: 'app-edit-account-dialog',
  templateUrl: './edit-account-dialog.component.html',
  styleUrls: ['./edit-account-dialog.component.css']
})

export class EditAccountDialogComponent implements OnInit {

  public currencies: Currency[];

  nameFormControl = new FormControl('',  Validators.required);

  form = new FormGroup({
    'name': this.nameFormControl
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditAccountDialogComponent>,
    private currencyService: CurrencyService) {
      console.log('received data in dialog: ' + data);
   }

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

  onNoClick(): void {
    this.dialogRef.close();
  }

}
