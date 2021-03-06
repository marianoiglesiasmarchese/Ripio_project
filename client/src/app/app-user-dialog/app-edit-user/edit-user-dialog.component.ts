import { Component, Inject } from '@angular/core';
import { FormControl, Validators,  FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatTableDataSource } from '@angular/material';

import { User } from '../../model/user.model';

import {
  MatFormFieldModule
  } from '@angular/material';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.css']
})

export class EditUserDialogComponent {

  nameFormControl = new FormControl('',  Validators.required);
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);

  form = new FormGroup({
    'name': this.nameFormControl,
    'email': this.emailFormControl,
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditUserDialogComponent>) {
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
