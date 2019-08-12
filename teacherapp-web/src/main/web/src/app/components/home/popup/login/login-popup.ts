import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { SharedService } from '../../../../services/shared.service';
import { UserService } from '../../../../services/user.service';

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
                } else {
                    this.isAuthError = true;
                }
            });
    }
}
