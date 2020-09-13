import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersListComponent } from './components/users-list/users-list.component';

const routes: Routes = [
    { path: '', component: UsersListComponent, pathMatch: 'full' },
    { path: 'registration', loadChildren: () => import('./feature-modules/registration/registration.module').then(m => m.RegistrationModule) },
    { path: 'person/:id', loadChildren: () => import('./feature-modules/user-infos/user-infos.module').then(m => m.UserInfosModule) },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
