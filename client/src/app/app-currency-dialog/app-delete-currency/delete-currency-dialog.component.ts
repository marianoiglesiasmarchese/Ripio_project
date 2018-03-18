import { Component, Inject } from '@angular/core';
import { FormControl, Validators,  FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatTableDataSource } from '@angular/material';

import { Currency } from '../../model/currency.model';

@Component({
  selector: 'app-delete-currency-dialog',
  templateUrl: './delete-currency-dialog.component.html',
  styleUrls: ['./delete-currency-dialog.component.css']
})

export class DeleteCurrencyDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DeleteCurrencyDialogComponent>) {
      console.log('received data in dialog: ' + data);
   }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
