import { Component } from '@angular/core';
import { SharedService } from './services/shared.service';
import { Router } from '@angular/router';
import { LoginPopup } from './components/home/popup/login/login-popup';
import { MatDialog } from '@angular/material';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: [
        './app.component.css'
    ]
})

export class AppComponent {
    constructor(public shared: SharedService,
                private router: Router,
                private dialog: MatDialog) {
        this.shared.setLoggedUser();
    }

    public showUserInfo() {
        const firstName = this.shared.getLoggedUser().userDetails.firstName === null ? '' :
            this.shared.getLoggedUser().userDetails.firstName;
        const lastName = this.shared.getLoggedUser().userDetails.lastName === null ? '' :
            this.shared.getLoggedUser().userDetails.lastName;
        return firstName === '' && lastName === '' ? this.shared.getLoggedUser().email
            : firstName + ' ' + lastName;
    }

    public logout() {
        this.shared.logout();
    }

    private openLoginPopup(): void {
        const dialogRef = this.dialog.open(LoginPopup, {
        });
        dialogRef.afterClosed().subscribe(result => {
        });
    }

    toggleSidenav(sidenav: any) {
        if (this.shared.isMobile()) {
            sidenav.toggle();
        }
    }
}
