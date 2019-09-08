import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {NewsService} from '../../../../services/news.service';

@Component({
    selector: 'delete-new-popup',
    templateUrl: 'delete-new-popup.html',
    styleUrls: ['delete-new-popup.css']
})
export class DeleteNewPopup {

    public newId: number;
    public isError: boolean;

    constructor(
        public dialogRef: MatDialogRef<DeleteNewPopup>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private newsService: NewsService,
        private dialog: MatDialog) {
        this.newId = data.newId;
    }

    public closePopup() {
        this.dialogRef.close();
    }

    public deleteNew() {
        this.isError = false;
        this.newsService.deleteNew(this.newId).subscribe(() => {
            this.closePopup();
        }, error => {
            this.isError = true;
        });
    }
}
