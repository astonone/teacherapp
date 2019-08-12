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

/*Components*/
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { UploadComponent } from './components/upload/upload.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { SettingsComponent } from './components/settings/settings.component';

/*Popups*/
import { CreateUserDialog } from './components/registration/dialog/create-user-dialog';
import { ErrorCreateUserDialog } from './components/registration/dialog/error-create-user-dialog';
import { LoginPopup } from './components/home/popup/login/login-popup';

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
        LoginComponent,
        UploadComponent,
        RegistrationComponent,
        SettingsComponent,
        CreateUserDialog,
        LoginPopup,
        ErrorCreateUserDialog,
        SortPipe],
    entryComponents: [
        CreateUserDialog,
        ErrorCreateUserDialog,
        LoginPopup
    ],
    providers: [
        LoginPopup,
        UserService,
        SharedService,
        FileService,
        HomeComponent
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
