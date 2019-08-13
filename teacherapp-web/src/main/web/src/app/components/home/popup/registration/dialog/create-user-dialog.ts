import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
    selector: 'create-user-dialog',
    templateUrl: 'create-user-dialog.html',
    styleUrls: ['../registration-popup.css']
})
export class CreateUserDialog {

    constructor(
        public dialogRef: MatDialogRef<CreateUserDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any) {}

    public onNoClick(): void {
        this.dialogRef.close();
    }

    public onYesClick(): void {
        this.dialogRef.close();
    }
}
