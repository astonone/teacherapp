import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {NewsService} from '../../../../services/news.service';
import {New} from '../../../../dto/new';
import {SharedService} from '../../../../services/shared.service';

@Component({
    selector: 'create-new-popup',
    templateUrl: 'create-new-popup.html',
    styleUrls: ['create-new-popup.css']
})
export class CreateNewPopup {

    public isError: boolean;
    public title: string;
    public text: string;

    constructor(
        public dialogRef: MatDialogRef<CreateNewPopup>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dialog: MatDialog,
        private newsService: NewsService,
        private sharedService: SharedService) {
        this.isError = false;
        this.title = '';
        this.text = '';
    }

    public closePopup() {
        this.dialogRef.close();
    }

    createNew() {
        this.isError = false;
        if (this.title !== '' && this.text !== '') {
            this.newsService.createNews({
                title: this.title,
                text: this.text,
                user: {
                    id: this.sharedService.getLoggedUser().id
                }
            }).subscribe(() => {
                this.closePopup();
            }, error => {
                this.isError = true;
            });
        } else {
            this.isError = true;
        }
    }
}
