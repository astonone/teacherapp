import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FileService } from '../../services/file.service';
import { SharedService } from '../../services/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialsService } from '../../services/materials.service';
import { Folder } from '../../dto/folder';
import { File } from '../../dto/file';
import { Observable } from 'rxjs';
import { UploadPopup } from './popup/upload-popup';

@Component({
  selector: 'app-download',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.css']
})
export class FolderComponent implements OnInit {

  public files: File[] = [];
  private folderId: string;

  constructor(public dialog: MatDialog,
              private fileService: FileService,
              private materialsService: MaterialsService,
              private shared: SharedService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.folderId = this.route.snapshot.paramMap.get('id');
    this.loadFolder(this.folderId);
  }

  loadFolder(folderId: string) {
    this.materialsService.getFolderById(Number(folderId)).subscribe(data => {
      this.files = new Folder(data).files;
      this.files.forEach(file => {
        file.link = this.getPhoto(file);
      });
    });
  }

  private getPhoto(file: File): Observable<any>  {
    return this.fileService.getFile(file.filename);
  }

  uploadFileToFolder() {
    const dialogRef = this.dialog.open(UploadPopup, {data: {folderId: this.folderId}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loadFolder(this.folderId);
    });
  }
}
