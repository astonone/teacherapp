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

    constructor(private router: Router,
                private userService: UserService,
                private shared: SharedService,
                private fileService: FileService) {
        this.user = this.shared.createEmptyUserStub();
    }

    ngOnInit() {
    }
}
