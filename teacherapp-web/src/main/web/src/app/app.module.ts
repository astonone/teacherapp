﻿import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { MainUiModule } from './modules/main-ui/main-ui.module';

/*Services*/
import { UserService } from './services/user.service';
import { SharedService } from './services/shared.service';
import { FileService } from './services/file.service';
import { MaterialsService } from './services/materials.service';
import { HerokuHackService } from './services/heroku-hack.service';
import { NewsService } from './services/news.service';

/*Components*/
import { HomeComponent } from './components/home/home.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { SettingsComponent } from './components/settings/settings.component';
import { MaterialsComponent } from './components/materials/materials.component';
import { FolderComponent } from './components/folder/folder.component';
import { NewsComponent } from './components/news/news.component';
import { StudentsComponent } from './components/students/students.component';
import { ParentsComponent } from './components/parents/parents.component';

/*Popups*/
import { CreateUserDialog } from './components/home/popup/registration/dialog/create-user-dialog';
import { ErrorCreateUserDialog } from './components/home/popup/registration/dialog/error-create-user-dialog';
import { LoginPopup } from './components/home/popup/login/login-popup';
import { RegistrationPopup } from './components/home/popup/registration/registration-popup';
import { UploadPopup } from './components/folder/popup/upload/upload-popup';
import { CreateFolderPopup } from './components/materials/popup/folders/create-rename/create-folder-popup';
import { DeleteFolderPopup } from './components/materials/popup/folders/delete/delete-folder-popup';
import { DeleteFilePopup } from './components/folder/popup/delete/delete-file-popup';
import { DeleteNewPopup } from './components/news/popup/delete/delete-new-popup';
import { CreateNewPopup } from './components/news/popup/create/create-new-popup';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        routing,
        BrowserAnimationsModule,
        MainUiModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        PortfolioComponent,
        SettingsComponent,
        MaterialsComponent,
        FolderComponent,
        NewsComponent,
        StudentsComponent,
        ParentsComponent,
        CreateUserDialog,
        ErrorCreateUserDialog,
        LoginPopup,
        RegistrationPopup,
        UploadPopup,
        CreateFolderPopup,
        DeleteFolderPopup,
        DeleteFilePopup,
        DeleteNewPopup,
        CreateNewPopup],
    entryComponents: [
        CreateUserDialog,
        ErrorCreateUserDialog,
        LoginPopup,
        RegistrationPopup,
        UploadPopup,
        CreateFolderPopup,
        DeleteFolderPopup,
        DeleteNewPopup,
        CreateNewPopup,
        DeleteFilePopup
    ],
    providers: [
        LoginPopup,
        RegistrationPopup,
        UploadPopup,
        CreateFolderPopup,
        CreateUserDialog,
        DeleteFolderPopup,
        DeleteFilePopup,
        DeleteNewPopup,
        CreateNewPopup,
        ErrorCreateUserDialog,
        UserService,
        SharedService,
        FileService,
        MaterialsService,
        HerokuHackService,
        NewsService,
        HomeComponent,
        PortfolioComponent,
        MaterialsComponent,
        NewsComponent,
        StudentsComponent,
        ParentsComponent,
        FolderComponent
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
