import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SettingsComponent } from './components/settings/settings.component';
import { UploadComponent } from './components/upload/upload.component';
import { RegistrationComponent } from './components/registration/registration.component';

const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'settings', component: SettingsComponent },
    { path: 'upload', component: UploadComponent },
    { path: 'registration', component: RegistrationComponent },
    { path: '**', redirectTo: 'home' }
];

export const routing = RouterModule.forRoot(appRoutes,  {useHash: true});
