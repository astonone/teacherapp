import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'parents.component',
    templateUrl: './parents.component.html',
    styleUrls: [
        './parents.component.css'
    ]
})

export class ParentsComponent implements OnInit {
    constructor(private router: Router) {
    }

    ngOnInit() {
    }
}
