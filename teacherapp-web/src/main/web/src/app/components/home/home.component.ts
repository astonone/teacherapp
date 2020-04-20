import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { SharedService } from '../../services/shared.service';
import { User } from '../../dto/user';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: [
        './home.component.css'
    ]
})

export class HomeComponent implements OnInit {

    public user: User;
    public showEmail: boolean;

    constructor(private router: Router,
                private userService: UserService,
                private shared: SharedService) {
        this.user = this.shared.createEmptyUserStub();
        this.showEmail = false;
    }

    ngOnInit() {
    }
}
