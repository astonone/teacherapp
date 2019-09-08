import { NgModule } from '@angular/core';
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

/*Components*/
import { HomeComponent } from './components/home/home.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { SettingsComponent } from './components/settings/settings.component';
import { MaterialsComponent } from './components/materials/materials.component';
import { FolderComponent } from './components/folder/folder.component';

/*Popups*/
import { CreateUserDialog } from './components/home/popup/registration/dialog/create-user-dialog';
import { ErrorCreateUserDialog } from './components/home/popup/registration/dialog/error-create-user-dialog';
import { LoginPopup } from './components/home/popup/login/login-popup';
import { RegistrationPopup } from './components/home/popup/registration/registration-popup';
import { UploadPopup } from './components/folder/popup/upload-popup';

/*Pipe*/
import { SortPipe } from 'app/pipe/sort.pipe';

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
        CreateUserDialog,
        ErrorCreateUserDialog,
        LoginPopup,
        RegistrationPopup,
        UploadPopup,
        SortPipe],
    entryComponents: [
        CreateUserDialog,
        ErrorCreateUserDialog,
        LoginPopup,
        RegistrationPopup,
        UploadPopup
    ],
    providers: [
        LoginPopup,
        RegistrationPopup,
        UploadPopup,
        CreateUserDialog,
        ErrorCreateUserDialog,
        UserService,
        SharedService,
        FileService,
        MaterialsService,
        HerokuHackService,
        HomeComponent,
        PortfolioComponent,
        MaterialsComponent,
        FolderComponent
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
