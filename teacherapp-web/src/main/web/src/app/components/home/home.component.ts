import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { SharedService } from '../../services/shared.service';
import { User } from '../../dto/user';
import { FileService } from '../../services/file.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: [
        './home.component.css'
    ]
})

export class HomeComponent implements OnInit {

    public user: User;
    public photos: Observable<string[]>;

    constructor(private router: Router,
                private userService: UserService,
                private shared: SharedService,
                private fileService: FileService) {
        this.user = this.shared.createEmptyUserStub();
    }

    ngOnInit() {
        /*if (this.shared.getStorage().getItem('token') !== null && this.shared.getStorage().getItem('token')) {
        if (this.shared.getStorage().getItem('loggedUser') === '') {
            this.userService.auth()
                .subscribe(data => {
                        this.shared.getStorage().setItem('loggedUser', JSON.stringify(data));
                        this.shared.setLoggedUser();
                        this.user = new User(data);
                        this.getPhoto();
                    },
                    error => {
                        if (error.status === 401) {
                            this.shared.logout();
                        }
                    }
                );
        } else {
            this.user = new User(JSON.parse(this.shared.getStorage().getItem('loggedUser')));
            this.getPhoto();
        }
        } else {
            this.router.navigate(['']);
        }*/
    }

    public isEmptyPhotoLink() {
        return this.user.email ? this.user.isEmptyPhotoLink() : false;
    }

    public printUserName() {
        return this.user.email ? this.user.printUserName() : '';
    }

    private getPhoto() {
        this.photos = this.fileService.getUploadedPhoto(this.user.getPhotoLink());
    }

    public showUserInfo(user: User) {
        const firstName = user.userDetails.firstName === null ? '' : user.userDetails.firstName;
        const lastName = user.userDetails.lastName === null ? '' : user.userDetails.lastName;
        return firstName === '' && lastName === '' ? user.email : firstName + ' ' + lastName;
    }
}
