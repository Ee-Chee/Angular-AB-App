import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersListComponent } from './components/users-list/users-list.component';
import { UserManagementComponent } from './components/user-management/user-management.component';

const routes: Routes = [
    { path: '', component: UsersListComponent, pathMatch: 'full' },
    { path: 'registration', component: UserManagementComponent },
    { path: 'person/:id', component: UserManagementComponent },
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
