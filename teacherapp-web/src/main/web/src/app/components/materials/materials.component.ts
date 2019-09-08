import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FileService } from '../../services/file.service';
import { SharedService } from '../../services/shared.service';
import { Router } from '@angular/router';
import { MaterialsService } from '../../services/materials.service';
import { Folder } from '../../dto/folder';
import { FoldersList } from '../../dto/folder-list';
import { CreateFolderPopup } from './popup/folders/create-rename/create-folder-popup';
import {DeleteFolderPopup} from './popup/folders/delete/delete-folder-popup';

@Component({
  selector: 'app-download',
  templateUrl: './materials.component.html',
  styleUrls: ['./materials.component.css']
})
export class MaterialsComponent implements OnInit {

  public folders: Folder[] = [];

  constructor(public dialog: MatDialog,
              private fileService: FileService,
              private materialsService: MaterialsService,
              private shared: SharedService,
              private router: Router) { }

  ngOnInit() {
    this.loadFolders();
  }

  loadFolders() {
    this.materialsService.getFolders().subscribe(data => {
      this.folders = new FoldersList(data).folders;
    });
  }

  gotoFolder(folderId: number) {
    this.router.navigate(['folder/' + folderId]);
  }

  private openCreateFolderPopup(isRename: boolean, folderId: number, folderName: string): void {
    const dialogRef = this.dialog.open(CreateFolderPopup, {data : {isRename : isRename, folderId: folderId, folderName: folderName}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loadFolders();
    });
  }

  public isEmptyFolderSList() {
    return this.folders.length === 0;
  }

  private openDeleteFolderPopup(folderId: number): void {
    const dialogRef = this.dialog.open(DeleteFolderPopup, {data : {folderId: folderId}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loadFolders();
    });
  }
}
