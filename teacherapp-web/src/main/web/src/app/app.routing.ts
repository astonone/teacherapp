import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SettingsComponent } from './components/settings/settings.component';
import { UploadComponent } from './components/upload/upload.component';

const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'settings', component: SettingsComponent },
    { path: 'upload', component: UploadComponent },
    { path: '**', redirectTo: 'home' }
];

export const routing = RouterModule.forRoot(appRoutes,  {useHash: true});
