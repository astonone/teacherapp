import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { SharedService } from '../../../../services/shared.service';
import { MaterialsService } from '../../../../services/materials.service';

@Component({
    selector: 'delete-file-popup',
    templateUrl: 'delete-file-popup.html',
    styleUrls: ['delete-file-popup.css']
})
export class DeleteFilePopup {

    public folderId: number;
    public fileId: number;
    public isError: boolean;

    constructor(
        public dialogRef: MatDialogRef<DeleteFilePopup>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private shared: SharedService,
        private dialog: MatDialog,
        private materialsService: MaterialsService) {
        this.isError = false;
        this.folderId = data.folderId;
        this.fileId = data.fileId;
    }

    public closePopup() {
        this.dialogRef.close();
    }

    public deleteFile() {
        this.isError = false;
        this.materialsService.deleteFile(this.folderId, this.fileId).subscribe(() => {
            this.closePopup();
        }, error => {
            this.isError = true;
        });
    }
}
