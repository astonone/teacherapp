import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'students.component',
    templateUrl: './students.component.html',
    styleUrls: [
        './students.component.css'
    ]
})

export class StudentsComponent implements OnInit {
    constructor(private router: Router) {
    }

    ngOnInit() {
    }
}
