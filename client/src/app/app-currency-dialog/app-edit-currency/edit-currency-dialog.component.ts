import { Component, Inject } from '@angular/core';
import { FormControl, Validators,  FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatTableDataSource } from '@angular/material';

import { Currency } from '../../model/currency.model';

import {
  MatFormFieldModule
  } from '@angular/material';

@Component({
  selector: 'app-edit-currency-dialog',
  templateUrl: './edit-currency-dialog.component.html',
  styleUrls: ['./edit-currency-dialog.component.css']
})

export class EditCurrencyDialogComponent {

  nameFormControl = new FormControl('',  Validators.required);
  symbolFormControl = new FormControl('',  Validators.required);

  form = new FormGroup({
    'name': this.nameFormControl,
    'symbol': this.symbolFormControl,
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditCurrencyDialogComponent>) {
      console.log('received data in dialog: ' + data);
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
