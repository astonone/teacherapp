import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { SharedService } from '../../../../services/shared.service';
import { UserService } from '../../../../services/user.service';
import { RegistrationPopup } from '../registration/registration-popup';

@Component({
    selector: 'login-popup',
    templateUrl: 'login-popup.html',
    styleUrls: ['login-popup.css']
})
export class LoginPopup {

    public model: any = {};
    public isAuthError = false;
    public isRemember = false;

    constructor(
        public dialogRef: MatDialogRef<LoginPopup>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private shared: SharedService,
        private dialog: MatDialog,
        private userService: UserService) {
    }

    public login() {
        if (this.isRemember) {
            localStorage.setItem('isRemember', 'true');
        } else {
            localStorage.setItem('isRemember', 'false');
        }
        const email = this.model.email;
        const password = this.model.password;
        this.userService.login(email, password)
            .subscribe(isValid => {
                if (isValid) {
                    this.isAuthError = false;
                    this.shared.getStorage().setItem('token', btoa(email + ':' + password));
                    this.shared.getStorage().setItem('loggedUser', '');
                    this.auth();
                    this.closeLoginPopup();
                } else {
                    this.isAuthError = true;
                }
            });
    }

    private auth() {
        if (this.shared.getStorage().getItem('token') !== null && this.shared.getStorage().getItem('token')) {
            if (this.shared.getStorage().getItem('loggedUser') === '') {
                this.userService.auth()
                    .subscribe(data => {
                            this.shared.getStorage().setItem('loggedUser', JSON.stringify(data));
                            this.shared.setLoggedUser();
                        },
                        error => {
                            if (error.status === 401) {
                                this.shared.logout();
                            }
                        }
                    );
            }
        }
    }

    private openRegistrationPopup(): void {
            const dialogRef = this.dialog.open(RegistrationPopup, {
            });
        dialogRef.afterClosed().subscribe(result => {
        });
    }

    public closeLoginPopup() {
        this.dialogRef.close();
    }
}
