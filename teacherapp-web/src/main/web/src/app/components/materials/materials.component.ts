import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FileService } from '../../services/file.service';
import { SharedService } from '../../services/shared.service';
import { Router } from '@angular/router';
import { MaterialsService } from '../../services/materials.service';
import { Folder } from '../../dto/folder';
import { FoldersList } from '../../dto/folder-list';

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
}
