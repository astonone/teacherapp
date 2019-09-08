import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { SharedService } from '../../../../services/shared.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { FileService } from '../../../../services/file.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'login-popup',
    templateUrl: 'upload-popup.html',
    styleUrls: ['upload-popup.css']
})
export class UploadPopup {

    private folderId: string;
    public isError: boolean;
    public response: any;
    public isLoading: boolean;
    public isSaving: boolean;
    public isSuccess: boolean;
    public selectedFiles: FileList;
    public currentFileUpload: File;
    public progress: { percentage: number } = { percentage: 0 };

    constructor(
        public dialogRef: MatDialogRef<UploadPopup>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dialog: MatDialog,
        private shared: SharedService,
        private fileService: FileService,
        private route: ActivatedRoute) {
        this.folderId = data.folderId;
    }

    public selectFile(event) {
        this.selectedFiles = event.target.files;
        this.isError = false;
        this.isSuccess = false;
    }

    public upload() {
        this.progress.percentage = 0;

        this.currentFileUpload = this.selectedFiles.item(0);
        this.fileService.uploadFileToFolder(Number(this.folderId), this.currentFileUpload)
            .subscribe(event => {
                if (event.type === HttpEventType.UploadProgress) {
                    this.progress.percentage = Math.round(100 * event.loaded / event.total);
                    this.isLoading = true;
                    if (this.progress.percentage === 100) {
                        this.isLoading = false;
                        this.isSaving = true;
                    }
                } else if (event instanceof HttpResponse) {
                    this.isError = false;
                    this.isSuccess = true;
                    this.isLoading = false;
                    this.isSaving = false;
                    this.response = event;
                }
            }, error => {
                this.isError = true;
            });
        this.selectedFiles = undefined;
    }

    public closePopup() {
        this.dialogRef.close();
    }
}
