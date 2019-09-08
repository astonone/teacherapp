import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SettingsComponent } from './components/settings/settings.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { MaterialsComponent } from './components/materials/materials.component';
import { FolderComponent } from './components/folder/folder.component';

const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'portfolio', component: PortfolioComponent },
    { path: 'settings', component: SettingsComponent },
    { path: 'materials', component: MaterialsComponent },
    { path: 'folder/:id', component: FolderComponent },
    { path: '**', redirectTo: 'home' }
];

export const routing = RouterModule.forRoot(appRoutes,  {useHash: true});
