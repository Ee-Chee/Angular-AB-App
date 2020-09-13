import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserManagementComponent } from '../../components/user-management/user-management.component';

const routes: Routes = [{ path: '', component: UserManagementComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserInfosRoutingModule { }
