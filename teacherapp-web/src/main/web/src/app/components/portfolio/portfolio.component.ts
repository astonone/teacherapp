import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../services/shared.service';
import { User } from '../../dto/user';

@Component({
    selector: 'home',
    templateUrl: './portfolio.component.html',
    styleUrls: [
        './portfolio.component.css'
    ]
})

export class PortfolioComponent implements OnInit {

    public user: User;

    constructor(private router: Router,
                private shared: SharedService) {
        this.user = this.shared.createEmptyUserStub();
    }

    ngOnInit() {
    }
}
