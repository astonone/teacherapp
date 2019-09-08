import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { SharedService } from '../../../../../services/shared.service';
import { MaterialsService } from '../../../../../services/materials.service';

@Component({
    selector: 'delete-folder-popup',
    templateUrl: 'delete-folder-popup.html',
    styleUrls: ['delete-folder-popup.css']
})
export class DeleteFolderPopup {

    public isRename: boolean;
    public folderId: number;
    public isError: boolean;
    public folderName: '';

    constructor(
        public dialogRef: MatDialogRef<DeleteFolderPopup>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private shared: SharedService,
        private dialog: MatDialog,
        private materialsService: MaterialsService) {
        this.isError = false;
        this.isRename = data.isRename;
        this.folderId = data.folderId;
        this.folderName = data.folderName ? data.folderName : '';
    }

    public closePopup() {
        this.dialogRef.close();
    }

    deleteFolder() {
        this.isError = false;
        this.materialsService.deleteFolder(this.folderId).subscribe(() => {
            this.closePopup();
        }, error => {
            this.isError = true;
        });
    }
}
