import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SharedService} from '../../services/shared.service';
import {FileService} from '../../services/file.service';
import {New} from '../../dto/new';
import {NewsService} from '../../services/news.service';
import {NewsList} from '../../dto/new-list';
import {MatDialog} from '@angular/material';
import {DeleteNewPopup} from './popup/delete/delete-new-popup';
import {CreateNewPopup} from './popup/create/create-new-popup';

@Component({
    selector: 'news',
    templateUrl: './news.component.html',
    styleUrls: [
        './news.component.css'
    ]
})

export class NewsComponent implements OnInit {

    public news: New[] = [];

    constructor(public dialog: MatDialog,
                private router: Router,
                private shared: SharedService,
                private fileService: FileService,
                private newsService: NewsService) {
    }

    ngOnInit() {
        this.loadNews();
    }

    loadNews() {
        this.newsService.list().subscribe(data => {
            this.news = new NewsList(data).news;
        });
    }

    isEmptyNewsList() {
        return this.news.length === 0;
    }

    deleteNew(id: number) {
        const dialogRef = this.dialog.open(DeleteNewPopup, {
            data: {newId: id}
        });
        dialogRef.afterClosed().subscribe(result => {
            this.loadNews();
        });
    }

    createNew() {
        const dialogRef = this.dialog.open(CreateNewPopup, {
        });
        dialogRef.afterClosed().subscribe(result => {
            this.loadNews();
        });
    }
}
