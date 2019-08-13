import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { SharedService } from '../../../../services/shared.service';
import { UserService } from '../../../../services/user.service';
import { User } from '../../../../dto/user';
import { LocalDate } from '../../../../dto/local-date';
import { CreateUserDialog } from './dialog/create-user-dialog';
import { ErrorCreateUserDialog } from './dialog/error-create-user-dialog';

@Component({
    selector: 'login-popup',
    templateUrl: 'registration-popup.html',
    styleUrls: ['registration-popup.css']
})
export class RegistrationPopup {

    public newUser: any;
    private createdUser: any;
    public isNotValid: boolean;

    constructor(
        public dialogRef: MatDialogRef<RegistrationPopup>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private shared: SharedService,
        private dialog: MatDialog,
        private userService: UserService) {
        this.newUser = this.createEmptyUser();
    }

    public createUser() {
        if (this.isValidInput()) {
            this.userService.createUser(this.newUser.email, this.newUser.password)
                .subscribe(data => {
                    this.createdUser = new User(data);
                    let birthday = null;
                    if (this.newUser.birthday !== '') {
                        birthday = LocalDate.getObjFromDate(new Date(this.newUser.birthday));
                    }
                    const request = {
                        firstName: this.newUser.firstName,
                        lastName: this.newUser.lastName,
                        key: this.newUser.key,
                        birthday: birthday
                    };
                    this.userService.addUserDetails(this.createdUser.id, request)
                        .subscribe(userDetails => {
                            this.openUserCreatedDialog(userDetails);
                        }, error => {
                            this.openErrorUserCreatedDialog(error);
                            this.userService.deleteUser(this.createdUser.id);
                        });
                }, error => {
                    this.openErrorUserCreatedDialog(error);
                });
        } else {
            this.isNotValid = true;
        }
    }

    private isValidInput() {
        return !(this.newUser.email === '') || !(this.newUser.password === '') || !(this.newUser.key === '');
    }

    private openUserCreatedDialog(userDetails: any): void {
        const dialogRef = this.dialog.open(CreateUserDialog, {
            data: userDetails
        });
        dialogRef.afterClosed().subscribe(result => {
            this.newUser = this.createEmptyUser();
            this.dialogRef.close();
        });
    }

    private openErrorUserCreatedDialog(response: any): void {
        const dialogRef = this.dialog.open(ErrorCreateUserDialog, {
            data : response
        });
        dialogRef.afterClosed().subscribe(result => {
        });
    }

    public closeRegistrationPopup() {
        this.dialogRef.close();
    }

    private createEmptyUser() {
        return {
            email : '',
            password : '',
            firstName : '',
            lastName : '',
            key : '',
            birthday : ''
        };
    }
}
