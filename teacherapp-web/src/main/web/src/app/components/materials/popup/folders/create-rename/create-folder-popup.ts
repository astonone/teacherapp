import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { SharedService } from '../../../../../services/shared.service';
import { MaterialsService } from '../../../../../services/materials.service';

@Component({
    selector: 'create-folder-popup',
    templateUrl: 'create-folder-popup.html',
    styleUrls: ['create-folder-popup.css']
})
export class CreateFolderPopup {

    public isRename: boolean;
    public folderId: number;
    public isError: boolean;
    public folderName: '';

    constructor(
        public dialogRef: MatDialogRef<CreateFolderPopup>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private shared: SharedService,
        private dialog: MatDialog,
        private materialsService: MaterialsService) {
        this.isError = false;
        this.folderId = data.folderId;
        this.isRename = data.isRename;
        this.folderName = data.folderName;
    }

    public closePopup() {
        this.dialogRef.close();
    }

    createFolder() {
        this.isError = false;
        if (this.folderName !== '') {
            this.materialsService.createFolder(this.folderName).subscribe(() => {
                this.closePopup();
            }, error => {
                this.isError = true;
            });
        } else {
            this.isError = true;
        }
    }

    renameFolder() {
        this.isError = false;
        if (this.folderName !== '') {
            this.materialsService.renameFolder(this.folderName, this.folderId).subscribe(() => {
                this.closePopup();
            }, error => {
                this.isError = true;
            });
        } else {
            this.isError = true;
        }
    }
}
