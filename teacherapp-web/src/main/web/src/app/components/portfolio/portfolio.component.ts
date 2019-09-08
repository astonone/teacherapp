import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../dto/user';
import { Observable } from 'rxjs';
import { UserService } from '../../services/user.service';
import { FileService } from '../../services/file.service';

@Component({
    selector: 'home',
    templateUrl: './portfolio.component.html',
    styleUrls: [
        './portfolio.component.css'
    ]
})

export class PortfolioComponent implements OnInit {

    public user: User = User.createEmptyUser();
    public photos: Observable<string[]>;

    constructor(private router: Router,
                private userService: UserService,
                private fileService: FileService) {
        this.loadPortfolioUser();
    }

    ngOnInit() {
        this.loadPortfolioUser();
    }

    loadPortfolioUser() {
        this.userService.getPortfolioUser().subscribe(data => {
            this.user = new User(data);
            this.getPhoto();
        });
    }

    private getPhoto() {
        this.photos = this.fileService.getPortfolioFile();
    }
}
