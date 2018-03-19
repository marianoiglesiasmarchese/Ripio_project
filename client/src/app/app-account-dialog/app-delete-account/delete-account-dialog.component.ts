import { Component, Inject } from '@angular/core';
import { FormControl, Validators,  FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-delete-account-dialog',
  templateUrl: './delete-account-dialog.component.html',
  styleUrls: ['./delete-account-dialog.component.css']
})

export class DeleteAccountDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DeleteAccountDialogComponent>) {
      console.log('received data in dialog: ' + data);
   }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
